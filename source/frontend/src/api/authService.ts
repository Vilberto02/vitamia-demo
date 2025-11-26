import axios from "axios";
import { baseURL } from "@/api/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/index";

// Instancia de axios
const authAPI = axios.create({
  baseURL: `${baseURL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a todas las peticiones
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vitamia_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicio de autenticación
export const authService = {
  /**
   * Iniciar sesión
   */
  async login(correo: string, contrasena: string): Promise<AuthResponse> {
    const response = await authAPI.post<AuthResponse>("/login", {
      correo,
      contrasena,
    } as LoginRequest);
    return response.data;
  },

  /**
   * Registrar nuevo usuario
   */
  async registro(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await authAPI.post<AuthResponse>("/registro", userData);
    return response.data;
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<User> {
    const response = await authAPI.get<User>("/me");
    return response.data;
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
