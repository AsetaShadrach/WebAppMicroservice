import { IsNotEmpty } from 'class-validator';

export class  GenericResponseDto{
    @IsNotEmpty()
    statusCode : number;

    @IsNotEmpty()
    response: string;

    @IsNotEmpty()
    responseDescription: any;
}
