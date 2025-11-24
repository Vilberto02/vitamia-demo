const AutenticacionModelo = require('../models/AutenticacionModelo');
const jwt = require('jsonwebtoken');

const AutenticacionControlador = {
  async registro(req, res) {
    try {
      const { nombre, apellido, correo, contrasena, fecha_nacimiento, meta, peso, altura } = req.body;

      // Validar que todos los campos requeridos estén presentes
      if (!nombre || !apellido || !correo || !contrasena || !fecha_nacimiento || !peso || !altura) {
        return res.status(400).json({ 
          error: 'Todos los campos son requeridos: nombre, apellido, correo, contraseña, fecha_nacimiento, peso, altura' 
        });
      }

      // Validar formato de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'Formato de correo inválido' });
      }

      // Validar seguridad de contraseña (mínimo 8 caracteres)
      if (contrasena.length < 8) {
        return res.status(400).json({ 
          error: 'La contraseña debe tener al menos 8 caracteres' 
        });
      }

      // Verificar si el correo ya existe
      const usuarioExistente = await AutenticacionModelo.buscarPorCorreo(correo);
      if (usuarioExistente) {
        return res.status(409).json({ error: 'El correo ya está registrado' });
      }

      // Registrar usuario
      const nuevoUsuario = await AutenticacionModelo.registrarUsuario({
        nombre,
        apellido,
        correo,
        contrasena,
        fecha_nacimiento,
        meta,
        peso: parseFloat(peso),
        altura: parseFloat(altura)
      });

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: nuevoUsuario.id, 
          correo: nuevoUsuario.correo,
          nombre: nuevoUsuario.nombre,
          apellido: nuevoUsuario.apellido
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        token,
        usuario: nuevoUsuario
      });
    } catch (err) {
      console.error('Error en registro:', err);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  async login(req, res) {
    try {
      const { correo, contrasena } = req.body;

      // Validar que los campos estén presentes
      if (!correo || !contrasena) {
        return res.status(400).json({ 
          error: 'Correo y contraseña son requeridos' 
        });
      }

      // Buscar usuario por correo
      const usuario = await AutenticacionModelo.buscarPorCorreo(correo);
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Validar contraseña
      const contrasenaValida = await AutenticacionModelo.validarContrasena(
        contrasena,
        usuario.contrasena
      );

      if (!contrasenaValida) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: usuario.id, 
          correo: usuario.correo,
          nombre: usuario.nombre,
          apellido: usuario.apellido
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Retornar usuario sin contraseña
      const { contrasena: _, ...usuarioSinContrasena } = usuario;

      res.json({
        mensaje: 'Inicio de sesión exitoso',
        token,
        usuario: usuarioSinContrasena
      });
    } catch (err) {
      console.error('Error en login:', err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  async obtenerUsuarioActual(req, res) {
    try {
      // req.usuario viene del middleware de autenticación
      const usuario = await AutenticacionModelo.buscarPorCorreo(req.usuario.correo);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Retornar usuario sin contraseña
      const { contrasena: _, ...usuarioSinContrasena } = usuario;
      
      res.json(usuarioSinContrasena);
    } catch (err) {
      console.error('Error al obtener usuario actual:', err);
      res.status(500).json({ error: 'Error al obtener información del usuario' });
    }
  }
};

module.exports = AutenticacionControlador;
