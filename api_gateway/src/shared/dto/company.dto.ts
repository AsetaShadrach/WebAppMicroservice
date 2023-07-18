import { GenericResponseDto } from './generic.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateCompanyRequestDto{
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    companyName: string;
    
    members?: any;
    requireSignatories?: boolean;
    signatories?: any;
}

export class companyCreationResponse{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    companyId: string;

}
export class CreateCompanyResponseDto extends GenericResponseDto{
    @IsNotEmpty()
    responseDescription: companyCreationResponse;  
}

export class recentActionsDto{
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    action: string;
}

