const prisma = require('./prismaClient');

/**
 * Script para poblar la tabla de tipo_comida
 * Define los tipos de comida disponibles en la aplicación
 */

const tiposComida = [
  { id: 1, nombre: 'desayuno' },
  { id: 2, nombre: 'almuerzo' },
  { id: 3, nombre: 'cena' },
  { id: 4, nombre: 'snack' }
];

async function seedTipoComida() {
  try {
    console.log('Iniciando seed de tipos de comida...\n');
    
    let insertados = 0;
    let actualizados = 0;
    
    for (const tipo of tiposComida) {
      const existente = await prisma.tipoComida.findUnique({
        where: { id: tipo.id }
      });
      
      const result = await prisma.tipoComida.upsert({
        where: { id: tipo.id },
        update: { nombre: tipo.nombre },
        create: tipo
      });
      
      if (!existente) {
        console.log(`   + ${tipo.nombre} creado con ID ${tipo.id}`);
        insertados++;
      } else {
        console.log(`   * ${tipo.nombre} actualizado (ID ${tipo.id})`);
        actualizados++;
      }
    }
    
    const total = await prisma.tipoComida.count();
    console.log(`\nSeed de tipos de comida completado!`);
    console.log(`Tipos insertados: ${insertados}`);
    console.log(`Tipos que ya existían: ${actualizados}`);
    console.log(`Total de tipos de comida en la base de datos: ${total}\n`);
    
  } catch (error) {
    console.error('Error al ejecutar seed de tipos de comida:', error);
    throw error;
  }
}

module.exports = seedTipoComida;
