const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretkey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    // Create an actual charge from the token in the req.body
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 dollars for 5 credits',
      source: req.body.id
    });

    console.log(charge);
  });
};
