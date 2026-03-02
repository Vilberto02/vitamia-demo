import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";

describe("Card", () => {
  it("renderiza el Card sin errores", () => {
    const { container } = render(<Card />);
    expect(container).toBeInTheDocument();
  });

  it("renderiza hijos dentro del Card", () => {
    render(
      <Card>
        <p>Contenido del card</p>
      </Card>,
    );
    expect(screen.getByText("Contenido del card")).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='card'", () => {
    const { container } = render(<Card />);
    expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
  });

  it("aplica className adicional al Card", () => {
    const { container } = render(<Card className="mi-clase-extra" />);
    expect(container.querySelector("[data-slot='card']")).toHaveClass(
      "mi-clase-extra",
    );
  });
});

describe("CardHeader", () => {
  it("renderiza CardHeader sin errores", () => {
    const { container } = render(<CardHeader />);
    expect(container).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='card-header'", () => {
    const { container } = render(<CardHeader />);
    expect(
      container.querySelector("[data-slot='card-header']"),
    ).toBeInTheDocument();
  });

  it("aplica className adicional", () => {
    const { container } = render(<CardHeader className="extra-header" />);
    expect(container.querySelector("[data-slot='card-header']")).toHaveClass(
      "extra-header",
    );
  });
});

describe("CardTitle", () => {
  it("renderiza el título del card correctamente", () => {
    render(<CardTitle>Título del Plan</CardTitle>);
    expect(screen.getByText("Título del Plan")).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='card-title'", () => {
    const { container } = render(<CardTitle>Título</CardTitle>);
    expect(
      container.querySelector("[data-slot='card-title']"),
    ).toBeInTheDocument();
  });
});

describe("CardDescription", () => {
  it("renderiza la descripción del card correctamente", () => {
    render(<CardDescription>Descripción del plan</CardDescription>);
    expect(screen.getByText("Descripción del plan")).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='card-description'", () => {
    const { container } = render(
      <CardDescription>Descripción</CardDescription>,
    );
    expect(
      container.querySelector("[data-slot='card-description']"),
    ).toBeInTheDocument();
  });
});

describe("CardContent", () => {
  it("renderiza contenido dentro del CardContent", () => {
    render(
      <CardContent>
        <p>Contenido principal</p>
      </CardContent>,
    );
    expect(screen.getByText("Contenido principal")).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='card-content'", () => {
    const { container } = render(<CardContent />);
    expect(
      container.querySelector("[data-slot='card-content']"),
    ).toBeInTheDocument();
  });
});

describe("CardFooter", () => {
  it("renderiza el pie de card correctamente", () => {
    render(
      <CardFooter>
        <button>Acción</button>
      </CardFooter>,
    );
    expect(screen.getByRole("button", { name: "Acción" })).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='card-footer'", () => {
    const { container } = render(<CardFooter />);
    expect(
      container.querySelector("[data-slot='card-footer']"),
    ).toBeInTheDocument();
  });
});

describe("CardAction", () => {
  it("renderiza CardAction sin errores", () => {
    const { container } = render(<CardAction />);
    expect(container).toBeInTheDocument();
  });

  it("tiene el atributo data-slot='card-action'", () => {
    const { container } = render(<CardAction />);
    expect(
      container.querySelector("[data-slot='card-action']"),
    ).toBeInTheDocument();
  });
});

describe("Card (composición completa)", () => {
  it("renderiza todos los sub-componentes juntos correctamente", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Mi Plan Nutricional</CardTitle>
          <CardDescription>Plan para bajar de peso</CardDescription>
          <CardAction>
            <button>Editar</button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Detalles del plan</p>
        </CardContent>
        <CardFooter>
          <button>Confirmar</button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText("Mi Plan Nutricional")).toBeInTheDocument();
    expect(screen.getByText("Plan para bajar de peso")).toBeInTheDocument();
    expect(screen.getByText("Detalles del plan")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirmar" }),
    ).toBeInTheDocument();
  });
});
