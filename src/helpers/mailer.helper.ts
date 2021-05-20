import config from '$config';
import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(config.ENV.SENDGRID_API_KEY);

export async function sendEmail(receiver: string, subject: string, content: string, html: string) {
  const msg = {
    to: receiver,
    from: config.ENV.SENDGRID_EMAIL, // Use the email address or domain you verified above
    subject: subject,
    text: content,
    html: html,
  };

  return await sgMail.send(msg);
}
