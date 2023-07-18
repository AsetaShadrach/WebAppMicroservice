import { Body, Controller, Get, Inject, OnModuleInit, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserRequestDto, CreateUserResponseDto } from 'src/shared/dto/user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { CreateCompanyRequestDto } from './shared/dto/company.dto';

@Controller()
export class OnboardingController{
  constructor(
    private readonly appService: AppService, 
    @Inject('ONBOARDING_SERVICE') private readonly onboardingClient:ClientKafka   
    ) {}

  onModuleInit() {
    this.onboardingClient.subscribeToResponseOf('create_user');
    this.onboardingClient.subscribeToResponseOf('create_company');
    this.onboardingClient.subscribeToResponseOf('create_transaction');
    this.onboardingClient.subscribeToResponseOf('create_config');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // ONBOARDING

  // Create user
  @Post('user/create')
  createUser(@Body() createUserRequest:CreateUserRequestDto){
    console.log("Initiating user creation for : ", { ...createUserRequest, password:'*******'})
    return this.appService.createUser(createUserRequest);
  }

  // Create company
  @Post('company/create')
  createcompany(@Body() createcompanyRequest:CreateCompanyRequestDto){
    console.log("Initiating company creation for : ", { ...createcompanyRequest})
    return this.appService.createcompany(createcompanyRequest);
  }

  // // Create config
  // @Post('configs/create')
  // createConfig(@Body() createTransactionRequest:InitiateTransactionRequestDto){
  //   console.log("Initiating config creation : ", { ...createTransactionRequest})
  //   return this.appService.createConfig(createTransactionRequest);
  // }

  
  // // UPDATE ENTITIES  

  // // Updating configs
  // @Post('config/update')
  // updateConfig(@Body() updateConfigRequest:CreateUserRequestDto){
  //   console.log("Initiating user transaction : ", { ...createTransactionRequest})
  //   return this.appService.processTransactionCallback(createTransactionRequest);
  // }

  // // Turning services on or off
  // @Post('service/switch')
  // switchService(@Body() switchServiceRequestBody:CreateUserRequestDto){
  //   console.log("Initiating user transaction : ", { ...switchServiceRequestBody})
  //   return this.appService.switchService(switchServiceRequestBody);
  // }

}
