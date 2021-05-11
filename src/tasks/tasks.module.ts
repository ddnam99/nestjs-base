import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TestSchedule } from './test.task';

@Module({
    imports: [ScheduleModule.forRoot(), TestSchedule]
})
export class TasksModule {
}
