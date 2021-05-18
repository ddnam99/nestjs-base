import { Module } from '@nestjs/common';
import { UserService } from '$services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '$entities/Users';
import { TokenService } from '$services/token.service';
import { TokenEntity } from '$entities/Token';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  providers: [UserService, TokenService],
  exports: [TypeOrmModule, UserService, TokenService],
})
export class ServicesModule {}
