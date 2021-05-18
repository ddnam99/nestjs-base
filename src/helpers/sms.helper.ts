import config from "$config";
import { Logger } from "@nestjs/common";

const logger = new Logger('SMS')

let client = null;

export async function sendSMS(phone: string, code: string) {
    try {
        client = client ? client : require('twilio')(config.ENV.TWILIO_SID, config.ENV.TWILIO_TOKEN);

        if (phone.startsWith('84')) phone = '+' + phone;
        if (phone.startsWith('0')) phone = '+84' + phone.substr(1);

        const from = config.ENV.TWILIO_PHONE_NUMBER;
        let body = `認証コードは${code}です。`;
        const sendSms = await client.messages.create({
            body,
            from,
            to: phone,
        });
        logger.log(`SEND SMS PHONE: ${phone} DONE | ID: ${sendSms.sid}`);
    } catch (error) {
        logger.error(error);
    }
}
