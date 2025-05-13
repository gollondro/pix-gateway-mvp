const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', express.json(), (req, res) => {
  console.log('📬 Webhook recibido:', req.body);
  const { transactionId, status } = req.body;

  const pendingPath = path.join(__dirname, '../db/pending.json');
  const paidPath = path.join(__dirname, '../db/paid.json');

  let pending = fs.existsSync(pendingPath) ? JSON.parse(fs.readFileSync(pendingPath)) : [];
  const paid = fs.existsSync(paidPath) ? JSON.parse(fs.readFileSync(paidPath)) : [];

  const idx = pending.findIndex(p => p.id === transactionId);
  if (idx !== -1 && status === 'PAID') {
    const record = pending.splice(idx, 1)[0];
    record.status = 'PAGADA';
    record.paid_at = new Date().toISOString();
    paid.push(record);

    fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
    fs.writeFileSync(paidPath, JSON.stringify(paid, null, 2));
    console.log('✅ Transacción marcada como pagada:', transactionId);
  } else {
    console.log('⚠️ No se encontró la transacción o estado no es PAID');
  }

  res.status(200).json({ received: true });
});

module.exports = router;
