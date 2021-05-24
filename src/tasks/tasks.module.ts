import { ConnectionsModule } from '$connections/connections.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TestSchedule } from './test.task';
import { TokenEntity } from '$entities/Token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([TokenEntity]),
    TestSchedule,
    ConnectionsModule,
  ],
})
export class TasksModule {}
