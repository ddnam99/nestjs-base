import { ConnectionsModule } from '$connections/connections.module';
import { ServicesModule } from '$services/services.module';
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ConnectionsModule, ServicesModule],
  providers: [ChatGateway],
})
export class GatewaysModule {}
