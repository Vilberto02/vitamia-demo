# 🥗 VitaMia Backend - API Documentation

Backend de VitaMia con **generación de recetas mediante Google Gemini (IA gratuita)** basada en alimentos seleccionados por el usuario.

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
```

**3. Editar `.env` con tus credenciales:**

```env
DATABASE_URL="mysql://root:password@localhost:3306/vitamia_db"
JWT_SECRET="tu-secreto-muy-seguro"
GEMINI_API_KEY="tu-api-key-de-gemini"  # ⚠️ OBLIGATORIO para recetas con IA
PORT=3000
```

**4. Obtener GEMINI_API_KEY (gratis):**

1. Ve a https://aistudio.google.com/app/apikey
2. Haz clic en "Create API key"
3. Copia la key y pégala en `.env`

📖 **Guía completa:** [../../docs/GEMINI_API_SETUP.md](../../docs/GEMINI_API_SETUP.md)

**5. Iniciar servidor:**

```bash
node index.js
```

✅ Deberías ver: `Backend corriendo en el puerto 3000`

---

## 🔑 Autenticación

Todas las rutas (excepto login/registro) requieren token JWT:

```
Authorization: Bearer <token>
```

### Endpoints de Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Login (retorna token) |

---

## 🤖 Recetas con IA (Google Gemini)

### Generar Recetas Personalizadas

```http
POST /api/recetas/tipo/:tipo
Authorization: Bearer <token>
Content-Type: application/json

