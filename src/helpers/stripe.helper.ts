import config from '$config';
import Stripe from 'stripe';

const stripe = new Stripe(config.ENV.STRIPE_KEY, { apiVersion: '2020-08-27' });

export async function attachCard(
  custommerId: string,
  cardNumber: string,
  expMonth: number,
  expYear: number,
  cvc: string,
) {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    },
  });

  return await stripe.paymentMethods.attach(paymentMethod.id, { customer: custommerId });
}

// export async function addCard() {
//     return await stripe.paymentMethods.create({
//         type: 'card',
//         card: {
//             number: '4242424242424242',
//             exp_month: 6,
//             exp_year: 2021,
//             cvc: '314',
//         }
//     })
// }

export async function buy(customerId: string, paymentMethodId: string, amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'jpy',
    payment_method_types: ['card'],
    customer: customerId,
  });

  return await stripe.paymentIntents.confirm(paymentIntent.id, { payment_method: paymentMethodId });
}

export async function listPaymentMethod(customerId: string) {
  const paymentMethods = await stripe.paymentMethods.list({ customer: customerId, type: 'card' });

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

export async function deletePaymentMethod(customerId: string, paymentMethodId: string) {
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

  if (paymentMethod.customer === customerId) {
    return await stripe.paymentMethods.detach(paymentMethodId);
  }

  return null;
}

export async function setDefaultPaymentMethod(customerId: string, paymentMethodId: string) {
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

  if (paymentMethod.customer === customerId) {
    return await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
  }

  return null;
}
