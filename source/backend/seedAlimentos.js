const prisma = require('./prismaClient');

/**
 * Script para poblar la tabla de alimentos con datos reales
 * Incluye alimentos variados agrupados por categoría (carnes, verduras, frutas, etc.)
 * Los alimentos NO tienen tipo_comida asignado - eso se define al momento de consumir
 */

const alimentosPorCategoria = {
  carnes: [
    { nombre: 'Pollo', unidad: 'gramos', calorias: 1.65 },
    { nombre: 'Carne de res', unidad: 'gramos', calorias: 2.50 },
    { nombre: 'Pechuga de pavo', unidad: 'gramos', calorias: 1.11 },
    { nombre: 'Jamón de pavo', unidad: 'gramos', calorias: 1.05 },
    { nombre: 'Cerdo', unidad: 'gramos', calorias: 2.42 },
    { nombre: 'Cordero', unidad: 'gramos', calorias: 2.94 }
  ],
  pescados: [
    { nombre: 'Pescado', unidad: 'gramos', calorias: 2.06 },
    { nombre: 'Atún', unidad: 'gramos', calorias: 1.32 },
    { nombre: 'Salmón', unidad: 'gramos', calorias: 2.08 },
    { nombre: 'Trucha', unidad: 'gramos', calorias: 1.48 },
    { nombre: 'Tilapia', unidad: 'gramos', calorias: 0.96 },
    { nombre: 'Camarones', unidad: 'gramos', calorias: 0.99 }
  ],
  verduras: [
    { nombre: 'Brócoli', unidad: 'gramos', calorias: 0.34 },
    { nombre: 'Zanahoria', unidad: 'gramos', calorias: 0.41 },
    { nombre: 'Espinaca', unidad: 'gramos', calorias: 0.23 },
    { nombre: 'Tomate', unidad: 'gramos', calorias: 0.18 },
    { nombre: 'Lechuga', unidad: 'gramos', calorias: 0.15 },
    { nombre: 'Champiñones', unidad: 'gramos', calorias: 0.22 },
    { nombre: 'Calabacín', unidad: 'gramos', calorias: 0.17 },
    { nombre: 'Berenjena', unidad: 'gramos', calorias: 0.25 },
    { nombre: 'Pepino', unidad: 'gramos', calorias: 0.16 },
    { nombre: 'Coliflor', unidad: 'gramos', calorias: 0.25 },
    { nombre: 'Espárragos', unidad: 'gramos', calorias: 0.20 },
    { nombre: 'Pimiento', unidad: 'gramos', calorias: 0.31 },
    { nombre: 'Cebolla', unidad: 'gramos', calorias: 0.40 },
    { nombre: 'Zanahoria baby', unidad: 'gramos', calorias: 0.41 }
  ],
  frutas: [
    { nombre: 'Manzana', unidad: 'unidades', calorias: 52 },
    { nombre: 'Plátano', unidad: 'unidades', calorias: 89 },
    { nombre: 'Naranja', unidad: 'unidades', calorias: 47 },
    { nombre: 'Uvas', unidad: 'gramos', calorias: 0.69 },
    { nombre: 'Fresas', unidad: 'gramos', calorias: 0.32 },
    { nombre: 'Arándanos', unidad: 'gramos', calorias: 0.57 },
    { nombre: 'Sandía', unidad: 'gramos', calorias: 0.30 },
    { nombre: 'Melón', unidad: 'gramos', calorias: 0.34 },
    { nombre: 'Pera', unidad: 'unidades', calorias: 57 },
    { nombre: 'Durazno', unidad: 'unidades', calorias: 39 },
    { nombre: 'Kiwi', unidad: 'unidades', calorias: 42 },
    { nombre: 'Mango', unidad: 'unidades', calorias: 60 },
    { nombre: 'Piña', unidad: 'gramos', calorias: 0.50 },
    { nombre: 'Aguacate', unidad: 'gramos', calorias: 1.60 }
  ],
  cereales: [
    { nombre: 'Arroz blanco', unidad: 'gramos', calorias: 1.30 },
    { nombre: 'Arroz integral', unidad: 'gramos', calorias: 1.11 },
    { nombre: 'Pasta', unidad: 'gramos', calorias: 1.31 },
    { nombre: 'Avena', unidad: 'gramos', calorias: 3.89 },
    { nombre: 'Quinoa', unidad: 'gramos', calorias: 1.20 },
    { nombre: 'Pan integral', unidad: 'rebanadas', calorias: 65 },
    { nombre: 'Tortilla de maíz', unidad: 'unidades', calorias: 52 },
    { nombre: 'Cereal integral', unidad: 'gramos', calorias: 3.67 },
    { nombre: 'Granola', unidad: 'gramos', calorias: 4.71 },
    { nombre: 'Pan de ajo', unidad: 'rebanadas', calorias: 96 }
  ],
  legumbres: [
    { nombre: 'Lentejas', unidad: 'gramos', calorias: 1.16 },
    { nombre: 'Frijoles', unidad: 'gramos', calorias: 1.27 },
    { nombre: 'Garbanzos', unidad: 'gramos', calorias: 1.64 },
    { nombre: 'Hummus', unidad: 'gramos', calorias: 1.66 },
    { nombre: 'Soja', unidad: 'gramos', calorias: 1.47 }
  ],
  lacteos: [
    { nombre: 'Leche', unidad: 'ml', calorias: 0.42 },
    { nombre: 'Yogurt natural', unidad: 'gramos', calorias: 0.59 },
    { nombre: 'Yogurt griego', unidad: 'gramos', calorias: 0.97 },
    { nombre: 'Queso fresco', unidad: 'gramos', calorias: 2.64 },
    { nombre: 'Queso cheddar', unidad: 'gramos', calorias: 4.03 },
    { nombre: 'Queso mozzarella', unidad: 'gramos', calorias: 2.80 }
  ],
  tuberculos: [
    { nombre: 'Papa', unidad: 'gramos', calorias: 0.77 },
    { nombre: 'Batata', unidad: 'gramos', calorias: 0.86 },
    { nombre: 'Yuca', unidad: 'gramos', calorias: 1.60 }
  ],
  frutos_secos: [
    { nombre: 'Almendras', unidad: 'gramos', calorias: 5.79 },
    { nombre: 'Nueces', unidad: 'gramos', calorias: 6.54 },
    { nombre: 'Frutos secos', unidad: 'gramos', calorias: 6.07 },
    { nombre: 'Maní', unidad: 'gramos', calorias: 5.67 },
    { nombre: 'Mantequilla de maní', unidad: 'gramos', calorias: 5.88 },
    { nombre: 'Pistachos', unidad: 'gramos', calorias: 5.62 },
    { nombre: 'Avellanas', unidad: 'gramos', calorias: 6.28 }
  ],
  huevos: [
    { nombre: 'Huevo', unidad: 'unidades', calorias: 155 },
    { nombre: 'Tortilla de huevo', unidad: 'unidades', calorias: 94 },
    { nombre: 'Claras de huevo', unidad: 'unidades', calorias: 17 }
  ],
  bebidas: [
    { nombre: 'Jugo de naranja', unidad: 'ml', calorias: 0.45 },
    { nombre: 'Jugo de manzana', unidad: 'ml', calorias: 0.46 },
    { nombre: 'Té verde', unidad: 'ml', calorias: 0.01 }
  ],
  otros: [
    { nombre: 'Galletas integrales', unidad: 'unidades', calorias: 45 },
    { nombre: 'Barrita de cereal', unidad: 'unidades', calorias: 120 },
    { nombre: 'Chips de plátano', unidad: 'gramos', calorias: 5.19 },
    { nombre: 'Palomitas de maíz', unidad: 'gramos', calorias: 3.87 },
    { nombre: 'Chocolate oscuro', unidad: 'gramos', calorias: 5.46 },
    { nombre: 'Mermelada', unidad: 'gramos', calorias: 2.78 },
    { nombre: 'Sopa de verduras', unidad: 'porciones', calorias: 98 },
    { nombre: 'Ensalada verde', unidad: 'porciones', calorias: 33 }
  ]
};

