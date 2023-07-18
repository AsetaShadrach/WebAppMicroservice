import { Body, Controller, Inject, OnModuleInit, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class  NotificationsController{
  constructor(
    private readonly appService: AppService, 
    @Inject('NOTIFICATIONS_SERVICE') private readonly notificationsClient:ClientKafka   
    ) {}
}
