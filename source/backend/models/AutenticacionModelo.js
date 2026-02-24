const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

/**
 * Modelo de autenticación
 * Maneja operaciones relacionadas con usuarios y autenticación
 */
const AutenticacionModelo = {
  /**
   * Registrar nuevo usuario en el sistema
   * @param {Object} datosUsuario - Datos del usuario a registrar
   * @returns {Object} Usuario creado sin contraseña
   */
  async registrarUsuario(datosUsuario) {
    const { nombre, apellido, correo, contrasena, fecha_nacimiento, meta, peso, altura } = datosUsuario;
    
    // Calcular IMC: peso (kg) / (altura (m))^2
    const imc = peso / (altura * altura);
    
    // Encriptar contraseña con bcrypt (10 rondas de salt)
    // 10 rondas es un buen balance entre seguridad y rendimiento
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
    
    // Crear usuario en la base de datos
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        correo,
        contrasena: contrasenaEncriptada,
        fecha_nacimiento: new Date(fecha_nacimiento),
        meta: meta || null,
        peso,
        altura,
        imc: parseFloat(imc.toFixed(2))
      }
    });
    
    // Retornar usuario sin la contraseña por seguridad
    const { contrasena: _, ...usuarioSinContrasena } = nuevoUsuario;
    return usuarioSinContrasena;
  },

  /**
   * Buscar usuario por correo electrónico
   * @param {string} correo - Correo del usuario
   * @returns {Object|null} Usuario encontrado o null
   */
  async buscarPorCorreo(correo) {
    return await prisma.usuario.findUnique({
      where: { correo }
    });
  },

  /**
   * Validar contraseña usando bcrypt
   * @param {string} contrasena - Contraseña en texto plano
   * @param {string} contrasenaEncriptada - Hash almacenado en BD
   * @returns {boolean} true si la contraseña es válida
   */
  async validarContrasena(contrasena, contrasenaEncriptada) {
    try {
      return await bcrypt.compare(contrasena, contrasenaEncriptada);
    } catch (error) {
      console.error('Error al validar contraseña:', error);
      return false;
    }
  },

  /**
   * Buscar usuario por ID
   * @param {number} id - ID del usuario
   * @returns {Object|null} Usuario encontrado o null
   */
  async buscarPorId(id) {
    const usuario = await prisma.usuario.findUnique({
      where: { id }
    });
    
    if (usuario) {
      const { contrasena: _, ...usuarioSinContrasena } = usuario;
      return usuarioSinContrasena;
    }
    
    return null;
  }
};

module.exports = AutenticacionModelo;
