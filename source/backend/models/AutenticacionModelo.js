const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

const AutenticacionModelo = {
  async registrarUsuario(datosUsuario) {
    const { nombre, apellido, correo, contrasena, fecha_nacimiento, meta, peso, altura } = datosUsuario;
    
    // Calcular IMC: peso (kg) / (altura (m))^2
    const imc = peso / (altura * altura);
    
    // Encriptar contraseña
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
    
    // Crear usuario
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
    
    // Retornar sin la contraseña
    const { contrasena: _, ...usuarioSinContrasena } = nuevoUsuario;
    return usuarioSinContrasena;
  },

  async buscarPorCorreo(correo) {
    return await prisma.usuario.findUnique({
      where: { correo }
    });
  },

  async validarContrasena(contrasena, contrasenaEncriptada) {
    return await bcrypt.compare(contrasena, contrasenaEncriptada);
  }
};

module.exports = AutenticacionModelo;
