import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserRequestDto, CreateUserResponseDto } from 'src/shared/dto/user.dto';
import { CreateCompanyRequestDto } from 'src/shared/dto/company.dto';
import { ClientKafka } from '@nestjs/microservices';
import { InitiateTransactionRequestDto } from './shared/dto/transaction.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('ONBOARDING_SERVICE') private readonly onboardingClient:ClientKafka,
    @Inject('TRANSACTIONS_SERVICE') private readonly transactionClient:ClientKafka,
    @Inject('NOTIFICATIONS_SERVICE') private readonly notificationClient:ClientKafka,
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  sendSms(smsData:any){
    this.notificationClient.send('send_sms', JSON.stringify(smsData));
  };

  sendEmail(emailData:any){   
    this.notificationClient.send('send_email', JSON.stringify({emailData}));
  };

  createUser(createUserRequestBody: CreateUserRequestDto){
    const resp:any = this.onboardingClient.send('create_user', JSON.stringify(createUserRequestBody));
    return resp
  };

  createcompany(createcompanyRequestBody: CreateCompanyRequestDto){
    const resp:any = this.onboardingClient.send('create_company', JSON.stringify(createcompanyRequestBody));
    
    if(resp.statusCode == 200){
      const notificationBody = {
        customerId: resp.responseDescription.customerId, 
        companyId: resp.responseDescription.companyId,
      }

      this.notificationClient.send('send_sms', JSON.stringify({...notificationBody,type:'company_CREATION_SMS'}));
      this.notificationClient.send('send_email', JSON.stringify({...notificationBody,type:'company_CREATION_EMAIL'}));
    }
    return resp;
  };

  initiateTransaction(initiateTransactionRequestBody: InitiateTransactionRequestDto){
    return this.transactionClient.send('initiate_transaction', JSON.stringify(initiateTransactionRequestBody));
  };
}
