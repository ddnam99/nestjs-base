import { Module } from '@nestjs/common';
import { ConnectionsModule } from 'connections/connections.module';
import { ServicesModule } from '$services/services.module';
import { BackendWorker } from './backend.worker';

@Module({
  imports: [ConnectionsModule, ServicesModule],
  providers: [BackendWorker],
})
export class WorkersModule {}
