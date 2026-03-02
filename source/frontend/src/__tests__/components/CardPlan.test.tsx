import { fireEvent, render, screen } from "@testing-library/react";
import { CardPlan } from "@/components/cards/CardPlan";
import type { PlanCompleto } from "@/types";

const mockPlan: PlanCompleto = {
  id: 1,
  nombre: "Dieta Mediterránea",
  descripcion:
    "Basada en los hábitos alimenticios tradicionales de países como Grecia e Italia.",
  informacion: "Ideal para bajar de peso.",
  beneficios: "Reduce el riesgo de enfermedades cardíacas.",
};

describe("CardPlan", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = render(
      <CardPlan plan={mockPlan} onClick={mockOnClick} />,
    );
    expect(container).toBeInTheDocument();
  });

  it("muestra el nombre del plan", () => {
    render(<CardPlan plan={mockPlan} onClick={mockOnClick} />);
    expect(screen.getByText("Dieta Mediterránea")).toBeInTheDocument();
  });

  it("muestra la descripción del plan", () => {
    render(<CardPlan plan={mockPlan} onClick={mockOnClick} />);
    expect(
      screen.getByText(
        "Basada en los hábitos alimenticios tradicionales de países como Grecia e Italia.",
      ),
    ).toBeInTheDocument();
  });

  it("llama a onClick al hacer clic en el botón del plan", () => {
    render(<CardPlan plan={mockPlan} onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("el componente es un botón clickeable", () => {
    render(<CardPlan plan={mockPlan} onClick={mockOnClick} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renderiza el nombre como encabezado h4", () => {
    render(<CardPlan plan={mockPlan} onClick={mockOnClick} />);
    expect(
      screen.getByRole("heading", { level: 4, name: "Dieta Mediterránea" }),
    ).toBeInTheDocument();
  });

  it("renderiza otro plan correctamente", () => {
    const otroPlan: PlanCompleto = {
      id: 2,
      nombre: "Dieta DASH",
      descripcion: "Desarrollada para prevenir y controlar la hipertensión.",
      informacion: "Ideal para bajar de peso.",
      beneficios: "Mejora la salud cardiovascular.",
    };

    render(<CardPlan plan={otroPlan} onClick={mockOnClick} />);
    expect(screen.getByText("Dieta DASH")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Desarrollada para prevenir y controlar la hipertensión.",
      ),
    ).toBeInTheDocument();
  });

  it("no llama a onClick si no se hace clic", () => {
    render(<CardPlan plan={mockPlan} onClick={mockOnClick} />);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
