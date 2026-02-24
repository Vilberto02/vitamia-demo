const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar y validar tokens JWT
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Siguiente middleware
 */
const verificarToken = (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Token no proporcionado',
        mensaje: 'Debes estar autenticado para acceder a este recurso'
      });
    }

    // El formato esperado es: "Bearer TOKEN"
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({ 
        error: 'Token inválido',
        mensaje: 'Formato de token incorrecto. Use: Bearer <token>'
      });
    }

    // Verificar que JWT_SECRET esté configurado
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET no está configurado en las variables de entorno');
      return res.status(500).json({ 
        error: 'Error de configuración del servidor'
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Validar que el token tenga los campos necesarios
    if (!decoded.id || !decoded.correo) {
      return res.status(401).json({ 
        error: 'Token inválido',
        mensaje: 'El token no contiene la información necesaria'
      });
    }
    
    // Agregar información del usuario al request para uso en los controladores
    req.usuario = {
      id: decoded.id,
      correo: decoded.correo,
      nombre: decoded.nombre,
      apellido: decoded.apellido
    };

    // Continuar con el siguiente middleware
    next();
  } catch (error) {
    // Manejar diferentes tipos de errores de JWT
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado',
        mensaje: 'Tu sesión ha expirado, por favor inicia sesión nuevamente'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Token inválido',
        mensaje: 'El token proporcionado no es válido'
      });
    }

    if (error.name === 'NotBeforeError') {
      return res.status(401).json({ 
        error: 'Token no válido aún',
        mensaje: 'El token no es válido todavía'
      });
    }

    // Error genérico
    console.error('Error al verificar token:', error);
    return res.status(500).json({ 
      error: 'Error al verificar token',
      mensaje: 'Ocurrió un error al validar tu autenticación'
    });
  }
};

module.exports = verificarToken;
