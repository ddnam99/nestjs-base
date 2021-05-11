import { ServicesModule } from '$services/services.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        ServicesModule
    ],
    controllers: []
})
export class CmsModule {}
