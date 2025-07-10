import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { ApplicationModule } from './application/application.module';
import { RawBodyMiddleware } from './middleware/raw-body.middleware';
import * as express from 'express';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(RawBodyMiddleware)
  //     .forRoutes({ path: '/api/stripe/webhook', method: RequestMethod.POST })
  //     .apply(express.json())
  //     .forRoutes({ path: '*path', method: RequestMethod.ALL });
  // }
}
