const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../db/paid.json');
  if (!fs.existsSync(filePath)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

module.exports = router;
