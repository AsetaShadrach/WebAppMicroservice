import { IsNotEmpty } from 'class-validator';

export class InitiateTransactionRequestDto{
    @IsNotEmpty()
    transferType: string;

    @IsNotEmpty()
    amount: string;

    @IsNotEmpty()
    accountFrom: string;

    @IsNotEmpty()
    accountTo: string;

    @IsNotEmpty()
    initiatedBy:string; // User id of the user that initiated it for the sake of companies

    signatories: Array<string>;

    companyId:string;    
}