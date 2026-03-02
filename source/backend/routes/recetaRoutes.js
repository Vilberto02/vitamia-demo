const express = require('express');
const router = express.Router();
const RecetaControlador = require('../controllers/RecetaControlador');
const verificarToken = require('../middlewares/autenticacion');

router.use(verificarToken);

router.get('/', RecetaControlador.obtenerTodas.bind(RecetaControlador));
router.post('/tipo/:tipo', RecetaControlador.obtenerPorTipo.bind(RecetaControlador));

module.exports = router;