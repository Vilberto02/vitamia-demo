import { render, screen } from "@testing-library/react";
import { ContainerConsumo } from "@/components/containers/ContainerConsumo";

// Mock de BarChart para aislar el componente
jest.mock("@/components/charts/BarChart", () => ({
  default: () => <div data-testid="bar-chart-mock">BarChart</div>,
}));

// Necesario para el import de BarChart que usa módulo default
jest.mock("react-chartjs-2", () => ({
  Bar: () => <div data-testid="bar-chart" />,
}));

jest.mock("chart.js", () => ({
  Chart: { register: jest.fn() },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

describe("ContainerConsumo", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = render(<ContainerConsumo />);
    expect(container).toBeInTheDocument();
  });

  it("muestra el título 'Balance de consumo'", () => {
    render(<ContainerConsumo />);
    expect(screen.getByText("Balance de consumo")).toBeInTheDocument();
  });

  it("muestra la descripción del contenedor", () => {
    render(<ContainerConsumo />);
    expect(
      screen.getByText(
        "Aquí podrás visualizar un gráfico de barras de los alimentos que comúnmente ingieres.",
      ),
    ).toBeInTheDocument();
  });

  it("renderiza el componente BarChart", () => {
    render(<ContainerConsumo />);
    expect(screen.getByTestId("bar-chart-mock")).toBeInTheDocument();
  });

  it("tiene la estructura de Card correcta (card-header, card-content)", () => {
    const { container } = render(<ContainerConsumo />);
    expect(
      container.querySelector("[data-slot='card-header']"),
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='card-content']"),
    ).toBeInTheDocument();
  });
});
