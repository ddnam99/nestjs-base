import { ConnectionsModule } from '$connections/connections.module';
import { Module } from '@nestjs/common';
import { TokenEntity } from '$entities/Token.entity';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '$entities/User.entity';
import { UserService } from './user.service';
import { FirebaseService } from './firebase.service';
import { EmitterService } from './emitter.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity]), ConnectionsModule],
  providers: [UserService, TokenService, FirebaseService, EmitterService],
  exports: [UserService, TokenService, FirebaseService, EmitterService],
})
export class CommonServiceModule {}
