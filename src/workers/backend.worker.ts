import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import Redis from 'ioredis';
import { RedisConstant } from '$constants/redis.constant';
import { RedisService } from '$connections/redis.provider';

@Injectable()
export class BackendWorker implements OnModuleInit {
  private readonly logger = new Logger(BackendWorker.name);
  private readonly redis: Redis.Redis;
  constructor(redisService: RedisService) {
    this.redis = redisService.getNewInstance().redis;
  }

  onModuleInit() {
    this.redis.subscribe(RedisConstant.BACKEND_WORKER_CHANEL, (err, count) => {
      if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        this.logger.error('Failed to subscribe: %s', err.message);
      } else {
        // `count` represents the number of channels this client are currently subscribed to.
        this.logger.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
        );
      }
    });

    this.redis.on('message', async (channel, message) => {
      this.logger.log(`Received ${message} from ${channel}`);
    });
  }
}
