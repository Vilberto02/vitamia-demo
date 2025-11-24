const RecetaConsumidaModelo = require('../models/RecetaConsumidaModelo');

const RecetaConsumidaControlador = {
  async obtenerTodas(req, res) {
    try {
      const recetasConsumidas = await RecetaConsumidaModelo.obtenerTodas();
      res.json(recetasConsumidas);
    } catch (err) {
      console.error('Error al obtener recetas consumidas:', err);
      res.status(500).json({ error: 'Error al obtener recetas consumidas' });
    }
  },

  async obtenerPorUsuario(req, res) {
    try {
      // Usar el ID del usuario autenticado del token
      const recetasConsumidas = await RecetaConsumidaModelo.obtenerPorUsuario(req.usuario.id);
      res.json(recetasConsumidas);
    } catch (err) {
      console.error('Error al obtener recetas consumidas por usuario:', err);
      res.status(500).json({ error: 'Error al obtener recetas consumidas por usuario' });
    }
  },

  async obtenerPorFecha(req, res) {
    try {
      const { fecha } = req.params;
      const recetasConsumidas = await RecetaConsumidaModelo.obtenerPorFecha(fecha);
      res.json(recetasConsumidas);
    } catch (err) {
      console.error('Error al obtener recetas consumidas por fecha:', err);
      res.status(500).json({ error: 'Error al obtener recetas consumidas por fecha' });
    }
  },

  async agregarRecetaConsumida(req, res) {
    try {
      const { id_receta, id_tipo_comida, fecha } = req.body;

      if (!id_receta || !id_tipo_comida || !fecha) {
        return res.status(400).json({ 
          error: 'Faltan campos requeridos',
          campos: ['id_receta', 'id_tipo_comida', 'fecha']
        });
      }

      // Usar el ID del usuario autenticado del token
      const recetaConsumida = await RecetaConsumidaModelo.agregarRecetaConsumida({
        id_receta,
        id_usuario: req.usuario.id,
        id_tipo_comida,
        fecha
      });

      res.status(201).json({ 
        mensaje: 'Receta consumida agregada correctamente', 
        recetaConsumida 
      });
    } catch (err) {
      console.error('Error al agregar receta consumida:', err);
      res.status(500).json({ error: 'Error al agregar receta consumida', detalle: err.message });
    }
  },

  async eliminarRecetaConsumida(req, res) {
    try {
      const { id } = req.params;
      await RecetaConsumidaModelo.eliminarRecetaConsumida(parseInt(id));
      res.json({ mensaje: 'Receta consumida eliminada correctamente' });
    } catch (err) {
      console.error('Error al eliminar receta consumida:', err);
      res.status(500).json({ error: 'Error al eliminar receta consumida' });
    }
  }
};

module.exports = RecetaConsumidaControlador;
