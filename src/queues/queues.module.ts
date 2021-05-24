import { Module } from '@nestjs/common';
import { TestQueue } from './test.queue';
import { BullModule } from '@nestjs/bull';
import { QueueConstant } from '$constants/queue.constant';
import { CronQueue } from './cron.queue';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: QueueConstant.TEST_CHANEL,
      },
      {
        name: QueueConstant.CRON_CHANEL,
      },
    ),
  ],
  providers: [TestQueue, CronQueue],
  exports: [TestQueue, CronQueue],
})
export class QueuesModule {}
