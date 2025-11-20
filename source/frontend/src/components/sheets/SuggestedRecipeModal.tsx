// src/components/sections/SuggestedRecipeModal.tsx
import React from "react";
import { X, Check } from "lucide-react";

interface SuggestedRecipeModalProps {
  onClose: () => void;
  onAccept: () => void;
}

const suggestedRecipe = {
  title: "Ensalada ligera de fideos con manzana",
  description:
    "Una ensalada fresca, rápida y saciante que mezcla la suavidad de los fideos con el toque dulce y crujiente de la manzana.",
  ingredients: [
    "200 g de fideos (mejor si son integrales)",
    "2 manazanas medianas",
    "1 cucharadita de aceite de oliva (opcional)",
    "Jugo de medio limón",
    "Una pizca de sal y pimienta",
  ],
  preparation: [
    "Cocina los fideos en agua con una pizca de sal hasta que estén al dente. Escurre y deja enfriar.",
    "Corta la manzana en cubos pequeños.",
    "Mezcla los fideos con la manzana.",
    "Adereza con jugo de limón, un chorrito de aceite de oliva (opcional), sal y pimienta.",
    "Sirve frío como plato principal ligero o como acompañamiento.",
  ],
  benefits: [
    "La manzana aporta fibra y ayuda a controlar el apetito.",
    "Los fideos, si se consumen en porción moderada, brindan energía sin exceso de calorías.",
  ],
};

const SuggestedRecipeModal: React.FC<SuggestedRecipeModalProps> = ({
  onClose,
  onAccept,
}) => {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/30 flex items-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full rounded-t-2xl p-6 shadow-xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- NUEVA ESTRUCTURA DE GRID --- */}
        {/* Un grid de 3 columnas para todo el contenido */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* --- FILA 1 --- */}
          {/* Título (ocupa 2 columnas) */}
          <h2 className="text-2xl font-bold md:col-span-2">
            {suggestedRecipe.title}
          </h2>
          {/* Subtítulo (ocupa 1 columna, alineado a la derecha) */}
          <span className="text-sm font-medium text-gray-500 md:col-span-1 text-right">
            Receta propuesta
          </span>

          {/* --- FILA 2 --- */}
          {/* Descripción (ocupa las 3 columnas) */}
          <p className="text-gray-600 mb-6 md:col-span-3">
            {suggestedRecipe.description}
          </p>

          {/* --- FILA 3 (Las 3 cajas alineadas) --- */}

          {/* Columna 1: Ingredientes */}
          <div className="md:col-span-1 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Ingredientes</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              {suggestedRecipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Columna 2: Preparación */}
          <div className="md:col-span-1 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Preparación</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
              {suggestedRecipe.preparation.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Columna 3: Beneficios, Nota y Botones */}
          {/* Usamos flex-col para apilar los elementos verticalmente */}
          <div className="md:col-span-1 flex flex-col">
            {/* Caja de Beneficios */}
            <div className="border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-lg mb-2">Beneficios</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                {suggestedRecipe.benefits.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Nota */}
            <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-600 mb-6">
              Nota: Si aceptas la receta, esta será agregada a la sección de
              Recetas y podrás visualizarla más tarde.
            </div>

            {/* Contenedor de botones (mt-auto los empuja al fondo de la columna) */}
            <div className="flex flex-col gap-4 mt-auto">
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                <X size={18} />
                Rechazar
              </button>
              <button
                onClick={onAccept}
                className="w-full flex items-center justify-center gap-2 p-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 font-medium"
              >
                <Check size={18} />
                Aceptar
              </button>
            </div>
          </div>
        </div>
        {/* --- FIN DEL GRID --- */}
      </div>
    </div>
  );
};

export default SuggestedRecipeModal;
