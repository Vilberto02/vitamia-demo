const InformacionModelo = require('../models/InformacionModelo');

const InformacionControlador = {
  async obtenerTodas(req, res) {
    try {
      const informacion = await InformacionModelo.obtenerTodas();
      res.json(informacion);
    } catch (err) {
      console.error('Error al obtener información nutricional:', err);
      res.status(500).json({ error: 'Error al obtener información nutricional' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const informacion = await InformacionModelo.obtenerPorId(id);
      
      if (!informacion) {
        return res.status(404).json({ error: 'Información no encontrada' });
      }
      
      res.json(informacion);
    } catch (err) {
      console.error('Error al obtener información por id:', err);
      res.status(500).json({ error: 'Error al obtener información' });
    }
  }
};

module.exports = InformacionControlador;
