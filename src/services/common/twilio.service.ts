import config from '$config';
import { Injectable, Logger } from '@nestjs/common';
import twilio from 'twilio';

@Injectable()
export class TwilioService {
  private readonly logger: Logger = new Logger(TwilioService.name);
  private readonly client: twilio.Twilio;

  constructor() {
    this.client = twilio(config.ENV.TWILIO_SID, config.ENV.TWILIO_TOKEN);
  }

  async sendSMS(phone: string, code: string) {
    try {
      if (phone.startsWith('84')) phone = '+' + phone;
      if (phone.startsWith('0')) phone = '+84' + phone.substr(1);

      const from = config.ENV.TWILIO_PHONE_NUMBER;
      let body = `認証コードは${code}です。`;
      const sendSms = await this.client.messages.create({
        body,
        from,
        to: phone,
      });
      this.logger.log(`SEND SMS PHONE: ${phone} DONE | ID: ${sendSms.sid}`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
