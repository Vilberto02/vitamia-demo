const prisma = require('../prismaClient');

/**
 * Modelo de Usuario
 * Gestiona las operaciones de base de datos relacionadas con usuarios
 */
const UsuarioModelo = {
  /**
   * Obtener todos los usuarios
   * @returns {Promise<Array>} Lista de usuarios
   */
  async obtenerUsuarios() {
    return await prisma.usuario.findMany();
  },

  /**
   * Obtener usuarios por nombre
   * @param {string} nombre - Nombre del usuario
   * @returns {Promise<Array>} Lista de usuarios con ese nombre
   */
  async obtenerPorNombre(nombre) {
    return await prisma.usuario.findMany({
      where: { nombre }
    });
  },

  /**
   * Obtener información general del usuario con estadísticas
   * @param {number} idUsuario - ID del usuario autenticado
   * @returns {Promise<Object>} Información del usuario con estadísticas
   */
  async obtenerInformacionGeneral(idUsuario) {
    // Obtener información básica del usuario
    const usuario = await prisma.usuario.findUnique({
      where: { id: idUsuario },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        correo: true,
        imagen: true,
        peso: true,
        imc: true,
        altura: true
      }
    });

    if (!usuario) {
      return null;
    }

    // Obtener total de consumos del usuario
    const totalConsumos = await prisma.consumo.count({
      where: { id_usuario: idUsuario }
    });

    // Obtener consumos recientes para calcular estadísticas
    const consumos = await prisma.consumo.findMany({
      where: { id_usuario: idUsuario },
      include: {
        alimento: {
          select: {
            calorias: true
          }
        }
      }
    });

    // Calcular total de calorías (cantidad * calorías del alimento)
    const totalCalorias = consumos.reduce((total, consumo) => {
      return total + (consumo.cantidad * consumo.alimento.calorias);
    }, 0);

    // Calcular agua consumida (buscar alimentos tipo "agua" o similares)
    // TODO: Implementar campo específico para agua o identificar alimentos líquidos
    const aguaConsumida = 0; // Placeholder - requiere campo en BD

    return {
      ...usuario,
      estadisticas: {
        total_calorias: totalCalorias,
        agua_consumida: aguaConsumida,
        total_consumos: totalConsumos
      }
    };
  }
};

module.exports = UsuarioModelo;