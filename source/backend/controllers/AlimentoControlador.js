const AlimentoModelo = require('../models/AlimentoModelo');

const AlimentoControlador = {
  async obtenerTodos(req, res) {
    try {
      const alimentos = await AlimentoModelo.obtenerTodos();
      
      // Agrupar por tipo de comida
      const agrupados = {};
      alimentos.forEach(alimento => {
        const tipoNombre = alimento.tipo_comida?.nombre || 'sin_tipo';
        if (!agrupados[tipoNombre]) {
          agrupados[tipoNombre] = [];
        }
        agrupados[tipoNombre].push(alimento);
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
  },

  async obtenerPorTipoComida(req, res) {
    try {
      const { tipo } = req.params;
      const alimentos = await AlimentoModelo.obtenerPorTipoComida(tipo);
      res.json(alimentos);
    } catch (err) {
      console.error('Error al obtener alimentos por tipo de comida:', err);
      res.status(500).json({ error: 'Error al obtener alimentos por tipo de comida' });
    }
  }
};

module.exports = AlimentoControlador;

module.exports = AlimentoControlador;