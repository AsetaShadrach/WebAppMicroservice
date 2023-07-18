import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('create_user')
  async createUserCtr(data:any){
    console.log('Request to onboard user received by onboarding service')
    const resp = await this.appService.createUser(data);
    return resp
  }

  @MessagePattern('create_company')
  async createcompanyCtr(data:any){
    console.log('Request to onboard user received by onboarding service')
    return await this.appService.createcompany(data);
  }
}
