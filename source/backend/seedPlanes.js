const prisma = require('./prismaClient');

/**
 * Script para poblar la tabla de planes con dietas para diferentes objetivos
 * Incluye planes para pérdida de peso, aumento de masa muscular, salud general, etc.
 */

const planes = [
  {
    nombre: 'Plan de Pérdida de Peso',
    informacion: 'Dieta balanceada baja en calorías para perder peso de forma saludable',
    descripcion: `Este plan está diseñado para ayudarte a perder peso de manera gradual y sostenible. 
    Se enfoca en crear un déficit calórico moderado (300-500 calorías) a través de comidas nutritivas 
    y balanceadas. Incluye proteínas magras, vegetales abundantes, carbohidratos complejos en porciones 
    controladas y grasas saludables. El plan promueve la saciedad mientras mantiene un aporte nutricional 
    completo, evitando la sensación de hambre extrema y facilitando la adherencia a largo plazo.`,
    beneficios: `✓ Pérdida de peso gradual y sostenible (0.5-1 kg por semana)
✓ Mejora en la composición corporal
✓ Mayor energía y vitalidad
✓ Reducción de riesgo cardiovascular
✓ Mejora en marcadores metabólicos
✓ Hábitos alimenticios sostenibles
✓ No requiere eliminar grupos de alimentos
✓ Reduce la inflamación corporal`
  },
  {
    nombre: 'Plan de Aumento de Masa Muscular',
    informacion: 'Alto en proteínas y calorías para ganancia muscular efectiva',
    descripcion: `Plan nutricional diseñado para maximizar el crecimiento muscular mediante un 
    superávit calórico controlado (300-500 calorías) y un alto aporte proteico (1.8-2.2g por kg de peso). 
    Incluye múltiples comidas al día con enfoque en proteínas de alta calidad, carbohidratos para 
    energía y recuperación, y grasas saludables para la producción hormonal. Ideal para combinar con 
    entrenamiento de fuerza regular. Las comidas están distribuidas estratégicamente para optimizar 
    la síntesis proteica muscular durante todo el día.`,
    beneficios: `✓ Aumento de masa muscular magra
✓ Mejora en fuerza y rendimiento físico
✓ Recuperación muscular acelerada
✓ Aumento del metabolismo basal
✓ Mejor composición corporal
✓ Mayor densidad ósea
✓ Optimización hormonal natural
✓ Reducción del porcentaje de grasa relativo`
  },
  {
    nombre: 'Plan Mediterráneo',
    informacion: 'Dieta tradicional mediterránea rica en aceite de oliva, pescado y vegetales',
    descripcion: `Basado en los patrones alimentarios de países mediterráneos, este plan prioriza 
    alimentos frescos, naturales y mínimamente procesados. Incluye abundantes vegetales, frutas, 
    legumbres, granos enteros, pescados grasos, aceite de oliva como grasa principal, y consumo 
    moderado de lácteos y aves. Limita las carnes rojas y azúcares añadidos. Es uno de los patrones 
    alimentarios mejor estudiados científicamente, asociado con longevidad y salud cardiovascular. 
    Además de nutritivo, es delicioso y fácil de mantener a largo plazo.`,
    beneficios: `✓ Reducción significativa del riesgo cardiovascular
✓ Mejora en la salud cerebral y cognitiva
✓ Propiedades antiinflamatorias potentes
✓ Reducción del riesgo de diabetes tipo 2
✓ Promoción de longevidad
✓ Rica en antioxidantes naturales
✓ Apoyo a la microbiota intestinal
✓ Patrón alimentario sostenible y placentero`
  },
  {
    nombre: 'Plan Vegetariano Balanceado',
    informacion: 'Dieta 100% vegetal balanceada con todos los nutrientes esenciales',
    descripcion: `Plan vegetariano completo que asegura el aporte adecuado de proteínas, hierro, 
    calcio, vitamina B12 y otros nutrientes críticos mediante fuentes vegetales diversas. Incluye 
    legumbres, granos integrales, frutos secos, semillas, tofu, tempeh, y gran variedad de frutas 
    y verduras. Cada comida está diseñada para combinar proteínas complementarias y maximizar la 
    absorción de nutrientes. Adecuado para vegetarianos o quienes buscan reducir el consumo de 
    productos animales sin comprometer su nutrición.`,
    beneficios: `✓ Reducción de riesgo de enfermedades crónicas
✓ Alto aporte de fibra dietética
✓ Rica en antioxidantes y fitonutrientes
✓ Mejora en la salud digestiva
✓ Menor impacto ambiental
✓ Reducción de colesterol
✓ Control de peso más efectivo
✓ Mayor variedad de alimentos vegetales`
  },
  {
    nombre: 'Plan Keto (Cetogénico)',
    informacion: 'Muy bajo en carbohidratos, alto en grasas saludables para cetosis',
    descripcion: `Plan nutricional bajo en carbohidratos (menos de 50g/día) y alto en grasas saludables 
    que induce un estado metabólico llamado cetosis, donde el cuerpo quema grasa como combustible 
    principal. Incluye carnes, pescados grasos, huevos, aguacate, frutos secos, aceites saludables, 
    y vegetales bajos en carbohidratos. Las proteínas se mantienen moderadas. Este plan requiere 
    adaptación metabólica inicial (1-2 semanas) y seguimiento para asegurar electrolitos adecuados. 
    No recomendado para atletas de alta intensidad.`,
    beneficios: `✓ Pérdida de peso acelerada inicial
✓ Reducción significativa del apetito
✓ Mejora en niveles de azúcar en sangre
✓ Mayor claridad mental y concentración
✓ Niveles de energía estables
✓ Reducción de triglicéridos
✓ Útil en epilepsia resistente a medicamentos
✓ Potencial neuroprotector`
  },
  {
    nombre: 'Plan Balanceado Saludable',
    informacion: 'Dieta equilibrada con todos los grupos alimentarios en proporciones óptimas',
    descripcion: `Plan nutricional completo y balanceado basado en las recomendaciones de organismos 
    de salud internacionales. Incluye todos los grupos de alimentos en proporciones adecuadas: 
    proteínas (20-30%), carbohidratos (45-55%), grasas saludables (25-35%). Prioriza alimentos 
    integrales, minimiza procesados, y asegura variedad nutricional. Incluye 3 comidas principales 
    y 2 snacks opcionales. Flexible y adaptable a diferentes preferencias. Ideal para mantenimiento 
    de peso, salud general, y como punto de partida para desarrollar hábitos saludables.`,
    beneficios: `✓ Nutrición completa y adecuada
✓ Fácil de seguir a largo plazo
✓ Flexible y adaptable
✓ Prevención de deficiencias nutricionales
✓ Energía constante durante el día
✓ Apto para toda la familia
✓ Mejora en salud general
✓ Base para hábitos sostenibles`
  },
  {
    nombre: 'Plan Detox Saludable',
    informacion: 'Rica en antioxidantes y alimentos depurativos para resetear el organismo',
    descripcion: `Plan de corto plazo (7-14 días) diseñado para reducir la carga tóxica del organismo 
    y promover los procesos naturales de desintoxicación. Elimina temporalmente alimentos procesados, 
    azúcares refinados, alcohol, cafeína y alérgenos comunes. Se enfoca en verduras crucíferas, 
    vegetales de hoja verde, frutas bajas en azúcar, agua abundante, infusiones herbales, y alimentos 
    con propiedades hepatoprotectoras. No es una "detox milagro" sino un reset saludable basado en 
    evidencia científica sobre nutrición y fisiología hepática.`,
    beneficios: `✓ Mejora en la función digestiva
✓ Aumento de energía y vitalidad
✓ Piel más clara y radiante
✓ Reducción de hinchazón
✓ Mejor calidad del sueño
✓ Reseteo de hábitos alimentarios
✓ Mayor claridad mental
✓ Apoyo a la función hepática natural`
  },
  {
    nombre: 'Plan Alto en Proteínas',
    informacion: 'Énfasis en proteínas de calidad para saciedad y preservación muscular',
    descripcion: `Plan nutricional con mayor proporción de proteínas (30-40% de calorías totales) 
    para promover saciedad, preservar masa muscular durante pérdida de peso, o apoyar objetivos 
    de composición corporal. Incluye proteínas de alta calidad en cada comida: huevos, carnes magras, 
    pescados, lácteos bajos en grasa, legumbres, y suplementos proteicos opcionales. Carbohidratos 
    moderados enfocados en momentos estratégicos (pre/post entrenamiento). Grasas saludables en 
    cantidad moderada. Requiere buena hidratación.`,
    beneficios: `✓ Mayor sensación de saciedad
✓ Preservación de masa muscular
✓ Efecto térmico elevado (quema más calorías)
✓ Mejor control del apetito
✓ Recuperación muscular optimizada
✓ Estabilidad de azúcar en sangre
✓ Apoyo a la pérdida de grasa
✓ Mejora en composición corporal`
  },
  {
    nombre: 'Plan DASH (Anti-Hipertensión)',
    informacion: 'Diseñado específicamente para controlar la presión arterial',
    descripcion: `Plan nutricional desarrollado por el Instituto Nacional de Salud de EE.UU. 
    específicamente para prevenir y controlar la hipertensión arterial. Rico en frutas, verduras, 
    granos enteros, lácteos bajos en grasa, proteínas magras, frutos secos y semillas. Bajo en 
    sodio (menos de 2300mg/día, idealmente 1500mg), grasas saturadas, azúcares añadidos y carnes 
    rojas. Alto en potasio, magnesio y calcio. Además de controlar la presión arterial, promueve 
    la salud cardiovascular general y puede ayudar en la pérdida de peso.`,
    beneficios: `✓ Reducción significativa de presión arterial
✓ Disminución del riesgo cardiovascular
✓ Mejora en perfil lipídico
✓ Rico en nutrientes esenciales
✓ Pérdida de peso saludable
✓ Reducción de riesgo de ACV
✓ Mejora en función renal
✓ Prevención de osteoporosis`
  },
  {
    nombre: 'Plan Flexible (IIFYM)',
    informacion: 'Enfoque flexible basado en macronutrientes sin alimentos prohibidos',
    descripcion: `Plan nutricional flexible y moderno que se enfoca en cumplir objetivos de 
    macronutrientes (proteínas, carbohidratos, grasas) y calorías totales, sin clasificar alimentos 
    como "buenos" o "malos". Sigue la regla 80/20: 80% alimentos nutritivos y densos, 20% alimentos 
    por placer o preferencia. Requiere rastreo de alimentos mediante apps. Altamente personalizable 
    y sostenible a largo plazo. Ideal para quienes buscan control preciso sin restricciones extremas. 
    Enseña balance, moderación y relación saludable con la comida.`,
    beneficios: `✓ Alta adherencia a largo plazo
✓ Flexibilidad social sin culpa
✓ Educación nutricional práctica
✓ Control preciso de resultados
✓ Sin alimentos prohibidos
✓ Adaptable a cualquier objetivo
✓ Previene desórdenes alimentarios
✓ Sostenible indefinidamente`
  },
  {
    nombre: 'Plan Vegano Completo',
    informacion: '100% vegetal sin productos animales, nutricionalmente completo',
    descripcion: `Plan vegano bien diseñado que elimina todos los productos de origen animal mientras 
    asegura el aporte completo de nutrientes. Incluye suplementación de B12, fuentes de omega-3 (algas), 
    proteínas completas mediante combinaciones estratégicas, fuentes de hierro no hemo con potenciadores 
    de absorción, calcio de vegetales y fortificados. Rico en legumbres, tofu, tempeh, seitan, 
    quinoa, granos enteros, frutos secos, semillas y abundantes frutas y verduras.`,
    beneficios: `✓ Menor huella de carbono
✓ Rico en fibra y antioxidantes
✓ Reducción de riesgo cardiovascular
✓ Menor riesgo de diabetes tipo 2
✓ Ético con animales
✓ Mayor conciencia alimentaria
✓ Control de peso efectivo
✓ Mejora en salud intestinal`
  },
  {
    nombre: 'Plan Paleo',
    informacion: 'Basado en alimentos que comían nuestros ancestros paleolíticos',
    descripcion: `Plan que imita la alimentación de la era paleolítica, eliminando granos, lácteos, 
    legumbres y alimentos procesados. Se enfoca en carnes de calidad, pescados, huevos, vegetales, 
    frutas, frutos secos y semillas. Prioriza alimentos orgánicos y de animales alimentados con pasto. 
    Elimina azúcares refinados, aceites vegetales procesados y aditivos. Puede ser más alto en 
    proteínas y grasas que la dieta estándar.`,
    beneficios: `✓ Reducción de inflamación
✓ Mejora en sensibilidad a insulina
✓ Pérdida de peso efectiva
✓ Mayor energía sostenida
✓ Eliminación de procesados
✓ Rico en nutrientes densos
✓ Mejora en marcadores metabólicos
✓ Reducción de alergias alimentarias`
  },
  {
    nombre: 'Plan Ayuno Intermitente 16/8',
    informacion: 'Patrón de alimentación con ventana de 8 horas y ayuno de 16 horas',
    descripcion: `Plan que restringe la ingesta de alimentos a una ventana de 8 horas diarias (ejemplo: 
    12pm-8pm), con ayuno de 16 horas incluyendo el sueño. No restringe qué comer, sino cuándo comer. 
    Durante el ayuno se permite agua, café negro, té sin azúcar. Las comidas deben ser nutritivas y 
    balanceadas para cubrir necesidades en menos tiempo. Ayuda a regular hormonas metabólicas, mejora 
    sensibilidad a insulina y puede facilitar déficit calórico sin contar calorías.`,
    beneficios: `✓ Mejora en autofagia celular
✓ Regulación de insulina
✓ Pérdida de grasa preservando músculo
✓ Mayor claridad mental
✓ Simplificación de comidas
✓ Mejora en marcadores inflamatorios
✓ Flexibilidad en estilo de vida
✓ Potencial longevidad`
  },
  {
    nombre: 'Plan para Diabetes Tipo 2',
    informacion: 'Optimizado para control de glucosa y sensibilidad a insulina',
    descripcion: `Plan diseñado específicamente para personas con diabetes tipo 2 o prediabetes. 
    Enfatiza carbohidratos complejos de bajo índice glucémico, proteínas magras en cada comida, 
    grasas saludables, y abundante fibra. Evita azúcares simples, harinas refinadas y bebidas 
    azucaradas. Incluye distribución estratégica de carbohidratos a lo largo del día. Rico en 
    vegetales no almidonados. Puede combinarse con monitoreo de glucosa continuo.`,
    beneficios: `✓ Control óptimo de glucosa en sangre
✓ Mejora en HbA1c
✓ Reducción de medicación (bajo supervisión)
✓ Pérdida de peso saludable
✓ Prevención de complicaciones
✓ Mayor energía estable
✓ Mejora en sensibilidad a insulina
✓ Reducción de inflamación`
  },
  {
    nombre: 'Plan para Deportistas de Alto Rendimiento',
    informacion: 'Nutrición deportiva para máximo rendimiento y recuperación',
    descripcion: `Plan diseñado para atletas con entrenamientos intensos. Alto en carbohidratos 
    complejos para recargar glucógeno, proteínas suficientes para recuperación (1.6-2.2g/kg), 
    timing nutricional estratégico (pre/post entreno), hidratación optimizada con electrolitos, 
    y micronutrientes para función inmune. Incluye ventanas anabólicas, cargas de carbohidratos 
    pre-competencia, y suplementación basada en evidencia (creatina, beta-alanina opcional).`,
    beneficios: `✓ Máximo rendimiento deportivo
✓ Recuperación acelerada
✓ Prevención de lesiones
✓ Optimización de composición corporal
✓ Mayor resistencia
✓ Potencia y fuerza mejoradas
✓ Función inmune protegida
✓ Adaptaciones de entrenamiento maximizadas`
  },
  {
    nombre: 'Plan Anti-Inflamatorio',
    informacion: 'Rico en alimentos con propiedades antiinflamatorias naturales',
    descripcion: `Plan centrado en reducir inflamación crónica mediante alimentación. Incluye 
    pescados grasos ricos en omega-3, cúrcuma, jengibre, vegetales crucíferos, bayas, aceite de 
    oliva virgen extra, frutos secos, té verde. Elimina azúcares refinados, grasas trans, aceites 
    vegetales refinados, alimentos ultraprocesados. Rico en antioxidantes, polifenoles y 
    fitoquímicos. Útil para condiciones inflamatorias, dolor crónico, y prevención de enfermedades.`,
    beneficios: `✓ Reducción de marcadores inflamatorios
✓ Alivio de dolor articular
✓ Mejora en condiciones autoinmunes
✓ Protección cardiovascular
✓ Menor riesgo de cáncer
✓ Mejora en salud cerebral
✓ Recuperación deportiva mejorada
✓ Piel más saludable`
  },
  {
    nombre: 'Plan Low Carb Moderado',
    informacion: 'Bajo en carbohidratos sin llegar a cetosis, balanceado y sostenible',
    descripcion: `Plan con carbohidratos reducidos (50-100g/día) pero sin entrar en cetosis. Elimina 
    harinas refinadas, azúcares y almidones procesados, pero permite carbohidratos de vegetales, 
    algunas frutas bajas en azúcar, y porciones pequeñas de granos enteros. Enfatiza proteínas de 
    calidad y grasas saludables. Más sostenible que keto estricto, permite flexibilidad social, 
    y mantiene muchos beneficios metabólicos.`,
    beneficios: `✓ Control de peso efectivo
✓ Reducción de antojos de azúcar
✓ Mejora en energía
✓ Niveles de azúcar estables
✓ Más sostenible que keto
✓ Permite actividad de alta intensidad
✓ Reducción de triglicéridos
✓ Mejora en composición corporal`
  },
  {
    nombre: 'Plan para Embarazo Saludable',
    informacion: 'Nutrición optimizada para embarazo y desarrollo fetal',
    descripcion: `Plan diseñado para mujeres embarazadas que asegura nutrientes críticos: ácido fólico, 
    hierro, calcio, DHA, yodo, colina. Incluye proteínas de calidad, carbohidratos complejos, grasas 
    esenciales, y abundantes frutas y verduras. Evita alimentos de riesgo (pescados altos en mercurio, 
    quesos no pasteurizados, carnes crudas). Calorías aumentadas según trimestre. Énfasis en alimentos 
    densos nutricionalmente para apoyar crecimiento fetal sin exceso de peso materno.`,
    beneficios: `✓ Desarrollo fetal óptimo
✓ Prevención de defectos del tubo neural
✓ Reducción de riesgo de preeclampsia
✓ Ganancia de peso adecuada
✓ Menor riesgo de diabetes gestacional
✓ Energía para la madre
✓ Preparación para lactancia
✓ Recuperación postparto mejorada`
  },
  {
    nombre: 'Plan para Lactancia Materna',
    informacion: 'Optimizado para producción de leche y recuperación postparto',
    descripcion: `Plan para madres lactantes que aumenta calorías (+500 kcal/día) y líquidos para 
    producción de leche óptima. Rico en proteínas de calidad, calcio, hierro, omega-3 DHA, vitaminas 
    del complejo B. Incluye alimentos galactogogos naturales (avena, fenogreco, cerveza sin alcohol). 
    Evita exceso de cafeína, alcohol, y alimentos que puedan causar molestias al bebé. Hidratación 
    abundante (2-3 litros/día). Snacks nutritivos accesibles.`,
    beneficios: `✓ Producción de leche abundante
✓ Calidad nutricional de la leche
✓ Recuperación postparto acelerada
✓ Energía para cuidados del bebé
✓ Prevención de deficiencias
✓ Pérdida gradual de peso postparto
✓ Humor y salud mental estables
✓ Vínculo madre-bebé apoyado`
  },
  {
    nombre: 'Plan para Adultos Mayores',
    informacion: 'Nutrición adaptada a necesidades de mayores de 65 años',
    descripcion: `Plan diseñado para adultos mayores que enfatiza proteínas suficientes para prevenir 
    sarcopenia (1.2-1.5g/kg), calcio y vitamina D para salud ósea, fibra para regularidad digestiva, 
    vitamina B12 adecuada, hidratación consciente. Texturas adaptadas si hay problemas de masticación. 
    Comidas más pequeñas y frecuentes si hay pérdida de apetito. Rico en antioxidantes para 
    neuroprotección. Bajo en sodio para presión arterial.`,
    beneficios: `✓ Prevención de sarcopenia
✓ Mantenimiento de masa ósea
✓ Función cognitiva preservada
✓ Sistema inmune fortalecido
✓ Mejor calidad de vida
✓ Independencia funcional
✓ Prevención de caídas
✓ Vitalidad y energía`
  },
  {
    nombre: 'Plan para Niños en Crecimiento',
    informacion: 'Nutrición balanceada para desarrollo infantil óptimo',
    descripcion: `Plan diseñado para niños de 6-12 años en etapa de crecimiento. Incluye todos los 
    grupos alimentarios en porciones apropiadas a edad, calcio abundante para huesos, proteínas 
    para crecimiento, hierro para desarrollo cognitivo, grasas saludables para cerebro. Minimiza 
    azúcares añadidos y ultraprocesados. Presenta alimentos saludables de forma atractiva. Incluye 
    colaciones escolares nutritivas y opciones amigables para niños.`,
    beneficios: `✓ Crecimiento óptimo
✓ Desarrollo cognitivo mejorado
✓ Sistema inmune fuerte
✓ Huesos y dientes sanos
✓ Prevención de obesidad infantil
✓ Buenos hábitos de por vida
✓ Energía para actividades
✓ Mejor rendimiento escolar`
  },
  {
    nombre: 'Plan para Síndrome de Ovario Poliquístico',
    informacion: 'Especializado para manejar SOP mediante alimentación',
    descripcion: `Plan diseñado para mujeres con SOP que enfatiza bajo índice glucémico, proteínas 
    en cada comida, grasas antiinflamatorias, y carbohidratos complejos limitados. Incluye alimentos 
    antiandrogénicos naturales (menta verde, linaza), fibra abundante, suplementación de inositol 
    (opcional). Evita lácteos convencionales (pueden empeorar síntomas), azúcares simples, y 
    alimentos proinflamatorios. Apoya pérdida de peso si hay sobrepeso (5-10% mejora síntomas).`,
    beneficios: `✓ Regulación de ciclos menstruales
✓ Mejora en sensibilidad a insulina
✓ Reducción de andrógenos
✓ Pérdida de peso facilitada
✓ Mejora en fertilidad
✓ Reducción de acné
✓ Menor hirsutismo
✓ Mejor calidad de vida`
  },
  {
    nombre: 'Plan para Tiroides Hipotiroidea',
    informacion: 'Optimizado para función tiroidea y metabolismo lento',
    descripcion: `Plan para personas con hipotiroidismo que asegura yodo suficiente (pero no excesivo), 
    selenio de nueces de Brasil, zinc, hierro, vitamina D. Evita bociógenos crudos en exceso 
    (crucíferas crudas, soya no fermentada). Incluye proteínas adecuadas para metabolismo, 
    carbohidratos complejos para energía, y grasas saludables. Evita gluten si hay tiroiditis de 
    Hashimoto. Calorías ajustadas al metabolismo reducido.`,
    beneficios: `✓ Apoyo a función tiroidea
✓ Mejora en niveles de energía
✓ Control de peso más efectivo
✓ Reducción de síntomas (fatiga, frío)
✓ Mejor humor y concentración
✓ Piel y cabello más saludables
✓ Regularidad digestiva
✓ Reducción de inflamación`
  },
  {
    nombre: 'Plan Sin Gluten (Celíaco)',
    informacion: 'Libre de gluten para enfermedad celíaca o sensibilidad',
    descripcion: `Plan 100% sin gluten para personas con enfermedad celíaca o sensibilidad no celíaca. 
    Elimina trigo, cebada, centeno, y contaminación cruzada. Incluye granos naturalmente sin gluten 
    (arroz, quinoa, trigo sarraceno, mijo), proteínas naturales, frutas, verduras, lácteos, frutos secos. 
    Cuidado con productos procesados y lecturas de etiquetas. Asegura fibra de fuentes sin gluten. 
    Previene deficiencias nutricionales comunes en celíacos.`,
    beneficios: `✓ Curación de vellosidades intestinales
✓ Eliminación de síntomas digestivos
✓ Absorción nutricional restaurada
✓ Prevención de complicaciones
✓ Más energía y vitalidad
✓ Reducción de inflamación
✓ Mejor calidad de vida
✓ Prevención de deficiencias`
  },
  {
    nombre: 'Plan Sin Lácteos',
    informacion: 'Libre de productos lácteos para intolerancia o preferencia',
    descripcion: `Plan sin lácteos diseñado para intolerancia a lactosa, alergia a proteínas de leche, 
    o elección personal. Elimina leche, quesos, yogures, mantequilla, crema. Incluye alternativas 
    fortificadas (leches vegetales con calcio y vitamina D), fuentes no lácteas de calcio (vegetales 
    de hoja verde, almendras, tahini, sardinas), y proteínas completas de otras fuentes. Asegura 
    vitamina D y calcio adecuados.`,
    beneficios: `✓ Eliminación de síntomas digestivos
✓ Reducción de inflamación
✓ Mejora en problemas de piel
✓ Mejor digestión
✓ Alternativas nutritivas
✓ Reducción de mucosidad
✓ Compatible con otras dietas
✓ Exploración de nuevos alimentos`
  },
  {
    nombre: 'Plan para Síndrome de Intestino Irritable',
    informacion: 'Bajo en FODMAPs para reducir síntomas digestivos',
    descripcion: `Plan bajo en FODMAPs (azúcares fermentables) diseñado para síndrome de intestino 
    irritable. Elimina temporalmente alimentos altos en FODMAPs (ciertos lácteos, trigo, cebolla, 
    ajo, legumbres, algunas frutas) en fase de eliminación (2-6 semanas), luego reintroduce 
    sistemáticamente para identificar triggers personales. Incluye proteínas de calidad, vegetales 
    bajos en FODMAPs, frutas permitidas, granos sin gluten.`,
    beneficios: `✓ Reducción significativa de síntomas
✓ Menos hinchazón y gases
✓ Control de diarrea/estreñimiento
✓ Identificación de triggers personales
✓ Mejor calidad de vida
✓ Menor dolor abdominal
✓ Sueño mejorado
✓ Vida social facilitada`
  },
  {
    nombre: 'Plan para Enfermedad Renal Crónica',
    informacion: 'Controlado en proteínas, sodio, potasio y fósforo',
    descripcion: `Plan especializado para enfermedad renal crónica que limita proteínas según estadio 
    de la enfermedad, controla sodio (menos de 2g/día), potasio y fósforo. Prioriza proteínas de 
    alto valor biológico en cantidades adecuadas. Limita lácteos (fósforo), ciertos vegetales 
    (potasio), y sal. Hidratación controlada según función renal. Requiere supervisión médica. 
    Adaptado individualmente según análisis de laboratorio.`,
    beneficios: `✓ Preservación de función renal
✓ Control de presión arterial
✓ Prevención de hiperkalemia
✓ Manejo de anemia renal
✓ Ralentización de progresión
✓ Mejor calidad de vida
✓ Reducción de complicaciones
✓ Retraso de diálisis`
  },
  {
    nombre: 'Plan para Runners de Larga Distancia',
    informacion: 'Nutrición optimizada para corredores de maratón y ultra',
    descripcion: `Plan para corredores de larga distancia con énfasis en carbohidratos complejos 
    (60-65% de calorías) para glucógeno muscular, proteínas para recuperación, hidratación con 
    electrolitos, timing nutricional pre/post carrera, y estrategias de cargas de carbohidratos. 
    Incluye alimentos de fácil digestión, fuentes de hierro para transporte de oxígeno, y 
    antioxidantes para recuperación. Snacks portátiles para entrenamientos largos.`,
    beneficios: `✓ Mayor resistencia aeróbica
✓ Retardo de fatiga
✓ Recuperación más rápida
✓ Prevención de golpe del muro
✓ Hidratación optimizada
✓ Prevención de calambres
✓ Mejor rendimiento en carreras
✓ Reducción de lesiones`
  },
  {
    nombre: 'Plan para Crossfit y HIIT',
    informacion: 'Nutrición para entrenamiento de alta intensidad funcional',
    descripcion: `Plan diseñado para entrenamientos de alta intensidad y multifuncionales. Balance 
    entre carbohidratos para energía explosiva (40-50%), proteínas para recuperación muscular 
    (25-35%), y grasas saludables (20-30%). Timing nutricional crítico alrededor de los WODs. 
    Incluye suplementación estratégica (creatina, BCAAs opcionales), hidratación con electrolitos, 
    y nutrientes para recuperación del sistema nervioso. Snacks pre-WOD de fácil digestión.`,
    beneficios: `✓ Energía explosiva sostenida
✓ Recuperación entre WODs mejorada
✓ Ganancia de fuerza y potencia
✓ Preservación de masa muscular
✓ Reducción de fatiga central
✓ Mejor composición corporal
✓ PRs (records personales) mejorados
✓ Menor riesgo de sobreentrenamiento`
  },
  {
    nombre: 'Plan para Ciclistas',
    informacion: 'Nutrición estratégica para ciclismo de ruta y competencia',
    descripcion: `Plan para ciclistas que enfatiza carbohidratos como combustible primario, hidratación 
    con electrolitos para sudor abundante, proteínas para recuperación de piernas, y grasas para 
    salidas largas. Incluye estrategias de nutrición durante el pedaleo (geles, barras, bebidas), 
    cargas de carbohidratos pre-competencia, y recuperación post-salida. Rico en antioxidantes 
    para estrés oxidativo del ejercicio prolongado.`,
    beneficios: `✓ Mayor potencia sostenida
✓ Retardo de fatiga muscular
✓ Recuperación de glucógeno acelerada
✓ Hidratación optimizada en ruta
✓ Prevención de calambres
✓ Mejor rendimiento en subidas
✓ Recuperación entre etapas
✓ Prevención de lesiones por sobreuso`
  },
  {
    nombre: 'Plan para Nadadores',
    informacion: 'Nutrición para natación competitiva y entrenamientos acuáticos',
    descripcion: `Plan para nadadores que asegura calorías suficientes para entrenamientos en agua 
    (alto gasto calórico), carbohidratos para energía, proteínas para desarrollo de espalda y 
    hombros, grasas saludables para termorregulación. Incluye timing de comidas alrededor de 
    entrenamientos (a menudo temprano por la mañana), hidratación consciente (fácil deshidratarse 
    en agua), y alimentos de fácil digestión antes de nadar.`,
    beneficios: `✓ Energía para entrenamientos largos
✓ Desarrollo muscular de tren superior
✓ Recuperación entre sesiones
✓ Termorregulación en agua fría
✓ Mejora en tiempos
✓ Prevención de lesiones de hombro
✓ Hidratación adecuada
✓ Resistencia aeróbica mejorada`
  },
  {
    nombre: 'Plan para Levantadores de Pesas',
    informacion: 'Máxima ganancia de fuerza para powerlifting y halterofilia',
    descripcion: `Plan para levantadores de pesas que prioriza proteínas altas (2-2.5g/kg) para 
    hipertrofia y recuperación, carbohidratos suficientes para repleción de creatina fosfato, y 
    superávit calórico moderado para ganar masa. Timing nutricional alrededor de entrenamientos 
    pesados, creatina suplementada, y énfasis en alimentos densos. Distribución de macros optimizada 
    para fuerza máxima. Periodos de bulk seguidos de mini-cuts.`,
    beneficios: `✓ Ganancia de fuerza máxima
✓ Hipertrofia muscular acelerada
✓ Recuperación del sistema nervioso
✓ Mejora en PRs (1RM)
✓ Mayor densidad muscular
✓ Adaptaciones neurales optimizadas
✓ Energía para volumen de entrenamiento
✓ Prevención de lesiones`
  },
  {
    nombre: 'Plan para Yoga y Pilates',
    informacion: 'Nutrición ligera para flexibilidad y mindfulness corporal',
    descripcion: `Plan balanceado para practicantes de yoga y pilates que enfatiza alimentos ligeros, 
    de fácil digestión, antiinflamatorios naturales. Incluye proteínas vegetales, granos enteros, 
    abundantes frutas y vegetales, grasas saludables. Evita comidas pesadas antes de práctica. 
    Hidratación adecuada. Muchos practicantes prefieren enfoque vegetariano o vegano alineado 
    con filosofía del yoga. Énfasis en alimentos whole foods y conscientes.`,
    beneficios: `✓ Digestión ligera para práctica
✓ Flexibilidad mejorada
✓ Reducción de inflamación articular
✓ Energía estable sin pesadez
✓ Mayor mindfulness alimentario
✓ Recuperación de tejidos conectivos
✓ Claridad mental
✓ Alineación cuerpo-mente`
  },
  {
    nombre: 'Plan para Artes Marciales',
    informacion: 'Nutrición para MMA, boxeo, jiu-jitsu y artes marciales',
    descripcion: `Plan para artistas marciales que balancea energía para entrenamientos intensos, 
    proteína para recuperación muscular y prevención de lesiones, y control de peso para categorías. 
    Incluye estrategias de cutting de peso saludable cuando aplica, hidratación crítica, 
    carbohidratos para explosividad, y grasas para salud hormonal. Timing nutricional para 
    múltiples sesiones diarias. Suplementación con creatina y omega-3.`,
    beneficios: `✓ Explosividad y potencia mejorada
✓ Resistencia para rounds
✓ Recuperación entre sesiones
✓ Control de peso para categorías
✓ Prevención de lesiones
✓ Claridad mental en combate
✓ Tiempo de reacción mejorado
✓ Fuerza funcional`
  },
  {
    nombre: 'Plan Asiático Saludable',
    informacion: 'Inspirado en cocinas tradicionales de Asia oriental',
    descripcion: `Plan basado en patrones alimentarios de Asia oriental (Japón, Corea, China) que 
    incluye arroz integral como base, vegetales abundantes y variados, proteínas de pescado y tofu, 
    algas marinas, fermentados (kimchi, miso, tempeh), y té verde. Bajo en lácteos y azúcares, 
    rico en umami natural. Porciones moderadas. Técnicas de cocción ligeras (vapor, salteado rápido). 
    Asociado con longevidad en zonas azules.`,
    beneficios: `✓ Longevidad comprobada
✓ Bajo riesgo cardiovascular
✓ Rico en antioxidantes
✓ Probióticos de fermentados
✓ Bajo en grasas saturadas
✓ Control de peso natural
✓ Gran variedad de vegetales
✓ Preparaciones ligeras y sabrosas`
  },
  {
    nombre: 'Plan Mexicano Tradicional',
    informacion: 'Basado en ingredientes tradicionales mexicanos saludables',
    descripcion: `Plan que rescata los alimentos tradicionales mexicanos saludables: frijoles, maíz 
    nixtamalizado (tortillas), nopales, chía, amaranto, jitomate, aguacate, chiles, calabaza. 
    Evita versiones americanizadas con exceso de queso y crema. Incluye proteínas de pescado y 
    pollo, abundantes vegetales, y especias con propiedades antiinflamatorias. Preparaciones 
    tradicionales asadas, cocidas, o al vapor.`,
    beneficios: `✓ Rico en fibra de legumbres
✓ Proteínas vegetales completas
✓ Nopales para control glucémico
✓ Grasas saludables de aguacate
✓ Capsaicina antiinflamatoria
✓ Probióticos de fermentados
✓ Culturalmente apropiado
✓ Económico y accesible`
  },
  {
    nombre: 'Plan Nórdico',
    informacion: 'Basado en alimentos tradicionales de países escandinavos',
    descripcion: `Plan inspirado en la Nueva Cocina Nórdica que incluye pescados grasos (salmón, 
    arenque), bayas silvestres (arándanos), granos enteros (centeno, avena, cebada), vegetales 
    de raíz, lácteos fermentados, aceite de colza (canola), y alimentos de temporada. Bajo en 
    azúcares añadidos. Métodos de preservación tradicionales (fermentación, curado). Sostenible 
    y local. Asociado con bajo índice de obesidad en Escandinavia.`,
    beneficios: `✓ Alto en omega-3 de pescados
✓ Rico en antioxidantes de bayas
✓ Fibra de granos enteros
✓ Sostenibilidad ambiental
✓ Probióticos de lácteos fermentados
✓ Control de peso efectivo
✓ Salud cardiovascular
✓ Alimentos de temporada frescos`
  },
  {
    nombre: 'Plan Indio Vegetariano',
    informacion: 'Basado en tradiciones vegetarianas de India con especias',
    descripcion: `Plan vegetariano inspirado en la cocina india que incluye dals (lentejas), arroz 
    basmati, chapatis integrales, paneer (bajo en grasa), yogur, vegetales variados, y especias 
    con propiedades medicinales (cúrcuma, comino, cilantro, jengibre). Rico en proteínas de 
    legumbres combinadas con granos. Ghee en moderación. Chai con especias. Preparaciones con 
    tandoor, curry, y métodos tradicionales.`,
    beneficios: `✓ Proteínas vegetales completas
✓ Especias antiinflamatorias potentes
✓ Cúrcuma para salud articular
✓ Rica en probióticos de yogur
✓ Económico y saciante
✓ Gran variedad de sabores
✓ Beneficios digestivos de especias
✓ Tradición milenaria de salud`
  },
  {
    nombre: 'Plan de Comida Preparada Semanal',
    informacion: 'Estrategia de meal prep para semana completa',
    descripcion: `Plan diseñado para preparación de comidas semanales (meal prep) que optimiza tiempo 
    y asegura alimentación saludable durante la semana ocupada. Incluye recetas para preparar en 
    2-3 horas dominicales, almacenamiento adecuado en contenedores, alimentos que se mantienen bien 
    refrigerados, y variedad para evitar aburrimiento. Proteínas batch cooking, granos cocidos en 
    bulk, vegetales pre-cortados. Snacks preparados.`,
    beneficios: `✓ Ahorro significativo de tiempo
✓ Control total de ingredientes
✓ Ahorro económico
✓ Porciones controladas
✓ Menos tentación de fast food
✓ Adherencia mejorada al plan
✓ Reducción de estrés semanal
✓ Variedad planificada`
  },
  {
    nombre: 'Plan para Trabajo Nocturno',
    informacion: 'Adaptado para turnos nocturnos y ritmos circadianos alterados',
    descripcion: `Plan diseñado para trabajadores nocturnos que mantiene nutrición adecuada a pesar 
    de horarios alterados. Incluye comida principal antes del turno, snacks ligeros durante la 
    noche, evita azúcares simples que causan crashes, proteínas para saciedad, y estrategias para 
    dormir de día. Timing de cafeína estratégico. Hidratación constante. Suplementación de vitamina 
    D por falta de sol.`,
    beneficios: `✓ Energía durante turno nocturno
✓ Mejor calidad de sueño diurno
✓ Prevención de ganancia de peso
✓ Regulación circadiana mejorada
✓ Menor fatiga
✓ Digestión optimizada
✓ Sistema inmune apoyado
✓ Reducción de estrés metabólico`
  },
  {
    nombre: 'Plan para Estudiantes',
    informacion: 'Nutrición para rendimiento académico y horarios universitarios',
    descripcion: `Plan diseñado para estudiantes universitarios con presupuesto limitado y horarios 
    irregulares. Incluye alimentos económicos nutritivos, comidas rápidas de preparar, snacks para 
    estudio, alimentos que mejoran concentración y memoria (omega-3, antioxidantes), y opciones 
    portátiles para campus. Evita exceso de cafeína y bebidas energéticas. Énfasis en batch cooking 
    y meal prep simple.`,
    beneficios: `✓ Mejor concentración y memoria
✓ Energía para estudiar
✓ Económico y accesible
✓ Rápido de preparar
✓ Prevención de ganancia de peso freshman
✓ Sistema inmune fuerte
✓ Mejor rendimiento académico
✓ Hábitos para vida adulta`
  },
  {
    nombre: 'Plan Presupuesto Limitado',
    informacion: 'Nutritivo y completo con alimentos económicos',
    descripcion: `Plan nutricionalmente completo con alimentos de bajo costo: legumbres secas (proteína 
    económica), arroz y pasta integrales, vegetales de temporada, huevos, pollo, plátanos, avena, 
    leche, zanahorias, repollo. Enfoque en alimentos enteros sobre procesados. Compras en bulk, 
    aprovechamiento de ofertas, batch cooking, y minimización de desperdicio. Demuestra que comer 
    saludable es accesible económicamente.`,
    beneficios: `✓ Nutrición completa económica
✓ Ahorro significativo
✓ Minimización de desperdicios
✓ Proteínas accesibles
✓ Batch cooking eficiente
✓ Alimentos versátiles
✓ No requiere productos caros
✓ Sostenible económicamente`
  },
  {
    nombre: 'Plan para Menopausia',
    informacion: 'Optimizado para síntomas de menopausia y salud hormonal',
    descripcion: `Plan para mujeres en menopausia que enfatiza fitoestrógenos de soya, semillas de 
    linaza, y legumbres. Rico en calcio y vitamina D para prevención de osteoporosis, proteínas 
    para preservar masa muscular, grasas saludables para equilibrio hormonal. Evita triggers de 
    sofocos (cafeína, alcohol, picantes intensos). Carbohidratos complejos para estabilidad de 
    ánimo. Control de porciones para prevenir ganancia de peso.`,
    beneficios: `✓ Reducción de sofocos
✓ Prevención de osteoporosis
✓ Control de peso mejorado
✓ Estabilidad de ánimo
✓ Reducción de sequedad
✓ Prevención de sarcopenia
✓ Salud cardiovascular
✓ Mejor calidad de sueño`
  },
  {
    nombre: 'Plan Anti-Acné',
    informacion: 'Diseñado para reducir acné mediante alimentación',
    descripcion: `Plan bajo índice glucémico para controlar insulina (factor en acné), elimina lácteos 
    convencionales (pueden empeorar acné hormonal), rico en omega-3 antiinflamatorio, zinc de 
    semillas de calabaza y mariscos, vitamina A de vegetales naranjas, antioxidantes de frutas y 
    verduras. Evita azúcares refinados, alimentos procesados, y grasas trans. Hidratación abundante. 
    Probióticos para eje intestino-piel.`,
    beneficios: `✓ Reducción de brotes de acné
✓ Piel menos grasa
✓ Inflamación cutánea reducida
✓ Menos cicatrices
✓ Piel más clara
✓ Confianza mejorada
✓ Reducción de necesidad de medicamentos
✓ Mejora en salud intestinal`
  },
  {
    nombre: 'Plan para Ansiedad y Estrés',
    informacion: 'Nutrición para apoyar salud mental y reducir estrés',
    descripcion: `Plan que incluye alimentos que apoyan producción de neurotransmisores: triptófano 
    para serotonina, magnesio para relajación, omega-3 para cerebro, vitaminas B para sistema 
    nervioso, probióticos para eje intestino-cerebro. Evita exceso de cafeína, azúcares que causan 
    crashes, y alcohol. Incluye carbohidratos complejos para serotonina estable, y ashwagandha en 
    infusiones (adaptógeno). Comidas regulares para azúcar en sangre estable.`,
    beneficios: `✓ Reducción de síntomas de ansiedad
✓ Mejor manejo del estrés
✓ Sueño de calidad mejorado
✓ Humor más estable
✓ Energía mental sostenida
✓ Reducción de cortisol
✓ Mayor calma interior
✓ Complemento a terapia`
  },
  {
    nombre: 'Plan para Salud del Cabello',
    informacion: 'Nutrición específica para fortalecer cabello y prevenir caída',
    descripcion: `Plan rico en nutrientes críticos para cabello: proteínas de alta calidad (queratina), 
    biotina de huevos y nueces, hierro para oxigenación del folículo, zinc, vitamina E, omega-3, 
    vitamina C para colágeno. Incluye salmón, huevos, espinacas, nueces, semillas de calabaza, 
    batata, aguacate. Hidratación adecuada. Evita dietas muy restrictivas que causan efluvio 
    telógeno (caída por déficit nutricional).`,
    beneficios: `✓ Reducción de caída de cabello
✓ Crecimiento más rápido
✓ Cabello más fuerte y brillante
✓ Menos puntas quebradas
✓ Mayor volumen
✓ Prevención de canas prematuras
✓ Cuero cabelludo saludable
✓ Mejora visible en 2-3 meses`
  },
  {
    nombre: 'Plan para Deportes de Combate',
    informacion: 'Nutrición para boxeo, kickboxing, MMA y deportes de contacto',
    descripcion: `Plan para deportistas de combate que balancea energía para entrenamientos de alta 
    intensidad, proteínas para recuperación muscular y prevención de lesiones, control estricto de 
    peso para categorías, y timing nutricional alrededor de sesiones múltiples. Incluye estrategias 
    de cutting de peso saludable (no extremo), recarga de glucógeno post-pesaje, hidratación con 
    electrolitos, y omega-3 para reducir inflamación de impactos.`,
    beneficios: `✓ Potencia explosiva maximizada
✓ Resistencia para múltiples rounds
✓ Recuperación entre sesiones
✓ Control de peso preciso
✓ Prevención de lesiones
✓ Claridad mental en combate
✓ Reflejos agudos
✓ Fuerza de golpeo mejorada`
  },
  {
    nombre: 'Plan para Salud Dental',
    informacion: 'Optimizado para dientes y encías saludables',
    descripcion: `Plan que enfatiza calcio y vitamina D para dientes fuertes, fósforo, vitamina K2 
    para remineralización, alimentos crujientes que limpian dientes naturalmente (manzanas, apio), 
    y limita azúcares y ácidos que erosionan esmalte. Incluye lácteos o alternativas fortificadas, 
    vegetales de hoja verde, pescados grasos, nueces. Evita snacking constante. Enjuague con agua 
    post-comida. Xilitol como edulcorante opcional (previene caries).`,
    beneficios: `✓ Dientes más fuertes
✓ Encías saludables
✓ Prevención de caries
✓ Menos sensibilidad dental
✓ Aliento fresco
✓ Esmalte remineralizado
✓ Prevención de periodontitis
✓ Menor necesidad de tratamientos`
  },
  {
    nombre: 'Plan de Ayuno 5:2',
    informacion: 'Dos días de restricción calórica, cinco días normales',
    descripcion: `Plan de ayuno intermitente donde 5 días de la semana comes normalmente (mantenimiento) 
    y 2 días no consecutivos reduces calorías a 500-600 kcal. Los días de ayuno incluyen comidas 
    pequeñas muy nutritivas y saciantes (proteínas, vegetales, fibra). Los días normales mantienen 
    alimentación balanceada sin excesos. Más sostenible que restricción diaria. Promueve flexibilidad 
    metabólica. Requiere planificación de días de ayuno.`,
    beneficios: `✓ Pérdida de peso sostenible
✓ Flexibilidad metabólica
✓ Mejora en sensibilidad a insulina
✓ Autofagia celular aumentada
✓ 5 días de alimentación normal
✓ Más sostenible que dieta diaria
✓ Beneficios de longevidad
✓ Reducción de inflamación`
  },
  {
    nombre: 'Plan Carnívoro',
    informacion: 'Exclusivamente productos animales, eliminación total de vegetales',
    descripcion: `Plan controversial que consiste únicamente en productos animales: carnes rojas, 
    pescados, huevos, y opcionalmente lácteos. Elimina todos los vegetales, frutas, granos, y 
    legumbres. Proponentes reportan beneficios en condiciones autoinmunes y digestivas. Requiere 
    suplementación de vitamina C potencial y monitoreo médico. Alto en proteínas y grasas, cero 
    carbohidratos. No recomendado sin supervisión profesional. Controversia científica.`,
    beneficios: `✓ Simplicidad extrema
✓ Reportes de mejora en autoinmunes
✓ Eliminación de antinutrientes vegetales
✓ Saciedad elevada
✓ Posible mejora digestiva en algunos
✓ Claridad mental reportada
✓ Eliminación de fibra (pro/contra)
✓ Control de peso en algunos casos`
  },
  {
    nombre: 'Plan para Fertilidad Femenina',
    informacion: 'Optimizado para mejorar fertilidad y preparación para embarazo',
    descripcion: `Plan pre-concepcional que enfatiza ácido fólico (400-800mcg/día) para prevención 
    de defectos del tubo neural, hierro para reservas previas, omega-3 DHA para desarrollo cerebral 
    futuro, antioxidantes para calidad ovocitaria, proteínas de calidad, y carbohidratos complejos 
    para balance hormonal. Evita alcohol, exceso de cafeína, y pescados altos en mercurio. Peso 
    saludable (IMC 20-25 óptimo para fertilidad).`,
    beneficios: `✓ Mejora en calidad ovocitaria
✓ Ciclos menstruales regulares
✓ Balance hormonal optimizado
✓ Reservas nutricionales adecuadas
✓ Preparación para embarazo
✓ Reducción de riesgo de aborto
✓ Fertilidad mejorada
✓ Ambiente uterino óptimo`
  },
  {
    nombre: 'Plan para Fertilidad Masculina',
    informacion: 'Nutrición para mejorar calidad y cantidad espermática',
    descripcion: `Plan para hombres buscando optimizar fertilidad que incluye antioxidantes (vitaminas 
    C, E, selenio) para proteger esperma de daño oxidativo, zinc para producción espermática, 
    ácido fólico, omega-3, L-carnitina. Incluye nueces, semillas, pescados grasos, frutas y 
    verduras coloridas. Evita exceso de alcohol, tabaco, grasas trans, y calor testicular excesivo. 
    Peso saludable (obesidad reduce fertilidad masculina).`,
    beneficios: `✓ Mejora en conteo espermático
✓ Mayor motilidad
✓ Morfología espermática mejorada
✓ Reducción de fragmentación de ADN
✓ Niveles de testosterona optimizados
✓ Fertilidad mejorada
✓ Reducción de tiempo para concepción
✓ Salud reproductiva general`
  },
  {
    nombre: 'Plan para Recuperación Post-Cirugía',
    informacion: 'Nutrición para cicatrización y recuperación post-operatoria',
    descripcion: `Plan diseñado para recuperación post-quirúrgica que enfatiza proteínas elevadas 
    (1.5-2g/kg) para cicatrización de tejidos, vitamina C y zinc para síntesis de colágeno, 
    calorías suficientes para energía de sanación, hidratación abundante, y alimentos antiinflamatorios. 
    Incluye caldos nutritivos si hay cirugía digestiva, texturas apropiadas según tipo de cirugía, 
    y probióticos si hubo antibióticos. Evita alcohol que interfiere con cicatrización.`,
    beneficios: `✓ Cicatrización acelerada
✓ Recuperación más rápida
✓ Menor riesgo de infección
✓ Prevención de pérdida muscular
✓ Energía para sanación
✓ Función inmune optimizada
✓ Menor riesgo de complicaciones
✓ Retorno a actividades más pronto`
  },
  {
    nombre: 'Plan Rainbow (Arcoíris)',
    informacion: 'Basado en comer todos los colores del arcoíris diariamente',
    descripcion: `Plan que asegura variedad nutricional mediante colores: rojo (tomates, fresas), 
    naranja (zanahorias, naranjas), amarillo (pimientos, plátanos), verde (espinacas, brócoli), 
    azul/morado (arándanos, berenjena), blanco (coliflor, ajo). Cada color representa diferentes 
    fitonutrientes y antioxidantes. Meta: incluir al menos 3-5 colores diferentes cada día. 
    Visualmente atractivo, nutricionalmente completo, y fácil de seguir.`,
    beneficios: `✓ Amplio espectro de antioxidantes
✓ Variedad de fitonutrientes
✓ Visualmente atractivo
✓ Fácil de recordar
✓ Nutrición completa
✓ Prevención de aburrimiento
✓ Apto para toda la familia
✓ Educativo y divertido`
  }
];

