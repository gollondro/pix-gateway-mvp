const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

let token = null;

async function authenticate() {
  const res = await axios.post(`${process.env.RENPIX_API_URL}/login`, {
    email: process.env.RENPIX_EMAIL,
    password: process.env.RENPIX_PASSWORD
  }, {
    headers: { 'Content-Type': 'application/json' }
  });

  token = res.data.data.token;
  return token;
}

async function createPixCharge({ amountUSD, customer }) {
  if (!token) await authenticate();

  const res = await axios.post(`${process.env.RENPIX_API_URL}/sell`, {
    merchantId: Number(process.env.RENPIX_MERCHANT_ID),
    purchase: Number(amountUSD),
    cpf: customer.cpf,
    controlNumber: uuidv4(),
    phone: customer.phone,
    email: customer.email,
    webhook: process.env.RENPIX_WEBHOOK,
    currencyCode: 'USD',
    operationCode: 1,
    beneficiary: customer.name
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return res.data.data;
}

module.exports = { createPixCharge };
