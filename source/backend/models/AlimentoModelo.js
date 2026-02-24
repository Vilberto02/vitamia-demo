const prisma = require('../prismaClient');

const AlimentoModelo = {
  async obtenerTodos() {
    return await prisma.alimento.findMany({
      orderBy: [
        { categoria: 'asc' },
        { nombre: 'asc' }
      ]
    });
  },
  async obtenerPorNombre(nombre) {
    return await prisma.alimento.findMany({
      where: { nombre }
    });
  }
};

module.exports = AlimentoModelo;