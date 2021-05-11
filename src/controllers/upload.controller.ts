import { Controller, Get, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('upload')
@Controller('upload')
export class UploadController {
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

    @Post('files')
    @UseInterceptors(AnyFilesInterceptor())
    uploadMultiFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
    }
}
