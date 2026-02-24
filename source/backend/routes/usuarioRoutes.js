const express = require('express');
const router = express.Router();
const UsuarioControlador = require('../controllers/UsuarioControlador');
const verificarToken = require('../middlewares/autenticacion');

/**
 * Rutas de Usuarios
 * Todas las rutas requieren autenticación JWT
 */

// Aplicar middleware de autenticación a todas las rutas
router.use(verificarToken);

// Obtener información general del usuario autenticado
// IMPORTANTE: Rutas específicas deben ir antes de /:nombre para evitar conflictos
router.get('/general', UsuarioControlador.obtenerInformacionGeneral);

// Obtener todos los usuarios
router.get('/', UsuarioControlador.obtenerUsuarios);

// Obtener usuario por nombre
router.get('/:nombre', UsuarioControlador.obtenerPorNombre);

module.exports = router;