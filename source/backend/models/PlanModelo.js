const prisma = require('../prismaClient');

const PlanModelo = {
  async obtenerTodos() {
    return await prisma.plan.findMany({
      include: {
        plan_recetas: {
          include: {
            receta: true,
            tipo_comida: true
          }
        }
      }
    });
  },

  async obtenerPorId(id) {
    return await prisma.plan.findUnique({
      where: { id },
      include: {
        plan_recetas: {
          include: {
            receta: {
              include: {
                tipo_comida: true
              }
            },
            tipo_comida: true
          }
        }
      }
    });
  },

  async agregarPlanUsuario(datos) {
    return await prisma.planUsuario.create({
      data: {
        id_plan: datos.id_plan,
        id_usuario: datos.id_usuario,
        fecha: new Date(datos.fecha)
      },
      include: {
        plan: {
          include: {
            plan_recetas: {
              include: {
                receta: true,
                tipo_comida: true
              }
            }
          }
        }
      }
    });
  },

  async obtenerPlanesPorUsuario(idUsuario) {
    return await prisma.planUsuario.findMany({
      where: { id_usuario: idUsuario },
      include: {
        plan: {
          include: {
            plan_recetas: {
              include: {
                receta: true,
                tipo_comida: true
              }
            }
          }
        }
      },
      orderBy: {
        fecha: 'desc'
      }
    });
  },

  async eliminarPlanUsuario(id) {
    return await prisma.planUsuario.delete({
      where: { id }
    });
  }
};

module.exports = PlanModelo;
