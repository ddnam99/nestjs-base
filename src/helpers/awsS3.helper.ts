import config from '$config';
import * as AWS from 'aws-sdk';
import * as md5 from 'md5';

const s3 = new AWS.S3({
  secretAccessKey: config.ENV.AWS_S3_SECRET_ACCESS_KEY,
  accessKeyId: config.ENV.AWS_S3_ACCESS_KEY_ID,
  region: config.ENV.AWS_S3_REGION,
});

export const getPresignedUrl = async (filename: string, contentType: string) => {
  const urlPut = s3.getSignedUrl('putObject', {
    Bucket: config.ENV.AWS_S3_BUCKET,
    ACL: 'public-read',
    Key: `${md5(Date.now() + filename)}_${filename}`,
    Expires: 5 * 60,
    ContentType: contentType,
  });

  return urlPut;
};
