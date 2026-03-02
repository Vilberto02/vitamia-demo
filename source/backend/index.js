const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const recetaRoutes = require('./routes/recetaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const alimentoRoutes = require('./routes/alimentoRoutes');
const consumoRoutes = require('./routes/consumoRoutes');
const autenticacionRoutes = require('./routes/autenticacionRoutes');
const informacionRoutes = require('./routes/informacionRoutes');
const recetaConsumidaRoutes = require('./routes/recetaConsumidaRoutes');
const planRoutes = require('./routes/planRoutes');
const logroRoutes = require('./routes/logroRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/recetas', recetaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api/consumos', consumoRoutes);
app.use('/api/auth', autenticacionRoutes);
app.use('/api/informacion', informacionRoutes);
app.use('/api/recetas-consumidas', recetaConsumidaRoutes);
app.use('/api/planes', planRoutes);
app.use('/api/logros', logroRoutes);


app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});