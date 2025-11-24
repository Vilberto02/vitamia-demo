const express = require('express');
const router = express.Router();
const RecetaConsumidaControlador = require('../controllers/RecetaConsumidaControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener todas las recetas consumidas
router.get('/', RecetaConsumidaControlador.obtenerTodas);

// Obtener recetas consumidas del usuario autenticado
router.get('/mis-recetas', RecetaConsumidaControlador.obtenerPorUsuario);

// Obtener recetas consumidas por fecha
router.get('/fecha/:fecha', RecetaConsumidaControlador.obtenerPorFecha);

// Agregar receta consumida
router.post('/', RecetaConsumidaControlador.agregarRecetaConsumida);

// Eliminar receta consumida
router.delete('/:id', RecetaConsumidaControlador.eliminarRecetaConsumida);

module.exports = router;
