const express = require('express');
const router = express.Router();
const ConsumoControlador = require('../controllers/ConsumoControlador');
const verificarToken = require('../middlewares/autenticacion');

router.use(verificarToken);

router.get('/', ConsumoControlador.obtenerPorUsuario);
router.get('/todos', ConsumoControlador.obtenerTodos);
router.get('/fecha/:fecha', ConsumoControlador.obtenerPorUsuarioYFecha);
router.get('/calorias', ConsumoControlador.obtenerCalorias);
router.post('/', ConsumoControlador.agregarConsumo);
router.delete('/:id', ConsumoControlador.eliminarConsumo);

module.exports = router;