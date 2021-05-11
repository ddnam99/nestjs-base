import { Module } from '@nestjs/common';
import { RedisService } from './redis.provider';

@Module({
  imports: [],
  providers: [RedisService],
  exports: [RedisService]
})
export class ConnectionsModule { }
