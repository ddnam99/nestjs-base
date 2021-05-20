import { Config } from './config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

const MailerRegister = MailerModule.forRoot({
  transport: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    // secureConnection: false,
    auth: Config.EMAIL_AUTH,
    ignoreTLS: true,
    debug: true,
  },
  defaults: {
    from: Config.EMAIL_FROM,
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
export { MailerRegister };
