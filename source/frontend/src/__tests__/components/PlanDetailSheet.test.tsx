import { render, screen } from "@testing-library/react";
import { PlanDetailSheet } from "@/components/sheets/PlanDetailSheet";
import type { PlanCompleto } from "@/types";

jest.mock("sweetalert2", () => ({
  default: {
    fire: jest.fn(),
  },
}));

const mockPlan: PlanCompleto = {
  id: 1,
  nombre: "Dieta Mediterránea",
  descripcion:
    "Basada en los hábitos alimenticios tradicionales de países como Grecia e Italia.",
  informacion: "Ideal para bajar de peso.",
  beneficios: "Reduce el riesgo de enfermedades cardíacas.",
};

const mockSetOpen = jest.fn();

describe("PlanDetailSheet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no renderiza contenido cuando isOpen es false", () => {
    render(
      <PlanDetailSheet
        isOpen={false}
        setOpen={mockSetOpen}
        selectedPlan={mockPlan}
      />,
    );

    expect(screen.queryByText("Dieta Mediterránea")).not.toBeInTheDocument();
  });

  it("renderiza el nombre del plan cuando isOpen es true", () => {
    render(
      <PlanDetailSheet
        isOpen={true}
        setOpen={mockSetOpen}
        selectedPlan={mockPlan}
      />,
    );

    expect(screen.getByText("Dieta Mediterránea")).toBeInTheDocument();
  });

  it("renderiza la descripción del plan", () => {
    render(
      <PlanDetailSheet
        isOpen={true}
        setOpen={mockSetOpen}
        selectedPlan={mockPlan}
      />,
    );

    expect(
      screen.getByText(
        "Basada en los hábitos alimenticios tradicionales de países como Grecia e Italia.",
      ),
    ).toBeInTheDocument();
  });

  it("renderiza los beneficios del plan", () => {
    render(
      <PlanDetailSheet
        isOpen={true}
        setOpen={mockSetOpen}
        selectedPlan={mockPlan}
      />,
    );

    expect(
      screen.getByText("Reduce el riesgo de enfermedades cardíacas."),
    ).toBeInTheDocument();
  });

  it("muestra el mensaje estático sobre el plan", () => {
    render(
      <PlanDetailSheet
        isOpen={true}
        setOpen={mockSetOpen}
        selectedPlan={mockPlan}
      />,
    );

    expect(
      screen.getByText("Este plan puede realizarse de forma indefinida."),
    ).toBeInTheDocument();
  });

  it("muestra el botón 'Agregar a mi perfil' cuando isUserPlan es false", () => {
    render(
      <PlanDetailSheet
        isOpen={true}
        setOpen={mockSetOpen}
        selectedPlan={mockPlan}
        isUserPlan={false}
      />,
    );

    expect(screen.getByText(/Agregar a mi perfil/i)).toBeInTheDocument();
  });

  it("oculta el botón 'Agregar a mi perfil' cuando isUserPlan es true", () => {
    render(
      <PlanDetailSheet
        isOpen={true}
        setOpen={mockSetOpen}
        selectedPlan={mockPlan}
        isUserPlan={true}
      />,
    );

    expect(screen.queryByText(/Agregar a mi perfil/i)).not.toBeInTheDocument();
  });

  it("no renderiza contenido de plan cuando selectedPlan es undefined", () => {
    render(
      <PlanDetailSheet
        isOpen={true}
        setOpen={mockSetOpen}
        selectedPlan={undefined}
      />,
    );

    expect(screen.queryByText("Descripción")).not.toBeInTheDocument();
    expect(screen.queryByText("Beneficios")).not.toBeInTheDocument();
  });

  it("muestra las etiquetas de sección 'Descripción' y 'Beneficios'", () => {
    render(
      <PlanDetailSheet
        isOpen={true}
        setOpen={mockSetOpen}
        selectedPlan={mockPlan}
      />,
    );

    expect(screen.getByText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("Beneficios")).toBeInTheDocument();
  });
});
