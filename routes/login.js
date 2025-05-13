const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', express.json(), (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'));
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }

  res.json({
    success: true,
    renpix_email: user.renpix_email,
    renpix_password: user.renpix_password,
    merchant_id: user.merchant_id
  });
});

module.exports = router;
