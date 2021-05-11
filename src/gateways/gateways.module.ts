import { ConnectionsModule } from '$connections/connections.module';
import { ServicesModule } from '$services/services.module';
import { Module } from '@nestjs/common';
import { TestGateway } from './test.gateway';

@Module({
  imports: [ConnectionsModule, ServicesModule],
  providers: [TestGateway],
})
export class GatewaysModule {}
