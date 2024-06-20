const express = require('express');
const { registerUser, loginUser, refreshAccessToken } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);

module.exports = router;
