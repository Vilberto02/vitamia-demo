const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Insertando datos de ejemplo...');

    // Insertar tipos de comida
    const tiposComida = await prisma.tipoComida.createMany({
      data: [
        { nombre: 'desayuno' },
        { nombre: 'almuerzo' },
        { nombre: 'cena' },
        { nombre: 'snack' },
      ],
      skipDuplicates: true,
    });

    // Obtener IDs de tipos de comida
    const desayuno = await prisma.tipoComida.findUnique({ where: { nombre: 'desayuno' } });
    const almuerzo = await prisma.tipoComida.findUnique({ where: { nombre: 'almuerzo' } });
    const cena = await prisma.tipoComida.findUnique({ where: { nombre: 'cena' } });
    const snack = await prisma.tipoComida.findUnique({ where: { nombre: 'snack' } });

    // Insertar alimentos
    await prisma.alimento.createMany({
      data: [
        { nombre: 'Manzana', unidad: 'unidad', id_tipo_comida: desayuno.id },
        { nombre: 'Banana', unidad: 'unidad', id_tipo_comida: desayuno.id },
        { nombre: 'Yogurt', unidad: 'unidad', id_tipo_comida: desayuno.id },
        { nombre: 'Arroz', unidad: 'gramos', id_tipo_comida: almuerzo.id },
        { nombre: 'Pollo', unidad: 'gramos', id_tipo_comida: almuerzo.id },
        { nombre: 'Ensalada', unidad: 'porción', id_tipo_comida: almuerzo.id },
        { nombre: 'Pasta', unidad: 'gramos', id_tipo_comida: cena.id },
        { nombre: 'Pescado', unidad: 'gramos', id_tipo_comida: cena.id },
        { nombre: 'Frutos secos', unidad: 'gramos', id_tipo_comida: snack.id },
        { nombre: 'Galletas integrales', unidad: 'unidad', id_tipo_comida: snack.id },
      ],
      skipDuplicates: true,
    });

    // Insertar recetas
    await prisma.receta.createMany({
      data: [
        {
          titulo: 'Avena rápida',
          id_tipo_comida: desayuno.id,
          tiempo_preparacion: '10 min',
          descripcion: 'Avena fácil para empezar el día',
          beneficios: 'Fuente de energía y fibra',
          ingredientes: 'Avena, leche, fruta',
          procedimiento: 'Mezclar y calentar',
          imagen: 'avena.jpg',
        },
        {
          titulo: 'Ensalada de pollo',
          id_tipo_comida: almuerzo.id,
          tiempo_preparacion: '20 min',
          descripcion: 'Ensalada nutritiva con pollo',
          beneficios: 'Alta en proteína y vitaminas',
          ingredientes: 'Lechuga, pollo, tomate, zanahoria',
          procedimiento: 'Mezclar todos los ingredientes',
          imagen: 'ensalada.jpg',
        },
        {
          titulo: 'Salmón a la plancha',
          id_tipo_comida: cena.id,
          tiempo_preparacion: '15 min',
          descripcion: 'Salmón con verduras',
          beneficios: 'Rico en Omega-3',
          ingredientes: 'Salmón, brócoli, limón',
          procedimiento: 'Cocinar a la plancha con limón',
          imagen: 'salmon.jpg',
        },
        {
          titulo: 'Smoothie de frutas',
          id_tipo_comida: snack.id,
          tiempo_preparacion: '5 min',
          descripcion: 'Batido energético',
          beneficios: 'Vitaminas y antioxidantes',
          ingredientes: 'Fresas, plátano, yogurt',
          procedimiento: 'Licuar todos los ingredientes',
          imagen: 'smoothie.jpg',
        },
        {
          titulo: 'Tostadas con aguacate',
          id_tipo_comida: desayuno.id,
          tiempo_preparacion: '8 min',
          descripcion: 'Desayuno nutritivo y rápido',
          beneficios: 'Grasas saludables',
          ingredientes: 'Pan integral, aguacate, huevo',
          procedimiento: 'Tostar pan y agregar aguacate machacado',
          imagen: 'tostadas.jpg',
        },
        {
          titulo: 'Pollo al horno con vegetales',
          id_tipo_comida: almuerzo.id,
          tiempo_preparacion: '30 min',
          descripcion: 'Plato completo y balanceado',
          beneficios: 'Alto en proteínas',
          ingredientes: 'Pollo, zanahoria, papa, cebolla',
          procedimiento: 'Hornear todo junto con especias',
          imagen: 'pollo_horno.jpg',
        },
      ],
      skipDuplicates: true,
    });

    // Insertar información nutricional
    await prisma.informacion.createMany({
      data: [
        {
          titulo: 'Mantente hidratado',
          descripcion: 'Bebe al menos 2 litros de agua al día',
          beneficio: 'Mejora tu digestión y mantiene tu piel saludable',
          imagen: 'agua.jpg',
        },
        {
          titulo: 'Come más frutas',
          descripcion: 'Incorpora 5 porciones de frutas y verduras diarias',
          beneficio: 'Obtendrás vitaminas esenciales para tu cuerpo',
          imagen: 'frutas.jpg',
        },
      ],
      skipDuplicates: true,
    });

    // Insertar usuario de ejemplo
    const usuario = await prisma.usuario.create({
      data: {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@ejemplo.com',
        contrasena: '$2b$10$example.hash.placeholder.for.seed.data.only',
        fecha_nacimiento: new Date('2000-01-15'),
        meta: 'Mantener una dieta balanceada',
        peso: 70,
        altura: 1.75,
        imc: 22.86,
        imagen: 'usuario.jpg',
      },
    });

    // Obtener recetas para vincular con recetas consumidas
    const recetas = await prisma.receta.findMany();

    // Insertar recetas consumidas de ejemplo
    if (recetas.length > 0) {
      await prisma.recetaConsumida.createMany({
        data: [
          {
            id_receta: recetas[0].id,
            id_usuario: usuario.id,
            id_tipo_comida: desayuno.id,
            fecha: new Date('2024-11-20'),
          },
          {
            id_receta: recetas[1].id,
            id_usuario: usuario.id,
            id_tipo_comida: almuerzo.id,
            fecha: new Date('2024-11-20'),
          },
        ],
        skipDuplicates: true,
      });
    }

    // Insertar consumos de alimentos de ejemplo
    const alimentos = await prisma.alimento.findMany();
    if (alimentos.length > 0) {
      await prisma.consumo.createMany({
        data: [
          {
            id_alimento: alimentos[0].id,
            id_usuario: usuario.id,
            id_tipo_comida: desayuno.id,
            cantidad: 2,
            fecha: new Date('2024-11-20'),
          },
          {
            id_alimento: alimentos[3].id,
            id_usuario: usuario.id,
            id_tipo_comida: almuerzo.id,
            cantidad: 150,
            fecha: new Date('2024-11-20'),
          },
        ],
        skipDuplicates: true,
      });
    }

    // Obtener todas las recetas para crear planes
    const todasLasRecetas = await prisma.receta.findMany();

    // Insertar planes
    const plan1 = await prisma.plan.create({
      data: {
        nombre: 'Plan Balanceado',
        informacion: 'Ideal para mantener un peso saludable',
        descripcion: 'Este plan incluye comidas equilibradas con todos los grupos alimenticios necesarios para mantener una nutrición óptima.',
        beneficios: 'Mantiene energía constante, mejora digestión, fortalece el sistema inmunológico',
      },
    });

    const plan2 = await prisma.plan.create({
      data: {
        nombre: 'Plan Alto en Proteína',
        informacion: 'Perfecto para aumentar masa muscular',
        descripcion: 'Plan diseñado con recetas ricas en proteínas para apoyar el desarrollo muscular y la recuperación después del ejercicio.',
        beneficios: 'Aumenta masa muscular, acelera recuperación, aumenta saciedad',
      },
    });

    // Asignar recetas al Plan Balanceado (una por cada tipo de comida)
    if (todasLasRecetas.length >= 4) {
      await prisma.planReceta.createMany({
        data: [
          {
            id_plan: plan1.id,
            id_receta: todasLasRecetas[0].id, // Avena rápida - desayuno
            id_tipo_comida: desayuno.id,
          },
          {
            id_plan: plan1.id,
            id_receta: todasLasRecetas[1].id, // Ensalada de pollo - almuerzo
            id_tipo_comida: almuerzo.id,
          },
          {
            id_plan: plan1.id,
            id_receta: todasLasRecetas[2].id, // Salmón - cena
            id_tipo_comida: cena.id,
          },
          {
            id_plan: plan1.id,
            id_receta: todasLasRecetas[3].id, // Smoothie - snack
            id_tipo_comida: snack.id,
          },
        ],
        skipDuplicates: true,
      });

      // Asignar recetas al Plan Alto en Proteína
      await prisma.planReceta.createMany({
        data: [
          {
            id_plan: plan2.id,
            id_receta: todasLasRecetas[4].id, // Tostadas con aguacate - desayuno
            id_tipo_comida: desayuno.id,
          },
          {
            id_plan: plan2.id,
            id_receta: todasLasRecetas[5].id, // Pollo al horno - almuerzo
            id_tipo_comida: almuerzo.id,
          },
          {
            id_plan: plan2.id,
            id_receta: todasLasRecetas[2].id, // Salmón - cena
            id_tipo_comida: cena.id,
          },
          {
            id_plan: plan2.id,
            id_receta: todasLasRecetas[3].id, // Smoothie - snack
            id_tipo_comida: snack.id,
          },
        ],
        skipDuplicates: true,
      });
    }

    // Insertar plan de usuario de ejemplo (usuario sigue el Plan Balanceado)
    await prisma.planUsuario.create({
      data: {
        id_plan: plan1.id,
        id_usuario: usuario.id,
        fecha: new Date('2024-11-20'),
      },
    });

    console.log('✓ Datos insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
