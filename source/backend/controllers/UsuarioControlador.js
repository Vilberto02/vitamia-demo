const UsuarioModelo = require('../models/UsuarioModelo');

const UsuarioControlador = {
  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await UsuarioModelo.obtenerUsuarios();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },
  async obtenerPorNombre(req, res) {
    try {
      const { nombre } = req.params;
      const usuarios = await UsuarioModelo.obtenerPorNombre(nombre);
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener usuarios por nombre' });
    }
  }
};

module.exports = UsuarioControlador;
