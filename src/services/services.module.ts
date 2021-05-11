import { MiddlewareConsumer, Module, NestModule, RequestMethod, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from '$services/app.service';
import { UserService } from '$services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '$entities/Users';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [AppService, UserService],
    exports: [TypeOrmModule, AppService, UserService],
})
export class ServicesModule {
}
