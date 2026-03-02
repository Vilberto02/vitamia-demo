import { fireEvent, render, screen } from "@testing-library/react";
import { CardRecipe } from "@/components/cards/CardRecipe";

const defaultProps = {
  title: "Tostadas de Aguacate con Huevo",
  description:
    "Una combinación perfecta de grasas saludables, proteínas y fibra.",
  onClick: jest.fn(),
};

describe("CardRecipe", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = render(<CardRecipe {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("muestra el título de la receta", () => {
    render(<CardRecipe {...defaultProps} />);
    expect(
      screen.getByText("Tostadas de Aguacate con Huevo"),
    ).toBeInTheDocument();
  });

  it("muestra la descripción de la receta", () => {
    render(<CardRecipe {...defaultProps} />);
    expect(
      screen.getByText(
        "Una combinación perfecta de grasas saludables, proteínas y fibra.",
      ),
    ).toBeInTheDocument();
  });

  it("llama a onClick al hacer clic en la tarjeta", () => {
    render(<CardRecipe {...defaultProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("el componente es un botón clickeable", () => {
    render(<CardRecipe {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("el título se renderiza como h4", () => {
    render(<CardRecipe {...defaultProps} />);
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "Tostadas de Aguacate con Huevo",
      }),
    ).toBeInTheDocument();
  });

  it("no llama a onClick si no se interactúa", () => {
    render(<CardRecipe {...defaultProps} />);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it("renderiza otra receta correctamente", () => {
    render(
      <CardRecipe
        title="Avena con Frutas y Miel"
        description="Un desayuno cálido y reconfortante."
        onClick={jest.fn()}
      />,
    );
    expect(screen.getByText("Avena con Frutas y Miel")).toBeInTheDocument();
    expect(
      screen.getByText("Un desayuno cálido y reconfortante."),
    ).toBeInTheDocument();
  });

  it("la descripción tiene la clase de texto correcto", () => {
    render(<CardRecipe {...defaultProps} />);
    const desc = screen.getByText(
      "Una combinación perfecta de grasas saludables, proteínas y fibra.",
    );
    expect(desc).toHaveClass("text-base");
  });
});
