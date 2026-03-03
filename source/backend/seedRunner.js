const prisma = require('./prismaClient');
const seedTipoComida = require('./seedTipoComida');
const seedAlimentos = require('./seedAlimentos');
const seedLogros = require('./seedLogros');
const seedPlanes = require('./seedPlanes');

/**
 * Script maestro para ejecutar todos los seeders
 * Se ejecuta automáticamente al levantar el servidor
 */

async function runAllSeeders() {
  console.log('\n========================================');
  console.log('  INICIANDO SEEDERS DE VITAMIA');
  console.log('========================================\n');
  
  const startTime = Date.now();
  
  try {
    // 1. Primero sembrar los tipos de comida (dependencia de otros)
    console.log('1. Ejecutando seeder de Tipos de Comida...');
    await seedTipoComida();
    
    // 2. Sembrar alimentos
    console.log('2. Ejecutando seeder de Alimentos...');
    await seedAlimentos();
    
    // 3. Sembrar logros
    console.log('3. Ejecutando seeder de Logros...');
    await seedLogros();
    
    // 4. Sembrar planes
    console.log('4. Ejecutando seeder de Planes...');
    await seedPlanes();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n========================================');
    console.log('  TODOS LOS SEEDERS COMPLETADOS');
    console.log(`  Tiempo total: ${duration} segundos`);
    console.log('========================================\n');
    
  } catch (error) {
    console.error('\n========================================');
    console.error('  ERROR AL EJECUTAR SEEDERS');
    console.error('========================================');
    console.error(error);
    console.error('========================================\n');
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('Conexión a base de datos cerrada.\n');
  }
}

// Exportar para uso en el servidor
module.exports = runAllSeeders;

// Si se ejecuta directamente (no como módulo), ejecutar los seeders
if (require.main === module) {
  runAllSeeders()
    .then(() => {
      console.log('Proceso completado exitosamente!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error fatal:', error);
      process.exit(1);
    });
}
