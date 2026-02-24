# Sistema de Autenticación - Vitamia API

## 📋 Descripción General

Este documento describe el sistema de autenticación implementado en la API de Vitamia, utilizando JSON Web Tokens (JWT) para autenticación stateless y segura.

## 🔐 Características de Seguridad

### Contraseñas
- **Hashing**: Utilizamos bcrypt con 10 rondas de salt
- **Requisitos mínimos**:
  - Mínimo 8 caracteres
  - Debe contener al menos una letra
  - Debe contener al menos un número

### Tokens JWT
- **Expiración**: 7 días
- **Algoritmo**: HS256 (HMAC SHA-256)
- **Información incluida**:
  - ID del usuario
  - Correo electrónico
  - Nombre completo
  - Issuer y Audience para mayor seguridad

## 🚀 Endpoints

### 1. Registro de Usuario

**POST** `/api/auth/registro`

Registra un nuevo usuario en el sistema.

#### Request Body
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@ejemplo.com",
  "contrasena": "password123",
  "fecha_nacimiento": "2000-01-15",
  "peso": 70,
  "altura": 1.75,
  "meta": "Mantener una dieta balanceada" // Opcional
}
```

#### Validaciones
- Todos los campos son requeridos excepto `meta`
- El correo debe tener formato válido
- La contraseña debe tener mínimo 8 caracteres con letras y números
- El peso debe estar entre 1 y 500 kg
- La altura debe estar entre 0.1 y 3 metros
- El usuario debe tener al menos 13 años

#### Response Success (201)
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan@ejemplo.com",
    "fecha_nacimiento": "2000-01-15T00:00:00.000Z",
    "peso": 70,
    "altura": 1.75,
    "imc": 22.86,
    "meta": "Mantener una dieta balanceada",
    "imagen": null
  }
}
```

#### Response Error (400, 409, 500)
```json
{
  "error": "El correo ya está registrado"
}
```

---

### 2. Inicio de Sesión

**POST** `/api/auth/login`

Iniciar sesión con credenciales existentes.

#### Request Body
```json
{
  "correo": "juan@ejemplo.com",
  "contrasena": "password123"
}
```

#### Response Success (200)
```json
{
  "mensaje": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan@ejemplo.com",
    ...
  }
}
```

#### Response Error (401)
```json
{
  "error": "Credenciales inválidas",
  "mensaje": "El correo o la contraseña son incorrectos"
}
```

---

### 3. Obtener Usuario Actual

**GET** `/api/auth/me`

Obtiene la información del usuario autenticado.

#### Headers Requeridos
```
Authorization: Bearer <token>
```

#### Response Success (200)
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@ejemplo.com",
  "fecha_nacimiento": "2000-01-15T00:00:00.000Z",
  "peso": 70,
  "altura": 1.75,
  "imc": 22.86,
  "meta": "Mantener una dieta balanceada",
  "imagen": null
}
```

#### Response Error (401, 404)
```json
{
  "error": "Token no proporcionado",
  "mensaje": "Debes estar autenticado para acceder a este recurso"
}
```

---

## 🔒 Rutas Protegidas

Todas las siguientes rutas requieren autenticación mediante token JWT:

- **Recetas**: `/api/recetas/*`
- **Alimentos**: `/api/alimentos/*`
- **Consumos**: `/api/consumos/*`
- **Usuarios**: `/api/usuarios/*`
- **Planes**: `/api/planes/*`
- **Información**: `/api/informacion/*`
- **Recetas Consumidas**: `/api/recetas-consumidas/*`

### Formato del Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 💻 Ejemplo de Uso (JavaScript)

### Registro
```javascript
const registro = async (datos) => {
  const response = await fetch('http://localhost:3000/api/auth/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  
  const resultado = await response.json();
  
  if (response.ok) {
    // Guardar token en localStorage
    localStorage.setItem('token', resultado.token);
    return resultado.usuario;
  } else {
    throw new Error(resultado.error);
  }
};
```

### Login
```javascript
const login = async (correo, contrasena) => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo, contrasena })
  });
  
  const resultado = await response.json();
  
  if (response.ok) {
    localStorage.setItem('token', resultado.token);
    return resultado.usuario;
  } else {
    throw new Error(resultado.error);
  }
};
```

### Petición Autenticada
```javascript
const obtenerRecetas = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/recetas', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    return await response.json();
  } else if (response.status === 401) {
    // Token expirado o inválido - redirigir a login
    window.location.href = '/login';
  }
};
```

---

## 🛡️ Mejores Prácticas Implementadas

1. **Separación de responsabilidades**: Controlador, Modelo y Middleware separados
2. **Validación exhaustiva**: Validación de entrada en múltiples niveles
3. **Manejo de errores**: Respuestas de error claras y seguras
4. **No revelar información sensible**: Los mensajes de error no revelan si un usuario existe
5. **Tokens con expiración**: Los tokens tienen validez limitada (7 días)
6. **Contraseñas hasheadas**: Nunca se almacenan contraseñas en texto plano
7. **Normalización de datos**: Correos en minúsculas y trimmed
8. **Headers estandarizados**: Uso de Bearer token en Authorization
9. **Códigos HTTP correctos**: Uso apropiado de códigos de estado
10. **Sin contraseñas en respuestas**: Las contraseñas nunca se devuelven en las respuestas

---

## ⚙️ Variables de Entorno

Asegúrate de tener configuradas estas variables en tu archivo `.env`:

```env
JWT_SECRET=tu_clave_secreta_jwt_muy_segura
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/vitamia_db"
```

**IMPORTANTE**: El `JWT_SECRET` debe ser una cadena aleatoria y compleja de al menos 32 caracteres.

---

## 🐛 Errores Comunes

### Token Expirado (401)
```json
{
  "error": "Token expirado",
  "mensaje": "Tu sesión ha expirado, por favor inicia sesión nuevamente"
}
```
**Solución**: Solicitar al usuario que inicie sesión nuevamente.

### Token Inválido (401)
```json
{
  "error": "Token inválido",
  "mensaje": "El token proporcionado no es válido"
}
```
**Solución**: Verificar formato del token y que sea un token válido de tu sistema.

### Token No Proporcionado (401)
```json
{
  "error": "Token no proporcionado",
  "mensaje": "Debes estar autenticado para acceder a este recurso"
}
```
**Solución**: Incluir el header `Authorization: Bearer <token>` en la petición.

---

## 📝 Notas de Desarrollo

- Los tokens se generan con información del usuario para reducir consultas a BD
- La expiración de 7 días puede ajustarse según necesidades
- Se puede implementar refresh tokens para mejorar la experiencia de usuario
- Considerar rate limiting para prevenir ataques de fuerza bruta
- En producción, usar HTTPS para todas las comunicaciones
