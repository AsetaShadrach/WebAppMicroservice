import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Company, Role, User } from 'kawaida';


const path = require('path')
console.log("THIS IS THE DIRECTORY =====" , path.join(__dirname, '../node_modules/kawaida/dist',  '/**/*.entity{.ts,.js}'))

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    // Find a way to add this to the shared npm package
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
          entities: [path.join(__dirname, '../node_modules/kawaida/dist',  '/**/*.entity{.ts,.js}')],
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          // entities: [KawaidaEntity.User, KawaidaEntity.Company, KawaidaEntity.Role, ]
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
    TypeOrmModule.forFeature([User.User, Company.Company, Role.Role]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
