
import React, { useState } from "react";
import { ContainerDiaConsumo } from "./ContainerDiaConsumo";

// 2. Importar tus nuevos modales
import AddFoodModal from "./AddFoodModal";
import SuccessModal from "./SuccessModal";
import SuggestedRecipeModal from "./SuggestedRecipeModal"; // <-- 1. IMPORTA EL NUEVO MODAL

// --- Define un tipo para tus alimentos 
interface FoodItem {
  nombre: string;
  cantidad: number;
  unidad: string;
}

export function RecipeSection() {
  // --- Estados de los modales ---
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSuggestedRecipeOpen, setIsSuggestedRecipeOpen] = useState(false); // <-- 2. NUEVO ESTADO

  // --- Estado de la lista de alimentos ---
  // (Usamos el estado para que la lista pueda cambiar)
  const [customFoods, setCustomFoods] = useState<FoodItem[]>([
    { nombre: "🍝 Fideos", cantidad: 200, unidad: "gramos" },
    { nombre: "🍏 Manzana", cantidad: 2, unidad: "unidad" },
  ]);

  // --- Handlers (manejadores) ---

  // Handler para AGREGAR ALIMENTO
  const handleSubmitFood = (newFood: FoodItem) => {
    setCustomFoods((prevFoods) => [...prevFoods, newFood]);
    setIsAddFoodModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  // --- 3. NUEVOS HANDLERS para el modal de sugerencia ---
  const handleOpenSuggestionModal = () => {
    // Aquí es donde harías la llamada a la API con la lista de `customFoods`
    console.log("Consultando receta con:", customFoods);
    setIsSuggestedRecipeOpen(true);
  };

  const handleCloseSuggestionModal = () => {
    setIsSuggestedRecipeOpen(false);
  };

  const handleAcceptRecipe = () => {
  
    console.log("Receta aceptada");
    setIsSuggestedRecipeOpen(false);
    
  };

  return (
    <>
      <section className="flex flex-col gap-6 h-full">
        <h1 className="font-bold text-2xl text-[var(--modeThird)] select-none">
          Recetas
        </h1>
        <div className="flex gap-6 w-full h-full">
          <ContainerDiaConsumo></ContainerDiaConsumo>

          <aside className="w-1/3 pl-4 border-l">
            <h3 className="text-lg font-semibold mb-2">Personalizar comida</h3>
            <p className="text-sm text-gray-600 mb-4">
              Aquí podrás personalizar las comidas.
            </p>

            
            <div className="space-y-3">
              {customFoods.map((food, index) => (
                <div key={`${food.nombre}-${index}`}>
                  <label className="text-sm font-medium">{food.nombre}</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={food.cantidad}
                      readOnly
                      className="w-2/3 p-2 border rounded-md bg-gray-50"
                    />
                    <input
                      type="text"
                      value={food.unidad}
                      readOnly
                      className="w-1/g p-2 border rounded-md bg-gray-50"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsAddFoodModalOpen(true)}
              className="w-full mt-6 p-2 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50"
            >
              <span className="text-xl mr-2">+</span> Agregar alimento
            </button>

            {/* --- 4. MODIFICADO: Agrega el onClick aquí --- */}
            <button
              onClick={handleOpenSuggestionModal}
              className="w-full bg-teal-700 text-white p-2 rounded-lg mt-8"
            >
              Consultar ⚡
            </button>
          </aside>
        </div>
      </section>

      {/* --- Renderizado de Modales --- */}

      {/* Modal de Agregar Alimento (requiere AddFoodModal.tsx actualizado) */}
      {isAddFoodModalOpen && (
        <AddFoodModal
          onClose={() => setIsAddFoodModalOpen(false)}
          onSubmit={handleSubmitFood} // Asegúrate que tu AddFoodModal.tsx pueda pasar datos
        />
      )}

      {/* Modal de Éxito */}
      {isSuccessModalOpen && (
        <SuccessModal onClose={() => setIsSuccessModalOpen(false)} />
      )}

      {/* --- 5. RENDERIZA EL NUEVO MODAL --- */}
      {isSuggestedRecipeOpen && (
        <SuggestedRecipeModal
          onClose={handleCloseSuggestionModal}
          onAccept={handleAcceptRecipe}
        />
      )}
    </>
  );
}

