const express = require('express');
const router = express.Router();
const PlanControlador = require('../controllers/PlanControlador');
const verificarToken = require('../middlewares/autenticacion');

router.use(verificarToken);

router.get('/', PlanControlador.obtenerTodos);
router.get('/:id', PlanControlador.obtenerPorId);
router.get('/mis-planes/usuario', PlanControlador.obtenerPlanesPorUsuario);
router.post('/usuario', PlanControlador.agregarPlanUsuario);
router.delete('/usuario/:id', PlanControlador.eliminarPlanUsuario);

module.exports = router;
