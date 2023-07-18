import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transactions } from './shared/entities/transaction.entity';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
          type: configService.get('TYPEORM_TYPE') as any,
          host: configService.get<string>('TYPEORM_HOST'),
          port: configService.get<number>('TYPEORM_PORT'),
          username: configService.get<string>('TYPEORM_USERNAME'),
          password: configService.get<string>('TYPEORM_PASSWORD'),
          database: configService.get<string>('TYPEORM_DATABASE'),
          synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
          logging: configService.get<boolean>('TYPEORM_LOGGING'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    ClientsModule.register([
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
    ]),
    TypeOrmModule.forFeature([Transactions]),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
