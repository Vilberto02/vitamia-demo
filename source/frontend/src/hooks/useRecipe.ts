import { useContext } from "react";
import { RecipeContext } from "@/context/RecipeContext";

/**
 * Hook personalizado para acceder al contexto de recetas
 */
export const useRecipe = () => {
  const context = useContext(RecipeContext);

  if (context === undefined) {
    throw new Error("useRecipe debe ser usado dentro de un RecipeProvider");
  }

  return context;
};
