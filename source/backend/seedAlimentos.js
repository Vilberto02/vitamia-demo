const prisma = require('./prismaClient');

/**
 * Script para poblar la tabla de alimentos con datos reales
 * Incluye alimentos variados agrupados por categoría (carnes, verduras, frutas, etc.)
 * Los alimentos NO tienen tipo_comida asignado - eso se define al momento de consumir
 */

const alimentosPorCategoria = {
  carnes: [
    { id: 1, nombre: 'Pollo', unidad: 'gramos', calorias: 1.65 },
    { id: 2, nombre: 'Carne de res', unidad: 'gramos', calorias: 2.50 },
    { id: 3, nombre: 'Pechuga de pavo', unidad: 'gramos', calorias: 1.11 },
    { id: 4, nombre: 'Jamón de pavo', unidad: 'gramos', calorias: 1.05 },
    { id: 5, nombre: 'Cerdo', unidad: 'gramos', calorias: 2.42 },
    { id: 6, nombre: 'Cordero', unidad: 'gramos', calorias: 2.94 }
  ],
  pescados: [
    { id: 7, nombre: 'Pescado', unidad: 'gramos', calorias: 2.06 },
    { id: 8, nombre: 'Atún', unidad: 'gramos', calorias: 1.32 },
    { id: 9, nombre: 'Salmón', unidad: 'gramos', calorias: 2.08 },
    { id: 10, nombre: 'Trucha', unidad: 'gramos', calorias: 1.48 },
    { id: 11, nombre: 'Tilapia', unidad: 'gramos', calorias: 0.96 },
    { id: 12, nombre: 'Camarones', unidad: 'gramos', calorias: 0.99 }
  ],
  verduras: [
    { id: 13, nombre: 'Brócoli', unidad: 'gramos', calorias: 0.34 },
    { id: 14, nombre: 'Zanahoria', unidad: 'gramos', calorias: 0.41 },
    { id: 15, nombre: 'Espinaca', unidad: 'gramos', calorias: 0.23 },
    { id: 16, nombre: 'Tomate', unidad: 'gramos', calorias: 0.18 },
    { id: 17, nombre: 'Lechuga', unidad: 'gramos', calorias: 0.15 },
    { id: 18, nombre: 'Champiñones', unidad: 'gramos', calorias: 0.22 },
    { id: 19, nombre: 'Calabacín', unidad: 'gramos', calorias: 0.17 },
    { id: 20, nombre: 'Berenjena', unidad: 'gramos', calorias: 0.25 },
    { id: 21, nombre: 'Pepino', unidad: 'gramos', calorias: 0.16 },
    { id: 22, nombre: 'Coliflor', unidad: 'gramos', calorias: 0.25 },
    { id: 23, nombre: 'Espárragos', unidad: 'gramos', calorias: 0.20 },
    { id: 24, nombre: 'Pimiento', unidad: 'gramos', calorias: 0.31 },
    { id: 25, nombre: 'Cebolla', unidad: 'gramos', calorias: 0.40 },
    { id: 26, nombre: 'Zanahoria baby', unidad: 'gramos', calorias: 0.41 }
  ],
  frutas: [
    { id: 27, nombre: 'Manzana', unidad: 'unidades', calorias: 52 },
    { id: 28, nombre: 'Plátano', unidad: 'unidades', calorias: 89 },
    { id: 29, nombre: 'Naranja', unidad: 'unidades', calorias: 47 },
    { id: 30, nombre: 'Uvas', unidad: 'gramos', calorias: 0.69 },
    { id: 31, nombre: 'Fresas', unidad: 'gramos', calorias: 0.32 },
    { id: 32, nombre: 'Arándanos', unidad: 'gramos', calorias: 0.57 },
    { id: 33, nombre: 'Sandía', unidad: 'gramos', calorias: 0.30 },
    { id: 34, nombre: 'Melón', unidad: 'gramos', calorias: 0.34 },
    { id: 35, nombre: 'Pera', unidad: 'unidades', calorias: 57 },
    { id: 36, nombre: 'Durazno', unidad: 'unidades', calorias: 39 },
    { id: 37, nombre: 'Kiwi', unidad: 'unidades', calorias: 42 },
    { id: 38, nombre: 'Mango', unidad: 'unidades', calorias: 60 },
    { id: 39, nombre: 'Piña', unidad: 'gramos', calorias: 0.50 },
    { id: 40, nombre: 'Aguacate', unidad: 'gramos', calorias: 1.60 }
  ],
  cereales: [
    { id: 41, nombre: 'Arroz blanco', unidad: 'gramos', calorias: 1.30 },
    { id: 42, nombre: 'Arroz integral', unidad: 'gramos', calorias: 1.11 },
    { id: 43, nombre: 'Pasta', unidad: 'gramos', calorias: 1.31 },
    { id: 44, nombre: 'Avena', unidad: 'gramos', calorias: 3.89 },
    { id: 45, nombre: 'Quinoa', unidad: 'gramos', calorias: 1.20 },
    { id: 46, nombre: 'Pan integral', unidad: 'rebanadas', calorias: 65 },
    { id: 47, nombre: 'Tortilla de maíz', unidad: 'unidades', calorias: 52 },
    { id: 48, nombre: 'Cereal integral', unidad: 'gramos', calorias: 3.67 },
    { id: 49, nombre: 'Granola', unidad: 'gramos', calorias: 4.71 },
    { id: 50, nombre: 'Pan de ajo', unidad: 'rebanadas', calorias: 96 }
  ],
  legumbres: [
    { id: 51, nombre: 'Lentejas', unidad: 'gramos', calorias: 1.16 },
    { id: 52, nombre: 'Frijoles', unidad: 'gramos', calorias: 1.27 },
    { id: 53, nombre: 'Garbanzos', unidad: 'gramos', calorias: 1.64 },
    { id: 54, nombre: 'Hummus', unidad: 'gramos', calorias: 1.66 },
    { id: 55, nombre: 'Soja', unidad: 'gramos', calorias: 1.47 }
  ],
  lacteos: [
    { id: 56, nombre: 'Leche', unidad: 'ml', calorias: 0.42 },
    { id: 57, nombre: 'Yogurt natural', unidad: 'gramos', calorias: 0.59 },
    { id: 58, nombre: 'Yogurt griego', unidad: 'gramos', calorias: 0.97 },
    { id: 59, nombre: 'Queso fresco', unidad: 'gramos', calorias: 2.64 },
    { id: 60, nombre: 'Queso cheddar', unidad: 'gramos', calorias: 4.03 },
    { id: 61, nombre: 'Queso mozzarella', unidad: 'gramos', calorias: 2.80 }
  ],
  tuberculos: [
    { id: 62, nombre: 'Papa', unidad: 'gramos', calorias: 0.77 },
    { id: 63, nombre: 'Batata', unidad: 'gramos', calorias: 0.86 },
    { id: 64, nombre: 'Yuca', unidad: 'gramos', calorias: 1.60 }
  ],
  frutos_secos: [
    { id: 65, nombre: 'Almendras', unidad: 'gramos', calorias: 5.79 },
    { id: 66, nombre: 'Nueces', unidad: 'gramos', calorias: 6.54 },
    { id: 67, nombre: 'Frutos secos', unidad: 'gramos', calorias: 6.07 },
    { id: 68, nombre: 'Maní', unidad: 'gramos', calorias: 5.67 },
    { id: 69, nombre: 'Mantequilla de maní', unidad: 'gramos', calorias: 5.88 },
    { id: 70, nombre: 'Pistachos', unidad: 'gramos', calorias: 5.62 },
    { id: 71, nombre: 'Avellanas', unidad: 'gramos', calorias: 6.28 }
  ],
  huevos: [
    { id: 72, nombre: 'Huevo', unidad: 'unidades', calorias: 155 },
    { id: 73, nombre: 'Tortilla de huevo', unidad: 'unidades', calorias: 94 },
    { id: 74, nombre: 'Claras de huevo', unidad: 'unidades', calorias: 17 }
  ],
  bebidas: [
    { id: 75, nombre: 'Jugo de naranja', unidad: 'ml', calorias: 0.45 },
    { id: 76, nombre: 'Jugo de manzana', unidad: 'ml', calorias: 0.46 },
    { id: 77, nombre: 'Té verde', unidad: 'ml', calorias: 0.01 }
  ],
  otros: [
    { id: 78, nombre: 'Galletas integrales', unidad: 'unidades', calorias: 45 },
    { id: 79, nombre: 'Barrita de cereal', unidad: 'unidades', calorias: 120 },
    { id: 80, nombre: 'Chips de plátano', unidad: 'gramos', calorias: 5.19 },
    { id: 81, nombre: 'Palomitas de maíz', unidad: 'gramos', calorias: 3.87 },
    { id: 82, nombre: 'Chocolate oscuro', unidad: 'gramos', calorias: 5.46 },
    { id: 83, nombre: 'Mermelada', unidad: 'gramos', calorias: 2.78 },
    { id: 84, nombre: 'Sopa de verduras', unidad: 'porciones', calorias: 98 },
    { id: 85, nombre: 'Ensalada verde', unidad: 'porciones', calorias: 33 }
  ]
};

