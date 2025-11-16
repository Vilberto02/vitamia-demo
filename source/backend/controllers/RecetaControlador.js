const RecetaModelo = require('../models/RecetaModelo');

const RecetaControlador = {
  async obtenerTodas(req, res) {
    try {
      const recetas = await RecetaModelo.obtenerTodas();
      res.json(recetas);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener recetas' });
    }
  },
  async obtenerPorTipo(req, res) {
    try {
      const { tipo } = req.params;
      const recetas = await RecetaModelo.obtenerPorTipo(tipo);
      res.json(recetas);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener recetas por tipo' });
    }
  }
};

module.exports = RecetaControlador;
