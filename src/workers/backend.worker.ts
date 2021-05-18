import { RedisService } from '$connections/redis.provider';
import { RedisConstant } from '$constants/redis.constant';
import { UserService } from '$services/user.service';
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class BackendWorker {
  private readonly logger = new Logger(BackendWorker.name);
  private readonly redis: Redis.Redis;
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {
    this.redis = redisService.getInstance();

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
