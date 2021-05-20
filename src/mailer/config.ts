export const Config = {
  FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
  EMAIL_FROM: '"Team Xin" <no-reply@domain.app>',

  EMAIL_AUTH: {
    user: process.env.MAIL_USER || 'noreplyneedemail@gmail.com',
    pass: process.env.MAIL_PASS || 'noreply@mailer',
  },
};
