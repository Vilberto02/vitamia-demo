const express = require('express');
const router = express.Router();
const RecetaControlador = require('../controllers/RecetaControlador');

// Obtener todas las recetas
router.get('/', RecetaControlador.obtenerTodas);

// Obtener recetas por tipo (desayuno, almuerzo, cena, snack)
router.get('/:tipo', RecetaControlador.obtenerPorTipo);

module.exports = router;
