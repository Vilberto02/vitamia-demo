const AlimentoModelo = require('../models/AlimentoModelo');

const AlimentoControlador = {
  async obtenerTodos(req, res) {
    try {
      const alimentos = await AlimentoModelo.obtenerTodos();
      
      // Agrupar por categoría
      const agrupados = {};
      alimentos.forEach(alimento => {
        const categoria = alimento.categoria || 'sin_categoria';
        if (!agrupados[categoria]) {
          agrupados[categoria] = [];
        }
        agrupados[categoria].push(alimento);
      });
      
      res.json(agrupados);
    } catch (err) {
      console.error('Error al obtener alimentos:', err);
      res.status(500).json({ error: 'Error al obtener alimentos', detalle: err.message });
    }
  },

  async obtenerPorNombre(req, res) {
    try {
      const { nombre } = req.params;
      const alimentos = await AlimentoModelo.obtenerPorNombre(nombre);
      res.json(alimentos);
    } catch (err) {
      console.error('Error al obtener alimentos por nombre:', err);
      res.status(500).json({ error: 'Error al obtener alimentos por nombre' });
    }
  }
};

module.exports = AlimentoControlador;