import config from '$config';
import { Injectable, Logger } from '@nestjs/common';
import AWS from 'aws-sdk';
import md5 from 'md5';
import url from 'url';

@Injectable()
export class AwsS3Service {
  private readonly logger: Logger = new Logger(AwsS3Service.name);
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      secretAccessKey: config.ENV.AWS_S3_SECRET_ACCESS_KEY,
      accessKeyId: config.ENV.AWS_S3_ACCESS_KEY_ID,
      region: config.ENV.AWS_S3_REGION,
    });
  }

  async getPresignedUrl(filename: string, contentType: string) {
    const urlPut = this.s3.getSignedUrl('putObject', {
      Bucket: config.ENV.AWS_S3_BUCKET,
      ACL: 'public-read',
      Key: `${md5(Date.now() + filename)}_${filename}`,
      Expires: 5 * 60,
      ContentType: contentType,
    });

    const urlParsed = url.parse(urlPut, true);

    return {
      urlImage: `${urlParsed.protocol}//${urlParsed.host}${urlParsed.pathname}`,
      urlUpload: urlPut,
    };
  }
}
