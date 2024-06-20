const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, (req, res) => {
  res.send('Esta es una ruta privada');
});

module.exports = router;
