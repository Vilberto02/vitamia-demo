# Vitamia

Es un proyecto desarrollado por estudiantes de la FISI de la UNMSM como parte de un curso de la carrera.
El proyecto consiste en desarrollar una aplicación que permite mejorar los hábitos alimenticios de los estudiantes universitarios.

---

## � ¿Primera vez configurando el proyecto?

📖 **Ve a la [Guía de Configuración Completa (SETUP.md)](SETUP.md)** - Paso a paso para configurar desde cero.

🔑 **Necesitas obtener tu API Key de Google Gemini (gratis)** para que funcione la generación de recetas con IA.

---

## �📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [API Endpoints](#api-endpoints)
  - [Autenticación](#autenticación)
  - [Usuarios](#usuarios)
  - [Recetas](#recetas)
  - [Alimentos](#alimentos)
  - [Consumos](#consumos)
  - [Recetas Consumidas](#recetas-consumidas)
  - [Planes](#planes)
  - [Información Nutricional](#información-nutricional)
- [Prototipo](#prototipo)

---

## ✨ Características

- 🔐 Sistema de autenticación con JWT
- 👤 Gestión de perfiles de usuario con cálculo automático de IMC
- 🍽️ Catálogo de recetas organizadas por tipo de comida
- 🥗 Registro de alimentos consumidos
- 📊 Seguimiento de consumo diario
- 📅 Planes de alimentación personalizados
- 💡 Información nutricional y consejos
- 📈 Estadísticas de progreso
- 🤖 **Generación de recetas personalizadas con IA (Google Gemini - Gratis)**

---

## 🛠️ Tecnologías

**Backend:**
- Node.js + Express 5.1.0
- Prisma ORM 5.22.0
- MySQL
- JWT (jsonwebtoken 9.0.2)
- bcrypt 6.0.0
- **Google Gemini API** (generación de recetas con IA - gratuita)

**Frontend:**
- React + TypeScript
- Vite
- TailwindCSS

---

## 🚀 Instalación

### Backend

```bash
cd source/backend
npm install
```

### Frontend

```bash
cd source/frontend
npm install
```

---

## ⚙️ Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd vitamia-demo
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo y edítalo con tus credenciales:

```bash
cd source/backend
cp .env.example .env
```

Edita `source/backend/.env` con tus valores:

```env
# Base de datos MySQL
DATABASE_URL="mysql://root:tu_password@localhost:3306/vitamia_db"

# Clave secreta para JWT
JWT_SECRET="tu_clave_secreta_jwt_muy_segura"

# Puerto del servidor
PORT=3000

# 🆕 IMPORTANTE: API Key de Google Gemini (GRATIS)
GEMINI_API_KEY=tu-api-key-aqui
```

### 3. Obtener API Key de Google Gemini (GRATIS)

🔑 **Paso a paso para obtener tu API key:**

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Create API key"**
4. Selecciona **"Create API key in new project"**
5. Copia la API key generada (empieza con `AIzaSy...`)
6. Pégala en tu archivo `.env` en la variable `GEMINI_API_KEY`

✅ **100% Gratuito** - 1,500 requests/día

📄 **Guía completa:** [docs/GEMINI_API_SETUP.md](docs/GEMINI_API_SETUP.md)

### 4. Base de Datos

```bash
cd source/backend
npx prisma db push
npx prisma generate
node seed.js
```

### Ejecutar el Proyecto

**Backend:**
```bash
cd source/backend
npm run dev
```

**Frontend:**
```bash
cd source/frontend
npm run dev
```

---

## 📡 API Endpoints

Base URL: `http://localhost:3001/api`

### 🔐 Autenticación

#### Registro de Usuario

**POST** `/auth/registro`

Registra un nuevo usuario en el sistema.

**Body:**
```json
{
  "nombre": "María",
  "apellido": "González",
  "correo": "maria.gonzalez@ejemplo.com",
  "contrasena": "MiPassword123",
  "fecha_nacimiento": "2002-05-15",
  "meta": "Mantener una dieta balanceada",
  "peso": 65,
  "altura": 1.68
}
```

**Respuesta (201):**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "María",
    "apellido": "González",
    "correo": "maria.gonzalez@ejemplo.com",
    "fecha_nacimiento": "2002-05-15T00:00:00.000Z",
    "meta": "Mantener una dieta balanceada",
    "peso": 65,
    "altura": 1.68,
    "imc": 23.03,
    "imagen": null
  }
}
```

---

#### Iniciar Sesión

**POST** `/auth/login`

Autentica un usuario existente.

**Body:**
```json
{
  "correo": "maria.gonzalez@ejemplo.com",
  "contrasena": "MiPassword123"
}
```

**Respuesta (200):**
```json
{
  "mensaje": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "María",
    "apellido": "González",
    "correo": "maria.gonzalez@ejemplo.com",
    "imc": 23.03
  }
}
```

---

#### Obtener Usuario Actual

**GET** `/auth/me`

Obtiene la información del usuario autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
{
  "id": 1,
  "nombre": "María",
  "apellido": "González",
  "correo": "maria.gonzalez@ejemplo.com",
  "fecha_nacimiento": "2002-05-15T00:00:00.000Z",
  "meta": "Mantener una dieta balanceada",
  "peso": 65,
  "altura": 1.68,
  "imc": 23.03,
  "imagen": null
}
```

---

### 👥 Usuarios

> **Nota:** Todas las rutas requieren autenticación (Bearer token)

#### Obtener Todos los Usuarios

**GET** `/usuarios`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "nombre": "María",
    "apellido": "González",
    "correo": "maria.gonzalez@ejemplo.com",
    "imc": 23.03
  }
]
```

---

#### Buscar Usuario por Nombre

**GET** `/usuarios/:nombre`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "nombre": "María",
    "apellido": "González",
    "correo": "maria.gonzalez@ejemplo.com"
  }
]
```

---

### 🍽️ Recetas

> **Nota:** Todas las rutas requieren autenticación

#### Obtener Todas las Recetas

**GET** `/recetas`

Obtiene todas las recetas agrupadas por tipo de comida.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
{
  "desayuno": [
    {
      "id": 1,
      "titulo": "Avena rápida",
      "tiempo_preparacion": "10 min",
      "descripcion": "Avena fácil para empezar el día",
      "beneficios": "Fuente de energía y fibra",
      "ingredientes": "Avena, leche, fruta",
      "procedimiento": "Mezclar y calentar",
      "imagen": "avena.jpg",
      "tipo_comida": {
        "id": 1,
        "nombre": "desayuno"
      }
    }
  ],
  "almuerzo": [...],
  "cena": [...],
  "snack": [...]
}
```

---

#### Obtener Recetas por Tipo

**GET** `/recetas/tipo/:tipo`

Obtiene recetas de un tipo específico (desayuno, almuerzo, cena, snack).

**Parámetros:**
- `tipo`: string - Tipo de comida

**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo:** `/recetas/tipo/desayuno`

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "titulo": "Avena rápida",
    "tiempo_preparacion": "10 min",
    "descripcion": "Avena fácil para empezar el día",
    "beneficios": "Fuente de energía y fibra",
    "ingredientes": "Avena, leche, fruta",
    "procedimiento": "Mezclar y calentar",
    "imagen": "avena.jpg"
  }
]
```

---

### 🥗 Alimentos

> **Nota:** Todas las rutas requieren autenticación

#### Obtener Todos los Alimentos

**GET** `/alimentos`

Obtiene todos los alimentos agrupados por tipo de comida.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
{
  "desayuno": [
    {
      "id": 1,
      "nombre": "Manzana",
      "unidad": "unidad",
      "tipo_comida": {
        "id": 1,
        "nombre": "desayuno"
      }
    }
  ],
  "almuerzo": [...],
  "cena": [...],
  "snack": [...]
}
```

---

#### Obtener Alimentos por Tipo

**GET** `/alimentos/tipo/:tipo`

Obtiene alimentos de un tipo específico.

**Parámetros:**
- `tipo`: string - Tipo de comida

**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo:** `/alimentos/tipo/snack`

**Respuesta (200):**
```json
[
  {
    "id": 9,
    "nombre": "Frutos secos",
    "unidad": "gramos",
    "tipo_comida": {
      "nombre": "snack"
    }
  }
]
```

---

#### Buscar Alimentos por Nombre

**GET** `/alimentos/nombre/:nombre`

Busca alimentos que contengan el nombre especificado.

**Parámetros:**
- `nombre`: string - Nombre a buscar

**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo:** `/alimentos/nombre/manzana`

---

### 📊 Consumos

> **Nota:** Todas las rutas requieren autenticación. El usuario se obtiene del token JWT.

#### Obtener Mis Consumos

**GET** `/consumos/mis-consumos`

Obtiene todos los consumos del usuario autenticado, agrupados por fecha y tipo de comida.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
{
  "2024-11-20": {
    "desayuno": [
      {
        "id": 1,
        "cantidad": 2,
        "fecha": "2024-11-20T00:00:00.000Z",
        "alimento": {
          "id": 1,
          "nombre": "Manzana",
          "unidad": "unidad"
        },
        "tipo_comida": {
          "nombre": "desayuno"
        }
      }
    ],
    "almuerzo": [...],
    "cena": [],
    "snack": []
  },
  "2024-11-21": {...}
}
```

---

#### Obtener Consumos por Fecha

**GET** `/consumos/fecha/:fecha`

Obtiene los consumos del usuario autenticado en una fecha específica.

**Parámetros:**
- `fecha`: string - Fecha en formato YYYY-MM-DD

**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo:** `/consumos/fecha/2024-11-24`

**Respuesta (200):**
```json
{
  "desayuno": [
    {
      "id": 5,
      "cantidad": 2,
      "fecha": "2024-11-24T00:00:00.000Z",
      "alimento": {
        "nombre": "Manzana",
        "unidad": "unidad"
      },
      "tipo_comida": {
        "nombre": "desayuno"
      }
    }
  ],
  "almuerzo": [],
  "cena": [],
  "snack": []
}
```

---

#### Agregar Consumo

**POST** `/consumos`

Registra un nuevo consumo de alimento.

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "id_alimento": 1,
  "id_tipo_comida": 1,
  "cantidad": 2,
  "fecha": "2024-11-24"
}
```

**Nota:** No es necesario enviar `id_usuario`, se obtiene del token.

**Respuesta (201):**
```json
{
  "mensaje": "Consumo agregado exitosamente",
  "consumo": {
    "id": 10,
    "id_alimento": 1,
    "id_usuario": 1,
    "id_tipo_comida": 1,
    "cantidad": 2,
    "fecha": "2024-11-24T00:00:00.000Z",
    "alimento": {
      "nombre": "Manzana",
      "unidad": "unidad"
    },
    "tipo_comida": {
      "nombre": "desayuno"
    }
  }
}
```

---

#### Eliminar Consumo

**DELETE** `/consumos/:id`

Elimina un consumo específico.

**Parámetros:**
- `id`: number - ID del consumo

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
{
  "mensaje": "Consumo eliminado correctamente"
}
```

---

### 🍴 Recetas Consumidas

> **Nota:** Todas las rutas requieren autenticación

#### Obtener Mis Recetas Consumidas

**GET** `/recetas-consumidas/mis-recetas`

Obtiene todas las recetas que el usuario ha marcado como consumidas.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "fecha": "2024-11-20T00:00:00.000Z",
    "receta": {
      "id": 1,
      "titulo": "Avena rápida",
      "tiempo_preparacion": "10 min",
      "descripcion": "Avena fácil para empezar el día",
      "tipo_comida": {
        "nombre": "desayuno"
      }
    },
    "tipo_comida": {
      "nombre": "desayuno"
    }
  }
]
```

---

#### Agregar Receta Consumida

**POST** `/recetas-consumidas`

Marca una receta como consumida.

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "id_receta": 1,
  "id_tipo_comida": 1,
  "fecha": "2024-11-24"
}
```

**Respuesta (201):**
```json
{
  "mensaje": "Receta consumida agregada correctamente",
  "recetaConsumida": {
    "id": 5,
    "id_receta": 1,
    "id_usuario": 1,
    "id_tipo_comida": 1,
    "fecha": "2024-11-24T00:00:00.000Z",
    "receta": {...},
    "tipo_comida": {...}
  }
}
```

---

#### Eliminar Receta Consumida

**DELETE** `/recetas-consumidas/:id`

Elimina el registro de una receta consumida.

**Parámetros:**
- `id`: number - ID de la receta consumida

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
{
  "mensaje": "Receta consumida eliminada correctamente"
}
```

---

### 📅 Planes

> **Nota:** Todas las rutas requieren autenticación

#### Obtener Todos los Planes

**GET** `/planes`

Obtiene todos los planes de alimentación disponibles.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "nombre": "Plan Balanceado",
    "informacion": "Ideal para mantener un peso saludable",
    "descripcion": "Este plan incluye comidas equilibradas...",
    "beneficios": "Mantiene energía constante, mejora digestión...",
    "recetas": {
      "desayuno": {
        "id": 1,
        "titulo": "Avena rápida",
        "tiempo_preparacion": "10 min"
      },
      "almuerzo": {...},
      "cena": {...},
      "snack": {...}
    }
  }
]
```

---

#### Obtener Plan por ID

**GET** `/planes/:id`

Obtiene un plan específico con sus recetas completas.

**Parámetros:**
- `id`: number - ID del plan

**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo:** `/planes/1`

**Respuesta (200):**
```json
{
  "id": 1,
  "nombre": "Plan Balanceado",
  "informacion": "Ideal para mantener un peso saludable",
  "descripcion": "Este plan incluye comidas equilibradas...",
  "beneficios": "Mantiene energía constante...",
  "recetas": {
    "desayuno": {...},
    "almuerzo": {...},
    "cena": {...},
    "snack": {...}
  }
}
```

---

#### Obtener Mis Planes

**GET** `/planes/mis-planes/usuario`

Obtiene los planes que el usuario está siguiendo.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "fecha": "2024-11-20T00:00:00.000Z",
    "plan": {
      "id": 1,
      "nombre": "Plan Balanceado",
      "informacion": "Ideal para mantener un peso saludable",
      "plan_recetas": [...]
    }
  }
]
```

---

#### Agregar Plan

**POST** `/planes/usuario`

Agrega un plan al usuario (botón "añadir plan" para estadísticas).

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "id_plan": 1,
  "fecha": "2024-11-24"
}
```

