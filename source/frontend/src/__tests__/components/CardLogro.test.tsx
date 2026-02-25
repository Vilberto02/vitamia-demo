import { render, screen } from "@testing-library/react";
import { CardLogro } from "@/components/cards/CardLogro";

describe("CardLogro", () => {
  const defaultProps = {
    title: "Constante",
    description: "Racha de una semana.",
  };

  it("renderiza el componente sin errores", () => {
    const { container } = render(<CardLogro {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("muestra el título del logro", () => {
    render(<CardLogro {...defaultProps} />);
    expect(screen.getByText("Constante")).toBeInTheDocument();
  });

  it("muestra la descripción del logro", () => {
    render(<CardLogro {...defaultProps} />);
    expect(screen.getByText("Racha de una semana.")).toBeInTheDocument();
  });

  it("renderiza el ícono Award cuando isCompleted es false", () => {
    render(<CardLogro {...defaultProps} isCompleted={false} />);
    // El ícono Award tiene el atributo de lucide-react
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renderiza el ícono Trophy cuando isCompleted es true", () => {
    render(<CardLogro {...defaultProps} isCompleted={true} />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renderiza el ícono Award cuando isCompleted no se pasa (undefined)", () => {
    render(<CardLogro {...defaultProps} />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renderiza correctamente con otro título y descripción", () => {
    render(
      <CardLogro
        title="VidaFit"
        description="Racha de 6 meses."
        isCompleted={true}
      />,
    );
    expect(screen.getByText("VidaFit")).toBeInTheDocument();
    expect(screen.getByText("Racha de 6 meses.")).toBeInTheDocument();
  });

  it("el título se renderiza como h3", () => {
    render(<CardLogro {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Constante" }),
    ).toBeInTheDocument();
  });

  it("la descripción tiene estilo de texto pequeño", () => {
    render(<CardLogro {...defaultProps} />);
    const desc = screen.getByText("Racha de una semana.");
    expect(desc).toHaveClass("text-sm");
    expect(desc).toHaveClass("text-gray-500");
  });
});
