// Creates (or reuses) a Stripe customer + a subscription with a 7-day
// trial, and returns the client secret of its pending SetupIntent so the
// browser can securely collect and save a card with Stripe Elements.
// Nothing is charged here - Stripe automatically charges the saved card
// when the 7-day trial ends, no separate scheduled job needed.
const Stripe = require('stripe');

const PRICE_ID = 'price_1Tpv3C7Aq3imi9AlYhmzCwCH'; // keep in sync with src/lib/site-config.ts

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let email;
  try {
    ({ email } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'A valid email is required' }) };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Payment setup is not configured' }) };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    const customer = existingCustomers.data[0] || (await stripe.customers.create({ email }));

    // Reuse an unconfirmed subscription for this customer/price rather
    // than creating a new one every time someone revisits this step.
    const existingSubs = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'incomplete',
      expand: ['data.pending_setup_intent'],
    });
    const reusable = existingSubs.data.find((s) => s.items.data.some((i) => i.price.id === PRICE_ID));

    if (reusable && reusable.pending_setup_intent && reusable.pending_setup_intent.status !== 'succeeded') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          clientSecret: reusable.pending_setup_intent.client_secret,
          subscriptionId: reusable.id,
          customerId: customer.id,
        }),
      };
    }

    // Already fully set up (e.g. they went back and re-submitted the same email).
    const activeSubs = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'trialing',
      limit: 1,
    });
    const alreadyActive = activeSubs.data.find((s) => s.items.data.some((i) => i.price.id === PRICE_ID));
    if (alreadyActive) {
      return {
        statusCode: 200,
        body: JSON.stringify({ alreadyConfirmed: true, subscriptionId: alreadyActive.id, customerId: customer.id }),
      };
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: PRICE_ID }],
      trial_period_days: 7,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['pending_setup_intent'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: subscription.pending_setup_intent.client_secret,
        subscriptionId: subscription.id,
        customerId: customer.id,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Could not set up payment' }) };
  }
};
