const express = require('express');
const router = express.Router();
const UsuarioControlador = require('../controllers/UsuarioControlador');

// Obtener todos los usuarios
router.get('/', UsuarioControlador.obtenerUsuarios);

// Obtener usuario por nombre
router.get('/:nombre', UsuarioControlador.obtenerPorNombre);

module.exports = router;