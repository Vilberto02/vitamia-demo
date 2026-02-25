import { render, screen } from "@testing-library/react";
import { RegisterPage } from "@/pages/RegisterPage";
import { MemoryRouter } from "react-router-dom";

jest.mock("@/assets/name-bg-vitamia.svg", () => "mock-vitamia-name");

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    register: jest.fn(),
  }),
}));

jest.mock("react-hot-toast", () => ({
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}));

// Mock del componente Register para simplificar el test de la página
jest.mock("@/components/Register", () => ({
  Register: () => <div data-testid="register-form">Formulario de Registro</div>,
}));

const renderRegisterPage = () =>
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>,
  );

describe("RegisterPage", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = renderRegisterPage();
    expect(container).toBeInTheDocument();
  });

  it("renderiza el componente Register (formulario)", () => {
    renderRegisterPage();
    expect(screen.getByTestId("register-form")).toBeInTheDocument();
  });

  it("renderiza el Toaster de notificaciones", () => {
    renderRegisterPage();
    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });

  it("renderiza la imagen decorativa del nombre Vitamia", () => {
    renderRegisterPage();
    const img = screen.getByAltText("Nombre de Vitamia");
    expect(img).toBeInTheDocument();
  });

  it("la imagen decorativa tiene src mockeada", () => {
    renderRegisterPage();
    const img = screen.getByAltText("Nombre de Vitamia");
    expect(img).toHaveAttribute("src", "mock-vitamia-name");
  });

  it("la imagen tiene clase 'invisible' (oculta en mobile)", () => {
    renderRegisterPage();
    const img = screen.getByAltText("Nombre de Vitamia");
    expect(img).toHaveClass("invisible");
  });
});
