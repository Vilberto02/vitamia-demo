const express = require('express');
const cors = require('cors');
require('dotenv').config();

const recetaRoutes = require('./routes/recetaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/recetas', recetaRoutes);
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});
