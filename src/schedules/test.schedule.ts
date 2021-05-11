import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TestSchedule {
  private readonly logger = new Logger(TestSchedule.name);

  @Cron('*/1 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second next 1s');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron1() {
    this.logger.debug('Called when the current second next 10s');
  }
}