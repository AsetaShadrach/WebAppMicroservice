import { Body, Controller, Get, Inject, OnModuleInit, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { InitiateTransactionRequestDto } from './shared/dto/transaction.dto';

@Controller()
export class  TransactionsController{
  constructor(
    private readonly appService: AppService, 
    @Inject('TRANSACTIONS_SERVICE') private readonly transactionClient:ClientKafka   
    ) {}

  onModuleInit() {
    this.transactionClient.subscribeToResponseOf('initate_transaction');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // TRANSACTIONS

  @Post('transaction/initiate')
  initiateTransaction(@Body() initiateTransactionRequestBody:InitiateTransactionRequestDto){
    console.log("Initiating user transaction : ", { ...initiateTransactionRequestBody})
    return this.appService.initiateTransaction(initiateTransactionRequestBody);
  }

//   @Post('transaction/callback/<transactionId>')
//   processTransactionCallback(@Body() transactionCallbackBody:any){
//     console.log("Initiating transaction callback processing : ", { ...transactionCallbackBody})
//     return this.appService.processTransactionCallback(transactionCallbackBody);
//   }

//   @Post('transaction/process/manual')
//   processTransactionManually(@Body() manualTransactionRequestBody:manualTransactionRequestDto){
//     console.log("Initiating manuall transaction processing : ", { ...manualTransactionRequestBody})
//     return this.appService.processTransactionManually(manualTransactionRequestBody);
//   }

}
