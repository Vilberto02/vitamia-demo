import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useContext } from "react";

// Mock del authService
jest.mock("@/api/authService", () => ({
  authService: {
    getToken: jest.fn(),
    saveToken: jest.fn(),
    removeToken: jest.fn(),
    getCurrentUser: jest.fn(),
    login: jest.fn(),
    registro: jest.fn(),
  },
}));

// Mock del usuario del mock
jest.mock("@/mocks/mocks", () => ({
  usuario: null,
}));

import { authService } from "@/api/authService";
const mockAuthService = authService as jest.Mocked<typeof authService>;

// Componente consumidor de prueba
const TestConsumer = () => {
  const auth = useContext(AuthContext)!;

  return (
    <>
      <span data-testid="loading">{String(auth.isLoading)}</span>
      <span data-testid="authenticated">{String(auth.isAuthenticated)}</span>
      <span data-testid="user-nombre">
        {auth.user?.nombre ?? "sin-usuario"}
      </span>
      <span data-testid="token">{auth.token ?? "sin-token"}</span>
      <button onClick={() => auth.login("a@a.com", "123")}>login</button>
      <button onClick={() => auth.logout()}>logout</button>
      <button
        onClick={() =>
          auth.register({
            nombre: "Carlos",
            apellido: "Perez",
            correo: "c@c.com",
            contrasena: "pass",
            fecha_nacimiento: "2000-01-01",
            meta: "Bajar de peso",
            peso: 70,
            altura: 175,
          })
        }
      >
        register
      </button>
    </>
  );
};

const renderWithProvider = () =>
  render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>,
  );

describe("AuthContext - AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("comienza en estado isLoading=true y lo finaliza en false cuando no hay token", async () => {
    mockAuthService.getToken.mockReturnValue(null);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });
  });

  it("no autentica si no hay token guardado", async () => {
    mockAuthService.getToken.mockReturnValue(null);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    });
  });

  it("autentica correctamente si hay token válido y usuario actual", async () => {
    mockAuthService.getToken.mockReturnValue("token-valido");
    mockAuthService.getCurrentUser.mockResolvedValue({
      id: 1,
      nombre: "Juan",
      apellido: "Perez",
      correo: "juan@test.com",
      fecha_nacimiento: "2000-01-01",
      meta: "Bajar de peso",
      peso: 70,
      altura: 175,
      imc: 22.5,
      imagen: "",
    });

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    });
  });

  it("limpia la sesión si el token es inválido (getCurrentUser falla)", async () => {
    mockAuthService.getToken.mockReturnValue("token-invalido");
    mockAuthService.getCurrentUser.mockRejectedValue(
      new Error("Token expirado"),
    );

    renderWithProvider();

    await waitFor(() => {
      expect(mockAuthService.removeToken).toHaveBeenCalled();
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    });
  });

  it("login guarda el token y actualiza el estado del usuario", async () => {
    mockAuthService.getToken.mockReturnValue(null);
    mockAuthService.login.mockResolvedValue({
      token: "nuevo-token",
      usuario: {
        id: 1,
        nombre: "Carlos",
        apellido: "Perez",
        correo: "c@test.com",
        fecha_nacimiento: "2000-01-01",
        meta: "Bajar de peso",
        peso: 70,
        altura: 175,
        imc: 22,
        imagen: "",
      },
    });

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByTestId("loading")).toHaveTextContent("false"),
    );

    fireEvent.click(screen.getByText("login"));

    await waitFor(() => {
      expect(mockAuthService.saveToken).toHaveBeenCalledWith("nuevo-token");
      expect(screen.getByTestId("user-nombre")).toHaveTextContent("Carlos");
    });
  });

  it("login propaga el error cuando las credenciales son incorrectas", async () => {
    mockAuthService.getToken.mockReturnValue(null);
    mockAuthService.login.mockRejectedValue(
      new Error("Credenciales inválidas"),
    );

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByTestId("loading")).toHaveTextContent("false"),
    );

    // El botón dispara login que tira error – no debería romper el proveedor
    fireEvent.click(screen.getByText("login"));

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    });
  });

  it("logout limpia token y usuario correctamente", async () => {
    mockAuthService.getToken.mockReturnValue("token-activo");
    mockAuthService.getCurrentUser.mockResolvedValue({
      id: 1,
      nombre: "Juan",
      apellido: "P",
      correo: "j@test.com",
      fecha_nacimiento: "2000-01-01",
      meta: "",
      peso: 70,
      altura: 175,
      imc: 22,
      imagen: "",
    });

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true"),
    );

    fireEvent.click(screen.getByText("logout"));

    await waitFor(() => {
      expect(mockAuthService.removeToken).toHaveBeenCalled();
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
      expect(screen.getByTestId("token")).toHaveTextContent("sin-token");
    });
  });

  it("register llama a authService.registro y actualiza el estado", async () => {
    mockAuthService.getToken.mockReturnValue(null);
    mockAuthService.registro.mockResolvedValue({
      token: "registro-token",
      usuario: {
        id: 2,
        nombre: "Carlos",
        apellido: "Perez",
        correo: "c@c.com",
        fecha_nacimiento: "2000-01-01",
        meta: "Bajar de peso",
        peso: 70,
        altura: 175,
        imc: 22,
        imagen: "",
      },
    });

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByTestId("loading")).toHaveTextContent("false"),
    );

    fireEvent.click(screen.getByText("register"));

    await waitFor(() => {
      expect(mockAuthService.saveToken).toHaveBeenCalledWith("registro-token");
      expect(screen.getByTestId("user-nombre")).toHaveTextContent("Carlos");
    });
  });
});