async function seedAlimentos() {
  try {
    console.log('🌱 Iniciando seed de alimentos...\n');
    
    let totalInsertados = 0;
    let yaExisten = 0;
    
    for (const [categoria, alimentos] of Object.entries(alimentosPorCategoria)) {
      console.log(`📦 Procesando ${categoria}...`);
      
      for (const alimento of alimentos) {
        // Verificar si ya existe por nombre y categoría
        const existe = await prisma.alimento.findFirst({
          where: {
            nombre: alimento.nombre,
            categoria: categoria
          }
        });
        
        if (!existe) {
          await prisma.alimento.create({
            data: {
              nombre: alimento.nombre,
              unidad: alimento.unidad,
              calorias: alimento.calorias,
              categoria: categoria
            }
          });
          totalInsertados++;
          console.log(`   ✓ ${alimento.nombre} (${alimento.calorias} kcal/${alimento.unidad})`);
        } else {
          yaExisten++;
          console.log(`   ⊘ ${alimento.nombre} ya existe`);
        }
      }
      
      console.log('');
    }
    
    console.log(`\n🎉 Seed completado exitosamente!`);
    console.log(`📊 Alimentos insertados: ${totalInsertados}`);
    console.log(`📊 Alimentos que ya existían: ${yaExisten}`);
    
    // Mostrar resumen por categoría
    console.log(`\n📊 Resumen por categoría:`);
    for (const categoria of Object.keys(alimentosPorCategoria)) {
      const count = await prisma.alimento.count({
        where: { categoria: categoria }
      });
      console.log(`   ${categoria}: ${count} alimentos`);
    }
    
    const totalAlimentos = await prisma.alimento.count();
    console.log(`\n📊 Total de alimentos en la base de datos: ${totalAlimentos}\n`);
    
  } catch (error) {
    console.error('❌ Error al ejecutar seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar seed
seedAlimentos();
