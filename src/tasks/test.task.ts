import { EmitterConstant } from '$constants/emitter.constant';
import { QueueConstant } from '$constants/queue.constant';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TestSchedule {
  private readonly logger = new Logger(TestSchedule.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Cron('* * 1 * * *')
  async handleCron() {
    // this.logger.debug('Called when the current second is 1 hour');
    await this.eventEmitter.emitAsync(EmitterConstant.CRON_EVENT, {
      message: 'Called when the current second is 1 hour',
    });
  }

  // @Cron(CronExpression.EVERY_10_HOURS)
  // handleCron1() {
  //   this.logger.debug('Called every 10 hours');
  // }

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
