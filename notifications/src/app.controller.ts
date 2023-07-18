import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('send_sms')
  async sendSms(smsData:any){
    return await this.appService.sendSms(smsData)
  }

  @MessagePattern('send_email')
  async sendEmail(smsData:any){
    return await this.appService.sendEmail(smsData)
  }
}
