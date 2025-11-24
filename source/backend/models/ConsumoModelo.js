const prisma = require('../prismaClient');

const ConsumoModelo = {
  async obtenerTodos() {
    return await prisma.consumo.findMany({
      include: {
        alimento: true,
        usuario: true,
        tipo_comida: true
      },
      orderBy: {
        fecha: 'desc'
      }
    });
  },
  async obtenerPorFecha(fecha) {
    return await prisma.consumo.findMany({
      where: { fecha: new Date(fecha) },
      include: {
        alimento: true,
        usuario: true,
        tipo_comida: true
      },
      orderBy: {
        fecha: 'desc'
      }
    });
  },
  async agregarConsumo(consumo) {
    const { id_alimento, id_usuario, id_tipo_comida, cantidad, fecha } = consumo;
    const nuevoConsumo = await prisma.consumo.create({
      data: {
        id_alimento,
        id_usuario,
        id_tipo_comida,
        cantidad,
        fecha: new Date(fecha)
      },
      include: {
        alimento: true,
        tipo_comida: true
      }
    });
    return nuevoConsumo;
  },

  async obtenerPorUsuario(idUsuario) {
    return await prisma.consumo.findMany({
      where: { id_usuario: idUsuario },
      include: {
        alimento: true,
        tipo_comida: true
      },
      orderBy: {
        fecha: 'desc'
      }
    });
  },

  async obtenerPorUsuarioYFecha(idUsuario, fecha) {
    return await prisma.consumo.findMany({
      where: { 
        id_usuario: idUsuario,
        fecha: new Date(fecha)
      },
      include: {
        alimento: true,
        tipo_comida: true
      }
    });
  },

  async eliminarConsumo(id) {
    return await prisma.consumo.delete({
      where: { id }
    });
  }
};

module.exports = ConsumoModelo;