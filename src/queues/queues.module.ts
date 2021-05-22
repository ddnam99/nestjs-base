import { Module } from '@nestjs/common';
import { TestQueue } from './test.queue';
import { BullModule } from '@nestjs/bull';
import { QueueConstant } from '$constants/queue.constant';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueConstant.TEST_CHANEL,
    }),
  ],
  providers: [TestQueue],
  exports: [TestQueue],
})
export class QueuesModule {}
