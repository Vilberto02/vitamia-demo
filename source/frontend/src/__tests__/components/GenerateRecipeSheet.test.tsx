import { fireEvent, render, screen } from "@testing-library/react";
import { GenerarRecetaSheet } from "@/components/sheets/GenerateRecipeSheet";

const mockSwalFire = jest.fn().mockResolvedValue({ isConfirmed: true });

jest.mock("sweetalert2", () => ({
  default: {
    fire: (...args: unknown[]) => mockSwalFire(...args),
  },
}));

// Mock de los datos de la receta sugerida
jest.mock("@/mocks/mocks", () => ({
  suggestedRecipe: {
    title: "Ensalada ligera de fideos con manzana",
    description:
      "Una ensalada fresca, rápida y saciante que mezcla la suavidad de los fideos con el toque dulce de la manzana.",
    ingredients: [
      "200 g de fideos integrales",
      "2 manzanas medianas",
      "Jugo de medio limón",
    ],
    preparation: [
      "Cocina los fideos al dente.",
      "Corta la manzana en cubos.",
      "Mezcla todo y adereza.",
    ],
    benefits: [
      "La manzana aporta fibra.",
      "Los fideos brindan energía sin exceso de calorías.",
    ],
  },
}));

const mockSetOpen = jest.fn();

const renderSheet = (isOpen = true) =>
  render(<GenerarRecetaSheet isOpen={isOpen} setOpen={mockSetOpen} />);

describe("GenerarRecetaSheet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = renderSheet();
    expect(container).toBeInTheDocument();
  });

  it("muestra el título de la receta cuando isOpen=true", () => {
    renderSheet(true);
    expect(
      screen.getByText("Ensalada ligera de fideos con manzana"),
    ).toBeInTheDocument();
  });

  it("muestra la descripción de la receta", () => {
    renderSheet(true);
    expect(
      screen.getByText(
        "Una ensalada fresca, rápida y saciante que mezcla la suavidad de los fideos con el toque dulce de la manzana.",
      ),
    ).toBeInTheDocument();
  });

  it("muestra el texto 'Receta propuesta'", () => {
    renderSheet(true);
    expect(screen.getByText("Receta propuesta")).toBeInTheDocument();
  });

  it("renderiza la sección 'Ingredientes'", () => {
    renderSheet(true);
    expect(screen.getByText("Ingredientes")).toBeInTheDocument();
  });

  it("renderiza los ingredientes de la receta", () => {
    renderSheet(true);
    expect(screen.getByText("200 g de fideos integrales")).toBeInTheDocument();
    expect(screen.getByText("2 manzanas medianas")).toBeInTheDocument();
    expect(screen.getByText("Jugo de medio limón")).toBeInTheDocument();
  });

  it("renderiza la sección 'Preparación'", () => {
    renderSheet(true);
    expect(screen.getByText("Preparación")).toBeInTheDocument();
  });

  it("renderiza los pasos de preparación", () => {
    renderSheet(true);
    expect(screen.getByText("Cocina los fideos al dente.")).toBeInTheDocument();
    expect(screen.getByText("Corta la manzana en cubos.")).toBeInTheDocument();
    expect(screen.getByText("Mezcla todo y adereza.")).toBeInTheDocument();
  });

  it("renderiza la sección 'Beneficios'", () => {
    renderSheet(true);
    expect(screen.getByText("Beneficios")).toBeInTheDocument();
  });

  it("renderiza los beneficios de la receta", () => {
    renderSheet(true);
    expect(screen.getByText("La manzana aporta fibra.")).toBeInTheDocument();
    expect(
      screen.getByText("Los fideos brindan energía sin exceso de calorías."),
    ).toBeInTheDocument();
  });

  it("muestra la pregunta '¿Desea agregar la receta?'", () => {
    renderSheet(true);
    expect(screen.getByText("¿Desea agregar la receta?")).toBeInTheDocument();
  });

  it("renderiza el botón 'Rechazar' con aria-label correcto", () => {
    renderSheet(true);
    expect(
      screen.getByRole("button", { name: /Rechazar receta propuesta/i }),
    ).toBeInTheDocument();
  });

  it("renderiza el botón 'Aceptar' con aria-label correcto", () => {
    renderSheet(true);
    expect(
      screen.getByRole("button", {
        name: /Aceptar y guardar receta propuesta/i,
      }),
    ).toBeInTheDocument();
  });

  it("al hacer clic en 'Aceptar' llama a Swal.fire con 'Receta agregada'", () => {
    renderSheet(true);
    fireEvent.click(
      screen.getByRole("button", {
        name: /Aceptar y guardar receta propuesta/i,
      }),
    );
    expect(mockSwalFire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Receta agregada",
      }),
    );
  });

  it("al hacer clic en 'Aceptar' llama a setOpen(false)", () => {
    renderSheet(true);
    fireEvent.click(
      screen.getByRole("button", {
        name: /Aceptar y guardar receta propuesta/i,
      }),
    );
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("al hacer clic en 'Rechazar' llama a Swal.fire con 'Receta rechazada'", () => {
    renderSheet(true);
    fireEvent.click(
      screen.getByRole("button", { name: /Rechazar receta propuesta/i }),
    );
    expect(mockSwalFire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Receta rechazada",
      }),
    );
  });

  it("al hacer clic en 'Rechazar' llama a setOpen(false)", () => {
    renderSheet(true);
    fireEvent.click(
      screen.getByRole("button", { name: /Rechazar receta propuesta/i }),
    );
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("muestra la 'Nota' informativa", () => {
    renderSheet(true);
    expect(screen.getByText("Nota:")).toBeInTheDocument();
  });

  it("la leyenda del fieldset de acciones es accesible (sr-only)", () => {
    renderSheet(true);
    expect(screen.getByText("Acciones de receta")).toBeInTheDocument();
  });

  it("el artículo tiene aria-labelledby='recipe-title'", () => {
    renderSheet(true);
    const article = document.querySelector(
      "article[aria-labelledby='recipe-title']",
    );
    expect(article).toBeInTheDocument();
  });
});
