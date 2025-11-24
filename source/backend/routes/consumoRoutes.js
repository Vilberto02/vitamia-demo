const express = require('express');
const router = express.Router();
const ConsumoControlador = require('../controllers/ConsumoControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener todos los consumos
router.get('/', ConsumoControlador.obtenerConsumos);

// Obtener consumos del usuario autenticado (agrupados por fecha y tipo de comida)
router.get('/mis-consumos', ConsumoControlador.obtenerPorUsuario);

// Obtener consumos del usuario autenticado en fecha específica
router.get('/fecha/:fecha', ConsumoControlador.obtenerPorUsuarioYFecha);

// Agregar consumo
router.post('/', ConsumoControlador.agregarConsumo);

// Eliminar consumo
router.delete('/:id', ConsumoControlador.eliminarConsumo);

module.exports = router;