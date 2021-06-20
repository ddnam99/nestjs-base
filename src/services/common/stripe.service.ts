import config from '$config';
import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger: Logger = new Logger(StripeService.name);
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.ENV.STRIPE_KEY, { apiVersion: '2020-08-27' });
  }

  async attachCard(
    custommerId: string,
    cardNumber: string,
    expMonth: number,
    expYear: number,
    cvc: string,
  ) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
      },
    });

    return await this.stripe.paymentMethods.attach(paymentMethod.id, { customer: custommerId });
  }

  async buy(customerId: string, paymentMethodId: string, amount: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount,
      currency: 'jpy',
      payment_method_types: ['card'],
      customer: customerId,
    });

    return await this.stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: paymentMethodId,
    });
  }

  async listPaymentMethod(customerId: string) {
    const paymentMethods = await this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods.data.map(item => {
      return {
        id: item.id,
        brand: item.card.brand,
        country: item.card.country,
        expMonth: item.card.exp_month,
        expYear: item.card.exp_year,
        funding: item.card.funding,
        last4: item.card.last4,
      };
    });
  }

  async deletePaymentMethod(customerId: string, paymentMethodId: string) {
    const paymentMethod = await this.stripe.paymentMethods.retrieve(paymentMethodId);

    if (paymentMethod.customer === customerId) {
      return await this.stripe.paymentMethods.detach(paymentMethodId);
    }
  }

  async setDefaultPaymentMethod(customerId: string, paymentMethodId: string) {
    const paymentMethod = await this.stripe.paymentMethods.retrieve(paymentMethodId);

    if (paymentMethod.customer === customerId) {
      return await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }
  }
}
