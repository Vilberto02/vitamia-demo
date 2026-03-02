const PlanModelo = require('../models/PlanModelo');

const PlanControlador = {
  async obtenerTodos(req, res) {
    try {
      const planes = await PlanModelo.obtenerTodos();
      
      // Organizar recetas por tipo de comida dentro de cada plan (si existen)
      const planesOrganizados = planes.map(plan => {
        const recetasPorTipo = {};
        
        // Solo procesar recetas si existen
        if (plan.plan_recetas && plan.plan_recetas.length > 0) {
          plan.plan_recetas.forEach(pr => {
            recetasPorTipo[pr.tipo_comida.nombre] = pr.receta;
          });
        }
        
        return {
          id: plan.id,
          nombre: plan.nombre,
          informacion: plan.informacion,
          descripcion: plan.descripcion,
          beneficios: plan.beneficios,
          recetas: recetasPorTipo,
          tiene_recetas: plan.plan_recetas.length > 0
        };
      });
      
      res.json({
        total: planesOrganizados.length,
        planes: planesOrganizados
      });
    } catch (err) {
      console.error('Error al obtener planes:', err);
      res.status(500).json({ error: 'Error al obtener planes' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un número
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'ID inválido' });
      }
      
      const plan = await PlanModelo.obtenerPorId(parseInt(id));
      
      if (!plan) {
        return res.status(404).json({ 
          error: 'Plan no encontrado',
          mensaje: `No existe un plan con el ID ${id}`
        });
      }

      // Organizar recetas por tipo de comida (si existen)
      const recetasPorTipo = {};
      
      if (plan.plan_recetas && plan.plan_recetas.length > 0) {
        plan.plan_recetas.forEach(pr => {
          recetasPorTipo[pr.tipo_comida.nombre] = pr.receta;
        });
      }

      const planOrganizado = {
        id: plan.id,
        nombre: plan.nombre,
        informacion: plan.informacion,
        descripcion: plan.descripcion,
        beneficios: plan.beneficios,
        recetas: recetasPorTipo,
        tiene_recetas: plan.plan_recetas.length > 0
      };

      res.json(planOrganizado);
    } catch (err) {
      console.error('Error al obtener plan por ID:', err);
      res.status(500).json({ error: 'Error al obtener plan' });
    }
  },

  /**
   * Agregar plan a mi perfil
   * Cuando el usuario hace click en "Agregar a mi perfil" en una dieta
   * @route POST /api/planes/usuario
   */
  async agregarPlanUsuario(req, res) {
    try {
      const { id_plan, fecha } = req.body;

      // Validar campos requeridos
      if (!id_plan) {
        return res.status(400).json({ 
          error: 'Faltan campos requeridos',
          mensaje: 'El ID del plan es requerido'
        });
      }

      // Validar que el ID del plan sea válido
      if (isNaN(parseInt(id_plan))) {
        return res.status(400).json({ 
          error: 'ID de plan inválido',
          mensaje: 'El ID del plan debe ser un número'
        });
      }

      // Si no se proporciona fecha, usar la fecha actual
      const fechaPlan = fecha || new Date().toISOString().split('T')[0];

      // Verificar que el plan existe
      const planExiste = await PlanModelo.obtenerPorId(parseInt(id_plan));
      if (!planExiste) {
        return res.status(404).json({ 
          error: 'Plan no encontrado',
          mensaje: `No existe un plan con el ID ${id_plan}`
        });
      }

      // Verificar si el usuario ya tiene este plan agregado
      const planesUsuario = await PlanModelo.obtenerPlanesPorUsuario(req.usuario.id);
      const yaExiste = planesUsuario.some(pu => pu.id_plan === parseInt(id_plan));
      
      if (yaExiste) {
        return res.status(409).json({ 
          error: 'Plan ya agregado',
          mensaje: 'Ya tienes este plan en tu perfil',
          sugerencia: 'Puedes ver tus planes en /api/planes/mis-planes/usuario'
        });
      }

      // Agregar el plan al perfil del usuario
      const planUsuario = await PlanModelo.agregarPlanUsuario({
        id_plan: parseInt(id_plan),
        id_usuario: req.usuario.id,
        fecha: fechaPlan
      });

      res.status(201).json({ 
        mensaje: 'Plan agregado a tu perfil correctamente',
        exito: true,
        plan_agregado: {
          id: planUsuario.id,
          plan: {
            id: planUsuario.plan.id,
            nombre: planUsuario.plan.nombre,
            informacion: planUsuario.plan.informacion,
            descripcion: planUsuario.plan.descripcion,
            beneficios: planUsuario.plan.beneficios
          },
          fecha_inicio: planUsuario.fecha,
          usuario_id: req.usuario.id
        },
        siguiente_paso: 'Ahora puedes ver tus planes en /api/planes/mis-planes/usuario'
      });
    } catch (err) {
      console.error('Error al agregar plan a usuario:', err);
      
      // Manejar error de duplicado de Prisma
      if (err.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Plan ya agregado',
          mensaje: 'Ya tienes este plan en tu perfil'
        });
      }
      
      res.status(500).json({ 
        error: 'Error al agregar plan',
        mensaje: 'Ocurrió un error al agregar el plan a tu perfil'
      });
    }
  },

  /**
   * Obtener mis planes (los planes que he agregado a mi perfil)
   * @route GET /api/planes/mis-planes/usuario
   */
  async obtenerPlanesPorUsuario(req, res) {
    try {
      // Obtener todos los planes del usuario autenticado
      const planesUsuario = await PlanModelo.obtenerPlanesPorUsuario(req.usuario.id);
      
      // Formatear la respuesta
      const planesFormateados = planesUsuario.map(pu => ({
        id_relacion: pu.id,
        fecha_agregado: pu.fecha,
        plan: {
          id: pu.plan.id,
          nombre: pu.plan.nombre,
          informacion: pu.plan.informacion,
          descripcion: pu.plan.descripcion,
          beneficios: pu.plan.beneficios,
          tiene_recetas: pu.plan.plan_recetas.length > 0,
          total_recetas: pu.plan.plan_recetas.length
        }
      }));

      res.json({
        total: planesFormateados.length,
        usuario_id: req.usuario.id,
        mis_planes: planesFormateados,
        mensaje: planesFormateados.length === 0 
          ? 'No tienes planes agregados. Explora planes en /api/planes'
          : `Tienes ${planesFormateados.length} plan(es) en tu perfil`
      });
    } catch (err) {
      console.error('Error al obtener planes por usuario:', err);
      res.status(500).json({ 
        error: 'Error al obtener planes',
        mensaje: 'Ocurrió un error al consultar tus planes'
      });
    }
  },

  /**
   * Eliminar plan de mi perfil
   * @route DELETE /api/planes/usuario/:id
   */
  async eliminarPlanUsuario(req, res) {
    try {
      const { id } = req.params;
      
      // Validar ID
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ 
          error: 'ID inválido',
          mensaje: 'El ID debe ser un número'
        });
      }

      // Verificar que el plan pertenezca al usuario (seguridad)
      const planesUsuario = await PlanModelo.obtenerPlanesPorUsuario(req.usuario.id);
      const planExiste = planesUsuario.find(pu => pu.id === parseInt(id));
      
      if (!planExiste) {
        return res.status(404).json({ 
          error: 'Plan no encontrado',
          mensaje: 'No tienes un plan con ese ID en tu perfil'
        });
      }

      // Eliminar el plan
      await PlanModelo.eliminarPlanUsuario(parseInt(id));
      
      res.json({ 
        mensaje: 'Plan eliminado de tu perfil correctamente',
        exito: true,
        plan_eliminado: {
          id: planExiste.id,
          nombre: planExiste.plan.nombre
        }
      });
    } catch (err) {
      console.error('Error al eliminar plan de usuario:', err);
      res.status(500).json({ 
        error: 'Error al eliminar plan',
        mensaje: 'Ocurrió un error al eliminar el plan de tu perfil'
      });
    }
  }
};

module.exports = PlanControlador;
