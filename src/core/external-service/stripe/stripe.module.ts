import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StriperService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  controllers: [StripeController],
  imports: [ConfigModule],
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Stripe(
          configService.get<string>('STRIPE_SECRET_KEY') ?? '0',
          {
            apiVersion: '2025-05-28.basil',
          },
        );
      },
      inject: [ConfigService],
    },
    StriperService,
  ],
  exports: ['STRIPE_CLIENT', StriperService],
})
export class StripeModule {}
