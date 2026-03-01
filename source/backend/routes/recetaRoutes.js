const express = require('express');
const router = express.Router();
const RecetaControlador = require('../controllers/RecetaControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener todas las recetas
router.get('/', RecetaControlador.obtenerTodas.bind(RecetaControlador));

// Generar recetas con IA basadas en alimentos proporcionados desde el frontend
// POST body: { alimentos: [{ nombre, categoria, cantidad?, unidad? }] }
// Requiere mínimo 3 alimentos para generar con OpenAI
router.post('/tipo/:tipo', RecetaControlador.obtenerPorTipo.bind(RecetaControlador));

module.exports = router;