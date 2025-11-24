const prisma = require('../prismaClient');

const RecetaConsumidaModelo = {
  async obtenerTodas() {
    return await prisma.recetaConsumida.findMany({
      include: {
        receta: true,
        usuario: true,
        tipo_comida: true
      }
    });
  },

  async obtenerPorUsuario(idUsuario) {
    return await prisma.recetaConsumida.findMany({
      where: { id_usuario: idUsuario },
      include: {
        receta: {
          include: {
            tipo_comida: true
          }
        },
        tipo_comida: true
      },
      orderBy: {
        fecha: 'desc'
      }
    });
  },

  async obtenerPorFecha(fecha) {
    return await prisma.recetaConsumida.findMany({
      where: { fecha: new Date(fecha) },
      include: {
        receta: true,
        usuario: true,
        tipo_comida: true
      }
    });
  },

  async agregarRecetaConsumida(datos) {
    return await prisma.recetaConsumida.create({
      data: {
        id_receta: datos.id_receta,
        id_usuario: datos.id_usuario,
        id_tipo_comida: datos.id_tipo_comida,
        fecha: new Date(datos.fecha)
      },
      include: {
        receta: true,
        tipo_comida: true
      }
    });
  },

  async eliminarRecetaConsumida(id) {
    return await prisma.recetaConsumida.delete({
      where: { id }
    });
  }
};

module.exports = RecetaConsumidaModelo;
