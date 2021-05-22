import { Module } from '@nestjs/common';
import { ServicesModule } from '$services/services.module';
import { TestController } from './test.controller';
import { UploadController } from './upload.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UploadController, TestController],
})
export class CommonControllerModule {}
