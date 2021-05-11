import { ServicesModule } from '$services/services.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UserController],
})
export class MobileModule {}
