import { Module } from '@nestjs/common';
import { ExternalServiceModule } from './external-service/external-service.module';

@Module({
  imports: [ExternalServiceModule],
  exports: [ExternalServiceModule],
})
export class CoreModule {}
