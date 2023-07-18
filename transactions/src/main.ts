import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootsrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport:Transport.KAFKA,
      options:{
        client:{
          brokers: ['localhost:9092'],
        },
        consumer:{
          groupId: 'transactions-consumer',
        },
      },
    },
  );

  await app.listen();
  
}
bootsrap()