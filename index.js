// const express = require('express');
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');

// dotenv.config();

// const publicRoutes = require('./routes/publicRoutes');
// const privateRoutes = require('./routes/privateRoutes');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// app.use(express.json());

// connectDB();

// app.use('/api/public', publicRoutes);  //ruta publica.
// app.use('/api/auth', authRoutes); //ruta de procesos.
// app.use('/api/private', privateRoutes);//ruta privada.

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');  // Importa el paquete cors

dotenv.config();

const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Habilitar CORS para todas las rutas
app.use(cors());

connectDB();

app.use('/api/public', publicRoutes);  // Ruta pública
app.use('/api/auth', authRoutes);      // Ruta de procesos
app.use('/api/private', privateRoutes); // Ruta privada

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
