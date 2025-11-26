import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { authService } from "@/api/authService";
import type { User, AuthResponse } from "@/types";
import { usuario } from "@/mocks/mocks";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (correo: string, contrasena: string) => Promise<void>;
  register: (userData: {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    fecha_nacimiento: string;
    meta: string;
    peso: number;
    altura: number;
  }) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(usuario);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Verificar autenticación al cargar la app
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Verificar si hay una sesión activa
   */
  const checkAuth = async () => {
    try {
      const savedToken = authService.getToken();

      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      // Validar el token obteniendo el usuario actual
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setToken(savedToken);
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      // Si el token es inválido, limpiar la sesión
      authService.removeToken();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Iniciar sesión
   */
  const login = async (correo: string, contrasena: string) => {
    try {
      const response: AuthResponse = await authService.login(
        correo,
        contrasena
      );

      // Guardar token
      authService.saveToken(response.token);

      // Actualizar estado
      setUser(response.usuario);
      setToken(response.token);
    } catch (error) {
      console.error("Error en login:", error);
      throw error; // Propagar el error para que el componente lo maneje
    }
  };

  /**
   * Registrar nuevo usuario
   */
  const register = async (userData: {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    fecha_nacimiento: string;
    meta?: string;
    peso: number;
    altura: number;
  }) => {
    try {
      const response: AuthResponse = await authService.registro(userData);

      // Guardar token
      authService.saveToken(response.token);

      // Actualizar estado
      setUser(response.usuario);
      setToken(response.token);
    } catch (error) {
      console.error("Error en registro:", error);
      throw error; // Propagar el error para que el componente lo maneje
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    authService.removeToken();
    setUser(null);
    setToken(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
