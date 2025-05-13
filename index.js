const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const paymentRoute = require('./routes/payment');
const webhookRoute = require('./routes/webhook');
const loginRoute = require('./routes/login');
const pendingRoute = require('./routes/pending');
const paidRoute = require('./routes/paid');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/payment', paymentRoute);
app.use('/api/webhook', webhookRoute);
app.use('/api/login', loginRoute);
app.use('/api/pending', pendingRoute);
app.use('/api/paid', paidRoute);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
