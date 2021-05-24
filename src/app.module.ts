import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '$middlewares/auth.middleware';
import { ServicesModule } from '$services/services.module';
import { ControllersModule } from '$controllers/controllers.module';
import { GatewaysModule } from '$gateways/gateways.module';
import { ConnectionsModule } from '$connections/connections.module';
import { WorkersModule } from '$workers/workers.module';
import { QueuesModule } from '$queues/queues.module';
import { LoggerMiddleware } from '$middlewares/logger.middleware';
import { SchedulesModule } from '$schedules/schedules.module';

@Module({
  imports: [
    ConnectionsModule,
    ServicesModule,
    ControllersModule,
    GatewaysModule,
    SchedulesModule,
    WorkersModule,
    QueuesModule,
  ],
  providers: [ConnectionsModule, ServicesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
