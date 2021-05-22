import { CmsServiceModule } from './cms/cms.service.module';
import { CommonServiceModule } from './common/common.service.module';
import { MobileServiceModule } from './mobile/mobile.service.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CmsServiceModule, MobileServiceModule, CommonServiceModule],
  exports: [CmsServiceModule, MobileServiceModule, CommonServiceModule],
})
export class ServicesModule {}
