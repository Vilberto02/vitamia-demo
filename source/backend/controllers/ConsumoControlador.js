const ConsumoModelo = require('../models/ConsumoModelo');

const ConsumoControlador = {
  async obtenerConsumos(req, res) {
    try {
      const consumos = await ConsumoModelo.obtenerTodos();
      res.json(consumos);
    } catch (err) {
      console.error('Error al obtener consumos:', err);
      res.status(500).json({ error: 'Error al obtener consumos' });
    }
  },

  async obtenerPorFecha(req, res) {
    try {
      const { fecha } = req.params;
      const consumos = await ConsumoModelo.obtenerPorFecha(fecha);
      res.json(consumos);
    } catch (err) {
      console.error('Error al obtener consumos por fecha:', err);
      res.status(500).json({ error: 'Error al obtener consumos por fecha' });
    }
  },

  async obtenerPorUsuario(req, res) {
    try {
      // Usar el ID del usuario autenticado del token
      const consumos = await ConsumoModelo.obtenerPorUsuario(req.usuario.id);
      
      // Agrupar por fecha y tipo de comida para mejor visualización
      const consumosAgrupados = consumos.reduce((acc, consumo) => {
        const fechaKey = consumo.fecha.toISOString().split('T')[0];
        if (!acc[fechaKey]) {
          acc[fechaKey] = {
            desayuno: [],
            almuerzo: [],
            cena: [],
            snack: []
          };
        }
        const tipoComida = consumo.tipo_comida?.nombre || 'sin_tipo';
        if (acc[fechaKey][tipoComida]) {
          acc[fechaKey][tipoComida].push(consumo);
        }
        return acc;
      }, {});
      
      res.json(consumosAgrupados);
    } catch (err) {
      console.error('Error al obtener consumos por usuario:', err);
      res.status(500).json({ error: 'Error al obtener consumos por usuario' });
    }
  },

  async obtenerPorUsuarioYFecha(req, res) {
    try {
      const { fecha } = req.params;
      // Usar el ID del usuario autenticado del token
      const consumos = await ConsumoModelo.obtenerPorUsuarioYFecha(req.usuario.id, fecha);
      
      // Agrupar por tipo de comida
      const consumosAgrupados = {
        desayuno: [],
        almuerzo: [],
        cena: [],
        snack: []
      };
      
      consumos.forEach(consumo => {
        const tipoComida = consumo.tipo_comida?.nombre || 'sin_tipo';
        if (consumosAgrupados[tipoComida]) {
          consumosAgrupados[tipoComida].push(consumo);
        }
      });
      
      res.json(consumosAgrupados);
    } catch (err) {
      console.error('Error al obtener consumos por usuario y fecha:', err);
      res.status(500).json({ error: 'Error al obtener consumos por usuario y fecha' });
    }
  },

  async agregarConsumo(req, res) {
    try {
      const { id_alimento, id_tipo_comida, cantidad, fecha } = req.body;

      if (!id_alimento || !id_tipo_comida || !cantidad || !fecha) {
        return res.status(400).json({ 
          error: 'Faltan campos requeridos',
          campos: ['id_alimento', 'id_tipo_comida', 'cantidad', 'fecha']
        });
      }

      // Usar el ID del usuario autenticado del token
      const consumo = await ConsumoModelo.agregarConsumo({
        id_alimento,
        id_usuario: req.usuario.id,
        id_tipo_comida,
        cantidad,
        fecha
      });

      res.status(201).json({ 
        mensaje: 'Consumo agregado exitosamente',
        consumo
      });
    } catch (err) {
      console.error('Error al agregar consumo:', err);
      res.status(500).json({ error: 'Error al agregar consumo', detalle: err.message });
    }
  },

  async eliminarConsumo(req, res) {
    try {
      const { id } = req.params;
      await ConsumoModelo.eliminarConsumo(parseInt(id));
      res.json({ mensaje: 'Consumo eliminado correctamente' });
    } catch (err) {
      console.error('Error al eliminar consumo:', err);
      res.status(500).json({ error: 'Error al eliminar consumo' });
    }
  }
};

module.exports = ConsumoControlador;
