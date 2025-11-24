const jwt = require('jsonwebtoken');

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
        mensaje: 'Formato de token incorrecto'
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Agregar información del usuario al request
    req.usuario = {
      id: decoded.id,
      correo: decoded.correo,
      nombre: decoded.nombre,
      apellido: decoded.apellido
    };

    next();
  } catch (error) {
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

    return res.status(500).json({ 
      error: 'Error al verificar token',
      detalle: error.message 
    });
  }
};

module.exports = verificarToken;
