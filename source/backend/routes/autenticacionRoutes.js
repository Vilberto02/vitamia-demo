const express = require('express');
const router = express.Router();
const AutenticacionControlador = require('../controllers/AutenticacionControlador');
const verificarToken = require('../middlewares/autenticacion');

router.post('/registro', AutenticacionControlador.registro);
router.post('/login', AutenticacionControlador.login);
router.get('/me', verificarToken, AutenticacionControlador.obtenerUsuarioActual);

module.exports = router;
