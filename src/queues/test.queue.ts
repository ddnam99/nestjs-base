import { EmitterConstant } from '$constants/emitter.constant';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue, Job } from 'bull';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { QueueConstant } from '$constants/queue.constant';

@Injectable()
@Processor(QueueConstant.TEST_CHANEL)
export class TestQueue {
  private readonly logger = new Logger(TestQueue.name);

  constructor(@InjectQueue(QueueConstant.TEST_CHANEL) private readonly testQueue: Queue) {}

  @OnEvent(EmitterConstant.TEST_EVENT)
  handleOrderCreatedEvent(payload: any) {
    this.logger.log(`Received data form event: ${EmitterConstant.TEST_EVENT}`);
    this.testQueue.add(payload);
  }

  @Process()
  handleQueue(job: Job) {
    this.logger.log(job.data);
  }
}
