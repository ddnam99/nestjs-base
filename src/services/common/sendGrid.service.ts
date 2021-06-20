import config from '$config';
import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

@Injectable()
export class SendGridService {
  private readonly logger: Logger = new Logger(SendGridService.name);
  private readonly sendGrid: sgMail.MailService;

  constructor() {
    sgMail.setApiKey(config.ENV.SENDGRID_API_KEY);
    this.sendGrid = sgMail;
  }

  async sendEmail(receiver: string, subject: string, content: string, html: string) {
    const msg = {
      to: receiver,
      from: config.ENV.SENDGRID_EMAIL, // Use the email address or domain you verified above
      subject: subject,
      text: content,
      html: html,
    };

    return await this.sendGrid.send(msg);
  }
}
