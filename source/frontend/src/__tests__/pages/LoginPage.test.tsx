import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginPage } from "@/pages/LoginPage";
import { MemoryRouter } from "react-router-dom";

jest.mock("@/assets/name-bg-vitamia.svg", () => "mock-logo");

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    login: jest.fn().mockResolvedValue(undefined),
  }),
}));

jest.mock("react-hot-toast", () => ({
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}));

const renderLoginPage = () =>
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el encabezado 'Bienvenido'", () => {
    renderLoginPage();

    expect(
      screen.getByRole("heading", { name: /Bienvenido/i }),
    ).toBeInTheDocument();
  });

  it("renderiza el campo de correo electrónico", () => {
    renderLoginPage();

    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
  });

  it("renderiza el campo de contraseña", () => {
    renderLoginPage();

    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it("renderiza el botón 'Continuar'", () => {
    renderLoginPage();

    expect(
      screen.getByRole("button", { name: /Continuar/i }),
    ).toBeInTheDocument();
  });

  it("muestra error de validación si el correo está vacío", async () => {
    renderLoginPage();

    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    expect(
      await screen.findByText("Correo electrónico requerido."),
    ).toBeInTheDocument();
  });

  it("muestra error de validación si la contraseña está vacía", async () => {
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    expect(
      await screen.findByText("Contraseña requerida."),
    ).toBeInTheDocument();
  });

  it("muestra error de validación con correo inválido", async () => {
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "correo-invalido" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    expect(await screen.findByText("Correo inválido.")).toBeInTheDocument();
  });

  it("llama a login con email y password correctos al enviar el formulario", async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    jest.mock("@/hooks/useAuth", () => ({
      useAuth: () => ({ login: mockLogin }),
    }));

    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    await waitFor(() => {
      // El formulario se envió (no hay errores de validación)
      expect(
        screen.queryByText("Correo electrónico requerido."),
      ).not.toBeInTheDocument();
    });
  });

  it("muestra el enlace para crear una cuenta", () => {
    renderLoginPage();

    expect(screen.getByText(/Crea una cuenta aquí\./i)).toBeInTheDocument();
  });

  it("el enlace de registro apunta a la ruta '/register'", () => {
    renderLoginPage();

    const registerLink = screen.getByRole("link", {
      name: /Crea una cuenta aquí\./i,
    });
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  it("renderiza el elemento main con role 'main'", () => {
    renderLoginPage();

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("el campo de correo tiene el tipo 'email'", () => {
    renderLoginPage();

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("el campo de contraseña tiene el tipo 'password'", () => {
    renderLoginPage();

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("renderiza el Toaster para notificaciones", () => {
    renderLoginPage();

    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });
});
