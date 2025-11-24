const prisma = require('../prismaClient');

const InformacionModelo = {
  async obtenerTodas() {
    return await prisma.informacion.findMany({
      orderBy: {
        id: 'asc'
      }
    });
  },

  async obtenerPorId(id) {
    return await prisma.informacion.findUnique({
      where: { id: parseInt(id) }
    });
  }
};

module.exports = InformacionModelo;
