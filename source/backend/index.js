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

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/recetas', recetaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api/consumos', consumoRoutes);
app.use('/api/auth', autenticacionRoutes);
app.use('/api/informacion', informacionRoutes);
app.use('/api/recetas-consumidas', recetaConsumidaRoutes);
app.use('/api/planes', planRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});