{
  "alimentos": [
    { "nombre": "Huevos", "categoria": "Proteínas", "cantidad": 6, "unidad": "unidades" },
    { "nombre": "Pan Integral", "categoria": "Carbohidratos", "cantidad": 1, "unidad": "paquete" },
    { "nombre": "Aguacate", "categoria": "Grasas Saludables", "cantidad": 2, "unidad": "unidades" }
  ]
}
```

**Parámetros:**
- `:tipo` → `desayuno`, `almuerzo`, `cena`, `snack`
- `alimentos` → Array con mínimo 3 alimentos

**Respuesta exitosa:**
```json
{
  "origen": "gemini",
  "tipo_comida": "desayuno",
  "alimentos_usados": ["Huevos", "Pan Integral", "Aguacate"],
  "recetas": [
    {
      "titulo": "Tostadas de Aguacate con Huevo Pochado",
      "tiempo_preparacion": "15 minutos",
      "ingredientes": ["2 huevos", "2 rebanadas pan integral", "1 aguacate"],
      "procedimiento": ["Paso 1...", "Paso 2..."],
      "beneficios": "Rico en proteínas y grasas saludables",
      "calorias_aproximadas": 320
    }
    // ... 2 recetas más
  ],
  "mensaje": "Recetas generadas con IA para desayuno"
}
```

**Comportamiento:**
- **Con ≥3 alimentos:** Genera 3 recetas únicas con Google Gemini (API gratuita)
- **Con <3 alimentos:** Retorna error 400 con recetas sugeridas de BD

**Importante:** El frontend debe enviar el array de alimentos. NO existe tabla de despensa en BD.

---

## 📋 Endpoints Completos

### Alimentos
- `GET /api/alimentos` - Lista de todos los alimentos
- `GET /api/alimentos/:id` - Detalle de un alimento específico

### Recetas
- `GET /api/recetas` - Todas las recetas de la base de datos
- `POST /api/recetas/tipo/:tipo` - **Generar recetas con IA** (enviar array de alimentos)

### Consumo
- `GET /api/consumos` - Mi historial de consumo
- `POST /api/consumos` - Registrar consumo de alimento
- `GET /api/consumos/dia/:fecha` - Consumo de un día específico (formato: YYYY-MM-DD)

### Planes
- `GET /api/planes` - Planes disponibles
- `GET /api/planes/usuario` - Mis planes activos

### Logros
- `GET /api/logros` - Todos los logros del sistema
- `GET /api/logros/usuario` - Mis logros (ganados y en progreso)

### Usuario
- `GET /api/usuarios/perfil` - Mi perfil
- `PUT /api/usuarios/perfil` - Actualizar perfil
- `GET /api/usuarios/estadisticas` - Mis estadísticas de consumo

### Información (Dashboard)
- `GET /api/informacion/dashboard` - Dashboard completo con todas las métricas

---

## 🔧 Tecnologías

- **Node.js** + Express 5.1.0
- **MySQL** + Prisma ORM 5.22.0
- **Google Gemini API** - gemini-2.5-flash-lite (gratuito)
- **JWT** - Autenticación con tokens
- **bcryptjs** - Hash seguro de contraseñas
- **dotenv** - Variables de entorno
- **cors** - Manejo de CORS

---

## 🤖 Configuración Google Gemini

### 1. Obtener API Key (100% GRATIS)

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Haz clic en "Create API key"
3. Selecciona "Create API key in new project"
4. Copia la key generada

### 2. Configurar en .env

```env
GEMINI_API_KEY=tu-api-key-aqui
```

### 3. Reiniciar servidor

```bash
node index.js
```

**Modelo usado:** `gemini-2.5-flash-lite` (100% gratuito, 1,500 requests/día)

**Ver manual completo:** [docs/GEMINI_API_SETUP.md](../../docs/GEMINI_API_SETUP.md)

---

## 📁 Estructura del Proyecto

```
source/backend/
├── index.js                 # Servidor principal
├── prismaClient.js          # Cliente de Prisma
├── database.sql             # Schema SQL completo
├── controllers/             # Lógica de negocio
│   ├── RecetaControlador.js # ✨ Incluye integración Google Gemini
│   ├── AutenticacionControlador.js
│   ├── AlimentoControlador.js
│   ├── ConsumoControlador.js
│   ├── PlanControlador.js
│   ├── UsuarioControlador.js
│   └── InformacionControlador.js
├── models/                  # Acceso a datos (Prisma)
│   ├── RecetaModelo.js
│   ├── AutenticacionModelo.js
│   ├── AlimentoModelo.js
│   ├── ConsumoModelo.js
│   ├── PlanModelo.js
│   └── UsuarioModelo.js
├── routes/                  # Definición de endpoints
│   ├── recetaRoutes.js      # ✨ POST /tipo/:tipo para IA
│   ├── autenticacionRoutes.js
│   ├── alimentoRoutes.js
│   ├── consumoRoutes.js
│   ├── planRoutes.js
│   ├── usuarioRoutes.js
│   ├── informacionRoutes.js
│   └── recetaConsumidaRoutes.js
├── middlewares/             # Middlewares personalizados
│   └── autenticacion.js     # Verificación JWT
└── prisma/                  # Configuración Prisma ORM
    └── schema.prisma
```

---

## 🗄️ Base de Datos

### Principales Tablas

- **usuario** - Datos de usuarios (perfil, objetivos)
- **alimento** - Catálogo de alimentos con info nutricional
- **consumo** - Registro de consumo diario
- **receta** - Recetas almacenadas en BD
- **plan** - Planes alimenticios del usuario
- **logro** - Sistema de logros/achievements
- **usuario_logro** - Relación usuario-logro con progreso
- **receta_consumida** - Historial de recetas preparadas

**Nota:** NO existe tabla `alimento_disponible`. Los alimentos se envían desde el frontend.

---

## 🐛 Debugging

**Ver logs del servidor:**
```bash
node index.js
```

**Logs importantes al generar recetas:**
```
🍳 Generando recetas para desayuno con 4 alimentos
📡 Enviando request a Google Gemini...
✅ Respuesta recibida de Gemini
```

**Errores comunes:**

| Error | Causa | Solución |
|-------|-------|----------|
| `GEMINI_API_KEY no está configurada` | Falta API key en .env | Agregar GEMINI_API_KEY |
| `Alimentos insuficientes` | Array con <3 alimentos | Enviar mínimo 3 |
| `Datos inválidos` | Body sin array alimentos | Verificar formato JSON |
| `Error 401` | Token JWT inválido/expirado | Hacer login nuevamente |
| `Error 429` | Excediste cuota gratuita | Esperar o crear nueva API key |

---

## 📝 Variables de Entorno Requeridas

```env
# Base de datos
DATABASE_URL=mysql://usuario:contraseña@localhost:3306/vitamia

