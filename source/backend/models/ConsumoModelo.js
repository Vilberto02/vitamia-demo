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

  /**
   * Obtener consumos del usuario en una fecha específica, agrupados por tipo de comida
   * @param {number} idUsuario - ID del usuario
   * @param {string} fecha - Fecha en formato YYYY-MM-DD
   * @returns {Promise<Object>} Consumos organizados por tipo de comida
   */
  async obtenerPorUsuarioYFecha(idUsuario, fecha) {
    const fechaBuscada = new Date(fecha);
    fechaBuscada.setHours(0, 0, 0, 0);
    const fechaFin = new Date(fechaBuscada);
    fechaFin.setDate(fechaFin.getDate() + 1);

    const consumos = await prisma.consumo.findMany({
      where: { 
        id_usuario: idUsuario,
        fecha: {
          gte: fechaBuscada,
          lt: fechaFin
        }
      },
      include: {
        alimento: {
          select: {
            id: true,
            nombre: true,
            calorias: true
          }
        },
        tipo_comida: {
          select: {
            nombre: true
          }
        }
      },
      orderBy: {
        fecha: 'desc'
      }
    });

    // Inicializar estructura de respuesta
    const consumosPorTipo = {
      desayuno: [],
      almuerzo: [],
      cena: [],
      snack: []
    };

    // Agrupar consumos por tipo de comida
    consumos.forEach(consumo => {
      const tipoComida = consumo.tipo_comida.nombre.toLowerCase();
      
      const caloriasTotales = Math.round(consumo.cantidad * consumo.alimento.calorias * 100) / 100;
      
      const alimentoInfo = {
        id_consumo: consumo.id,
        id_alimento: consumo.alimento.id,
        nombre: consumo.alimento.nombre,
        cantidad: consumo.cantidad,
        unidad: consumo.unidad,
        calorias_unitarias: consumo.alimento.calorias,
        calorias_totales: caloriasTotales,
        fecha: consumo.fecha
      };

      if (consumosPorTipo[tipoComida]) {
        consumosPorTipo[tipoComida].push(alimentoInfo);
      }
    });

    return consumosPorTipo;
  },

  async eliminarConsumo(id) {
    return await prisma.consumo.delete({
      where: { id }
    });
  },

  /**
   * Obtener consumos del usuario segmentados por tipo de comida
   * @param {number} idUsuario - ID del usuario autenticado
   * @param {boolean} soloHoy - Si es true, filtra solo consumos del día actual
   * @returns {Promise<Object>} Consumos organizados por tipo de comida
   */
  async obtenerConsumosPorTipo(idUsuario, soloHoy = false) {
    // Construir condiciones de búsqueda
    const whereConditions = { id_usuario: idUsuario };
    
    // Si se solicita solo consumos de hoy, filtrar por fecha actual
    if (soloHoy) {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Inicio del día
      const manana = new Date(hoy);
      manana.setDate(manana.getDate() + 1); // Fin del día
      
      whereConditions.fecha = {
        gte: hoy,
        lt: manana
      };
    }

    // Obtener consumos del usuario con información del alimento y tipo de comida
    const consumos = await prisma.consumo.findMany({
      where: whereConditions,
      include: {
        alimento: {
          select: {
            id: true,
            nombre: true,
            calorias: true
          }
        },
        tipo_comida: {
          select: {
            nombre: true
          }
        }
      },
      orderBy: {
        fecha: 'desc'
      }
    });

    // Inicializar estructura de respuesta
    const consumosPorTipo = {
      desayuno: [],
      almuerzo: [],
      cena: [],
      snack: []
    };

    // Agrupar consumos por tipo de comida
    consumos.forEach(consumo => {
      const tipoComida = consumo.tipo_comida.nombre.toLowerCase();
      
      // Calcular calorías totales del consumo
      const caloriasTotales = Math.round(consumo.cantidad * consumo.alimento.calorias * 100) / 100;
      
      // Crear objeto con información completa del alimento
      const alimentoInfo = {
        id_consumo: consumo.id,
        id_alimento: consumo.alimento.id,
        nombre: consumo.alimento.nombre,
        cantidad: consumo.cantidad,
        unidad: consumo.unidad,
        calorias_unitarias: consumo.alimento.calorias,
        calorias_totales: caloriasTotales,
        fecha: consumo.fecha
      };

      // Agregar al tipo de comida correspondiente
      if (consumosPorTipo[tipoComida]) {
        consumosPorTipo[tipoComida].push(alimentoInfo);
      }
    });

    return consumosPorTipo;
  },

  /**
   * Registrar un nuevo consumo de alimento para el usuario
   * @param {number} idUsuario - ID del usuario autenticado
   * @param {number} idAlimento - ID del alimento a consumir
   * @param {number} cantidad - Cantidad consumida
   * @param {string} unidad - Unidad de medida (opcional, si no se envía se usa la del alimento)
   * @param {string} tipoComida - Tipo de comida (desayuno, almuerzo, cena, snack)
   * @returns {Promise<Object>} Consumo registrado con información del alimento
   */
  async registrarConsumo(idUsuario, idAlimento, cantidad, unidad, tipoComida) {
    // Buscar el alimento por ID
    const alimento = await prisma.alimento.findUnique({
      where: {
        id: idAlimento
      }
    });

    if (!alimento) {
      throw new Error(`El alimento con ID ${idAlimento} no existe en el sistema`);
    }

    // Si no se proporciona unidad, usar la del alimento
    const unidadFinal = unidad || alimento.unidad;

    // Normalizar el tipo de comida a minúsculas
    const tipoComidaNormalizado = tipoComida.toLowerCase();
    
    // Buscar el tipo de comida por nombre
    const tipoComidaDb = await prisma.tipoComida.findFirst({
      where: {
        nombre: tipoComidaNormalizado
      }
    });

    if (!tipoComidaDb) {
      throw new Error(`El tipo de comida "${tipoComida}" no es válido. Usa: desayuno, almuerzo, cena o snack`);
    }

    // Crear el registro de consumo con la fecha actual
    const consumo = await prisma.consumo.create({
      data: {
        id_alimento: alimento.id,
        id_usuario: idUsuario,
        id_tipo_comida: tipoComidaDb.id,
        cantidad: cantidad,
        unidad: unidadFinal.toLowerCase(),
        fecha: new Date()
      },
      include: {
        alimento: {
          select: {
            nombre: true,
            unidad: true,
            calorias: true
          }
        },
        tipo_comida: {
          select: {
            nombre: true
          }
        }
      }
    });

    return consumo;
  },

  /**
   * Obtener promedio de calorías consumidas por mes
   * @param {number} idUsuario - ID del usuario autenticado
   * @returns {Promise<Array>} Calorías promedio agrupadas por mes
   */
  async obtenerCaloriasPorMes(idUsuario) {
    // Obtener todos los consumos del usuario con calorías del alimento
    const consumos = await prisma.consumo.findMany({
      where: { id_usuario: idUsuario },
      include: {
        alimento: {
          select: {
            calorias: true
          }
        }
      },
      orderBy: {
        fecha: 'asc'
      }
    });

    // Agrupar consumos por año-mes y calcular totales
    const consumosPorMes = {};
    
    consumos.forEach(consumo => {
      const fecha = new Date(consumo.fecha);
      const anio = fecha.getFullYear();
      const mes = fecha.getMonth() + 1; // getMonth() retorna 0-11
      const clave = `${anio}-${String(mes).padStart(2, '0')}`;
      
      // Calcular calorías (cantidad * calorías del alimento)
      const caloriasConsumo = consumo.cantidad * consumo.alimento.calorias;
      
      if (!consumosPorMes[clave]) {
        consumosPorMes[clave] = {
          anio: anio,
          mes: mes,
          mes_nombre: this._obtenerNombreMes(mes),
          total_calorias: 0,
          cantidad_consumos: 0
        };
      }
      
      consumosPorMes[clave].total_calorias += caloriasConsumo;
      consumosPorMes[clave].cantidad_consumos += 1;
    });

    // Convertir objeto a array y calcular promedios
    const resultado = Object.keys(consumosPorMes)
      .sort()
      .map(clave => {
        const datos = consumosPorMes[clave];
        return {
          anio: datos.anio,
          mes: datos.mes,
          mes_nombre: datos.mes_nombre,
          promedio_calorias: Math.round(datos.total_calorias / datos.cantidad_consumos * 100) / 100,
          total_calorias: Math.round(datos.total_calorias * 100) / 100,
          cantidad_consumos: datos.cantidad_consumos
        };
      });

    return resultado;
  },

  /**
   * Obtener nombre del mes en español
   * @param {number} mes - Número del mes (1-12)
   * @returns {string} Nombre del mes
   * @private
   */
  _obtenerNombreMes(mes) {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[mes - 1];
  }
};

module.exports = ConsumoModelo;