async function seedPlanes() {
  console.log('🌱 Iniciando seed de planes...');

  try {
    // Verificar si ya existen planes
    const planesExistentes = await prisma.plan.count();
    
    if (planesExistentes > 0) {
      console.log(`⚠️  Ya existen ${planesExistentes} planes en la base de datos.`);
      console.log('✓ Agregando nuevos planes adicionales...\n');
    }

    // Insertar planes
    console.log(`📝 Insertando ${planes.length} planes nuevos...`);
    
    for (const plan of planes) {
      await prisma.plan.create({
        data: plan
      });
      console.log(`   ✓ ${plan.nombre}`);
    }

    console.log('\n✅ Seed de planes completado exitosamente!');
    console.log(`📊 Total de planes insertados: ${planes.length}`);
    
    // Mostrar resumen
    console.log('\n📋 Planes disponibles:');
    planes.forEach((plan, index) => {
      console.log(`   ${index + 1}. ${plan.nombre}`);
    });

  } catch (error) {
    console.error('❌ Error al hacer seed de planes:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar seed si se llama directamente
if (require.main === module) {
  seedPlanes()
    .then(() => {
      console.log('\n🎉 Proceso completado!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Error fatal:', error);
      process.exit(1);
    });
}

module.exports = seedPlanes;
