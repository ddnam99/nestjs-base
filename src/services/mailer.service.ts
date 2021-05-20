import { Config } from 'mailer/config';
import { Injectable } from '@nestjs/common';
import { MAIL_SUCCESS } from '$utils/success';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from '$models/mail.dto';

@Injectable()
export class SendMaileService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: SendMailDto) {
    const { email, titleEmail, typeEmail } = data;
    await this.mailerService.sendMail({
      to: email,
      from: Config.EMAIL_FROM,
      subject: titleEmail,
      text: '',
      html: typeEmail,
    });
    return MAIL_SUCCESS.send;
  }
}
