import { baseURL } from "@/api/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/index";

const AUTH_BASE = `${baseURL}/auth`;

// Helper para realizar peticiones con fetch (reemplaza axios + interceptor)
async function authFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("vitamia_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${AUTH_BASE}${endpoint}`, {
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

// Servicio de autenticación
export const authService = {
  /**
   * Iniciar sesión
   */
  async login(correo: string, contrasena: string): Promise<AuthResponse> {
    return authFetch<AuthResponse>("/login/", {
      method: "POST",
      body: JSON.stringify({ correo, contrasena } as LoginRequest),
    });
  },

  /**
   * Registrar nuevo usuario
   */
  async registro(userData: RegisterRequest): Promise<AuthResponse> {
    return authFetch<AuthResponse>("/registro/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<User> {
    return authFetch<User>("/me/");
  },

  /**
   * Guardar token en localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem("vitamia_token", token);
  },

  /**
   * Obtener token de localStorage
   */
  getToken(): string | null {
    return localStorage.getItem("vitamia_token");
  },

  /**
   * Eliminar token de localStorage
   */
  removeToken(): void {
    localStorage.removeItem("vitamia_token");
  },
};
