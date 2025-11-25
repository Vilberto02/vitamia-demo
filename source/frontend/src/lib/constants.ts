import type { AlimentoInfo, unidadMedida } from "@/types";

export const unidadesMedida: unidadMedida[] = [
  {
    id: "unidad",
    name: "Unidad",
  },
  {
    id: "gramos",
    name: "Gramos",
  },
  {
    id: "filete-pequenio",
    name: "Filete pequeño",
  },
  {
    id: "filete-mediano",
    name: "Filete mediano",
  },
  {
    id: "filete-grande",
    name: "Filete grande",
  },
  {
    id: "palma",
    name: "Palma",
  },
  {
    id: "taza",
    name: "Taza",
  },
  {
    id: "lata",
    name: "Lata",
  },
];


export const alimentoInfo: AlimentoInfo[] = [
  {
    id: 1,
    name: "Manzana",
    calorias: "52",
    macronutrientes: {
      carbohidratos: {
        valor: 14,
        unidad: "g",
      },
      proteinas: {
        valor: 0.3,
        unidad: "g",
      },
      grasas: {
        valor: 0.2,
        unidad: "g",
      },
    },
    micronutrientes: [
      { id: "m1", name: "Vitamina C", value: "4.6 mg" },
      { id: "m2", name: "Potasio", value: "107 mg" },
    ],
    beneficios:
      "Ayuda a la salud digestiva y a controlar el colesterol gracias a su fibra.",
  },
  {
    id: 2,
    name: "Atún",
    calorias: "165",
    macronutrientes: {
      carbohidratos: {
        valor: 0,
        unidad: "g",
      },
      proteinas: {
        valor: 31,
        unidad: "g",
      },
      grasas: {
        valor: 3.6,
        unidad: "g",
      },
    },
    micronutrientes: [
      { id: "m3", name: "Vitamina B6", value: "0.6 mg" },
      { id: "m4", name: "Fósforo", value: "228 mg" },
    ],
    beneficios:
      "Excelente fuente de proteína magra para la reparación y construcción muscular.",
  },
  {
    id: 3,
    name: "Palta",
    calorias: "160",
    macronutrientes: {
      carbohidratos: {
        valor: 8.5,
        unidad: "g",
      },
      proteinas: {
        valor: 2,
        unidad: "g",
      },
      grasas: {
        valor: 14.7,
        unidad: "g",
      },
    },
    micronutrientes: [
      { id: "m5", name: "Vitamina E", value: "2.07 mg" },
      { id: "m6", name: "Potasio", value: "485 mg" },
    ],
    beneficios:
      "Rica en grasas saludables que protegen el corazón y mejoran la absorción de nutrientes.",
  },
  {
    id: 4,
    name: "Avena",
    calorias: "389",
    macronutrientes: {
      carbohidratos: {
        valor: 66,
        unidad: "g",
      },
      proteinas: {
        valor: 16.9,
        unidad: "g",
      },
      grasas: {
        valor: 6.9,
        unidad: "g",
      },
    },
    micronutrientes: [
      { id: "m7", name: "Hierro", value: "4.7 mg" },
      { id: "m8", name: "Magnesio", value: "177 mg" },
    ],
    beneficios:
      "Proporciona energía sostenida y ayuda a regular los niveles de azúcar en sangre.",
  },
];
