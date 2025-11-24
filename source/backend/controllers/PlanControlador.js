const PlanModelo = require('../models/PlanModelo');

const PlanControlador = {
  async obtenerTodos(req, res) {
    try {
      const planes = await PlanModelo.obtenerTodos();
      
      // Organizar recetas por tipo de comida dentro de cada plan
      const planesOrganizados = planes.map(plan => {
        const recetasPorTipo = {};
        plan.plan_recetas.forEach(pr => {
          recetasPorTipo[pr.tipo_comida.nombre] = pr.receta;
        });
        
        return {
          id: plan.id,
          nombre: plan.nombre,
          informacion: plan.informacion,
          descripcion: plan.descripcion,
          beneficios: plan.beneficios,
          recetas: recetasPorTipo
        };
      });
      
      res.json(planesOrganizados);
    } catch (err) {
      console.error('Error al obtener planes:', err);
      res.status(500).json({ error: 'Error al obtener planes' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const plan = await PlanModelo.obtenerPorId(parseInt(id));
      
      if (!plan) {
        return res.status(404).json({ error: 'Plan no encontrado' });
      }

      // Organizar recetas por tipo de comida
      const recetasPorTipo = {};
      plan.plan_recetas.forEach(pr => {
        recetasPorTipo[pr.tipo_comida.nombre] = pr.receta;
      });

      const planOrganizado = {
        id: plan.id,
        nombre: plan.nombre,
        informacion: plan.informacion,
        descripcion: plan.descripcion,
        beneficios: plan.beneficios,
        recetas: recetasPorTipo
      };

      res.json(planOrganizado);
    } catch (err) {
      console.error('Error al obtener plan por ID:', err);
      res.status(500).json({ error: 'Error al obtener plan' });
    }
  },

  async agregarPlanUsuario(req, res) {
    try {
      const { id_plan, fecha } = req.body;

      if (!id_plan || !fecha) {
        return res.status(400).json({ 
          error: 'Faltan campos requeridos',
          campos: ['id_plan', 'fecha']
        });
      }

      // Usar el ID del usuario autenticado del token
      const planUsuario = await PlanModelo.agregarPlanUsuario({
        id_plan,
        id_usuario: req.usuario.id,
        fecha
      });

      res.status(201).json({ 
        mensaje: 'Plan agregado al usuario correctamente', 
        planUsuario 
      });
    } catch (err) {
      console.error('Error al agregar plan a usuario:', err);
      res.status(500).json({ error: 'Error al agregar plan a usuario', detalle: err.message });
    }
  },

  async obtenerPlanesPorUsuario(req, res) {
    try {
      // Usar el ID del usuario autenticado del token
      const planes = await PlanModelo.obtenerPlanesPorUsuario(req.usuario.id);
      res.json(planes);
    } catch (err) {
      console.error('Error al obtener planes por usuario:', err);
      res.status(500).json({ error: 'Error al obtener planes por usuario' });
    }
  },

  async eliminarPlanUsuario(req, res) {
    try {
      const { id } = req.params;
      await PlanModelo.eliminarPlanUsuario(parseInt(id));
      res.json({ mensaje: 'Plan eliminado del usuario correctamente' });
    } catch (err) {
      console.error('Error al eliminar plan de usuario:', err);
      res.status(500).json({ error: 'Error al eliminar plan de usuario' });
    }
  }
};

module.exports = PlanControlador;
