import { CmsServiceModule } from '$services/cms/cms.service.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CmsServiceModule],
  controllers: [],
})
export class CmsControllerModule {}