**Respuesta (201):**
```json
{
  "mensaje": "Plan agregado al usuario correctamente",
  "planUsuario": {
    "id": 3,
    "id_plan": 1,
    "id_usuario": 1,
    "fecha": "2024-11-24T00:00:00.000Z",
    "plan": {...}
  }
}
```

---

#### Eliminar Plan del Usuario

**DELETE** `/planes/usuario/:id`

Elimina un plan del usuario.

**Parámetros:**
- `id`: number - ID del planUsuario

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
{
  "mensaje": "Plan eliminado del usuario correctamente"
}
```

---

### 💡 Información Nutricional

> **Nota:** Todas las rutas requieren autenticación

#### Obtener Toda la Información

**GET** `/informacion`

Obtiene todos los consejos e información nutricional.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "titulo": "Mantente hidratado",
    "descripcion": "Bebe al menos 2 litros de agua al día",
    "beneficio": "Mejora tu digestión y mantiene tu piel saludable",
    "imagen": "agua.jpg"
  },
  {
    "id": 2,
    "titulo": "Come más frutas",
    "descripcion": "Incorpora 5 porciones de frutas y verduras diarias",
    "beneficio": "Obtendrás vitaminas esenciales para tu cuerpo",
    "imagen": "frutas.jpg"
  }
]
```

