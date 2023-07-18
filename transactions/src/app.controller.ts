import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('initiate_transaction')
  async initiateTransaction(data:any){
    console.log('Request to initiate transaction received by transaction service')
    return await this.appService.initiateTransaction(data)
  }
}
