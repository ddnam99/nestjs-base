import { getPresignedUrl } from '$helpers/awsS3.helper';
import { CommonController } from '$helpers/decorator.helper';
import { ApiFile, ApiFiles, MulterConfig } from '$helpers/swagger.helper';
import { GetPresignedUrlDto } from '$models/upload/GetPresignedUrl.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@CommonController('upload')
export class UploadController {
  @Post('file')
  @ApiFile()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', MulterConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    return {
      originalname: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  @Post('files')
  @ApiFiles()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor(MulterConfig))
  uploadMultiFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);

    return files.map(file => {
      return {
        originalname: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      };
    });
  }

  @Get(':img')
  @ApiParam({ name: 'img', required: true })
  seeUploadedFile(@Param('img') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }

  @Post('s3/presigned-url')
  getUrlUpload(@Req() req: Request, @Body() body: GetPresignedUrlDto) {
    return getPresignedUrl(body.filename, body.contentType);
  }
}
