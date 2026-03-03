const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const logros = [
  // LOGROS DE RACHAS - Días consecutivos
  {
    id: 1,
    subtitulo: 'Frutero',
    descripcion: 'Come frutas 5 días seguidos',
    tipo: 'racha',
    criterio: 'frutas:5',
    icono: 'manzana'
  },
  {
    id: 2,
    subtitulo: 'Amante de las Verduras',
    descripcion: 'Come verduras 7 días seguidos',
    tipo: 'racha',
    criterio: 'verduras:7',
    icono: 'ensalada'
  },
  {
    id: 3,
    subtitulo: 'Constancia Nutricional',
    descripcion: 'Registra tus comidas 10 días seguidos',
    tipo: 'racha',
    criterio: 'registro:10',
    icono: 'nota'
  },
  {
    id: 4,
    subtitulo: 'Fitness Warrior',
    descripcion: 'Mantén tu meta calórica 7 días seguidos',
    tipo: 'racha',
    criterio: 'meta_calorias:7',
    icono: 'fuego'
  },
  {
    id: 5,
    subtitulo: 'Proteína Power',
    descripcion: 'Consume carnes o pescados 5 días seguidos',
    tipo: 'racha',
    criterio: 'proteinas:5',
    icono: 'pollo'
  },

  // LOGROS DE CANTIDAD TOTAL
  {
    id: 6,
    subtitulo: 'Maestro Frutal',
    descripcion: 'Consume 100 porciones de frutas',
    tipo: 'cantidad',
    criterio: 'frutas:100',
    icono: 'fresa'
  },
  {
    id: 7,
    subtitulo: 'Rey de las Verduras',
    descripcion: 'Consume 150 porciones de verduras',
    tipo: 'cantidad',
    criterio: 'verduras:150',
    icono: 'brocoli'
  },
  {
    id: 8,
    subtitulo: 'Energía Saludable',
    descripcion: 'Consume 50 porciones de cereales',
    tipo: 'cantidad',
    criterio: 'cereales:50',
    icono: 'trigo'
  },
  {
    id: 9,
    subtitulo: 'Hidratación Pro',
    descripcion: 'Registra 100 consumos de bebidas',
    tipo: 'cantidad',
    criterio: 'bebidas:100',
    icono: 'agua'
  },
  {
    id: 10,
    subtitulo: 'Nutricionista Amateur',
    descripcion: 'Registra 200 consumos en total',
    tipo: 'cantidad',
    criterio: 'total:200',
    icono: 'diana'
  },

  // LOGROS DE VARIEDAD
  {
    id: 11,
    subtitulo: 'Explorador Culinario',
    descripcion: 'Prueba alimentos de 8 categorías diferentes',
    tipo: 'variedad',
    criterio: 'categorias:8',
    icono: 'mundo'
  },
  {
    id: 12,
    subtitulo: 'Arcoíris Nutricional',
    descripcion: 'Consume alimentos de todas las categorías',
    tipo: 'variedad',
    criterio: 'categorias:12',
    icono: 'arcoiris'
  },

  // LOGROS DE INICIO
  {
    id: 13,
    subtitulo: 'Primer Paso',
    descripcion: 'Registra tu primera comida',
    tipo: 'hito',
    criterio: 'primera_comida:1',
    icono: 'bebe'
  },
  {
    id: 14,
    subtitulo: 'Primera Semana',
    descripcion: 'Completa tu primera semana en VitaMia',
    tipo: 'hito',
    criterio: 'dias_activo:7',
    icono: 'calendario'
  },
  {
    id: 15,
    subtitulo: 'Un Mes Contigo',
    descripcion: 'Completa un mes usando VitaMia',
    tipo: 'hito',
    criterio: 'dias_activo:30',
    icono: 'calendario-mes'
  },

  // LOGROS DE DESAYUNO
  {
    id: 16,
    subtitulo: 'Buen Comienzo',
    descripcion: 'Desayuna 5 días seguidos',
    tipo: 'racha',
    criterio: 'desayuno:5',
    icono: 'amanecer'
  },
  {
    id: 17,
    subtitulo: 'Maestro del Desayuno',
    descripcion: 'Desayuna 30 días seguidos',
    tipo: 'racha',
    criterio: 'desayuno:30',
    icono: 'sol'
  },

  // LOGROS DE BALANCE
  {
    id: 18,
    subtitulo: 'Balance Perfect',
    descripcion: 'Come equilibrado (desayuno, almuerzo, cena) 5 días seguidos',
    tipo: 'racha',
    criterio: 'balance:5',
    icono: 'balanza'
  },
  {
    id: 19,
    subtitulo: 'Snack Saludable',
    descripcion: 'Registra snacks saludables 10 veces',
    tipo: 'cantidad',
    criterio: 'snacks:10',
    icono: 'nuez'
  },

  // LOGROS ESPECIALES
  {
    id: 20,
    subtitulo: 'Leyenda Nutricional',
    descripcion: 'Registra consumos 50 días seguidos',
    tipo: 'racha',
    criterio: 'registro:50',
    icono: 'corona'
  }
];

async function seedLogros() {
  try {
    console.log('Iniciando seed de logros...\n');

    let insertados = 0;
    let actualizados = 0;

    for (const logro of logros) {
      // Verificar si existe antes del upsert para contar correctamente
      const existente = await prisma.logro.findUnique({
        where: {
          id: logro.id
        }
      });

      await prisma.logro.upsert({
        where: { 
          id: logro.id
        },
        update: {
          subtitulo: logro.subtitulo,
          descripcion: logro.descripcion,
          tipo: logro.tipo,
          criterio: logro.criterio,
          icono: logro.icono
        },
        create: logro
      });
      
      if (!existente) {
        console.log(`+ ${logro.icono} ${logro.subtitulo} - "${logro.descripcion}" (ID ${logro.id})`);
        insertados++;
      } else {
        console.log(`* ${logro.subtitulo} actualizado (ID ${logro.id})`);
        actualizados++;
      }
    }

    console.log('\nSeed de logros completado!');
    console.log(`Logros insertados: ${insertados}`);
    console.log(`Logros actualizados: ${actualizados}`);
    console.log(`Total de logros en la base de datos: ${insertados + actualizados}\n`);

  } catch (error) {
    console.error('Error al ejecutar seed de logros:', error);
    throw error;
  }
}

module.exports = seedLogros;
