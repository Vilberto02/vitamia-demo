import { render, screen } from "@testing-library/react";
import { OverviewSection } from "@/components/sections/OverviewSection";

// Mock de useAuth con datos del usuario
const mockUser = {
  id: 1,
  nombre: "Juan",
  apellido: "Perez Morales",
  correo: "juan@test.com",
  fecha_nacimiento: "2002-05-15",
  meta: "Bajar de peso",
  peso: 84,
  altura: 175,
  imc: 23.52,
  imagen: "",
};

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    user: mockUser,
  }),
}));

// Mock de ContainerAlimento
jest.mock("@/components/containers/ContainerAlimento", () => ({
  ContainerAlimento: () => (
    <div data-testid="container-alimento">ContainerAlimento</div>
  ),
}));

// Mock de ContainerConsumo
jest.mock("@/components/containers/ContainerConsumo", () => ({
  ContainerConsumo: () => (
    <div data-testid="container-consumo">ContainerConsumo</div>
  ),
}));

// Mock de ContainerLogro
jest.mock("@/components/containers/ContainerLogro", () => ({
  ContainerLogro: () => <div data-testid="container-logro">ContainerLogro</div>,
}));

// Dependencias de los mocks internos
jest.mock("@/mocks/mocks", () => ({
  alimentosIniciales: { Desayuno: [], Almuerzo: [], Cena: [], Snack: [] },
  logros: [],
}));

jest.mock("sweetalert2", () => ({
  default: { fire: jest.fn() },
}));

jest.mock("react-hot-toast", () => ({
  default: { success: jest.fn(), error: jest.fn() },
  Toaster: () => <div data-testid="toaster" />,
}));

describe("OverviewSection", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = render(<OverviewSection />);
    expect(container).toBeInTheDocument();
  });

  it("muestra el título principal 'General' como h1", () => {
    render(<OverviewSection />);
    expect(
      screen.getByRole("heading", { level: 1, name: "General" }),
    ).toBeInTheDocument();
  });

  it("el section tiene aria-labelledby='overview-title'", () => {
    render(<OverviewSection />);
    const section = document.querySelector(
      "section[aria-labelledby='overview-title']",
    );
    expect(section).toBeInTheDocument();
  });

  // Tarjeta de calorías
  it("muestra la tarjeta de 'Total de calorías'", () => {
    render(<OverviewSection />);
    expect(screen.getByText("Total de calorías")).toBeInTheDocument();
  });

  it("muestra el valor de calorías (1224)", () => {
    render(<OverviewSection />);
    expect(screen.getByText("1224")).toBeInTheDocument();
  });

  it("muestra la unidad 'Kcal'", () => {
    render(<OverviewSection />);
    expect(screen.getByText("Kcal")).toBeInTheDocument();
  });

  it("la tarjeta de calorías tiene aria-label correcto", () => {
    render(<OverviewSection />);
    expect(
      screen.getByRole("article", { name: /Métrica de calorías totales/i }),
    ).toBeInTheDocument();
  });

  // Tarjeta de agua
  it("muestra la tarjeta de 'Agua consumida'", () => {
    render(<OverviewSection />);
    expect(screen.getByText("Agua consumida")).toBeInTheDocument();
  });

  it("muestra el valor de agua (12 vasos)", () => {
    render(<OverviewSection />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("muestra la unidad 'Vasos'", () => {
    render(<OverviewSection />);
    expect(screen.getByText("Vasos")).toBeInTheDocument();
  });

  it("la tarjeta de agua tiene aria-label correcto", () => {
    render(<OverviewSection />);
    expect(
      screen.getByRole("article", { name: /Métrica de agua consumida/i }),
    ).toBeInTheDocument();
  });

  // Tarjeta de peso
  it("muestra el label de 'Peso'", () => {
    render(<OverviewSection />);
    expect(screen.getByText("Peso")).toBeInTheDocument();
  });

  it("muestra el peso del usuario (84)", () => {
    render(<OverviewSection />);
    expect(screen.getByText("84")).toBeInTheDocument();
  });

  it("muestra la unidad 'Kg'", () => {
    render(<OverviewSection />);
    expect(screen.getByText("Kg")).toBeInTheDocument();
  });

  it("la tarjeta de peso tiene aria-label correcto", () => {
    render(<OverviewSection />);
    expect(
      screen.getByRole("article", { name: /Métrica de peso actual/i }),
    ).toBeInTheDocument();
  });

  // Tarjeta de IMC
  it("muestra el label 'IMC'", () => {
    render(<OverviewSection />);
    expect(screen.getByText("IMC")).toBeInTheDocument();
  });

  it("muestra el IMC del usuario (23.52)", () => {
    render(<OverviewSection />);
    expect(screen.getByText("23.52")).toBeInTheDocument();
  });

  it("la tarjeta de IMC tiene aria-label correcto", () => {
    render(<OverviewSection />);
    expect(
      screen.getByRole("article", {
        name: /Métrica de índice de masa corporal/i,
      }),
    ).toBeInTheDocument();
  });

  // Sub-containers
  it("renderiza el ContainerAlimento", () => {
    render(<OverviewSection />);
    expect(screen.getByTestId("container-alimento")).toBeInTheDocument();
  });

  it("renderiza el ContainerConsumo", () => {
    render(<OverviewSection />);
    expect(screen.getByTestId("container-consumo")).toBeInTheDocument();
  });

  it("renderiza el ContainerLogro", () => {
    render(<OverviewSection />);
    expect(screen.getByTestId("container-logro")).toBeInTheDocument();
  });
});
