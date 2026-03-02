import { fireEvent, render, screen } from "@testing-library/react";
import { ContainerPlanes } from "@/components/containers/ContainerPlanes";

// Mock de la lista de planes
jest.mock("@/mocks/mocks", () => ({
  listaDePlanes: [
    {
      id: 1,
      nombre: "Dieta DASH",
      descripcion: "Desarrollada para prevenir y controlar la hipertensión.",
      informacion: "Ideal para bajar de peso.",
      beneficios: "Mejora la salud cardiovascular.",
    },
    {
      id: 2,
      nombre: "Dieta Mediterránea",
      descripcion:
        "Basada en los hábitos alimenticios de países como Grecia e Italia.",
      informacion: "Ideal para bajar de peso.",
      beneficios: "Reduce el riesgo de enfermedades cardíacas.",
    },
  ],
}));

// Mock de PlanDetailSheet
jest.mock("@/components/sheets/PlanDetailSheet", () => ({
  PlanDetailSheet: ({
    isOpen,
    selectedPlan,
  }: {
    isOpen: boolean;
    setOpen: (v: boolean) => void;
    selectedPlan?: { nombre: string };
    isUserPlan?: boolean;
  }) =>
    isOpen && selectedPlan ? (
      <div data-testid="plan-detail-sheet">{selectedPlan.nombre}</div>
    ) : null,
}));

// Mock de sweetalert2
jest.mock("sweetalert2", () => ({
  default: { fire: jest.fn() },
}));

describe("ContainerPlanes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = render(<ContainerPlanes />);
    expect(container).toBeInTheDocument();
  });

  it("muestra el título 'Lista de planes'", () => {
    render(<ContainerPlanes />);
    expect(screen.getByText("Lista de planes")).toBeInTheDocument();
  });

  it("muestra la descripción del contenedor", () => {
    render(<ContainerPlanes />);
    expect(
      screen.getByText(
        "Aquí podrás visualizar combinaciones de alimentos para llegar a tu meta.",
      ),
    ).toBeInTheDocument();
  });

  it("renderiza todos los planes de la lista", () => {
    render(<ContainerPlanes />);
    expect(screen.getByText("Dieta DASH")).toBeInTheDocument();
    expect(screen.getByText("Dieta Mediterránea")).toBeInTheDocument();
  });

  it("muestra la descripción de cada plan", () => {
    render(<ContainerPlanes />);
    expect(
      screen.getByText(
        "Desarrollada para prevenir y controlar la hipertensión.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Basada en los hábitos alimenticios de países como Grecia e Italia.",
      ),
    ).toBeInTheDocument();
  });

  it("el PlanDetailSheet no es visible inicialmente", () => {
    render(<ContainerPlanes />);
    expect(screen.queryByTestId("plan-detail-sheet")).not.toBeInTheDocument();
  });

  it("abre el PlanDetailSheet al hacer clic en un plan", () => {
    render(<ContainerPlanes />);

    const planButtons = screen.getAllByRole("button");
    fireEvent.click(planButtons[0]);

    expect(screen.getByTestId("plan-detail-sheet")).toBeInTheDocument();
  });

  it("muestra el nombre del plan seleccionado en el sheet", () => {
    render(<ContainerPlanes />);

    const planButtons = screen.getAllByRole("button");
    fireEvent.click(planButtons[0]);

    // El primer plan es "Dieta DASH"
    expect(screen.getByTestId("plan-detail-sheet")).toHaveTextContent(
      "Dieta DASH",
    );
  });

  it("al hacer clic en el segundo plan, muestra el sheet con el nombre correcto", () => {
    render(<ContainerPlanes />);

    const planButtons = screen.getAllByRole("button");
    fireEvent.click(planButtons[1]);

    expect(screen.getByTestId("plan-detail-sheet")).toHaveTextContent(
      "Dieta Mediterránea",
    );
  });

  it("tiene la estructura de Card correcta", () => {
    const { container } = render(<ContainerPlanes />);
    expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='card-header']"),
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='card-content']"),
    ).toBeInTheDocument();
  });
});
