const prisma = require('../prismaClient');

class LogroModelo {
  
  /**
   * Obtiene todos los logros disponibles
   */
  static async obtenerTodos() {
    return await prisma.logro.findMany({
      orderBy: [
        { tipo: 'asc' },
        { id: 'asc' }
      ]
    });
  }

  /**
   * Obtiene los logros de un usuario con su progreso
   */
  static async obtenerLogrosUsuario(idUsuario) {
    return await prisma.logroUsuario.findMany({
      where: { id_usuario: idUsuario },
      include: {
        logro: true
      },
      orderBy: { fecha_obtencion: 'desc' }
    });
  }

  /**
   * Evalúa y retorna los logros del usuario (desbloqueados y en progreso)
   */
  static async evaluarLogros(idUsuario) {
    const todosLogros = await this.obtenerTodos();
    const logrosUsuario = await this.obtenerLogrosUsuario(idUsuario);
    
    const logrosDesbloqueados = [];
    const logrosEnProgreso = [];

    for (const logro of todosLogros) {
      // Verificar si ya está desbloqueado
      const yaDesbloqueado = logrosUsuario.find(lu => lu.id_logro === logro.id);
      
      if (yaDesbloqueado) {
        logrosDesbloqueados.push({
          ...logro,
          fecha_obtencion: yaDesbloqueado.fecha_obtencion,
          progreso_actual: yaDesbloqueado.progreso_actual
        });
        continue;
      }

      // Evaluar progreso según el tipo de logro
      const progreso = await this.calcularProgreso(idUsuario, logro);
      
      // Solo incluir si hay progreso o está completado
      if (progreso.actual > 0) {
        if (progreso.actual >= progreso.meta) {
          // Desbloquear logro
          await this.desbloquearLogro(idUsuario, logro.id, progreso.actual);
          logrosDesbloqueados.push({
            ...logro,
            fecha_obtencion: new Date(),
            progreso_actual: progreso.actual,
            nuevo: true
          });
        } else {
          // Logro en progreso
          logrosEnProgreso.push({
            ...logro,
            progreso_actual: progreso.actual,
            progreso_meta: progreso.meta,
            porcentaje: Math.round((progreso.actual / progreso.meta) * 100)
          });
        }
      }
    }

    return {
      logrosDesbloqueados,
      logrosEnProgreso
    };
  }

  /**
   * Calcula el progreso de un logro específico
   */
  static async calcularProgreso(idUsuario, logro) {
    const [tipo, valor] = logro.criterio.split(':');
    const meta = parseInt(valor);

    switch (logro.tipo) {
      case 'racha':
        return await this.calcularRacha(idUsuario, tipo, meta);
      
      case 'cantidad':
        return await this.calcularCantidad(idUsuario, tipo, meta);
      
      case 'variedad':
        return await this.calcularVariedad(idUsuario, meta);
      
      case 'hito':
        return await this.calcularHito(idUsuario, tipo, meta);
      
      default:
        return { actual: 0, meta };
    }
  }

  /**
   * Calcula rachas de días consecutivos
   */
  static async calcularRacha(idUsuario, tipo, meta) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    let rachaActual = 0;
    let fechaVerificar = new Date(hoy);

