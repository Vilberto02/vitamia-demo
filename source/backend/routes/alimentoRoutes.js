const express = require('express');
const router = express.Router();
const AlimentoControlador = require('../controllers/AlimentoControlador');
const verificarToken = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener todos los alimentos (agrupados por tipo de comida)
router.get('/', AlimentoControlador.obtenerTodos);

// Obtener alimentos por tipo de comida (desayuno, almuerzo, cena, snack)
router.get('/tipo/:tipo', AlimentoControlador.obtenerPorTipoComida);

// Obtener alimentos por nombre
router.get('/nombre/:nombre', AlimentoControlador.obtenerPorNombre);

module.exports = router;