---

#### Obtener Información por ID

**GET** `/informacion/:id`

Obtiene un consejo nutricional específico.

**Parámetros:**
- `id`: number - ID de la información

**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo:** `/informacion/1`

**Respuesta (200):**
```json
{
  "id": 1,
  "titulo": "Mantente hidratado",
  "descripcion": "Bebe al menos 2 litros de agua al día",
  "beneficio": "Mejora tu digestión y mantiene tu piel saludable",
  "imagen": "agua.jpg"
}
```

---

## 🔒 Autenticación

Todas las rutas excepto `/auth/registro` y `/auth/login` requieren un token JWT válido.

**Cómo usar el token:**

1. Registra un usuario o inicia sesión
2. Guarda el `token` recibido en la respuesta
3. Incluye el token en el header de cada petición:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Errores de autenticación:**

- `401 Unauthorized`: Token ausente, inválido o expirado
- `403 Forbidden`: Token válido pero sin permisos

---

## 🖼️ Prototipo

### Pantalla de Inicio de Sesión

![Vista de inicio de sesion - Vitamia](docs/screenshots/inicio-sesion.png)

### Pantalla de Registro

![Vista de registro - Vitamia](docs/screenshots/registro-usuario.png)

### Dashboard

![Vista del dashboard - Vitamia](docs/screenshots/dashboard-general.png)
