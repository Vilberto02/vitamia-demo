import { fireEvent, render, screen } from "@testing-library/react";
import { RecipeSection } from "@/components/sections/RecipeSection";

// Mocks de dependencias
jest.mock("sweetalert2", () => ({
  default: {
    fire: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/mocks/mocks", () => ({
  alimentosIniciales: {
    "Alimentos disponibles": [],
  },
}));

jest.mock("@/components/containers/ContainerDiaConsumo", () => ({
  ContainerDiaConsumo: () => (
    <div data-testid="container-dia-consumo">ContainerDiaConsumo</div>
  ),
}));

jest.mock("@/components/sheets/GenerateRecipeSheet", () => ({
  GenerarRecetaSheet: ({
    isOpen,
  }: {
    isOpen: boolean;
    setOpen: (v: boolean) => void;
  }) =>
    isOpen ? (
      <div data-testid="generar-receta-sheet">Generar Receta Sheet</div>
    ) : null,
}));

describe("RecipeSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el título 'Recetas'", () => {
    render(<RecipeSection />);

    expect(
      screen.getByRole("heading", { name: /Recetas/i }),
    ).toBeInTheDocument();
  });

  it("renderiza el contenedor de día de consumo", () => {
    render(<RecipeSection />);

    expect(screen.getByTestId("container-dia-consumo")).toBeInTheDocument();
  });

  it("renderiza la card de personalización con el título correcto", () => {
    render(<RecipeSection />);

    expect(screen.getByText("Personalizar comida")).toBeInTheDocument();
  });

  it("renderiza la descripción de la card de personalización", () => {
    render(<RecipeSection />);

    expect(
      screen.getByText(
        "Aquí podrás generar una receta en base a los alimentos que tengas.",
      ),
    ).toBeInTheDocument();
  });

  it("renderiza el botón 'Consultar'", () => {
    render(<RecipeSection />);

    expect(
      screen.getByRole("button", {
        name: /Generar receta con alimentos disponibles/i,
      }),
    ).toBeInTheDocument();
  });

  it("el botón 'Consultar' está habilitado cuando hasAlimentos es true", () => {
    render(<RecipeSection />);

    const consultarButton = screen.getByRole("button", {
      name: /Generar receta con alimentos disponibles/i,
    });

    // hasAlimentos está fijo en true en el componente
    expect(consultarButton).not.toBeDisabled();
  });

  it("hace clic en 'Consultar' y abre el sheet de recetas", () => {
    render(<RecipeSection />);

    const consultarButton = screen.getByRole("button", {
      name: /Generar receta con alimentos disponibles/i,
    });
    fireEvent.click(consultarButton);

    expect(screen.getByTestId("generar-receta-sheet")).toBeInTheDocument();
  });

  it("el sheet de recetas no es visible inicialmente", () => {
    render(<RecipeSection />);

    expect(
      screen.queryByTestId("generar-receta-sheet"),
    ).not.toBeInTheDocument();
  });

  it("la sección tiene el atributo aria-labelledby correcto", () => {
    render(<RecipeSection />);

    const section = screen.getByRole("region", { name: /Recetas/i });
    expect(section).toBeInTheDocument();
  });

  it("renderiza la CardAlimentoDiario con nombre 'Alimentos disponibles'", () => {
    render(<RecipeSection />);

    expect(screen.getByText("Alimentos disponibles")).toBeInTheDocument();
  });
});
