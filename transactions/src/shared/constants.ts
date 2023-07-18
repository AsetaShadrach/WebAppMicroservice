import { Injectable } from '@nestjs/common';

export class RegexEpressions {
    static readonly phoneNumberRegex = '^(254|0)[0-9]{9}$';
}

export class TRANSACTION_TYPES{
  BUY_FLOAT = "BUY_FLOAT";
  WALLET_TOP_UP = "WALLET_TOP_UP";
  AIRTIME_PURCHASE = "AIRTIME";
  SEND_MONEY = "SEND_MONEY";
  MPESA_PAYBILL = "PAYBILL";
  MPESA_TILL = "TILL";
  WALLET_PAYMENT = "WALLET_PAYMENT";
  WALLET_WITHDRAWAL = "WALLET_WITHDRAWAL";
  BANK_TRANSFER = "BANK_TRANSFER";
}

export class TRANSACTION_STATUS{
  static INITIATED="INITIATED";
  static STK_SENT="STATIC_SENT";
  static SUCCESSFUL="SUCCESSFUL";
  static PENDING="PENDING";
  static FAILED="FAILED";
}

@Injectable()
export class ConstantsService {
  getHello(): string {
    return 'Hello World!';
  }

  RegexEpressionsClass = new RegexEpressions();
}
