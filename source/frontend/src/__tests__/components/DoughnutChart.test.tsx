import { render, screen } from "@testing-library/react";
import { DoughnutChart } from "@/components/charts/DoghnutChart";

// Mock de react-chartjs-2
jest.mock("react-chartjs-2", () => ({
  Doughnut: ({ data }: { data: { datasets: { data: number[] }[] } }) => (
    <div data-testid="doughnut-chart">
      <span data-testid="doughnut-data">
        {data.datasets[0]?.data.join(",")}
      </span>
    </div>
  ),
}));

// Mock de chart.js
jest.mock("chart.js", () => ({
  Chart: { register: jest.fn() },
  ArcElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

const defaultProps = {
  labels: ["Proteínas", "Carbohidratos", "Grasas"],
  values: [30, 50, 20],
  colors: ["#FF6384", "#36A2EB", "#FFCE56"],
};

describe("DoughnutChart", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = render(<DoughnutChart {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("renderiza el gráfico de dona (Doughnut)", () => {
    render(<DoughnutChart {...defaultProps} />);
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });

  it("muestra todas las etiquetas (labels)", () => {
    render(<DoughnutChart {...defaultProps} />);
    expect(screen.getByText("Proteínas")).toBeInTheDocument();
    expect(screen.getByText("Carbohidratos")).toBeInTheDocument();
    expect(screen.getByText("Grasas")).toBeInTheDocument();
  });

  it("muestra los valores correspondientes a cada etiqueta", () => {
    render(<DoughnutChart {...defaultProps} />);
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("calcula y muestra el total de alimentos correctamente", () => {
    render(<DoughnutChart {...defaultProps} />);
    // total = 30 + 50 + 20 = 100
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("muestra la etiqueta 'Alimentos' debajo del total", () => {
    render(<DoughnutChart {...defaultProps} />);
    expect(screen.getByText("Alimentos")).toBeInTheDocument();
  });

  it("pasa los datos correctos al gráfico Doughnut", () => {
    render(<DoughnutChart {...defaultProps} />);
    expect(screen.getByTestId("doughnut-data")).toHaveTextContent("30,50,20");
  });

  it("muestra el total 0 cuando los valores son todos cero", () => {
    render(
      <DoughnutChart
        labels={["A", "B"]}
        values={[0, 0]}
        colors={["#ff0000", "#00ff00"]}
      />,
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renderiza un único elemento correctamente", () => {
    render(
      <DoughnutChart labels={["Solo"]} values={[100]} colors={["#123456"]} />,
    );
    expect(screen.getByText("Solo")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
