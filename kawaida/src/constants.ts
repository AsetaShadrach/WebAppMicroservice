export class RegexEpressions {
  static readonly phoneNumberRegex = '^(254|0)[0-9]{9}$';
}

export class TRANSACTION_TYPES{
  static readonly BUY_FLOAT = "BUY_FLOAT";
  static readonly WALLET_TOP_UP = "WALLET_TOP_UP";
  static readonly AIRTIME_PURCHASE = "AIRTIME";
  static readonly SEND_MONEY = "SEND_MONEY";
  static readonly MPESA_PAYBILL = "PAYBILL";
  static readonly MPESA_TILL = "TILL";
  static readonly WALLET_PAYMENT = "WALLET_PAYMENT";
  static readonly WALLET_WITHDRAWAL = "WALLET_WITHDRAWAL";
  static readonly BANK_TRANSFER = "BANK_TRANSFER";
}

export class TRANSACTION_STATUS{
  static readonly INITIATED="INITIATED";
  static readonly STK_SENT="STATIC_SENT";
  static readonly SUCCESSFUL="SUCCESSFUL";
  static readonly PENDING="PENDING";
  static readonly FAILED="FAILED";
}
