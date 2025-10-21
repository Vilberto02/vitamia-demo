import type { LogroType, RecetaType } from "@/types";

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