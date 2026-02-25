import { render, screen } from "@testing-library/react";
import { LineChart } from "@/components/charts/LineChart";

// Mock de react-chartjs-2
jest.mock("react-chartjs-2", () => ({
  Line: ({
    data,
    options,
  }: {
    data: { labels: string[]; datasets: { label: string; data: number[] }[] };
    options: { responsive: boolean };
  }) => (
    <div data-testid="line-chart">
      <span data-testid="line-dataset-label">{data.datasets[0]?.label}</span>
      <span data-testid="line-responsive">
        {options.responsive ? "responsive" : "not-responsive"}
      </span>
      {data.labels.map((label: string) => (
        <span key={label} data-testid={`line-label-${label}`}>
          {label}
        </span>
      ))}
      <span data-testid="line-values">{data.datasets[0]?.data.join(",")}</span>
    </div>
  ),
}));

// Mock de chart.js
jest.mock("chart.js", () => ({
  Chart: { register: jest.fn() },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  PointElement: jest.fn(),
  LineElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
  Filler: jest.fn(),
}));

describe("LineChart", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = render(<LineChart />);
    expect(container).toBeInTheDocument();
  });

  it("renderiza el gráfico de línea (Line)", () => {
    render(<LineChart />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("usa etiquetas por defecto cuando no se pasan props", () => {
    render(<LineChart />);
    expect(screen.getByTestId("line-label-Sem 1")).toBeInTheDocument();
    expect(screen.getByTestId("line-label-Sem 2")).toBeInTheDocument();
    expect(screen.getByTestId("line-label-Sem 3")).toBeInTheDocument();
    expect(screen.getByTestId("line-label-Sem 4")).toBeInTheDocument();
  });

  it("usa valores por defecto [0,0,0,0] cuando no se pasan props", () => {
    render(<LineChart />);
    expect(screen.getByTestId("line-values")).toHaveTextContent("0,0,0,0");
  });

  it("renderiza con etiquetas personalizadas", () => {
    render(
      <LineChart labels={["Ene", "Feb", "Mar"]} dataValues={[70, 72, 68]} />,
    );
    expect(screen.getByTestId("line-label-Ene")).toBeInTheDocument();
    expect(screen.getByTestId("line-label-Feb")).toBeInTheDocument();
    expect(screen.getByTestId("line-label-Mar")).toBeInTheDocument();
  });

  it("renderiza con valores personalizados", () => {
    render(
      <LineChart labels={["Ene", "Feb", "Mar"]} dataValues={[70, 72, 68]} />,
    );
    expect(screen.getByTestId("line-values")).toHaveTextContent("70,72,68");
  });

  it("el dataset tiene la etiqueta 'Peso (kg)'", () => {
    render(<LineChart />);
    expect(screen.getByTestId("line-dataset-label")).toHaveTextContent(
      "Peso (kg)",
    );
  });

  it("el gráfico se renderiza en modo responsive", () => {
    render(<LineChart />);
    expect(screen.getByTestId("line-responsive")).toHaveTextContent(
      "responsive",
    );
  });

  it("renderiza correctamente con un solo punto de datos", () => {
    render(<LineChart labels={["Sem 1"]} dataValues={[80]} />);
    expect(screen.getByTestId("line-values")).toHaveTextContent("80");
  });
});
