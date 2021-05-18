import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '$middlewares/auth.middleware';
import { ServicesModule } from '$services/services.module';
import { ControllersModule } from '$controllers/controllers.module';
import { GatewaysModule } from '$gateways/gateways.module';
import { TasksModule } from 'tasks/tasks.module';
import { ConnectionsModule } from '$connections/connections.module';
import { MulterModule } from '@nestjs/platform-express';
import { WorkersModule } from '$workers/workers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    ConnectionsModule,
    ServicesModule,
    ControllersModule,
    GatewaysModule,
    TasksModule,
    WorkersModule,
  ],
  controllers: [],
  providers: [ConnectionsModule, ServicesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
