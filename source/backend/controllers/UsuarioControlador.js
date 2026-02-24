const UsuarioModelo = require('../models/UsuarioModelo');

/**
 * Controlador de Usuarios
 * Maneja las solicitudes HTTP relacionadas con usuarios
 */
const UsuarioControlador = {
  /**
   * Obtener todos los usuarios
   * @route GET /api/usuarios
   */
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
      res.status(500).json({ 
        error: 'Error al obtener usuarios',
        mensaje: 'Ocurrió un error al consultar los usuarios'
      });
    }
  },

  /**
   * Obtener usuarios por nombre
   * @route GET /api/usuarios/:nombre
   */
  async obtenerPorNombre(req, res) {
    try {
      const { nombre } = req.params;
      
      if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ 
          error: 'Nombre requerido',
          mensaje: 'Debes proporcionar un nombre para buscar'
        });
      }

      const usuarios = await UsuarioModelo.obtenerPorNombre(nombre);
      
      // Remover contraseñas de la respuesta
      const usuariosSinContrasena = usuarios.map(usuario => {
        const { contrasena, ...usuarioSinPass } = usuario;
        return usuarioSinPass;
      });
      
      res.json(usuariosSinContrasena);
    } catch (err) {
      console.error('Error al obtener usuarios por nombre:', err);
      res.status(500).json({ 
        error: 'Error al obtener usuarios por nombre',
        mensaje: 'Ocurrió un error al buscar los usuarios'
      });
    }
  },

  /**
   * Obtener información general del usuario autenticado
   * @route GET /api/usuarios/general
   * @requires Token JWT en el header Authorization
   */
  async obtenerInformacionGeneral(req, res) {
    try {
      // req.usuario viene del middleware de autenticación
      if (!req.usuario || !req.usuario.id) {
        return res.status(401).json({ 
          error: 'No autenticado',
          mensaje: 'No se pudo verificar la identidad del usuario'
        });
      }

      const idUsuario = req.usuario.id;

      // Obtener información general del usuario desde el modelo
      const informacionUsuario = await UsuarioModelo.obtenerInformacionGeneral(idUsuario);

      if (!informacionUsuario) {
        return res.status(404).json({ 
          error: 'Usuario no encontrado',
          mensaje: 'No se encontró información del usuario'
        });
      }

      // Estructurar la respuesta según los requisitos
      const respuesta = {
        perfil: {
          nombre: informacionUsuario.nombre,
          apellido: informacionUsuario.apellido,
          nombre_completo: `${informacionUsuario.nombre} ${informacionUsuario.apellido}`,
          correo: informacionUsuario.correo,
          foto: informacionUsuario.imagen || null
        },
        estadisticas: {
          peso: informacionUsuario.peso,
          imc: informacionUsuario.imc,
          altura: informacionUsuario.altura,
          total_calorias_consumidas: informacionUsuario.estadisticas.total_calorias,
          agua_consumida: informacionUsuario.estadisticas.agua_consumida,
          total_consumos: informacionUsuario.estadisticas.total_consumos
        }
      };

      res.json(respuesta);
    } catch (err) {
      console.error('Error al obtener información general del usuario:', err);
      res.status(500).json({ 
        error: 'Error al obtener información del usuario',
        mensaje: 'Ocurrió un error al consultar la información'
      });
    }
  }
};

module.exports = UsuarioControlador;