# JWT para autenticación
JWT_SECRET=tu-secret-key-muy-segura-aqui

# OpenAI (requerido para generación de recetas)
OPENAI_API_KEY=sk-proj-tu-api-key-real-aqui
```

**Archivo de ejemplo:** `.env.example`

---

## ✅ Estado de Integración

| Característica | Estado |
|---------------|--------|
| API REST completa | ✅ Funcional |
| Autenticación JWT | ✅ Funcional |
| CRUD de alimentos | ✅ Funcional |
| Registro de consumo | ✅ Funcional |
| Planes alimenticios | ✅ Funcional |
| Sistema de logros | ✅ Funcional |
| **Generación con IA** | ✅ **Integrada** |
| Manejo de errores | ✅ Implementado |
| Documentación | ✅ Completa |

---

## 🧪 Testing

### Test de Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "test@test.com",
    "contrasena": "password"
  }'
```

### Test de Generación de Recetas

```bash
# Usar el token obtenido en el login
curl -X POST http://localhost:3000/api/recetas/tipo/desayuno \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "alimentos": [
      {"nombre": "Huevos", "categoria": "Proteínas"},
      {"nombre": "Pan", "categoria": "Carbohidratos"},
      {"nombre": "Tomate", "categoria": "Vegetales"}
    ]
  }'
```

---

## 💰 Costos de OpenAI

Con el modelo **gpt-4o-mini**:

| Uso Mensual | Generaciones | Costo |
|-------------|--------------|-------|
| Bajo | 100 | $0.14 |
| Medio | 1,000 | $1.40 |
| Alto | 10,000 | $14.00 |

**Cambiar modelo:** Editar `RecetaControlador.js` línea ~142

```javascript
model: "gpt-4o-mini" // Cambiar a "gpt-3.5-turbo" o "gpt-4"
```

---

## 📚 Documentación Adicional

- **[Manual OpenAI Completo](../../docs/MANUAL_OPENAI.md)** - Guía detallada de integración
- **[Resumen del Proyecto](../../docs/RESUMEN_PROYECTO.md)** - Vista general del sistema
- **OpenAI Docs:** https://platform.openai.com/docs
- **Prisma Docs:** https://www.prisma.io/docs

---

## 🎯 Ejemplo de Uso Completo

```javascript
// 1. Login
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    correo: 'usuario@ejemplo.com',
    contrasena: 'mipassword'
  })
});
const { token } = await loginResponse.json();

// 2. Generar recetas
const recetasResponse = await fetch(
  'http://localhost:3000/api/recetas/tipo/desayuno',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      alimentos: [
        { nombre: 'Huevos', categoria: 'Proteínas', cantidad: 6, unidad: 'unidades' },
        { nombre: 'Pan Integral', categoria: 'Carbohidratos', cantidad: 1, unidad: 'paquete' },
        { nombre: 'Aguacate', categoria: 'Grasas Saludables', cantidad: 2, unidad: 'unidades' }
      ]
    })
  }
);
const { recetas } = await recetasResponse.json();

console.log('Recetas generadas:', recetas);
// Muestra 3 recetas únicas para desayuno
```

---

## 🎉 Sistema Listo

El backend está **100% funcional** con integración OpenAI completa.

**Características:**
- ✅ Recibe array de alimentos desde frontend
- ✅ Valida mínimo 3 alimentos
- ✅ Genera 3 recetas personalizadas con gpt-4o-mini
- ✅ Manejo robusto de errores
- ✅ Respuestas en formato JSON estructurado

**No requiere tabla de despensa.** El frontend gestiona la selección de alimentos.

---

**Desarrollado para VitaMia 🥗**
