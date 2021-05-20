import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AuthMiddleware } from '$middlewares/auth.middleware';
import { ConnectionsModule } from '$connections/connections.module';
import { ControllersModule } from '$controllers/controllers.module';
import { GatewaysModule } from '$gateways/gateways.module';
import { MailerRegister } from 'mailer/mailer.register';
import { MulterModule } from '@nestjs/platform-express';
import { ServicesModule } from '$services/services.module';
import { TasksModule } from 'tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    MailerRegister,
  ],
  controllers: [],
  providers: [ConnectionsModule, ServicesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
