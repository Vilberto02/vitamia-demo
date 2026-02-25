import { render, screen } from "@testing-library/react";
import { ContainerPreferencias } from "@/components/containers/ContainerPreferencias";

// Mock del DoughnutChart para aislar el componente
jest.mock("@/components/charts/DoghnutChart", () => ({
  DoughnutChart: ({
    labels,
    values,
    colors,
  }: {
    labels: string[];
    values: number[];
    colors: string[];
  }) => (
    <div data-testid="doughnut-chart-mock">
      {labels.map((label, i) => (
        <span key={label} data-testid={`legend-label-${label}`}>
          {label}: {values[i]} ({colors[i]})
        </span>
      ))}
    </div>
  ),
}));

// Mocks globales de chart.js para evitar errores de canvas
jest.mock("react-chartjs-2", () => ({
  Doughnut: () => <div data-testid="doughnut" />,
}));

jest.mock("chart.js", () => ({
  Chart: { register: jest.fn() },
  ArcElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

describe("ContainerPreferencias", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = render(<ContainerPreferencias />);
    expect(container).toBeInTheDocument();
  });

  it("muestra el título 'Preferencias alimentarias'", () => {
    render(<ContainerPreferencias />);
    expect(screen.getByText("Preferencias alimentarias")).toBeInTheDocument();
  });

  it("muestra la descripción 'Alimentos que comúnmente ingieres.'", () => {
    render(<ContainerPreferencias />);
    expect(
      screen.getByText("Alimentos que comúnmente ingieres."),
    ).toBeInTheDocument();
  });

  it("renderiza el componente DoughnutChart", () => {
    render(<ContainerPreferencias />);
    expect(screen.getByTestId("doughnut-chart-mock")).toBeInTheDocument();
  });

  it("pasa la etiqueta 'Frutas' al DoughnutChart", () => {
    render(<ContainerPreferencias />);
    expect(screen.getByTestId("legend-label-Frutas")).toBeInTheDocument();
  });

  it("pasa la etiqueta 'Verduras' al DoughnutChart", () => {
    render(<ContainerPreferencias />);
    expect(screen.getByTestId("legend-label-Verduras")).toBeInTheDocument();
  });

  it("pasa la etiqueta 'Carnes' al DoughnutChart", () => {
    render(<ContainerPreferencias />);
    expect(screen.getByTestId("legend-label-Carnes")).toBeInTheDocument();
  });

  it("pasa la etiqueta 'Huevos' al DoughnutChart", () => {
    render(<ContainerPreferencias />);
    expect(screen.getByTestId("legend-label-Huevos")).toBeInTheDocument();
  });

  it("pasa los valores correctos [100, 80, 40, 10] al DoughnutChart", () => {
    render(<ContainerPreferencias />);
    // Los valores son hardcoded: Frutas=100, Verduras=80, Carnes=40, Huevos=10
    expect(screen.getByTestId("legend-label-Frutas")).toHaveTextContent("100");
    expect(screen.getByTestId("legend-label-Verduras")).toHaveTextContent("80");
    expect(screen.getByTestId("legend-label-Carnes")).toHaveTextContent("40");
    expect(screen.getByTestId("legend-label-Huevos")).toHaveTextContent("10");
  });

  it("pasa los colores correctos al DoughnutChart", () => {
    render(<ContainerPreferencias />);
    expect(screen.getByTestId("legend-label-Frutas")).toHaveTextContent(
      "#DBAEFF",
    );
    expect(screen.getByTestId("legend-label-Verduras")).toHaveTextContent(
      "#D0E8FF",
    );
    expect(screen.getByTestId("legend-label-Carnes")).toHaveTextContent(
      "#FBE38E",
    );
    expect(screen.getByTestId("legend-label-Huevos")).toHaveTextContent(
      "#A9F4D0",
    );
  });

  it("tiene la estructura de Card correcta", () => {
    const { container } = render(<ContainerPreferencias />);
    expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='card-header']"),
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='card-content']"),
    ).toBeInTheDocument();
  });
});
