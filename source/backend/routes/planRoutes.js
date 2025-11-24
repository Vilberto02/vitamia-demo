const express = require('express');
const router = express.Router();
const PlanControlador = require('../controllers/PlanControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener todos los planes
router.get('/', PlanControlador.obtenerTodos);

// Obtener plan por ID
router.get('/:id', PlanControlador.obtenerPorId);

// Obtener planes del usuario autenticado
router.get('/mis-planes/usuario', PlanControlador.obtenerPlanesPorUsuario);

// Agregar plan a usuario autenticado (botón "añadir plan" para estadísticas)
router.post('/usuario', PlanControlador.agregarPlanUsuario);

// Eliminar plan de usuario
router.delete('/usuario/:id', PlanControlador.eliminarPlanUsuario);

module.exports = router;
