const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', express.json(), (req, res) => {
  console.log('📬 Webhook recibido:', req.body);

  const pagosFile = path.join(__dirname, '../db/pagos.json');
  const nuevoPago = {
    ...req.body,
    timestamp: new Date().toISOString()
  };

  // Leer archivo actual o iniciar con array vacío
  let historial = [];
  if (fs.existsSync(pagosFile)) {
    try {
      const contenido = fs.readFileSync(pagosFile, 'utf-8');
      historial = JSON.parse(contenido);
    } catch (error) {
      console.error('❌ Error leyendo pagos.json:', error);
    }
  }

  historial.push(nuevoPago);

  try {
    fs.writeFileSync(pagosFile, JSON.stringify(historial, null, 2));
    console.log('✅ Pago registrado en pagos.json');
  } catch (error) {
    console.error('❌ Error guardando pago:', error);
  }

  res.status(200).json({ received: true });
});

module.exports = router;
