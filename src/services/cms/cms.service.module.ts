import { CommonServiceModule } from '$services/common/common.service.module';
import { ConnectionsModule } from '$connections/connections.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([]), ConnectionsModule, CommonServiceModule],
  providers: [],
  exports: [CommonServiceModule],
})
export class CmsServiceModule {}
