# Endpoint: Información General del Usuario

## 📋 Descripción

Endpoint que devuelve información completa del usuario autenticado, incluyendo datos personales y estadísticas de consumo.

---

## 🔗 Detalles del Endpoint

**Método:** `GET`  
**URL:** `/api/usuarios/general`  
**Autenticación:** ✅ Requerida (JWT Token)

---

## 🔒 Autenticación

Este endpoint requiere un token JWT válido en el header Authorization:

```
Authorization: Bearer <tu_token_jwt>
```

---

## 📤 Response

### Success (200 OK)

```json
{
  "perfil": {
    "nombre": "Juan",
    "apellido": "Pérez",
    "nombre_completo": "Juan Pérez",
    "correo": "juan@ejemplo.com",
    "foto": "https://ejemplo.com/foto.jpg"
  },
  "estadisticas": {
    "peso": 70,
    "imc": 22.86,
    "altura": 1.75,
    "total_calorias_consumidas": 1500,
    "agua_consumida": 2000,
    "total_consumos": 15
  }
}
```

### Estructura de la Respuesta

#### Objeto `perfil`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String | Nombre del usuario |
| `apellido` | String | Apellido del usuario |
| `nombre_completo` | String | Nombre y apellido concatenados |
| `correo` | String | Correo electrónico del usuario |
| `foto` | String/null | URL de la foto de perfil (null si no tiene) |

#### Objeto `estadisticas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `peso` | Float | Peso actual del usuario en kg |
| `imc` | Float | Índice de Masa Corporal calculado |
| `altura` | Float | Altura del usuario en metros |
| `total_calorias_consumidas` | Integer | Total estimado de calorías consumidas |
| `agua_consumida` | Integer | Total de agua consumida en ml |
| `total_consumos` | Integer | Cantidad total de registros de consumo |

---

## ❌ Errores

### 401 Unauthorized - Token no proporcionado
```json
{
  "error": "Token no proporcionado",
  "mensaje": "Debes estar autenticado para acceder a este recurso"
}
```

### 401 Unauthorized - Token inválido
```json
{
  "error": "Token inválido",
  "mensaje": "El token proporcionado no es válido"
}
```

### 401 Unauthorized - Token expirado
```json
{
  "error": "Token expirado",
  "mensaje": "Tu sesión ha expirado, por favor inicia sesión nuevamente"
}
```

### 404 Not Found - Usuario no encontrado
```json
{
  "error": "Usuario no encontrado",
  "mensaje": "No se encontró información del usuario"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error al obtener información del usuario",
  "mensaje": "Ocurrió un error al consultar la información"
}
```

---

## 💻 Ejemplos de Uso

### JavaScript (Fetch API)

```javascript
const obtenerInformacionGeneral = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/general', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener información');
    }
    
    const data = await response.json();
    
    console.log('Perfil:', data.perfil);
    console.log('Estadísticas:', data.estadisticas);
    
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};
```

### JavaScript (Axios)

```javascript
import axios from 'axios';

const obtenerInformacionGeneral = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get('http://localhost:3000/api/usuarios/general', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Token inválido o expirado - redirigir a login
      window.location.href = '/login';
    }
    throw error;
  }
};
```

