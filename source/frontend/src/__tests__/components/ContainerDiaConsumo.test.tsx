import { fireEvent, render, screen } from "@testing-library/react";
import { ContainerDiaConsumo } from "@/components/containers/ContainerDiaConsumo";

// Mock de mocks
jest.mock("@/mocks/mocks", () => ({
  sampleRecipes: [
    {
      id: "1",
      title: "Tostadas de Aguacate con Huevo",
      description: "Una combinación perfecta de grasas saludables.",
      benefits: "Aporta energía.",
      preparationTime: "10-15 minutos.",
      ingredients: ["1 pan integral", "1/2 aguacate"],
      preparation: ["Tostar el pan.", "Preparar el huevo."],
    },
    {
      id: "2",
      title: "Avena con Frutas y Miel",
      description: "Un desayuno cálido y reconfortante.",
      benefits: "Aporta fibra.",
      preparationTime: "10-15 minutos.",
      ingredients: ["1/2 taza de avena"],
      preparation: ["Cocinar la avena."],
    },
  ],
}));

// Mock del RecipeDetailSheet
jest.mock("@/components/sheets/RecipeDetailSheet", () => ({
  RecipeDetailSheet: ({
    isOpen,
    selectedRecipe,
  }: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    selectedRecipe: { title: string } | null;
  }) =>
    isOpen && selectedRecipe ? (
      <div data-testid="recipe-detail-sheet">{selectedRecipe.title}</div>
    ) : null,
}));

describe("ContainerDiaConsumo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = render(<ContainerDiaConsumo />);
    expect(container).toBeInTheDocument();
  });

  it("muestra las 4 pestañas: Desayuno, Almuerzo, Cena, Snacks", () => {
    render(<ContainerDiaConsumo />);
    expect(screen.getByRole("tab", { name: "Desayuno" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Almuerzo" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Cena" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Snacks" })).toBeInTheDocument();
  });

  it("la pestaña 'Desayuno' está activa por defecto", () => {
    render(<ContainerDiaConsumo />);
    const tab = screen.getByRole("tab", { name: "Desayuno" });
    expect(tab).toHaveAttribute("data-state", "active");
  });

  it("muestra las recetas en la pestaña Desayuno por defecto", () => {
    render(<ContainerDiaConsumo />);
    expect(
      screen.getByText("Tostadas de Aguacate con Huevo"),
    ).toBeInTheDocument();
    expect(screen.getByText("Avena con Frutas y Miel")).toBeInTheDocument();
  });

  it("cambia a la pestaña 'Almuerzo' al hacer clic", () => {
    render(<ContainerDiaConsumo />);
    fireEvent.click(screen.getByRole("tab", { name: "Almuerzo" }));
    const tab = screen.getByRole("tab", { name: "Almuerzo" });
    expect(tab).toHaveAttribute("data-state", "active");
  });

  it("cambia a la pestaña 'Cena' al hacer clic", () => {
    render(<ContainerDiaConsumo />);
    fireEvent.click(screen.getByRole("tab", { name: "Cena" }));
    const tab = screen.getByRole("tab", { name: "Cena" });
    expect(tab).toHaveAttribute("data-state", "active");
  });

  it("cambia a la pestaña 'Snacks' al hacer clic", () => {
    render(<ContainerDiaConsumo />);
    fireEvent.click(screen.getByRole("tab", { name: "Snacks" }));
    const tab = screen.getByRole("tab", { name: "Snacks" });
    expect(tab).toHaveAttribute("data-state", "active");
  });

  it("al hacer clic en una receta se abre el sheet con su título", () => {
    render(<ContainerDiaConsumo />);

    const recipeButtons = screen.getAllByText("Tostadas de Aguacate con Huevo");
    fireEvent.click(recipeButtons[0].closest("button")!);

    expect(screen.getByTestId("recipe-detail-sheet")).toBeInTheDocument();
    expect(
      screen.getAllByText("Tostadas de Aguacate con Huevo").length,
    ).toBeGreaterThan(0);
  });

  it("el RecipeDetailSheet no es visible inicialmente", () => {
    render(<ContainerDiaConsumo />);
    expect(screen.queryByTestId("recipe-detail-sheet")).not.toBeInTheDocument();
  });
});
