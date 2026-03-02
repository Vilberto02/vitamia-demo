import { authService } from "@/api/authService";
import axios from "axios";

// Mock de axios
jest.mock("axios", () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  };
  return {
    default: {
      create: jest.fn(() => mockAxiosInstance),
    },
    create: jest.fn(() => mockAxiosInstance),
  };
});

// Helper para acceder al mock de la instancia
const getAxiosMock = () =>
  (axios as unknown as { create: jest.Mock }).create(
    {} as Parameters<typeof axios.create>[0],
  ) as {
    get: jest.Mock;
    post: jest.Mock;
  };

describe("authService - localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("saveToken", () => {
    it("guarda el token en localStorage con la clave 'vitamia_token'", () => {
      authService.saveToken("mi-token-123");
      expect(localStorage.getItem("vitamia_token")).toBe("mi-token-123");
    });

    it("sobrescribe un token anterior", () => {
      authService.saveToken("token-antiguo");
      authService.saveToken("token-nuevo");
      expect(localStorage.getItem("vitamia_token")).toBe("token-nuevo");
    });
  });

  describe("getToken", () => {
    it("retorna null cuando no hay token guardado", () => {
      expect(authService.getToken()).toBeNull();
    });

    it("retorna el token guardado correctamente", () => {
      localStorage.setItem("vitamia_token", "abc123");
      expect(authService.getToken()).toBe("abc123");
    });
  });

  describe("removeToken", () => {
    it("elimina el token de localStorage", () => {
      localStorage.setItem("vitamia_token", "abc123");
      authService.removeToken();
      expect(localStorage.getItem("vitamia_token")).toBeNull();
    });

    it("no lanza error si no hay token que eliminar", () => {
      expect(() => authService.removeToken()).not.toThrow();
    });
  });
});

describe("authService - peticiones HTTP", () => {
  const axiosMock = getAxiosMock();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("login", () => {
    it("realiza POST a /login con las credenciales", async () => {
      const mockResponse = {
        token: "token-abc",
        usuario: { id: 1, nombre: "Juan" },
      };
      axiosMock.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await authService.login("juan@test.com", "password123");

      expect(axiosMock.post).toHaveBeenCalledWith("/login", {
        correo: "juan@test.com",
        contrasena: "password123",
      });
      expect(result).toEqual(mockResponse);
    });

    it("propaga el error cuando la petición falla", async () => {
      axiosMock.post.mockRejectedValueOnce(new Error("Credenciales inválidas"));

      await expect(
        authService.login("bad@test.com", "wrongpass"),
      ).rejects.toThrow("Credenciales inválidas");
    });
  });

  describe("registro", () => {
    it("realiza POST a /registro con los datos del usuario", async () => {
      const userData = {
        nombre: "Carlos",
        apellido: "Perez",
        correo: "carlos@test.com",
        contrasena: "pass123",
        fecha_nacimiento: "2000-01-01",
        meta: "Bajar de peso",
        peso: 70,
        altura: 175,
      };
      const mockResponse = { token: "new-token", usuario: { id: 2 } };
      axiosMock.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await authService.registro(userData);

      expect(axiosMock.post).toHaveBeenCalledWith("/registro", userData);
      expect(result).toEqual(mockResponse);
    });

    it("propaga el error cuando el registro falla", async () => {
      axiosMock.post.mockRejectedValueOnce(new Error("Correo ya registrado"));

      await expect(
        authService.registro({
          nombre: "X",
          apellido: "Y",
          correo: "x@x.com",
          contrasena: "z",
          fecha_nacimiento: "2000-01-01",
          peso: 60,
          altura: 170,
        }),
      ).rejects.toThrow("Correo ya registrado");
    });
  });

  describe("getCurrentUser", () => {
    it("realiza GET a /me y retorna el usuario actual", async () => {
      const mockUser = { id: 1, nombre: "Juan", correo: "juan@test.com" };
      axiosMock.get.mockResolvedValueOnce({ data: mockUser });

      const result = await authService.getCurrentUser();

      expect(axiosMock.get).toHaveBeenCalledWith("/me");
      expect(result).toEqual(mockUser);
    });

    it("propaga el error cuando el token es inválido", async () => {
      axiosMock.get.mockRejectedValueOnce(new Error("Token expirado"));

      await expect(authService.getCurrentUser()).rejects.toThrow(
        "Token expirado",
      );
    });
  });
});
