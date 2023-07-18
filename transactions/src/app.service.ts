import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TRANSACTION_STATUS, TRANSACTION_TYPES } from './shared/constants';
import { InitiateTransactionRequestDto } from './shared/dto/transaction.dto';
import { Transactions } from './shared/entities/transaction.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Transactions)
    public transactionsRepository: Repository<Transactions>
  ){}
    
  getHello(): string {
    return 'Hello World!';
  }

  // Use this to generate to generate tracking codes (bulk and individual)
  async generateTackingCode(type:string){
    const generatedCode = "lllllllllllll"; // Change this to a function that generates random codes
    if (await this.transactionsRepository.findOne({[type]: generatedCode})){
      await this.generateTackingCode(type);
    }else{
      return generatedCode
    }
  }

  async initiateTransaction(createTransactionBody:InitiateTransactionRequestDto) {

    const txnDate = new Date()
    const txnTrackingCode =await this.generateTackingCode("trackingCode");
    const txnBody:any = {
      ...createTransactionBody,
      trackingCode: txnTrackingCode,
      status: TRANSACTION_STATUS.INITIATED,
      createdAt: txnDate,
      updatedAt: txnDate,
    }
    // Add implementation for bulk transaction
    await this.transactionsRepository.save({...txnBody})

  }
}
