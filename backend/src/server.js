require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));


app.post('/api/create-checkout-session', async (req, res) => {

  try {
    
    const {items} = req.body

      if (!items?.length){
      return res.status(400).json({error: "Carrinho vazio"})
    }

    const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        //  Price ID of the product
        price: 'price_1Sx9ygAjHi7WKjcWSS2W4PK9',
        quantity: 1
      },
    ],
    success_url: `${process.env.DOMAIN_URL}:${process.env.WEB_PORT}/return.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN_URL}:${process.env.WEB_PORT}/index.html`,
  });

  res.send({url: session.url});



  } catch (err) {
    console.error("create-checkout-session route error: ", err);
    return res.status(500).json({error: err.message})
  }
  
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(process.env.API_PORT, () => {
  console.log("Ouvindo na porta: ", process.env.API_PORT)
});