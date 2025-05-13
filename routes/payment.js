const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const rendixApi = require('../services/rendixApi');

router.post('/', async (req, res) => {
  const { amountCLP, customer } = req.body;
  const rate = 880;
  const amountUSD = (amountCLP / rate).toFixed(2);
  const controlNumber = uuidv4();

  try {
    const qrData = await rendixApi.createPixCharge({ amountUSD, customer, controlNumber });

    const pendingFile = './db/pending.json';
    const pending = fs.existsSync(pendingFile) ? JSON.parse(fs.readFileSync(pendingFile)) : [];
    pending.push({
      id: controlNumber,
      email: customer.email,
      cpf: customer.cpf,
      name: customer.name,
      phone: customer.phone,
      amountCLP,
      amountUSD,
      date: new Date().toISOString(),
      status: "PENDIENTE"
    });
    fs.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

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
