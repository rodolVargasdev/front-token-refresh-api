const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Esta es una ruta pública');
});

module.exports = router;
