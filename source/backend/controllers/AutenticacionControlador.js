const AutenticacionModelo = require('../models/AutenticacionModelo');
const jwt = require('jsonwebtoken');

/**
 * Controlador de autenticación
 * Maneja registro, login y obtención de usuario actual
 */
const AutenticacionControlador = {
  /**
   * Registrar nuevo usuario
   * @route POST /api/auth/registro
   */
  async registro(req, res) {
    try {
      const { nombre, apellido, correo, contrasena, fecha_nacimiento, meta, peso, altura } = req.body;

      // Validar que todos los campos requeridos estén presentes
      if (!nombre || !apellido || !correo || !contrasena || !fecha_nacimiento || !peso || !altura) {
        return res.status(400).json({ 
          error: 'Todos los campos son requeridos',
          campos_requeridos: ['nombre', 'apellido', 'correo', 'contrasena', 'fecha_nacimiento', 'peso', 'altura']
        });
      }

      // Validar tipos de datos
      if (typeof nombre !== 'string' || typeof apellido !== 'string') {
        return res.status(400).json({ error: 'Nombre y apellido deben ser texto' });
      }

      // Validar formato de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'Formato de correo inválido' });
      }

      // Validar seguridad de contraseña
      if (contrasena.length < 8) {
        return res.status(400).json({ 
          error: 'La contraseña debe tener al menos 8 caracteres' 
        });
      }

      // Validar que la contraseña tenga complejidad mínima
      const tieneNumero = /\d/.test(contrasena);
      const tieneLetra = /[a-zA-Z]/.test(contrasena);
      if (!tieneNumero || !tieneLetra) {
        return res.status(400).json({ 
          error: 'La contraseña debe contener al menos una letra y un número' 
        });
      }

      // Validar peso y altura
      const pesoNum = parseFloat(peso);
      const alturaNum = parseFloat(altura);
      
      if (isNaN(pesoNum) || pesoNum <= 0 || pesoNum > 500) {
        return res.status(400).json({ error: 'Peso inválido (debe estar entre 1 y 500 kg)' });
      }
      
      if (isNaN(alturaNum) || alturaNum <= 0 || alturaNum > 3) {
        return res.status(400).json({ error: 'Altura inválida (debe estar entre 0.1 y 3 metros)' });
      }

      // Validar fecha de nacimiento
      const fechaNac = new Date(fecha_nacimiento);
      if (isNaN(fechaNac.getTime())) {
        return res.status(400).json({ error: 'Fecha de nacimiento inválida' });
      }

      // Validar que el usuario sea mayor de edad (opcional, ajustar según requisitos)
      const edad = new Date().getFullYear() - fechaNac.getFullYear();
      if (edad < 13) {
        return res.status(400).json({ error: 'Debes tener al menos 13 años para registrarte' });
      }

      // Verificar si el correo ya existe
      const usuarioExistente = await AutenticacionModelo.buscarPorCorreo(correo);
      if (usuarioExistente) {
        return res.status(409).json({ error: 'El correo ya está registrado' });
      }

      // Registrar usuario
      const nuevoUsuario = await AutenticacionModelo.registrarUsuario({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: correo.toLowerCase().trim(),
        contrasena,
        fecha_nacimiento,
        meta: meta ? meta.trim() : null,
        peso: pesoNum,
        altura: alturaNum
      });

      // Generar token JWT con información del usuario
      const token = jwt.sign(
        { 
          id: nuevoUsuario.id, 
          correo: nuevoUsuario.correo,
          nombre: nuevoUsuario.nombre,
          apellido: nuevoUsuario.apellido
        },
        process.env.JWT_SECRET,
        { 
          expiresIn: '7d', // Token válido por 7 días
          issuer: 'vitamia-api',
          audience: 'vitamia-app'
        }
      );

      res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        token,
        usuario: nuevoUsuario
      });
    } catch (err) {
      console.error('Error en registro:', err);
      
      // Manejar errores específicos de Prisma
      if (err.code === 'P2002') {
        return res.status(409).json({ error: 'El correo ya está registrado' });
      }
      
      res.status(500).json({ 
        error: 'Error al registrar usuario',
        mensaje: 'Ocurrió un error en el servidor. Por favor, intenta de nuevo.'
      });
    }
  },

  /**
   * Iniciar sesión
   * @route POST /api/auth/login
   */
  async login(req, res) {
    try {
      const { correo, contrasena } = req.body;

      // Validar que los campos estén presentes
      if (!correo || !contrasena) {
        return res.status(400).json({ 
          error: 'Correo y contraseña son requeridos' 
        });
      }

      // Normalizar correo
      const correoNormalizado = correo.toLowerCase().trim();

      // Buscar usuario por correo
      const usuario = await AutenticacionModelo.buscarPorCorreo(correoNormalizado);
      if (!usuario) {
        // No revelar si el usuario existe o no por seguridad
        return res.status(401).json({ 
          error: 'Credenciales inválidas',
          mensaje: 'El correo o la contraseña son incorrectos'
        });
      }

      // Validar contraseña
      const contrasenaValida = await AutenticacionModelo.validarContrasena(
        contrasena,
        usuario.contrasena
      );

      if (!contrasenaValida) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas',
          mensaje: 'El correo o la contraseña son incorrectos'
        });
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
        { 
          expiresIn: '7d',
          issuer: 'vitamia-api',
          audience: 'vitamia-app'
        }
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
      res.status(500).json({ 
        error: 'Error al iniciar sesión',
        mensaje: 'Ocurrió un error en el servidor. Por favor, intenta de nuevo.'
      });
    }
  },

  /**
   * Obtener información del usuario autenticado
   * @route GET /api/auth/me
   * @requires Token JWT
   */
  async obtenerUsuarioActual(req, res) {
    try {
      // req.usuario viene del middleware de autenticación
      if (!req.usuario || !req.usuario.correo) {
        return res.status(401).json({ 
          error: 'Usuario no autenticado',
          mensaje: 'No se pudo obtener la información del usuario'
        });
      }

      const usuario = await AutenticacionModelo.buscarPorCorreo(req.usuario.correo);
      
      if (!usuario) {
        return res.status(404).json({ 
          error: 'Usuario no encontrado',
          mensaje: 'El usuario no existe en el sistema'
        });
      }

      // Retornar usuario sin contraseña
      const { contrasena: _, ...usuarioSinContrasena } = usuario;
      
      res.json(usuarioSinContrasena);
    } catch (err) {
      console.error('Error al obtener usuario actual:', err);
      res.status(500).json({ 
        error: 'Error al obtener información del usuario',
        mensaje: 'Ocurrió un error en el servidor'
      });
    }
  }
};

module.exports = AutenticacionControlador;
