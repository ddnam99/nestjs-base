import { CmsControllerModule } from './cms/cms.controller.module';
import { CommonControllerModule } from './common/common.controler.module';
import { MobileControllerModule } from './mobile/mobile.controller.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CmsControllerModule, MobileControllerModule, CommonControllerModule],
})
export class ControllersModule {}
