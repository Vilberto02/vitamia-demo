import { render, screen } from "@testing-library/react";
import BarChart from "@/components/charts/BarChart";

// Mock de react-chartjs-2 para evitar problemas con canvas en jsdom
jest.mock("react-chartjs-2", () => ({
  Bar: ({
    data,
    options,
  }: {
    data: { labels: string[]; datasets: { label: string; data: number[] }[] };
    options: { responsive: boolean };
  }) => (
    <div data-testid="bar-chart">
      <span data-testid="chart-label">{data.datasets[0]?.label}</span>
      <span data-testid="chart-responsive">
        {options.responsive ? "responsive" : "not-responsive"}
      </span>
      {data.labels.map((label: string) => (
        <span key={label} data-testid={`label-${label}`}>
          {label}
        </span>
      ))}
    </div>
  ),
}));

// Mock de chart.js
jest.mock("chart.js", () => ({
  Chart: { register: jest.fn() },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

describe("BarChart", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = render(<BarChart />);
    expect(container).toBeInTheDocument();
  });

  it("renderiza el gráfico de barras (Bar)", () => {
    render(<BarChart />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("el dataset tiene la etiqueta 'Calorías promedio'", () => {
    render(<BarChart />);
    expect(screen.getByTestId("chart-label")).toHaveTextContent(
      "Calorías promedio",
    );
  });

  it("el gráfico se renderiza en modo responsive", () => {
    render(<BarChart />);
    expect(screen.getByTestId("chart-responsive")).toHaveTextContent(
      "responsive",
    );
  });

  it("renderiza la etiqueta 'Enero'", () => {
    render(<BarChart />);
    expect(screen.getByTestId("label-Enero")).toBeInTheDocument();
  });

  it("renderiza la etiqueta 'Febrero'", () => {
    render(<BarChart />);
    expect(screen.getByTestId("label-Febrero")).toBeInTheDocument();
  });

  it("renderiza la etiqueta 'Marzo'", () => {
    render(<BarChart />);
    expect(screen.getByTestId("label-Marzo")).toBeInTheDocument();
  });

  it("renderiza las 6 etiquetas de meses", () => {
    render(<BarChart />);
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
    meses.forEach((mes) => {
      expect(screen.getByTestId(`label-${mes}`)).toBeInTheDocument();
    });
  });
});
