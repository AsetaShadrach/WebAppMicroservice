import { GenericResponseDto } from './generic.dto'
import { IsDefined, IsEmail, IsIn, IsNotEmpty, Matches } from 'class-validator';
import { RegexEpressions } from '../constants'

export class CreateUserRequestDto{
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    idNumber: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @Matches(RegexEpressions.phoneNumberRegex)
    phoneNumber: string;

    roles: Array<any>;
    companyId: string;
}

export class CustomerCreationResponse{
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    customerId: string;
    token?: string;
}

export class CreateUserResponseDto extends GenericResponseDto{
    responseDescription: CustomerCreationResponse;    
}
