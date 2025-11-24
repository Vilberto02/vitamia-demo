const prisma = require('../prismaClient');

const UsuarioModelo = {
  async obtenerUsuarios() {
    return await prisma.usuario.findMany();
  },
  async obtenerPorNombre(nombre) {
    return await prisma.usuario.findMany({
      where: { nombre }
    });
  }
};

module.exports = UsuarioModelo;