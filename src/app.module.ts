import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '$middlewares/auth.middleware';
import { ServicesModule } from '$services/services.module';
import { ControllersModule } from '$controllers/controllers.module';
import { GatewaysModule } from '$gateways/gateways.module';
import { TasksModule } from 'tasks/tasks.module';
import { ConnectionsModule } from '$connections/connections.module';
import { WorkersModule } from '$workers/workers.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QueuesModule } from '$queues/queues.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConnectionsModule,
    ServicesModule,
    ControllersModule,
    GatewaysModule,
    TasksModule,
    WorkersModule,
    QueuesModule,
  ],
  controllers: [],
  providers: [ConnectionsModule, ServicesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
