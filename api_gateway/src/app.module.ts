import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OnboardingController } from './onboarding.controller';
import { TransactionsController } from './transactions.controller';
import { AppService } from './app.service';
import { SharedModule } from 'src/shared/shared.module';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ONBOARDING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client:{
            clientId:'onboarding',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'onboarding-consumer',
          },
        },
      },
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client:{
            clientId:'notifications',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'notifications-consumer',
          },
        },
      },
      {
        name: 'TRANSACTIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client:{
            clientId:'transactions',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'transactions-consumer',
          },
        },
      },
    ]),
    SharedModule
  ],
  controllers: [OnboardingController,TransactionsController, NotificationsController],
  providers: [AppService],
})
export class AppModule {}
