import { fireEvent, render, screen } from "@testing-library/react";
import { ContainerMisPlanes } from "@/components/containers/ContainerMisPlanes";

// Mock de la lista de planes del usuario
jest.mock("@/mocks/mocks", () => ({
  miListadoPlanes: [
    {
      id: 1,
      fecha: "2002-05-15T00:00:00.000Z",
      plan: {
        id: 2,
        nombre: "Dieta Mediterránea",
        descripcion:
          "Basada en los hábitos alimenticios tradicionales de países como Grecia e Italia.",
        informacion: "Ideal para bajar de peso.",
        beneficios: "Reduce el riesgo de enfermedades cardíacas.",
      },
    },
    {
      id: 2,
      fecha: "2002-05-15T00:00:00.000Z",
      plan: {
        id: 1,
        nombre: "Dieta DASH",
        descripcion: "Desarrollada para prevenir y controlar la hipertensión.",
        informacion: "Ideal para bajar de peso.",
        beneficios: "Mejora la salud cardiovascular.",
      },
    },
  ],
}));

// Mock del PlanDetailSheet
jest.mock("@/components/sheets/PlanDetailSheet", () => ({
  PlanDetailSheet: ({
    isOpen,
    selectedPlan,
    isUserPlan,
  }: {
    isOpen: boolean;
    setOpen: (v: boolean) => void;
    selectedPlan?: { nombre: string };
    isUserPlan?: boolean;
  }) =>
    isOpen && selectedPlan ? (
      <div data-testid="plan-detail-sheet">
        <span data-testid="sheet-plan-nombre">{selectedPlan.nombre}</span>
        <span data-testid="sheet-is-user-plan">{String(isUserPlan)}</span>
      </div>
    ) : null,
}));

// Mock de sweetalert2
jest.mock("sweetalert2", () => ({
  default: { fire: jest.fn() },
}));

describe("ContainerMisPlanes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = render(<ContainerMisPlanes />);
    expect(container).toBeInTheDocument();
  });

  it("muestra el título 'Mis planes'", () => {
    render(<ContainerMisPlanes />);
    expect(screen.getByText("Mis planes")).toBeInTheDocument();
  });

  it("muestra la descripción 'Planes asociados a tu perfil.'", () => {
    render(<ContainerMisPlanes />);
    expect(
      screen.getByText("Planes asociados a tu perfil."),
    ).toBeInTheDocument();
  });

  it("renderiza todos los planes del mock (2 planes)", () => {
    render(<ContainerMisPlanes />);
    expect(screen.getByText("Dieta Mediterránea")).toBeInTheDocument();
    expect(screen.getByText("Dieta DASH")).toBeInTheDocument();
  });

  it("renderiza un botón por cada plan", () => {
    render(<ContainerMisPlanes />);
    const planButtons = screen.getAllByRole("button");
    expect(planButtons.length).toBe(2);
  });

  it("el PlanDetailSheet no es visible inicialmente", () => {
    render(<ContainerMisPlanes />);
    expect(screen.queryByTestId("plan-detail-sheet")).not.toBeInTheDocument();
  });

  it("abre el PlanDetailSheet al hacer clic en el primer plan", () => {
    render(<ContainerMisPlanes />);
    const planButtons = screen.getAllByRole("button");
    fireEvent.click(planButtons[0]);
    expect(screen.getByTestId("plan-detail-sheet")).toBeInTheDocument();
  });

  it("muestra el nombre del plan correcto en el sheet (primer plan)", () => {
    render(<ContainerMisPlanes />);
    const planButtons = screen.getAllByRole("button");
    fireEvent.click(planButtons[0]);
    expect(screen.getByTestId("sheet-plan-nombre")).toHaveTextContent(
      "Dieta Mediterránea",
    );
  });

  it("muestra el nombre del plan correcto en el sheet (segundo plan)", () => {
    render(<ContainerMisPlanes />);
    const planButtons = screen.getAllByRole("button");
    fireEvent.click(planButtons[1]);
    expect(screen.getByTestId("sheet-plan-nombre")).toHaveTextContent(
      "Dieta DASH",
    );
  });

  it("pasa isUserPlan=true al PlanDetailSheet", () => {
    render(<ContainerMisPlanes />);
    const planButtons = screen.getAllByRole("button");
    fireEvent.click(planButtons[0]);
    expect(screen.getByTestId("sheet-is-user-plan")).toHaveTextContent("true");
  });

  it("tiene la estructura de Card (card-header y card-content)", () => {
    const { container } = render(<ContainerMisPlanes />);
    expect(
      container.querySelector("[data-slot='card-header']"),
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='card-content']"),
    ).toBeInTheDocument();
  });

  it("el ícono MoveUpRight está presente en cada plan", () => {
    render(<ContainerMisPlanes />);
    const svgIcons = document.querySelectorAll("svg");
    // Cada plan tiene un ícono MoveUpRight
    expect(svgIcons.length).toBeGreaterThanOrEqual(2);
  });
});
