const UsuarioModelo = require('../models/UsuarioModelo');

const UsuarioControlador = {
  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await UsuarioModelo.obtenerUsuarios();
      
      // Remover contraseñas de la respuesta
      const usuariosSinContrasena = usuarios.map(usuario => {
        const { contrasena, ...usuarioSinPass } = usuario;
        return usuarioSinPass;
      });
      
      res.json(usuariosSinContrasena);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  async obtenerPorNombre(req, res) {
    try {
      const { nombre } = req.params;
      const usuarios = await UsuarioModelo.obtenerPorNombre(nombre);
      
      // Remover contraseñas de la respuesta
      const usuariosSinContrasena = usuarios.map(usuario => {
        const { contrasena, ...usuarioSinPass } = usuario;
        return usuarioSinPass;
      });
      
      res.json(usuariosSinContrasena);
    } catch (err) {
      console.error('Error al obtener usuarios por nombre:', err);
      res.status(500).json({ error: 'Error al obtener usuarios por nombre' });
    }
  }
};

module.exports = UsuarioControlador;
