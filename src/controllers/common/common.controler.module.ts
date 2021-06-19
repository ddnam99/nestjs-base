import { Module } from '@nestjs/common';
import { ServicesModule } from '$services/services.module';
import { TestController } from './test.controller';
import { UploadController } from './upload.controller';
import { ChatController } from './chat.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UploadController, TestController, ChatController],
})
export class CommonControllerModule {}
