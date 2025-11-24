const express = require('express');
const router = express.Router();
const RecetaControlador = require('../controllers/RecetaControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener todas las recetas
router.get('/', RecetaControlador.obtenerTodas);

// Obtener recetas por tipo (desayuno, almuerzo, cena, snack)
router.get('/tipo/:tipo', RecetaControlador.obtenerPorTipo);

module.exports = router;
