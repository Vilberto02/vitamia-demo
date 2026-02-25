const LogroModelo = require('../models/LogroModelo');

const LogroControlador = {
  
  /**
   * Obtiene los logros del usuario actual con su progreso
   * Solo muestra logros desbloqueados y en progreso (personalizados por usuario)
   */
  async obtenerLogrosUsuario(req, res) {
    try {
      // Verificar autenticación
      if (!req.usuario || !req.usuario.id) {
        return res.status(401).json({ 
          exito: false,
          mensaje: 'Debes iniciar sesión para ver tus logros'
        });
      }

      const idUsuario = req.usuario.id;
      
      // Evaluar logros del usuario
      const resultado = await LogroModelo.evaluarLogros(idUsuario);
      
      res.json({
        exito: true,
        usuario_id: idUsuario,
        logros_desbloqueados: resultado.logrosDesbloqueados,
        logros_en_progreso: resultado.logrosEnProgreso,
        total_desbloqueados: resultado.logrosDesbloqueados.length,
        total_en_progreso: resultado.logrosEnProgreso.length,
        mensaje: resultado.logrosDesbloqueados.length === 0 && resultado.logrosEnProgreso.length === 0
          ? 'Comienza a registrar tus comidas para desbloquear logros'
          : undefined
      });
    } catch (error) {
      console.error('Error al obtener logros del usuario:', error);
      res.status(500).json({
        exito: false,
        mensaje: 'Error al obtener tus logros',
        error: error.message
      });
    }
  },

  /**
   * Verifica y actualiza los logros después de una acción
   */
  async verificarLogros(idUsuario) {
    try {
      const resultado = await LogroModelo.evaluarLogros(idUsuario);
      
      // Retornar solo los logros nuevos desbloqueados
      const logrosNuevos = resultado.logrosDesbloqueados.filter(l => l.nuevo);
      
      return {
        nuevos: logrosNuevos,
        en_progreso: resultado.logrosEnProgreso
      };
    } catch (error) {
      console.error('Error al verificar logros:', error);
      return { nuevos: [], en_progreso: [] };
    }
  }
};

module.exports = LogroControlador;
