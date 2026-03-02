const express = require('express');
const router = express.Router();
const AlimentoControlador = require('../controllers/AlimentoControlador');
const verificarToken = require('../middlewares/autenticacion');

router.use(verificarToken);

router.get('/', AlimentoControlador.obtenerTodos);
router.get('/nombre/:nombre', AlimentoControlador.obtenerPorNombre);

module.exports = router;
