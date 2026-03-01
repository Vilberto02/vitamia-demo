const ConsumoModelo = require('../models/ConsumoModelo');
const LogroControlador = require('./LogroControlador');

const ConsumoControlador = {
  /**
   * Obtener todos los consumos (función admin)
   * @route GET /api/consumos/todos
   */
  async obtenerTodos(req, res) {
    try {
      const consumos = await ConsumoModelo.obtenerTodos();
      res.json(consumos);
    } catch (err) {
      console.error('Error al obtener consumos:', err);
      res.status(500).json({ error: 'Error al obtener consumos' });
    }
  },

  /**
   * Obtener consumos del usuario autenticado segmentados por tipo de comida
   * Solo muestra los consumos del día actual
   * @route GET /api/consumos
   * @requires Token JWT en el header Authorization
   */
  async obtenerPorUsuario(req, res) {
    try {
      // req.usuario viene del middleware de autenticación
      if (!req.usuario || !req.usuario.id) {
        return res.status(401).json({ 
          error: 'No autenticado',
          mensaje: 'No se pudo verificar la identidad del usuario'
        });
      }

      const idUsuario = req.usuario.id;

      // Obtener consumos del día actual del usuario desde el modelo
      const consumosPorTipo = await ConsumoModelo.obtenerConsumosPorTipo(idUsuario, true);

      // Validar que se obtuvieron datos
      if (!consumosPorTipo) {
        return res.status(404).json({ 
          error: 'No se encontraron consumos',
          mensaje: 'El usuario no tiene consumos registrados'
        });
      }

      // Calcular totales de calorías por tipo de comida
      const calcularCaloriasTotales = (consumos) => {
        return consumos.reduce((total, consumo) => total + consumo.calorias_totales, 0);
      };

      const caloriasDesayuno = calcularCaloriasTotales(consumosPorTipo.desayuno);
      const caloriasAlmuerzo = calcularCaloriasTotales(consumosPorTipo.almuerzo);
      const caloriasCena = calcularCaloriasTotales(consumosPorTipo.cena);
      const caloriasSnack = calcularCaloriasTotales(consumosPorTipo.snack);

      // Obtener fecha actual
      const fechaActual = new Date().toISOString().split('T')[0];

      // Agregar información adicional a la respuesta
      const respuesta = {
        usuario_id: idUsuario,
        fecha: fechaActual,
        consumos: consumosPorTipo,
        resumen: {
          total_desayuno: consumosPorTipo.desayuno.length,
          total_almuerzo: consumosPorTipo.almuerzo.length,
          total_cena: consumosPorTipo.cena.length,
          total_snack: consumosPorTipo.snack.length,
          total_general: 
            consumosPorTipo.desayuno.length + 
            consumosPorTipo.almuerzo.length + 
            consumosPorTipo.cena.length + 
            consumosPorTipo.snack.length,
          calorias: {
            desayuno: Math.round(caloriasDesayuno * 100) / 100,
            almuerzo: Math.round(caloriasAlmuerzo * 100) / 100,
            cena: Math.round(caloriasCena * 100) / 100,
            snack: Math.round(caloriasSnack * 100) / 100,
            total: Math.round((caloriasDesayuno + caloriasAlmuerzo + caloriasCena + caloriasSnack) * 100) / 100
          }
        }
      };

      res.json(respuesta);
    } catch (err) {
      console.error('Error al obtener consumos del usuario:', err);
      res.status(500).json({ 
        error: 'Error al obtener consumos',
        mensaje: 'Ocurrió un error al consultar los consumos del usuario'
      });
    }
  },

  /**
   * Obtener consumos del usuario en una fecha específica, agrupados por tipo de comida
   * @route GET /api/consumos/fecha/:fecha
   * @requires Token JWT en el header Authorization
   */
  async obtenerPorUsuarioYFecha(req, res) {
    try {
      // Validar autenticación
      if (!req.usuario || !req.usuario.id) {
        return res.status(401).json({ 
          error: 'No autenticado',
          mensaje: 'No se pudo verificar la identidad del usuario'
        });
      }

      const { fecha } = req.params;
      const idUsuario = req.usuario.id;

      // Validar formato de fecha
      if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return res.status(400).json({ 
          error: 'Fecha inválida',
          mensaje: 'La fecha debe estar en formato YYYY-MM-DD'
        });
      }
      
      // Obtener consumos de la fecha específica
      const consumosPorTipo = await ConsumoModelo.obtenerPorUsuarioYFecha(idUsuario, fecha);
      
      // Calcular totales de calorías por tipo de comida
      const calcularCaloriasTotales = (consumos) => {
        return consumos.reduce((total, consumo) => total + consumo.calorias_totales, 0);
      };

      const caloriasDesayuno = calcularCaloriasTotales(consumosPorTipo.desayuno);
      const caloriasAlmuerzo = calcularCaloriasTotales(consumosPorTipo.almuerzo);
      const caloriasCena = calcularCaloriasTotales(consumosPorTipo.cena);
      const caloriasSnack = calcularCaloriasTotales(consumosPorTipo.snack);

      // Estructurar respuesta
      const respuesta = {
        usuario_id: idUsuario,
        fecha: fecha,
        consumos: consumosPorTipo,
        resumen: {
          total_desayuno: consumosPorTipo.desayuno.length,
          total_almuerzo: consumosPorTipo.almuerzo.length,
          total_cena: consumosPorTipo.cena.length,
          total_snack: consumosPorTipo.snack.length,
          total_general: 
            consumosPorTipo.desayuno.length + 
            consumosPorTipo.almuerzo.length + 
            consumosPorTipo.cena.length + 
            consumosPorTipo.snack.length,
          calorias: {
            desayuno: Math.round(caloriasDesayuno * 100) / 100,
            almuerzo: Math.round(caloriasAlmuerzo * 100) / 100,
            cena: Math.round(caloriasCena * 100) / 100,
            snack: Math.round(caloriasSnack * 100) / 100,
            total: Math.round((caloriasDesayuno + caloriasAlmuerzo + caloriasCena + caloriasSnack) * 100) / 100
          }
        }
      };
      
      res.json(respuesta);
    } catch (err) {
      console.error('Error al obtener consumos por usuario y fecha:', err);
      res.status(500).json({ 
        error: 'Error al obtener consumos',
        mensaje: 'Ocurrió un error al consultar los consumos de la fecha especificada'
      });
    }
  },

  /**
   * Registrar un nuevo consumo de alimento
   * @route POST /api/consumos
   * @requires Token JWT en el header Authorization
   */
  async agregarConsumo(req, res) {
    try {
      // req.usuario viene del middleware de autenticación
      if (!req.usuario || !req.usuario.id) {
        return res.status(401).json({ 
          error: 'No autenticado',
          mensaje: 'No se pudo verificar la identidad del usuario'
        });
      }

      const idUsuario = req.usuario.id;
      const { id_alimento, cantidad, unidad, tipo_comida } = req.body;

      // Validar que los datos requeridos estén presentes
      if (!id_alimento) {
        return res.status(400).json({ 
          error: 'Datos incompletos',
          mensaje: 'El ID del alimento es requerido'
        });
      }

      if (!cantidad || cantidad <= 0) {
        return res.status(400).json({ 
          error: 'Cantidad inválida',
          mensaje: 'La cantidad debe ser un número mayor a 0'
        });
      }

      // Nota: unidad es opcional, si no se envía se usa la del alimento

      if (!tipo_comida || tipo_comida.trim() === '') {
        return res.status(400).json({ 
          error: 'Datos incompletos',
          mensaje: 'El tipo de comida es requerido (desayuno, almuerzo, cena o snack)'
        });
      }

      // Validar que el tipo de comida sea válido
      const tiposValidos = ['desayuno', 'almuerzo', 'cena', 'snack'];
      if (!tiposValidos.includes(tipo_comida.toLowerCase())) {
        return res.status(400).json({ 
          error: 'Tipo de comida inválido',
          mensaje: `El tipo de comida debe ser uno de: ${tiposValidos.join(', ')}`
        });
      }

      // Registrar el consumo en el modelo
      const consumo = await ConsumoModelo.registrarConsumo(
        idUsuario,
        parseInt(id_alimento),
        cantidad,
        unidad, // Puede ser null/undefined, el modelo usará la unidad del alimento
        tipo_comida
      );

      // Calcular calorías totales del consumo
      const caloriasConsumo = Math.round(cantidad * consumo.alimento.calorias * 100) / 100;

      // Verificar logros después de agregar el consumo
      const logros = await LogroControlador.verificarLogros(idUsuario);

      // Estructurar la respuesta
      const respuesta = {
        mensaje: 'Consumo registrado exitosamente',
        consumo: {
          id: consumo.id,
          alimento: consumo.alimento.nombre,
          cantidad: consumo.cantidad,
          unidad: consumo.unidad,
          tipo_comida: consumo.tipo_comida.nombre,
          fecha: consumo.fecha,
          calorias_unitarias: consumo.alimento.calorias,
          calorias_totales: caloriasConsumo
        },
        resumen: {
          descripcion: `${consumo.cantidad} ${consumo.unidad} de ${consumo.alimento.nombre}`,
          tipo: consumo.tipo_comida.nombre,
          calorias: caloriasConsumo
        },
        logros: {
          nuevos_desbloqueados: logros.nuevos,
          total_nuevos: logros.nuevos.length
        }
      };

      res.status(201).json(respuesta);
    } catch (err) {
      console.error('Error al registrar consumo:', err);
      
      // Manejar errores específicos del modelo
      if (err.message.includes('no existe') || err.message.includes('no es válido')) {
        return res.status(404).json({ 
          error: 'Datos no encontrados',
          mensaje: err.message
        });
      }
      
      res.status(500).json({ 
        error: 'Error al registrar consumo',
        mensaje: 'Ocurrió un error al guardar el consumo'
      });
    }
  },

  async eliminarConsumo(req, res) {
    try {
      const { id } = req.params;
      await ConsumoModelo.eliminarConsumo(parseInt(id));
      res.json({ mensaje: 'Consumo eliminado correctamente' });
    } catch (err) {
      console.error('Error al eliminar consumo:', err);
      res.status(500).json({ error: 'Error al eliminar consumo' });
    }
  },

  /**
   * Obtener promedio de calorías consumidas por mes del usuario autenticado
   * @route GET /api/consumos/calorias
   * @requires Token JWT en el header Authorization
   */
  async obtenerCalorias(req, res) {
    try {
      // req.usuario viene del middleware de autenticación
      if (!req.usuario || !req.usuario.id) {
        return res.status(401).json({ 
          error: 'No autenticado',
          mensaje: 'No se pudo verificar la identidad del usuario'
        });
      }

      const idUsuario = req.usuario.id;

      // Obtener calorías por mes desde el modelo
      const caloriasPorMes = await ConsumoModelo.obtenerCaloriasPorMes(idUsuario);

      // Validar que se obtuvieron datos
      if (!caloriasPorMes || caloriasPorMes.length === 0) {
        return res.status(404).json({ 
          error: 'No se encontraron datos de calorías',
          mensaje: 'El usuario no tiene consumos registrados con información de calorías'
        });
      }

      // Estructurar la respuesta
      const respuesta = {
        usuario_id: idUsuario,
        calorias_por_mes: caloriasPorMes,
        resumen: {
          total_meses: caloriasPorMes.length,
          promedio_general: Math.round(
            caloriasPorMes.reduce((acc, mes) => acc + mes.promedio_calorias, 0) / caloriasPorMes.length * 100
          ) / 100,
          mes_mas_calorias: caloriasPorMes.reduce((prev, current) => 
            (current.total_calorias > prev.total_calorias) ? current : prev
          ),
          mes_menos_calorias: caloriasPorMes.reduce((prev, current) => 
            (current.total_calorias < prev.total_calorias) ? current : prev
          )
        }
      };

      res.json(respuesta);
    } catch (err) {
      console.error('Error al obtener calorías del usuario:', err);
      res.status(500).json({ 
        error: 'Error al obtener calorías',
        mensaje: 'Ocurrió un error al consultar las calorías del usuario'
      });
    }
  }
};

module.exports = ConsumoControlador;
