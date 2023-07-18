import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import * as sgMail from '@sendgrid/mail';
    
    

@Injectable()
export class AppService {

  private accountSid = process.env.TWILIO_ACCOUNT_SID;
  private authToken = process.env.TWILIO_AUTH_TOKEN;
  private client = new Twilio(this.accountSid, this.authToken);
  private sgMail = sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  getHello(): string {
    return 'Hello World!';
  }

  async sendSms(smsData:any){
    console.log('Initiating SMS notification with SMS DATA : ', smsData)
    let smsBody:string;

    if (smsData.type === 'USER_CREATION_SMS'){
      smsBody = `Thank you ${smsData.userName} for registering. Welcome.`
    }
    try {
      this.client.messages
      .create({
        body: smsBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+${smsData.phoneNumber}`
      })
      .then(message => console.log('SMS notification response : ', message));

    } catch (error) {
      console.log('SMS notification error : ',error )    
    }

  }

  async sendEmail(emailData:any){
    console.log('Initiating EMAIL notification with EMAIL DATA : ', emailData)

    let emailBody:string;
    let msg = null;
    if (emailData.type === 'USER_CREATION_EMAIL'){
      emailBody = `Thank you ${emailData.userName} for registering, Welcome.`

      msg = {
        to: emailData.email , // Change to your recipient
        from: process.env.DEFAULT_SENDER_EMAIL,
        subject: 'ACCOUNT CREATION ',
        text: `${emailBody}`,
        html: `${emailBody}`,
      }
    }

    try {
      if(msg){
        sgMail
        .send(msg)
        .then((response) => {
          console.log('Email notification response : ', response[0])
        })
      }else{
        console.log('Email notification error : Message body is null')
      }
      
    } catch (error) {
      console.log('Email notification error : ', error)
      console.error(error)      
    }

      
    
  }
}



