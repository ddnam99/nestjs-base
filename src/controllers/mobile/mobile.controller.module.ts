import { MobileServiceModule } from '$services/mobile/mobile.service.module';
import { Module } from '@nestjs/common';
import { UserMobileController } from './user.mobile.controller';

@Module({
  imports: [MobileServiceModule],
  controllers: [UserMobileController],
})
export class MobileControllerModule {}
