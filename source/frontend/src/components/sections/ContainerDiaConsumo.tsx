import { useState } from "react";
import { RecipeModal } from "../RecipeModal";
import type { Recipe } from "@/types";

// (Más adelante, esto tiene que venir de una API)
// datos de pryeba
const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Tostadas de Aguacate con Huevo",
    description:
      "Una combinación perfecta de grasas saludables, proteínas y fibra...",
    benefits: "Aporta energía gracias a las grasas saludables del aguacate.",
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
      "Un desayuno cálido y reconfortante, lleno de fibra y antioxidantes...",
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
    description: "Panqueques suaves y esponjosos sin harina refinada...",
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
      "Una opción rápida y deliciosa que combina proteínas, fibra y antioxidantes...",
    benefits: "Alto en proteína y probióticos.",
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

export function ContainerDiaConsumo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleOpenModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="relative flex-1 h-full overflow-y-auto pr-4">
      <div className="flex gap-4 mb-4 border-b">
        <button className="py-2 px-4 border-b-2 border-green-600 font-semibold">
          Desayuno
        </button>
        <button className="py-2 px-4 text-gray-500">Almuerzo</button>
        <button className="py-2 px-4 text-gray-500">Cena</button>
        <button className="py-2 px-4 text-gray-500">Snacks</button>
      </div>

      <div className="space-y-4">
        {" "}
        {sampleRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => handleOpenModal(recipe)}
          >
            <div className="w-24 h-24 bg-green-500 rounded-md flex-shrink-0">
              {/*  */}
            </div>

            <div>
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm text-gray-600">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </div>
  );
}
