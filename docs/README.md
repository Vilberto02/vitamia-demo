# 📚 Documentación VitaMia

Bienvenido a la documentación del proyecto VitaMia.

---

## 🚀 Para Empezar

Si es tu primera vez configurando el proyecto:

👉 **[SETUP.md - Guía de Configuración Completa](../SETUP.md)**

Incluye todo lo necesario desde cero: base de datos, dependencias, API key de Gemini, etc.

---

## 📖 Documentación por Tema

### 🤖 Generación de Recetas con IA

- **[GEMINI_API_SETUP.md](GEMINI_API_SETUP.md)** - Cómo obtener y configurar la API key de Google Gemini (gratis)

### 📊 Información General del Proyecto

- **[RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)** - Arquitectura completa, endpoints, base de datos, tecnologías

### 🎨 Capturas de Pantalla

- **[screenshots/](screenshots/)** - Imágenes del prototipo y la aplicación

---

## 🔧 Documentación Técnica

### Backend (API)

📄 **[source/backend/README.md](../source/backend/README.md)**

Incluye:
- Endpoints completos de la API
- Ejemplos de requests/responses
- Configuración de Gemini
- Estructura del proyecto
- Debugging y troubleshooting

### Frontend

📄 **[source/frontend/README.md](../source/frontend/README.md)**

Incluye:
- Componentes y estructura
- Configuración de Vite
- Variables de entorno
- Build y deployment

---

## ⚡ Atajos Rápidos

| Necesito... | Ve a... |
|-------------|---------|
| Configurar todo desde cero | [SETUP.md](../SETUP.md) |
| Obtener API key de Gemini | [GEMINI_API_SETUP.md](GEMINI_API_SETUP.md) |
| Ver todos los endpoints | [backend/README.md](../source/backend/README.md) |
| Entender la arquitectura | [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md) |
| Probar la API | [backend/README.md#endpoints](../source/backend/README.md) |

---

## 🐛 Solución de Problemas

### "GEMINI_API_KEY no está configurada"

1. Ve a https://aistudio.google.com/app/apikey
2. Crea tu API key (gratis)
3. Agrégala en `source/backend/.env`
4. Reinicia el servidor

📖 Guía completa: [GEMINI_API_SETUP.md](GEMINI_API_SETUP.md)

### "Cannot connect to database"

1. Verifica que MySQL esté corriendo
2. Revisa tu contraseña en `.env`
3. Verifica que la base de datos exista: `SHOW DATABASES;`

📖 Más detalles: [SETUP.md#2️⃣-configurar-la-base-de-datos](../SETUP.md#2️⃣-configurar-la-base-de-datos)

### Error 429: "You exceeded your current quota"

Has alcanzado el límite gratuito de Gemini (1,500 requests/día).

Soluciones:
- Espera hasta mañana
- Crea una nueva API key con otra cuenta de Google

---

## 📞 Ayuda

¿Tienes dudas? Contacta al equipo:

- Coronado Cortez, Jeferson
- Pardave Jara, Asthri
- Patricio Julca, Vilberto
- Velarde Huancahuari, Bryan

---

✨ **¡Feliz desarrollo!** ✨
