const express = require('express');
const router = express.Router();
const AutenticacionControlador = require('../controllers/AutenticacionControlador');
const verificarToken = require('../middlewares/autenticacion');

// Rutas públicas (sin autenticación)
// Registro de nuevo usuario
router.post('/registro', AutenticacionControlador.registro);

// Inicio de sesión
router.post('/login', AutenticacionControlador.login);

// Rutas protegidas (requieren autenticación)
// Obtener información del usuario actual
router.get('/me', verificarToken, AutenticacionControlador.obtenerUsuarioActual);

module.exports = router;
