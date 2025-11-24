const prisma = require('../prismaClient');

const RecetaModelo = {
  async obtenerTodas() {
    return await prisma.receta.findMany({
      include: {
        tipo_comida: true
      }
    });
  },
  async obtenerPorTipo(tipoNombre) {
    return await prisma.receta.findMany({
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

module.exports = RecetaModelo;
