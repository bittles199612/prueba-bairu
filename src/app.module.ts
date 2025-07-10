import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { ApplicationModule } from './application/application.module';
// import * as express from 'express';
// import * as Joi from '@hapi/joi';
// import { ObjectSchema } from '@hapi/joi';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RawBodyMiddleware).forRoutes('stripe/webhook');
  // }
}
