const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const logros = [
  // LOGROS DE RACHAS - Días consecutivos
  {
    subtitulo: 'Frutero',
    descripcion: 'Come frutas 5 días seguidos',
    tipo: 'racha',
    criterio: 'frutas:5',
    icono: '🍎'
  },
  {
    subtitulo: 'Amante de las Verduras',
    descripcion: 'Come verduras 7 días seguidos',
    tipo: 'racha',
    criterio: 'verduras:7',
    icono: '🥗'
  },
  {
    subtitulo: 'Constancia Nutricional',
    descripcion: 'Registra tus comidas 10 días seguidos',
    tipo: 'racha',
    criterio: 'registro:10',
    icono: '📝'
  },
  {
    subtitulo: 'Fitness Warrior',
    descripcion: 'Mantén tu meta calórica 7 días seguidos',
    tipo: 'racha',
    criterio: 'meta_calorias:7',
    icono: '🔥'
  },
  {
    subtitulo: 'Proteína Power',
    descripcion: 'Consume carnes o pescados 5 días seguidos',
    tipo: 'racha',
    criterio: 'proteinas:5',
    icono: '🍗'
  },

  // LOGROS DE CANTIDAD TOTAL
  {
    subtitulo: 'Maestro Frutal',
    descripcion: 'Consume 100 porciones de frutas',
    tipo: 'cantidad',
    criterio: 'frutas:100',
    icono: '🍓'
  },
  {
    subtitulo: 'Rey de las Verduras',
    descripcion: 'Consume 150 porciones de verduras',
    tipo: 'cantidad',
    criterio: 'verduras:150',
    icono: '🥦'
  },
  {
    subtitulo: 'Energía Saludable',
    descripcion: 'Consume 50 porciones de cereales',
    tipo: 'cantidad',
    criterio: 'cereales:50',
    icono: '🌾'
  },
  {
    subtitulo: 'Hidratación Pro',
    descripcion: 'Registra 100 consumos de bebidas',
    tipo: 'cantidad',
    criterio: 'bebidas:100',
    icono: '💧'
  },
  {
    subtitulo: 'Nutricionista Amateur',
    descripcion: 'Registra 200 consumos en total',
    tipo: 'cantidad',
    criterio: 'total:200',
    icono: '🎯'
  },

  // LOGROS DE VARIEDAD
  {
    subtitulo: 'Explorador Culinario',
    descripcion: 'Prueba alimentos de 8 categorías diferentes',
    tipo: 'variedad',
    criterio: 'categorias:8',
    icono: '🌍'
  },
  {
    subtitulo: 'Arcoíris Nutricional',
    descripcion: 'Consume alimentos de todas las categorías',
    tipo: 'variedad',
    criterio: 'categorias:12',
    icono: '🌈'
  },

  // LOGROS DE INICIO
  {
    subtitulo: 'Primer Paso',
    descripcion: 'Registra tu primera comida',
    tipo: 'hito',
    criterio: 'primera_comida:1',
    icono: '👶'
  },
  {
    subtitulo: 'Primera Semana',
    descripcion: 'Completa tu primera semana en VitaMia',
    tipo: 'hito',
    criterio: 'dias_activo:7',
    icono: '📅'
  },
  {
    subtitulo: 'Un Mes Contigo',
    descripcion: 'Completa un mes usando VitaMia',
    tipo: 'hito',
    criterio: 'dias_activo:30',
    icono: '🗓️'
  },

  // LOGROS DE DESAYUNO
  {
    subtitulo: 'Buen Comienzo',
    descripcion: 'Desayuna 5 días seguidos',
    tipo: 'racha',
    criterio: 'desayuno:5',
    icono: '🌅'
  },
  {
    subtitulo: 'Maestro del Desayuno',
    descripcion: 'Desayuna 30 días seguidos',
    tipo: 'racha',
    criterio: 'desayuno:30',
    icono: '☀️'
  },

  // LOGROS DE BALANCE
  {
    subtitulo: 'Balance Perfect',
    descripcion: 'Come equilibrado (desayuno, almuerzo, cena) 5 días seguidos',
    tipo: 'racha',
    criterio: 'balance:5',
    icono: '⚖️'
  },
  {
    subtitulo: 'Snack Saludable',
    descripcion: 'Registra snacks saludables 10 veces',
    tipo: 'cantidad',
    criterio: 'snacks:10',
    icono: '🥜'
  },

  // LOGROS ESPECIALES
  {
    subtitulo: 'Leyenda Nutricional',
    descripcion: 'Registra consumos 50 días seguidos',
    tipo: 'racha',
    criterio: 'registro:50',
    icono: '👑'
  }
];

async function seedLogros() {
  try {
    console.log('🏆 Iniciando seed de logros...\n');

    let insertados = 0;
    let existentes = 0;

    for (const logro of logros) {
      const existente = await prisma.logro.findFirst({
        where: {
          subtitulo: logro.subtitulo
        }
      });

      if (!existente) {
        await prisma.logro.create({
          data: logro
        });
        console.log(`✓ ${logro.icono} ${logro.subtitulo} - "${logro.descripcion}"`);
        insertados++;
      } else {
        console.log(`⊘ ${logro.subtitulo} ya existe`);
        existentes++;
      }
    }

    console.log('\n🎉 Seed de logros completado!');
    console.log(`📊 Logros insertados: ${insertados}`);
    console.log(`📊 Logros que ya existían: ${existentes}`);
    console.log(`📊 Total de logros en la base de datos: ${insertados + existentes}`);

  } catch (error) {
    console.error('❌ Error al ejecutar seed de logros:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedLogros()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
