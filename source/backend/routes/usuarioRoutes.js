const express = require('express');
const router = express.Router();
const UsuarioControlador = require('../controllers/UsuarioControlador');
const verificarToken = require('../middlewares/autenticacion');

router.use(verificarToken);

router.get('/general', UsuarioControlador.obtenerInformacionGeneral);
router.get('/', UsuarioControlador.obtenerUsuarios);
router.get('/:nombre', UsuarioControlador.obtenerPorNombre);

module.exports = router;