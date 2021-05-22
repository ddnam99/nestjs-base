import config from '$config';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.provider';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: config.ENV.REDIS_HOST,
        port: config.ENV.REDIS_PORT,
        password: config.ENV.REDIS_PASS,
      },
    }),
  ],
  providers: [RedisService],
  exports: [TypeOrmModule, EventEmitterModule, BullModule, RedisService],
})
export class ConnectionsModule {}
