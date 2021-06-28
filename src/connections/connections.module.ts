import config from '$config';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.provider';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FirebaseModule } from 'nestjs-firebase';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EventEmitterModule.forRoot(),
    FirebaseModule.forRoot({
      googleApplicationCredential: 'firebase.config.json',
    }),
    BullModule.forRoot({
      redis: {
        host: config.ENV.REDIS_HOST,
        port: config.ENV.REDIS_PORT,
        password: config.ENV.REDIS_PASS,
      },
    }),
  ],
  providers: [RedisService],
  exports: [TypeOrmModule, EventEmitterModule, FirebaseModule, BullModule, RedisService],
})
export class ConnectionsModule {}
