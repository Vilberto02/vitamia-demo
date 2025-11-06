import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import type { Recipe } from "@/types";
import { createPortal } from "react-dom";

type RecipeModalProps = {
  recipe: Recipe;
  onClose: () => void;
};

export const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleAddRecipeClick = () => {
    console.log("Receta agregada:", recipe.title);
    setShowSuccessAlert(true);
  };

  const handleOkClick = () => {
    setShowSuccessAlert(false);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/30" onClick={onClose}>
                 {" "}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-lg p-6 bg-white shadow-lg overflow-y-auto flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
             {" "}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
                    <X size={24} />       {" "}
        </button>
               {" "}
        <div className="w-24 h-24 bg-green-500 rounded-md mb-4 mx-auto"></div> 
             {" "}
        <h2 className="text-2xl font-bold mb-2 text-center">{recipe.title}</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
                    10-15 minutos de preparación.        {" "}
        </p>
                <h3 className="font-semibold mt-4">Descripción</h3>       {" "}
        <p className="text-sm text-gray-600">{recipe.description}</p>       {" "}
        <h3 className="font-semibold mt-4">Beneficios</h3>       {" "}
        <p className="text-sm text-gray-600">{recipe.benefits}</p>       {" "}
        <h3 className="font-semibold mt-4">Ingredientes</h3>       {" "}
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                   {" "}
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
                 {" "}
        </ul>
                <h3 className="font-semibold mt-4">Preparación</h3>       {" "}
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                   {" "}
          {recipe.preparation.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
                 {" "}
        </ol>
                     {" "}
        <button
          onClick={handleAddRecipeClick}
          className="w-full p-2 mt-8 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
                    Agregar receta        {" "}
        </button>
             {" "}
      </div>
      {showSuccessAlert && (
        <div
          className="absolute inset-0 z-[99999] flex items-center justify-center bg-black/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl text-center w-80">
            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />

            <h3 className="text-lg font-semibold mb-2">Receta agregada</h3>
            <p className="text-sm text-gray-600 mb-4">
              La receta ha sido agregada exitosamente.
            </p>

            <button
              onClick={handleOkClick}
              className="w-full bg-[#09335F] text-white py-2 rounded-lg hover:bg-[#062240]"
            >
              Ok
            </button>
          </div>
        </div>
      )}
         {" "}
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
