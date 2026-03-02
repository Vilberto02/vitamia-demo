import { render, screen } from "@testing-library/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

describe("ScrollArea", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = render(
      <ScrollArea>
        <p>Contenido de prueba</p>
      </ScrollArea>,
    );

    expect(container).toBeInTheDocument();
  });

  it("renderiza el contenido de los hijos (children)", () => {
    render(
      <ScrollArea>
        <p>Texto visible dentro del ScrollArea</p>
      </ScrollArea>,
    );

    expect(
      screen.getByText("Texto visible dentro del ScrollArea"),
    ).toBeInTheDocument();
  });

  it("aplica className adicional al ScrollArea", () => {
    const { container } = render(
      <ScrollArea className="h-52 custom-class">
        <p>Contenido</p>
      </ScrollArea>,
    );

    const root = container.querySelector("[data-slot='scroll-area']");
    expect(root).toHaveClass("custom-class");
  });

  it("renderiza múltiples hijos correctamente", () => {
    render(
      <ScrollArea>
        <p>Elemento 1</p>
        <p>Elemento 2</p>
        <p>Elemento 3</p>
      </ScrollArea>,
    );

    expect(screen.getByText("Elemento 1")).toBeInTheDocument();
    expect(screen.getByText("Elemento 2")).toBeInTheDocument();
    expect(screen.getByText("Elemento 3")).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='scroll-area'", () => {
    const { container } = render(
      <ScrollArea>
        <p>Contenido</p>
      </ScrollArea>,
    );

    const root = container.querySelector("[data-slot='scroll-area']");
    expect(root).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='scroll-area-viewport'", () => {
    const { container } = render(
      <ScrollArea>
        <p>Contenido</p>
      </ScrollArea>,
    );

    const viewport = container.querySelector(
      "[data-slot='scroll-area-viewport']",
    );
    expect(viewport).toBeInTheDocument();
  });
});

describe("ScrollBar", () => {
  it("renderiza ScrollBar vertical por defecto", () => {
    const { container } = render(
      <ScrollArea>
        <ScrollBar />
      </ScrollArea>,
    );

    const scrollbar = container.querySelector(
      "[data-slot='scroll-area-scrollbar']",
    );
    expect(scrollbar).toBeInTheDocument();
  });

  it("aplica className adicional al ScrollBar", () => {
    const { container } = render(
      <ScrollArea>
        <ScrollBar className="custom-scrollbar" />
      </ScrollArea>,
    );

    const scrollbar = container.querySelector(
      "[data-slot='scroll-area-scrollbar']",
    );
    expect(scrollbar).toHaveClass("custom-scrollbar");
  });
});
