const prisma = require('../prismaClient');

const AlimentoModelo = {
  async obtenerTodos() {
    return await prisma.alimento.findMany({
      include: {
        tipo_comida: true
      }
    });
  },
  async obtenerPorNombre(nombre) {
    return await prisma.alimento.findMany({
      where: { nombre },
      include: {
        tipo_comida: true
      }
    });
  },
  async obtenerPorTipoComida(tipoNombre) {
    return await prisma.alimento.findMany({
      where: {
        tipo_comida: {
          nombre: tipoNombre
        }
      },
      include: {
        tipo_comida: true
      }
    });
  }
};

module.exports = AlimentoModelo;