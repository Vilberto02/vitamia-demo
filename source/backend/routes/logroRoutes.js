const express = require('express');
const router = express.Router();
const LogroControlador = require('../controllers/LogroControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener logros del usuario (desbloqueados y en progreso)
router.get('/', LogroControlador.obtenerLogrosUsuario);

module.exports = router;
