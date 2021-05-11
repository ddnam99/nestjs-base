import { RedisService } from '$connections/redis.provider';
import { RedisConstant } from '$constants/redis.constant';
import { Logger } from '@nestjs/common';

const redis = new RedisService().getInstance();
const logger = new Logger('TestWorker');

redis.subscribe(RedisConstant.BACKEND_WORKER_CHANEL, (err, count) => {
  if (err) {
    // Just like other commands, subscribe() can fail for some reasons,
    // ex network issues.
    logger.error('Failed to subscribe: %s', err.message);
  } else {
    // `count` represents the number of channels this client are currently subscribed to.
    logger.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
    );
  }
});

redis.on('message', (channel, message) => {
  logger.log(`Received ${message} from ${channel}`);
});
