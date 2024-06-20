const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1m', 
  });
};
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d', 
  });
};
// Registro de usuarios
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
//Login 
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
//refresh del token
const refreshAccessToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no hay token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.id);

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Token de refresco no válido' });
  }
};

module.exports = { registerUser, loginUser, refreshAccessToken };
