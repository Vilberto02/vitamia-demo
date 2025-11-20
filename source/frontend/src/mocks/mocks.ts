import type { LogroType, RecetaType, Recipe } from "@/types";

export const labels: string[] = ["Completado", "En progreso", "No iniciado"];

export const logros: LogroType[] = [
  {
    id: 1,
    title: "Frutero",
    description: "Comer frutas 5 días seguidos.",
  },
  {
    id: 2,
    title: "Constante",
    description: "Racha de una semana.",
  },
  {
    id: 3,
    title: "VidaFit",
    description: "Racha de 6 meses.",
  },
];

export const recetasDesayuno: RecetaType[] = [
  {
    id: 1,
    title: "Tostadas de Aguacate con Huevo",
    description:
      "Una combinación perfecta de grasas saludables, proteínas y fibra. El aguacate cremoso sobre una tostada integral, coronado con un huevo, es ideal para un desayuno equilibrado.",
  },
  {
    id: 2,
    title: "Avena con Frutas y Miel",
    description:
      "Un desayuno cálido y reconfortante, lleno de fibra y antioxidantes. La avena se combina con frutas frescas y un toque de miel para un inicio de día saludable.",
  },
  {
    id: 3,
    title: "Panqueques de Avena y Plátano",
    description:
      "Panqueques suaves y esponjosos sin harina refinada. El plátano y la avena son los ingredientes principales, creando una opción saludable y deliciosa para el desayuno.",
  },
  {
    id: 4,
    title: "Yogur Griego con Granola y Frutos Rojos",
    description:
      "Una opción rápida y deliciosa que combina proteínas, fibra y antioxidantes. El yogur griego es cremoso y se complementa perfectamente con la granola crujiente y los frutos rojos.",
  },
];


export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Tostadas de Aguacate con Huevo",
    description:
      "Una combinación perfecta de grasas saludables, proteínas y fibra. El aguacate cremoso sobre una tostada integral, coronado con un huevo, es ideal para un desayuno equilibrado.",
    benefits: "Aporta energía gracias a las grasas saludables del aguacate.",
    preparationTime: "10-15 minutos de preparación.",
    ingredients: [
      "1 pan integral",
      "1/2 aguacate",
      "1 huevo",
      "Sal y pimienta",
    ],
    preparation: [
      "Tostar el pan.",
      "Preparar el huevo al gusto.",
      "Machacar el aguacate y untar.",
      "Colocar el huevo sobre el aguacate.",
    ],
  },
  {
    id: "2",
    title: "Avena con Frutas y Miel",
    description:
      "Un desayuno cálido y reconfortante, lleno de fibra y antioxidantes. La avena se combina con frutas frescas y un toque de miel para un inicio de día saludable.",
    preparationTime: "10-15 minutos de preparación.",
    benefits:
      "Aporta energía gracias a la fibra y los carbohidratos complejos de la avena.",
    ingredients: [
      "1/2 taza de avena",
      "1 taza de leche o agua",
      "1 manzana",
      "1/4 taza de frutos rojos",
      "1 cda de miel",
    ],
    preparation: [
      "Coloca la avena en una olla con la leche o agua.",
      "Cocina a fuego medio durante 5 a 7 minutos.",
      "Sirve en un bowl y añade las frutas frescas encima.",
    ],
  },
  {
    id: "3",
    title: "Panqueques de Avena y Plátano",
    description:
      "Panqueques suaves y esponjosos sin harina refinada. El plátano y la avena son los ingredientes principales, creando una opción saludable y deliciosa para el desayuno.",
    preparationTime: "10-15 minutos de preparación.",
    benefits: "Alto en fibra y potasio.",
    ingredients: [
      "1 plátano",
      "1/2 taza de avena",
      "1 huevo",
      "1/4 taza de leche",
    ],
    preparation: [
      "Licuar todos los ingredientes.",
      "Cocinar en una sartén antiadherente.",
    ],
  },
  {
    id: "4",
    title: "Yogur Griego con Granola y Frutos Rojos",
    description:
      "Una opción rápida y deliciosa que combina proteínas, fibra y antioxidantes. El yogur griego es cremoso y se complementa perfectamente con la granola crujiente y los frutos rojos.",
    preparationTime: "10-15 minutos de preparación.",
    benefits: "Alto en fibra y potasio.",
    ingredients: [
      "1 taza de yogur griego",
      "1/4 taza de granola",
      "1/4 taza de frutos rojos",
    ],
    preparation: [
      "Servir el yogur en un bowl.",
      "Añadir la granola y los frutos rojos.",
    ],
  },
];
