import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
