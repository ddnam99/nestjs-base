import config from '$config';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.provider';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: config.ENV.REDIS_HOST,
        port: config.ENV.REDIS_PORT,
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService, BullModule],
})
export class ConnectionsModule {}
