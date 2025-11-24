const express = require('express');
const router = express.Router();
const InformacionControlador = require('../controllers/InformacionControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener toda la información nutricional
router.get('/', InformacionControlador.obtenerTodas);

// Obtener información nutricional por ID
router.get('/:id', InformacionControlador.obtenerPorId);

module.exports = router;
