import React, {
  createContext,
  useState,
  useCallback,
  type ReactNode,
  useMemo,
} from "react";
import { recipeService } from "@/api/RecipeService";
import type {
  AlimentoRequest,
  GenerarRecetasResponse,
  RecetaCompleta,
  RecetaIA,
} from "@/types/index";

type TipoComidaIA = "desayuno" | "almuerzo" | "cena" | "snack";

interface RecipeContextType {
  /** Recetas almacenadas en la BD */
  recetas: RecetaCompleta[];
  /** Resultado de la última generación con IA */
  generadas: GenerarRecetasResponse | null;
  /** Receta actualmente seleccionada (para mostrar en el sheet) */
  recetaSeleccionada: RecetaIA | null;
  /** Estado de carga para obtener recetas de BD */
  isLoading: boolean;
  /** Estado de carga para generación con IA */
  isGenerating: boolean;
  /** Error de la última operación */
  error: string | null;
  /** Obtener todas las recetas de la BD */
  fetchRecetas: () => Promise<void>;
  /** Generar recetas con IA dado un tipo de comida y alimentos */
  generarRecetas: (
    tipo: TipoComidaIA,
    alimentos: AlimentoRequest[],
  ) => Promise<GenerarRecetasResponse>;
  /** Seleccionar una receta generada para mostrar en detalle */
  seleccionarReceta: (receta: RecetaIA | null) => void;
  /** Limpiar las recetas generadas */
  limpiarGeneradas: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const RecipeContext = createContext<RecipeContextType | undefined>(
  undefined,
);

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recetas, setRecetas] = useState<RecetaCompleta[]>([]);
  const [generadas, setGeneradas] = useState<GenerarRecetasResponse | null>(
    null,
  );
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<RecetaIA | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtener todas las recetas de la base de datos
   */
  const fetchRecetas = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await recipeService.getAll();
      setRecetas(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al obtener recetas";
      setError(message);
      console.error("Error al obtener recetas:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Generar recetas personalizadas con IA
   */
  const generarRecetas = useCallback(
    async (tipo: TipoComidaIA, alimentos: AlimentoRequest[]) => {
      try {
        setIsGenerating(true);
        setError(null);
        const response = await recipeService.generarPorTipo(tipo, alimentos);
        setGeneradas(response);

        // Seleccionar automáticamente la primera receta generada
        if (response.recetas.length > 0) {
          setRecetaSeleccionada(response.recetas[0]);
        }

        return response;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error al generar recetas";
        setError(message);
        console.error("Error al generar recetas:", err);
        throw err;
      } finally {
        setIsGenerating(false);
      }
    },
    [],
  );

  /**
   * Seleccionar una receta generada para ver en detalle
   */
  const seleccionarReceta = useCallback((receta: RecetaIA | null) => {
    setRecetaSeleccionada(receta);
  }, []);

  /**
   * Limpiar las recetas generadas
   */
  const limpiarGeneradas = useCallback(() => {
    setGeneradas(null);
    setRecetaSeleccionada(null);
  }, []);

  const value = useMemo<RecipeContextType>(
    () => ({
      recetas,
      generadas,
      recetaSeleccionada,
      isLoading,
      isGenerating,
      error,
      fetchRecetas,
      generarRecetas,
      seleccionarReceta,
      limpiarGeneradas,
    }),
    [
      recetas,
      generadas,
      recetaSeleccionada,
      isLoading,
      isGenerating,
      error,
      fetchRecetas,
      generarRecetas,
      seleccionarReceta,
      limpiarGeneradas,
    ],
  );

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
