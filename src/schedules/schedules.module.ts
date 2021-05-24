import { ConnectionsModule } from '$connections/connections.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TestSchedule } from './test.schedule';
import { TokenEntity } from '$entities/Token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenSchedule } from './token.schedule';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([TokenEntity]), ConnectionsModule],
  providers: [TestSchedule, TokenSchedule],
})
export class SchedulesModule {}
