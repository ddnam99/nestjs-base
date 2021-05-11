import { MiddlewareConsumer, Module, NestModule, RequestMethod, UsePipes, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionsModule } from 'connections/connections.module';
import { AuthMiddleware } from '$middlewares/auth.middleware';
import { ServicesModule } from '$services/services.module';
import { ControllersModule } from '$controllers/controllers.module';
import { GatewaysModule } from '$gateways/gateways.module';
import { SchedulesModule } from '$schedules/schedules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    ConnectionsModule,
    ServicesModule,
    ControllersModule,
    GatewaysModule,
    SchedulesModule
  ],
  controllers: [],
  providers: [ConnectionsModule, ServicesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
