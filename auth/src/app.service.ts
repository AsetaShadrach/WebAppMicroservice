import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  generateOtp(otpLength:number):string {
    let otp = ""
    const otpLetters = ["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ", "123456789" ,"@#$%()/*"]

    for(var i=0; i<otpLength; i++){
      const charList = otpLetters[Math.floor(Math.random()* otpLetters.length)]
      otp += charList.charAt(Math.floor(Math.random()* charList.length))
    }

    return otp
  }

  verifyOtp(userId:string,otp:string, otpType:string): boolean{
    return true

  }

  loginUser(loginRequest:any): any{

  }
}


