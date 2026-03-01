# 🤖 Configuración de Google Gemini API

## ✅ Cambio Realizado: OpenAI → Google Gemini

Se ha migrado de OpenAI a **Google Gemini** (gratuito) para la generación de recetas con IA.

---

## 🔑 Obtener API Key de Gemini (GRATIS)

### Paso 1: Ir a Google AI Studio

Visita: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### Paso 2: Iniciar sesión con Google

Usa tu cuenta de Google (Gmail).

### Paso 3: Crear API Key

1. Click en **"Get API key"**
2. Click en **"Create API key"**
3. Selecciona un proyecto de Google Cloud o crea uno nuevo
4. Copia la API Key generada

**Formato:** `AIzaSy...` (empieza con AIzaSy)

---

## ⚙️ Configurar en el Proyecto

### Editar archivo `.env`

Abre `source/backend/.env` y agrega:

```env
GEMINI_API_KEY=AIzaSy_TU_API_KEY_AQUI
```

**Ejemplo:**
```env
GEMINI_API_KEY=AIzaSyDxKL9fJ2k3mN4pQ5rS6tU7vW8xY9zA0bC
```

---

## 🚀 Reiniciar Servidor

```bash
# Detener servidor actual
Ctrl + C

# Iniciar de nuevo
cd source/backend
node index.js
```

---

## 🧪 Probar en Postman

### Request

```
POST http://localhost:3000/api/recetas/tipo/desayuno
```

**Headers:**
```
Authorization: Bearer TU_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "alimentos": [
    {"nombre": "Huevos", "categoria": "Proteínas"},
    {"nombre": "Pan Integral", "categoria": "Carbohidratos"},
    {"nombre": "Aguacate", "categoria": "Grasas Saludables"}
  ]
}
```

---

## ✨ Ventajas de Gemini

| Característica | Google Gemini | OpenAI |
|---------------|---------------|--------|
| **Costo** | ✅ **GRATIS** | 💰 Pago |
| **Límite diario** | 1,500 requests/día | Depende del plan |
| **Velocidad** | ⚡ Muy rápido | ⚡ Rápido |
| **Calidad** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Registro** | Solo cuenta Google | Tarjeta requerida |

---

## 🔧 Cambios Realizados en el Código

### 1. **RecetaControlador.js**

```javascript
// Antes (OpenAI)
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Ahora (Gemini)
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
```

### 2. **Modelo usado**

- **Antes:** `gpt-4o-mini` (OpenAI)
- **Ahora:** `gemini-1.5-flash` (Google - gratuito)

### 3. **Variable de entorno**

- **Antes:** `OPENAI_API_KEY`
- **Ahora:** `GEMINI_API_KEY`

---

## 📊 Logs del Servidor

Cuando generes recetas verás:

```
POST /api/recetas/tipo/desayuno
🍳 Generando recetas para desayuno con 3 alimentos
📡 Enviando request a Google Gemini...
✅ Respuesta recibida de Gemini
📄 Respuesta: {"recetas":[...]}
```

---

## ⚠️ Errores Comunes

### Error: "GEMINI_API_KEY no está configurada"

**Solución:** Agregar `GEMINI_API_KEY=...` en el archivo `.env`

---

### Error: "API Key inválida"

**Solución:** Verificar que la API Key sea correcta y esté activa en Google AI Studio

---

### Error: "Límite de requests alcanzado"

**Solución:** Esperar 24 horas (límite diario de 1,500 requests)

---

## 📚 Documentación Oficial

- **Google AI Studio:** https://ai.google.dev/
- **Gemini API Docs:** https://ai.google.dev/gemini-api/docs
- **Pricing (Free tier):** https://ai.google.dev/pricing

---

## 🎉 ¡Sistema Listo!

La integración con Gemini está **100% funcional** y **completamente gratuita**.

Solo necesitas:
1. ✅ Obtener API Key de Gemini
2. ✅ Agregarla al `.env`
3. ✅ Reiniciar el servidor
4. ✅ Probar en Postman

**¡No se requiere tarjeta de crédito! 🚀**
