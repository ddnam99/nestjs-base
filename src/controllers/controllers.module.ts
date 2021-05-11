import { Module } from '@nestjs/common';
import { MobileModule } from './mobile/mobile.module';
import { TestController } from './test.controller';
import { CmsModule } from './cms/cms.module';
import { ServicesModule } from '$services/services.module';

@Module({
    imports: [
        MobileModule,
        CmsModule
    ],
    controllers: [TestController],
})
export class ControllersModule { }
