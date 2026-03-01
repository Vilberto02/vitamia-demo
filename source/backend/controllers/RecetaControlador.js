const RecetaModelo = require('../models/RecetaModelo');

const RecetaControlador = {
  async obtenerTodas(req, res) {
    try {
      const recetas = await RecetaModelo.obtenerTodas();
      res.json(recetas);
    } catch (err) {
      console.error('Error al obtener recetas:', err);
      res.status(500).json({ error: 'Error al obtener recetas' });
    }
  },

  /**
   * Genera recetas con OpenAI basadas en alimentos proporcionados desde el frontend
   * Recibe un array de alimentos en el body y genera 3 recetas personalizadas
   */
  async obtenerPorTipo(req, res) {
    try {
      const { tipo } = req.params;
      const { alimentos } = req.body;
      
      // Verificar autenticación
      if (!req.usuario || !req.usuario.id) {
        return res.status(401).json({ 
          error: 'No autenticado',
          mensaje: 'Debes iniciar sesión'
        });
      }

      // Validar tipo de comida
      const tiposValidos = ['desayuno', 'almuerzo', 'cena', 'snack'];
      if (!tiposValidos.includes(tipo.toLowerCase())) {
        return res.status(400).json({
          error: 'Tipo de comida inválido',
          mensaje: `El tipo de comida debe ser uno de: ${tiposValidos.join(', ')}`
        });
      }

      // Validar que se reciban alimentos
      if (!alimentos || !Array.isArray(alimentos)) {
        return res.status(400).json({
          error: 'Datos inválidos',
          mensaje: 'Debes enviar un array de alimentos en el body'
        });
      }

      // Validar que haya al menos 3 alimentos
      if (alimentos.length < 3) {
        // Retornar recetas de la base de datos como fallback
        const recetas = await RecetaModelo.obtenerPorTipo(tipo);
        return res.status(400).json({
          error: 'Alimentos insuficientes',
          mensaje: 'Necesitas seleccionar al menos 3 alimentos para generar recetas con IA',
          recetas_sugeridas: recetas
        });
      }

      // Generar recetas con OpenAI
      console.log(`🍳 Generando recetas para ${tipo} con ${alimentos.length} alimentos`);
      const prompt = this.construirPrompt(alimentos, tipo);
      const recetasGPT = await this.consultarGPT(prompt);
      
      return res.json({
        origen: 'openai',
        tipo_comida: tipo,
        alimentos_usados: alimentos.map(a => a.nombre),
        recetas: recetasGPT,
        mensaje: `Recetas generadas con IA para ${tipo}`
      });

    } catch (err) {
      console.error('Error al generar recetas:', err);
      res.status(500).json({ 
        error: 'Error al generar recetas',
        mensaje: err.message 
      });
    }
  },

  /**
   * Construye el prompt para enviar a GPT
   */
  construirPrompt(alimentosDisponibles, tipoComida) {
    const listaAlimentos = alimentosDisponibles
      .map(a => `- ${a.nombre} (${a.categoria})${a.cantidad ? ` - ${a.cantidad} ${a.unidad}` : ''}`)
      .join('\n');

    return `Eres un chef profesional y nutricionista. Necesito que generes 3 recetas saludables para ${tipoComida} utilizando SOLAMENTE los siguientes alimentos disponibles:

${listaAlimentos}

REQUISITOS IMPORTANTES:
1. Las recetas deben ser para ${tipoComida}
2. Solo puedes usar los alimentos de la lista anterior
3. Puedes usar condimentos básicos (sal, pimienta, aceite)
4. Cada receta debe tener:
   - titulo: nombre atractivo de la receta
   - tiempo_preparacion: tiempo estimado (ej: "15 minutos")
   - ingredientes: lista detallada con cantidades
   - procedimiento: pasos numerados para preparar
   - beneficios: beneficios nutricionales de la receta
   - calorias_aproximadas: estimación de calorías por porción

FORMATO DE RESPUESTA (JSON):
{
  "recetas": [
    {
      "titulo": "Nombre de la receta",
      "tiempo_preparacion": "15 minutos",
      "descripcion": "Descripción breve de la receta",
      "ingredientes": ["ingrediente 1", "ingrediente 2"],
      "procedimiento": ["paso 1", "paso 2", "paso 3"],
      "beneficios": "Descripción de beneficios nutricionales",
      "calorias_aproximadas": 350
    }
  ]
}

Responde ÚNICAMENTE con el JSON, sin texto adicional.`;
  },

  /**
   * Consulta la API de Google Gemini para generar recetas
   */
  async consultarGPT(prompt) {
    try {
      // Verificar que la API Key esté configurada
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY no está configurada en el archivo .env');
      }

      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      console.log('📡 Enviando request a Google Gemini...');

      const model = genAI.getGenerativeModel({
        model: "models/gemini-2.5-flash-lite" // Modelo lite con mayor cuota gratuita
      });

      // Agregar instrucciones para que responda en JSON
      const promptConInstrucciones = `${prompt}\n\nIMPORTANTE: Responde ÚNICAMENTE con JSON válido, sin texto adicional antes o después.`;

      const result = await model.generateContent(promptConInstrucciones);
      const response = await result.response;
      const text = response.text();

      console.log('✅ Respuesta recibida de Gemini');
      console.log('📄 Respuesta:', text);

      // Limpiar la respuesta por si viene con markdown
      let jsonText = text.trim();
      
      // Remover bloques de código markdown si existen
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
      }

      const datosParseados = JSON.parse(jsonText);
      
      if (!datosParseados.recetas || !Array.isArray(datosParseados.recetas)) {
        throw new Error('El formato de respuesta de Gemini no es válido');
      }

      return datosParseados.recetas;

    } catch (error) {
      console.error('❌ Error al llamar a Google Gemini API:', error);
      
      // Manejo de errores específicos
      if (error.message && error.message.includes('API_KEY_INVALID')) {
        throw new Error('API Key de Gemini inválida. Verifica tu configuración.');
      } else if (error.message && error.message.includes('RATE_LIMIT_EXCEEDED')) {
        throw new Error('Límite de requests alcanzado. Intenta más tarde.');
      }
      
      throw new Error(`Error en la API de Gemini: ${error.message}`);
    }
  }
};

module.exports = RecetaControlador;