### React Hook Personalizado

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsuarioGeneral = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No hay token de autenticación');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          'http://localhost:3000/api/usuarios/general',
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        
        setUsuario(response.data);
      } catch (err) {
        setError(err.response?.data?.mensaje || 'Error al cargar usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  return { usuario, loading, error };
};

export default useUsuarioGeneral;
```

### PowerShell

```powershell
# Obtener token (después del login)
$token = "tu_token_jwt_aqui"

# Configurar headers
$headers = @{
    "Authorization" = "Bearer $token"
}

# Hacer la petición
$usuario = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/usuarios/general" `
    -Method GET `
    -Headers $headers

# Mostrar resultados
Write-Host "Usuario: $($usuario.perfil.nombre_completo)" -ForegroundColor Green
Write-Host "Peso: $($usuario.estadisticas.peso) kg" -ForegroundColor Cyan
Write-Host "IMC: $($usuario.estadisticas.imc)" -ForegroundColor Cyan
Write-Host "Total consumos: $($usuario.estadisticas.total_consumos)" -ForegroundColor Yellow
```

### cURL

```bash
# Hacer la petición con token
curl -X GET \
  'http://localhost:3000/api/usuarios/general' \
  -H 'Authorization: Bearer tu_token_jwt_aqui' \
  -H 'Content-Type: application/json'
```

---

## 🏗️ Arquitectura (MVC)

Este endpoint sigue el patrón Modelo-Vista-Controlador:

### 📁 Archivos Involucrados

1. **Ruta** (`routes/usuarioRoutes.js`):
   - Define la ruta `/general`
   - Aplica middleware de autenticación
   - Delega al controlador

2. **Controlador** (`controllers/UsuarioControlador.js`):
   - Método: `obtenerInformacionGeneral`
   - Valida el token del usuario
   - Llama al modelo para obtener datos
   - Estructura la respuesta JSON

3. **Modelo** (`models/UsuarioModelo.js`):
   - Método: `obtenerInformacionGeneral`
   - Consulta la base de datos
   - Calcula estadísticas
   - Retorna datos estructurados

4. **Middleware** (`middlewares/autenticacion.js`):
   - Verifica el token JWT
   - Extrae información del usuario
   - Adjunta `req.usuario` al request

---

## 📊 Notas sobre Estadísticas

### Calorías Consumidas
Actualmente se calcula como una estimación (100 calorías por consumo). Para cálculos precisos:

1. Agregar campo `calorias` al modelo `Alimento` en el schema de Prisma
2. Actualizar el modelo para sumar las calorías reales de cada alimento
3. Considerar la cantidad consumida en el cálculo

**Código futuro sugerido:**
```javascript
const totalCalorias = consumos.reduce((total, consumo) => {
  return total + (consumo.alimento.calorias * consumo.cantidad);
}, 0);
```

### Agua Consumida
Actualmente retorna 0. Para implementar:

1. **Opción A**: Agregar campo `tipo` o `es_liquido` al modelo `Alimento`
2. **Opción B**: Crear modelo separado `ConsumoAgua`
3. **Opción C**: Identificar alimentos específicos (id o nombre) que representen agua

---

## 🔄 Caso de Uso: Dashboard de Usuario

Este endpoint es ideal para mostrar un dashboard o perfil del usuario:

```javascript
const Dashboard = () => {
  const { usuario, loading, error } = useUsuarioGeneral();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="dashboard">
      <UserProfile 
        nombre={usuario.perfil.nombre_completo}
        correo={usuario.perfil.correo}
        foto={usuario.perfil.foto}
      />
      
      <StatsCard 
        peso={usuario.estadisticas.peso}
        imc={usuario.estadisticas.imc}
        calorias={usuario.estadisticas.total_calorias_consumidas}
        agua={usuario.estadisticas.agua_consumida}
        consumos={usuario.estadisticas.total_consumos}
      />
    </div>
  );
};
```

---

## ✅ Ventajas de Este Endpoint

1. **Un solo request**: Obtiene toda la información necesaria del usuario
2. **Rendimiento optimizado**: Hace todas las consultas en una sola llamada
3. **Datos consolidados**: Perfil + estadísticas en una respuesta
4. **Seguro**: Requiere autenticación JWT
5. **Escalable**: Fácil de extender con más estadísticas

---

## 🔐 Seguridad

- ✅ Requiere token JWT válido
- ✅ Solo retorna datos del usuario autenticado
- ✅ No expone contraseñas
- ✅ Valida existencia del usuario
- ✅ Manejo adecuado de errores

---

## 🚀 Mejoras Futuras

1. **Calorías precisas**: Agregar campo de calorías por alimento
2. **Agua detallada**: Sistema de tracking de agua consumida
3. **Fechas de estadísticas**: Filtrar por rango de fechas
4. **Caché**: Implementar caché para estadísticas
5. **Metas**: Incluir progreso hacia metas del usuario
6. **Gráficas**: Datos históricos para visualización
7. **Macronutrientes**: Proteínas, carbohidratos, grasas
8. **Actividad física**: Integrar con sistema de ejercicios

---

## 📞 Soporte

Para dudas o problemas con este endpoint, contacta al equipo de desarrollo.
