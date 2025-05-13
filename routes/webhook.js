const express = require('express');
const router = express.Router();

router.post('/', express.json(), (req, res) => {
  console.log('📬 Webhook recibido:', req.body);
  res.status(200).json({ received: true });
});

module.exports = router;
