import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TestSchedule } from './test.schedule';

@Module({
    imports: [ScheduleModule.forRoot(), TestSchedule]
})
export class SchedulesModule {
}
