const keys = require('../../config/keys');
console.log(keys.stripeSecretkey);
const stripe = require('stripe')(keys.stripeSecretkey);

// module.exports = app => {
//   app.post('/api/stripe', async (req, res) => {
//     // Create an actual charge from the token in the req.body
//     const charge = await stripe.charges.create({
//       amount: 500,
//       currency: 'usd',
//       source: req.body.id, // obtained with Stripe.js
//       description: '$5 for 5 email credits'
//     });
//
//     access current user model available on request object from passport
//     req.user.credits += 5;
//     const user = await req.user.save(); // When saving call the user model again(the updated one)
//     res.send(user);
//   });
// };

module.exports = app => {
  app.post('/api/stripe', (req, res) => {
    stripe.charges.create(
      {
        amount: 500,
        currency: 'usd',
        source: req.body.id, // obtained with Stripe.js
        description: '$5 for 5 email credits'
      },
      (err, charge) => {
        console.log('Error:', err);
        console.log('Charge:', charge);
      }
    );
  });
};
