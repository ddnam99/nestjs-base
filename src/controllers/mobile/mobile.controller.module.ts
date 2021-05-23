import { MobileServiceModule } from '$services/mobile/mobile.service.module';
import { Module } from '@nestjs/common';
import { AuthMobileController } from './auth.mobile.controller';
import { UserMobileController } from './user.mobile.controller';

@Module({
  imports: [MobileServiceModule],
  controllers: [UserMobileController, AuthMobileController],
})
export class MobileControllerModule {}
