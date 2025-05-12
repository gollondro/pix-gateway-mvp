const express = require('express');
const router = express.Router();
const fs = require('fs');
const rendixApi = require('../services/rendixApi');

router.post('/', async (req, res) => {
  const { amountCLP, customer } = req.body;
  const rate = JSON.parse(fs.readFileSync('./db/rate.json')).rate;
  const amountUSD = (amountCLP / rate).toFixed(2);

  try {
    const qrData = await rendixApi.createPixCharge({ amountUSD, customer });

    res.json({
      success: true,
      qrData,
      amountUSD,
      rateCLPperUSD: rate,
      vetTax: qrData.vetTax,
      amountBRL: qrData.priceNationalCurrency
    });
  } catch (err) {
    console.error('Error al generar QR:', err.response?.data || err.message);
    res.status(500).json({ success: false, error: 'Error generando QR' });
  }
});

module.exports = router;
