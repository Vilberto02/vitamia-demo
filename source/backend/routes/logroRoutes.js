const express = require('express');
const router = express.Router();
const LogroControlador = require('../controllers/LogroControlador');
const verificarToken = require('../middlewares/autenticacion');

router.use(verificarToken);

router.get('/', LogroControlador.obtenerLogrosUsuario);

module.exports = router;