async function seedAlimentos() {
  try {
    console.log('Iniciando seed de alimentos...\n');
    
    let totalInsertados = 0;
    let totalActualizados = 0;
    
    for (const [categoria, alimentos] of Object.entries(alimentosPorCategoria)) {
      console.log(`Procesando ${categoria}...`);
      
      for (const alimento of alimentos) {
        // Verificar si existe antes del upsert para contar correctamente
        const existente = await prisma.alimento.findUnique({
          where: { id: alimento.id }
        });
        
        // Usar upsert para insertar o actualizar
        await prisma.alimento.upsert({
          where: { 
            id: alimento.id
          },
          update: {
            nombre: alimento.nombre,
            unidad: alimento.unidad,
            calorias: alimento.calorias,
            categoria: categoria
          },
          create: {
            id: alimento.id,
            nombre: alimento.nombre,
            unidad: alimento.unidad,
            calorias: alimento.calorias,
            categoria: categoria
          }
        });
        
        if (!existente) {
          totalInsertados++;
          console.log(`   + ${alimento.nombre} (${alimento.calorias} kcal/${alimento.unidad}) - ID ${alimento.id}`);
        } else {
          totalActualizados++;
          console.log(`   * ${alimento.nombre} actualizado (ID ${alimento.id})`);
        }
      }
      
      console.log('');
    }
    
    console.log(`\nSeed completado exitosamente!`);
    console.log(`Alimentos insertados: ${totalInsertados}`);
    console.log(`Alimentos actualizados: ${totalActualizados}`);
    
    // Mostrar resumen por categoría
    console.log(`\nResumen por categoría:`);
    for (const categoria of Object.keys(alimentosPorCategoria)) {
      const count = await prisma.alimento.count({
        where: { categoria: categoria }
      });
      console.log(`   ${categoria}: ${count} alimentos`);
    }
    
    const totalAlimentos = await prisma.alimento.count();
    console.log(`\nTotal de alimentos en la base de datos: ${totalAlimentos}\n`);
    
  } catch (error) {
    console.error('Error al ejecutar seed:', error);
    throw error;
  }
}

module.exports = seedAlimentos;
