const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const paymentRoute = require('./routes/payment');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/payment', paymentRoute);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