    // Verificar días consecutivos hacia atrás
    for (let i = 0; i < meta + 5; i++) {  // Verificar algunos días extra
      const inicioDia = new Date(fechaVerificar);
      inicioDia.setHours(0, 0, 0, 0);
      
      const finDia = new Date(fechaVerificar);
      finDia.setHours(23, 59, 59, 999);

      let tieneConsumo = false;

      if (tipo === 'registro') {
        // Cualquier consumo cuenta
        const count = await prisma.consumo.count({
          where: {
            id_usuario: idUsuario,
            fecha: {
              gte: inicioDia,
              lte: finDia
            }
          }
        });
        tieneConsumo = count > 0;
      } else if (tipo === 'desayuno') {
        // Debe tener desayuno
        const count = await prisma.consumo.count({
          where: {
            id_usuario: idUsuario,
            tipo_comida: 'desayuno',
            fecha: {
              gte: inicioDia,
              lte: finDia
            }
          }
        });
        tieneConsumo = count > 0;
      } else if (tipo === 'balance') {
        // Debe tener desayuno, almuerzo y cena
        const tipos = await prisma.consumo.groupBy({
          by: ['tipo_comida'],
          where: {
            id_usuario: idUsuario,
            fecha: {
              gte: inicioDia,
              lte: finDia
            }
          }
        });
        const tipoComidas = tipos.map(t => t.tipo_comida);
        tieneConsumo = tipoComidas.includes('desayuno') && 
                       tipoComidas.includes('almuerzo') && 
                       tipoComidas.includes('cena');
      } else {
        // Buscar por categoría específica (frutas, verduras, proteinas, etc)
        const consumos = await prisma.consumo.findMany({
          where: {
            id_usuario: idUsuario,
            fecha: {
              gte: inicioDia,
              lte: finDia
            }
          },
          include: {
            alimento: true
          }
        });

        // Mapear tipo a categoría
        const categoriaBuscada = this.mapearTipoACategoria(tipo);
        tieneConsumo = consumos.some(c => c.alimento.categoria === categoriaBuscada);
      }

      if (tieneConsumo) {
        rachaActual++;
      } else {
        break;  // Racha rota
      }

      // Retroceder un día
      fechaVerificar.setDate(fechaVerificar.getDate() - 1);
    }

    return { actual: rachaActual, meta };
  }

  /**
   * Calcula cantidad total de consumos
   */
  static async calcularCantidad(idUsuario, tipo, meta) {
    if (tipo === 'total') {
      const count = await prisma.consumo.count({
        where: { id_usuario: idUsuario }
      });
      return { actual: count, meta };
    }

    if (tipo === 'snacks') {
      const count = await prisma.consumo.count({
        where: {
          id_usuario: idUsuario,
          tipo_comida: 'snack'
        }
      });
      return { actual: count, meta };
    }

    // Contar por categoría
    const categoria = this.mapearTipoACategoria(tipo);
    const consumos = await prisma.consumo.findMany({
      where: { id_usuario: idUsuario },
      include: { alimento: true }
    });

    const count = consumos.filter(c => c.alimento.categoria === categoria).length;
    return { actual: count, meta };
  }

  /**
   * Calcula variedad de categorías consumidas
   */
  static async calcularVariedad(idUsuario, meta) {
    const consumos = await prisma.consumo.findMany({
      where: { id_usuario: idUsuario },
      include: { alimento: true },
      distinct: ['id_alimento']
    });

    const categoriasUnicas = new Set(consumos.map(c => c.alimento.categoria));
    return { actual: categoriasUnicas.size, meta };
  }

  /**
   * Calcula hitos (eventos únicos)
   */
  static async calcularHito(idUsuario, tipo, meta) {
    if (tipo === 'primera_comida') {
      const count = await prisma.consumo.count({
        where: { id_usuario: idUsuario }
      });
      return { actual: count >= 1 ? 1 : 0, meta: 1 };
    }

    if (tipo === 'dias_activo') {
      const usuario = await prisma.usuario.findUnique({
        where: { id: idUsuario }
      });
      
      if (!usuario) return { actual: 0, meta };

      const fechaRegistro = new Date(usuario.fecha_registro);
      const hoy = new Date();
      const diasDesdeRegistro = Math.floor((hoy - fechaRegistro) / (1000 * 60 * 60 * 24));
      
      return { actual: diasDesdeRegistro, meta };
    }

    return { actual: 0, meta };
  }

  /**
   * Desbloquea un logro para un usuario
   */
  static async desbloquearLogro(idUsuario, idLogro, progresoActual) {
    return await prisma.logroUsuario.create({
      data: {
        id_usuario: idUsuario,
        id_logro: idLogro,
        progreso_actual: progresoActual
      }
    });
  }

  /**
   * Mapea el tipo del criterio a la categoría del alimento
   */
  static mapearTipoACategoria(tipo) {
    const mapeo = {
      'frutas': 'Frutas',
      'verduras': 'Verduras',
      'proteinas': 'Carnes y Pescados',
      'cereales': 'Cereales y Granos',
      'bebidas': 'Bebidas'
    };
    return mapeo[tipo] || tipo;
  }
}

module.exports = LogroModelo;
