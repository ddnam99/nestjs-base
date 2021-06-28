import { EmitterConstant } from '$constants/emitter.constant';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import Bull, { Queue, Job } from 'bull';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { QueueConstant, QueueJobConstant } from '$constants/queue.constant';

@Injectable()
@Processor(QueueConstant.CRON_CHANEL)
export class CronQueue {
  private readonly logger = new Logger(CronQueue.name);

  constructor(@InjectQueue(QueueConstant.CRON_CHANEL) private readonly cronQueue: Queue) {}

  @OnEvent(EmitterConstant.CRON_EVENT)
  handleOrderCreatedEvent(data: any, opts?: Bull.JobOptions) {
    this.logger.log(`Received data form event: ${EmitterConstant.CRON_EVENT}`);
    this.cronQueue.add(CronQueue.name, data, opts);
  }

  @Process(QueueJobConstant.LOG)
  handleQueue(job: Job) {
    this.logger.log(job.data);
  }
}
