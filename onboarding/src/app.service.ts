import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClientKafka } from '@nestjs/microservices';
import { Company,User,Role,
CompanyDto,UserDto,GenericDto} from 'kawaida';

@Injectable()
export class AppService  {
  constructor(
    @InjectRepository(User.User)
    private userRepository: Repository<User.User>,
    @InjectRepository(Company.Company)
    private companyRepository: Repository<Company.Company>,
    @Inject('NOTIFICATIONS_SERVICE') private readonly notificationClient:ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // CREATE USER
  async createUser(user: UserDto.CreateUserRequestDto): Promise<UserDto.CreateUserResponseDto> {

    try {
      const hashedPassword = await bcrypt.hash(user.password, 17);
      const userPhoneNumber = `254${user.phoneNumber.slice(user.phoneNumber.length-9)}`
      const newUser = await this.userRepository.save({ ...user, passwordHash: hashedPassword , phoneNumber: userPhoneNumber });
      const response: UserDto.CreateUserResponseDto = {
        statusCode : 200,
        response: 'User successfully created',
        responseDescription: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          customerId: newUser.id,
        }
      }
  
      console.log('Response from customer creation : ', response);
      
      let notificationBody:any;
      notificationBody = {'userName': `${newUser.firstName} ${newUser.lastName}`, 'phoneNumber': newUser.phoneNumber}
      this.notificationClient.emit('send_sms', JSON.stringify({...notificationBody,  type:'USER_CREATION_SMS'}));
      notificationBody = {'userName': `${newUser.firstName} ${newUser.lastName}`, 'email': newUser.email}
      this.notificationClient.emit('send_email', JSON.stringify({...notificationBody,  type:'USER_CREATION_EMAIL'}));
      
      return response;
      
    } catch (error) {
      console.error('Error trying to create customer ', error)
      
      return {
        statusCode : 500,
        response: error.message,
        responseDescription: error.detail
      }
    }
    
  }


  // MOVE THIS TO ENTITY UPDATES 
  // Add user details to assigned company and company details to the user
  async initMatchUserAndcompany (userId:string, companyId:string, userRolesIncompany:Array<string>){
    const currentUser = await this.userRepository.findOne({ where: {id:userId} });
    const currentcompany = await this.companyRepository.findOne({ where: {id:companyId} });

    console.log(`Initiating complementary matching between : user: ${currentUser.id} and company: ${currentcompany.id} for roles: ${userRolesIncompany}`)
    
    const company = await this.companyRepository.findOne({ where: {id:currentcompany.id} })
    if(!company){
      return {
        statusCode : 400,
        response: 'company not found',
        responseDescription: `company with Id ${currentcompany.id} does not exist`
      }
    }

    currentUser.companyMembershipJson[currentcompany.id] = {
      'companyName': company.companyName,
      'roles': userRolesIncompany,
      'dateAdded': new Date(),
      'dateUpdated': new Date(),
    }
    
    const userDetailsForcompany = {
      'dateAdded': new Date(),
      'dateUpdated': new Date(),
    }
    
    currentcompany.members[currentUser.id] = userDetailsForcompany;

    // Signatory must be specified, someone might be an admin i.e set up the account but isn't allowed to sign off on funds transfer
    if ('SIGNATORY' in userRolesIncompany){
      currentcompany.members[currentUser.id] = userDetailsForcompany;
    }

    await this.userRepository.update(currentUser.id, {...currentUser});
    await this.companyRepository.update(currentcompany.id, {...currentcompany});

    console.log(`Finalized complementary matching between : user: ${currentUser.id} and company: ${currentcompany.id} for roles: ${userRolesIncompany}`);
    return true
  }
  
  // CREATE COMPANY
  async createcompany(companyBody: CompanyDto.CreateCompanyRequestDto): Promise<CompanyDto.CreateCompanyResponseDto | GenericDto.GenericResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: {id:companyBody.userId} }) 
      if (!user){
        return {
          statusCode : 404,
          response: 'User not found',
          responseDescription: `User with Id ${companyBody.userId} does not exist`
        }
      }else{

        const currentActions: CompanyDto.RecentActionsDto = {
            'userId': user.id,
            'name': user.firstName,
            'action':'Created company',
        }    
        if(companyBody.members && companyBody.members.length>0){
          // Confirm members are users
          for(const email of companyBody.members){
            const user = await this.userRepository.findOne({ where: {email:email} }) 
            if (!user){
              return {
                statusCode : 404,
                response: 'User not found',
                responseDescription: `User with Id ${companyBody.userId} does not exist`
              }  
            } 
          }      
        }

        if(companyBody.signatories && companyBody.signatories.length>0){
          // Confirm signatories are users
          const user = await this.userRepository.findOne({ where: {id:companyBody.userId} }) 
          if (!user){
            return {
              statusCode : 400,
              response: 'User not found',
              responseDescription: `User with Id ${companyBody.userId} does not exist`
            }
          }
        }

        let newcompany:any = {
          companyName : companyBody.companyName,
          primaryEmail : user.email,
          members : companyBody.members || null,
          signatories : companyBody.signatories || null,
          recentActions : {[new Date().toISOString()] :currentActions}
        }

        newcompany = await this.companyRepository.save({ ...newcompany});
        const response = {
          statusCode : 200,
          response: 'company succesfully created',
          responseDescription: {
            customerId: companyBody.userId, // Id of the user that created te company
            companyId: newcompany.id,
            name: newcompany.companyName,
          }
        }

        console.log('Response from company creation : ', response)
        return response;
      }
        
    } catch (error: any) {
      console.error('Error trying to create company ', error)
      
      return {
        statusCode : 500,
        response: error.message,
        responseDescription: error.detail
      }
    }
  }

  // async createConfig(configBody: any): Promise<any> {};
}
