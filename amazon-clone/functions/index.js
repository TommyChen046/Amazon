const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const { response } = require("express");
const stripe = require('stripe')('sk_test_51KF2UELhfVwZHjibOm37pIJQ6lntF3cmbBfT1oZK1p9BBuwLT6ixjOrqF6CW4EN4MvGYDurPxKdg4mM8WMnttHCC00Ang1DPzj'); //secret_key

// To set an API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true })) //cors is a security
app.use(express.json()); //allows us to send or pass data in json format

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total; // = url: `/payments/create?total=${getBasketTotal(basket) * 100}` in Payment.js
    console.log(' Payment Request Recieved BOOM!!! for this amount >>> ', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: 'usd',
    })
    // 201 means OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret, //we got from stripe.paymentIntents
    })
})

// - Listen command
exports.api = functions.https.onRequest(app)