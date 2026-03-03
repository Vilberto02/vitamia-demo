import { baseURL } from "@/api/api";
import type {
  AlimentoRequest,
  GenerarRecetasResponse,
  RecetaCompleta,
} from "@/types/index";

const RECETAS_BASE = `${baseURL}/recetas`;

// Helper para realizar peticiones autenticadas con fetch
async function recetaFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("vitamia_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${RECETAS_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody?.mensaje ?? errorBody?.message ?? response.statusText;
    throw new Error(message);
  }

  return (await response.json()) as T;
}

// Servicio de recetas
export const recipeService = {
  /**
   * Obtener todas las recetas de la base de datos
   * GET /api/recetas
   */
  async getAll(): Promise<RecetaCompleta[]> {
    return recetaFetch<RecetaCompleta[]>("/");
  },

  /**
   * Generar recetas personalizadas con IA (Google Gemini)
   * POST /api/recetas/tipo/:tipo
   *
   * @param tipo - Tipo de comida: "desayuno" | "almuerzo" | "cena" | "snack"
   * @param alimentos - Array con mínimo 3 alimentos
   */
  async generarPorTipo(
    tipo: "desayuno" | "almuerzo" | "cena" | "snack",
    alimentos: AlimentoRequest[],
  ): Promise<GenerarRecetasResponse> {
    return recetaFetch<GenerarRecetasResponse>(`/tipo/${tipo}/`, {
      method: "POST",
      body: JSON.stringify({ alimentos }),
    });
  },
};
