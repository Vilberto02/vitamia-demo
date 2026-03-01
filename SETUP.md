# 🚀 Guía de Configuración - VitaMia

Sigue estos pasos para configurar el proyecto en tu máquina local.

---

## 📋 Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

- ✅ **Node.js** 18 o superior ([Descargar](https://nodejs.org/))
- ✅ **MySQL** 8.0 o superior ([Descargar](https://dev.mysql.com/downloads/installer/))
- ✅ **Git** ([Descargar](https://git-scm.com/downloads))
- ✅ **Cuenta de Google** (para obtener API key de Gemini - gratis)

---

## 🔧 Configuración Paso a Paso

### 1️⃣ Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd vitamia-demo
```

---

### 2️⃣ Configurar la Base de Datos

**Abrir MySQL:**

```bash
mysql -u root -p
# Ingresa tu contraseña de MySQL
```

**Crear la base de datos:**

```sql
CREATE DATABASE vitamia_db;
exit;
```

**Importar el schema:**

```bash
cd source/backend
mysql -u root -p vitamia_db < database.sql
```

---

### 3️⃣ Obtener API Key de Google Gemini (GRATIS)

🔑 **Esta API key es necesaria para generar recetas con IA**

1. Abre tu navegador y ve a: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2. Inicia sesión con tu cuenta de Google (Gmail)

3. Haz clic en el botón **"Create API key"**

4. Selecciona **"Create API key in new project"**

5. Copia la API key generada (Formato: `AIzaSy...`)

⚠️ **IMPORTANTE:** Guarda esta key, la necesitarás en el siguiente paso.

📖 **Más detalles:** [docs/GEMINI_API_SETUP.md](docs/GEMINI_API_SETUP.md)

---

### 4️⃣ Configurar Variables de Entorno (Backend)

**Crear archivo `.env` desde el ejemplo:**

```bash
cd source/backend
cp .env.example .env
```

**Editar el archivo `.env`:**

Abre `source/backend/.env` con tu editor de texto favorito y configura:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql_aqui    # ⚠️ Cambia esto
DB_NAME=vitamia_db
DB_PORT=3306

# Prisma Database URL
DATABASE_URL="mysql://root:tu_password_mysql_aqui@localhost:3306/vitamia_db"  # ⚠️ Cambia esto

# JWT Secret para autenticación
JWT_SECRET=vitamia_secret_key_2025_ultra_segura_random_string  # ⚠️ Puedes cambiar esto por algo más seguro

# Puerto del servidor
PORT=3000

# ⚠️ IMPORTANTE: Pega aquí tu API key de Google Gemini
GEMINI_API_KEY=TU_API_KEY_AQUI
```

**⚠️ Valores que DEBES cambiar:**
- `DB_PASSWORD` → Tu contraseña de MySQL
- `DATABASE_URL` → Actualiza con tu contraseña de MySQL
- `GEMINI_API_KEY` → Pega la API key que copiaste en el paso 3

---

### 5️⃣ Instalar Dependencias del Backend

```bash
cd source/backend
npm install
```

Espera a que se instalen todas las dependencias (~30 segundos).

---

### 6️⃣ Iniciar el Backend

```bash
node index.js
```

**✅ Salida esperada:**

```
Backend corriendo en el puerto 3000
```

Si ves esto, ¡el backend está funcionando correctamente! 🎉

**❌ Si ves errores:**
- `GEMINI_API_KEY no está configurada` → Revisa el paso 4
- `Error: Access denied for user` → Tu contraseña de MySQL es incorrecta
- `Error: Unknown database 'vitamia_db'` → Revisa el paso 2

---

### 7️⃣ Instalar Dependencias del Frontend

**Abre una NUEVA terminal** (deja la anterior corriendo el backend) y ejecuta:

```bash
cd source/frontend
npm install
```

---

### 8️⃣ Iniciar el Frontend

```bash
npm run dev
```

**✅ Salida esperada:**

```
VITE v5.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### 9️⃣ Abrir la Aplicación

Abre tu navegador y ve a: **http://localhost:5173**

Deberías ver la página de inicio de VitaMia. 🎉

---

## ✅ Verificar que Todo Funciona

### Probar el Backend

**Endpoint de prueba:**

```bash
curl http://localhost:3000/api/alimentos
```

Debería retornar un error 401 (normal, necesitas autenticación).

### Probar la Generación de Recetas con IA

1. Registra un usuario en la aplicación
2. Inicia sesión
3. Ve a la sección de recetas
4. Selecciona al menos 3 alimentos
5. Haz clic en "Generar Recetas"
6. Deberías ver 3 recetas generadas por Google Gemini

Si esto funciona, ¡todo está perfecto! ✨

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot connect to database"

**Solución:**
1. Verifica que MySQL esté corriendo
2. Verifica tu contraseña en `.env`
3. Verifica que la base de datos `vitamia_db` exista

### Error: "GEMINI_API_KEY no está configurada"

**Solución:**
1. Abre `source/backend/.env`
2. Verifica que `GEMINI_API_KEY` tenga tu API key
3. La key debe empezar con `AIzaSy...`
4. Reinicia el servidor backend

### Error 429: "You exceeded your current quota"

**Solución:**
- Has alcanzado el límite de 1,500 requests/día
- Espera hasta mañana O crea una nueva API key con otra cuenta de Google

### El frontend no carga

**Solución:**
1. Verifica que el backend esté corriendo (puerto 3000)
2. Verifica que el frontend esté corriendo (puerto 5173)
3. Revisa la consola del navegador por errores

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas, contacta al equipo:

- **Jeferson** Coronado Cortez
- **Asthri** Pardave Jara
- **Vilberto** Patricio Julca
- **Bryan** Velarde Huancahuari

O abre un issue en el repositorio del proyecto.

---

## 📚 Documentación Adicional

- [README.md](README.md) - Información general del proyecto
- [docs/GEMINI_API_SETUP.md](docs/GEMINI_API_SETUP.md) - Guía completa de Gemini
- [docs/RESUMEN_PROYECTO.md](docs/RESUMEN_PROYECTO.md) - Resumen técnico completo
- [source/backend/README.md](source/backend/README.md) - Documentación de la API

---

✨ **¡Listo para desarrollar!** ✨
