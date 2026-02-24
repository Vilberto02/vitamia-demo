const express = require('express');
const router = express.Router();
const ConsumoControlador = require('../controllers/ConsumoControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener consumos del usuario autenticado (agrupados por tipo de comida)
router.get('/', ConsumoControlador.obtenerPorUsuario);

// Obtener todos los consumos (función admin)
router.get('/todos', ConsumoControlador.obtenerTodos);

// Obtener consumos del usuario autenticado en una fecha específica
router.get('/fecha/:fecha', ConsumoControlador.obtenerPorUsuarioYFecha);

// Obtener promedio de calorías por mes del usuario autenticado
router.get('/calorias', ConsumoControlador.obtenerCalorias);

// Agregar consumo
router.post('/', ConsumoControlador.agregarConsumo);

// Eliminar consumo
router.delete('/:id', ConsumoControlador.eliminarConsumo);

module.exports = router;