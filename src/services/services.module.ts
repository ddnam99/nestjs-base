import { Module } from '@nestjs/common';
import { SendMaileService } from './mailer.service';
import { TokenEntity } from '$entities/Token';
import { TokenService } from '$services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '$entities/Users';
import { UserService } from '$services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  providers: [UserService, TokenService, SendMaileService],
  exports: [TypeOrmModule, UserService, TokenService, SendMaileService],
})
export class ServicesModule {}
