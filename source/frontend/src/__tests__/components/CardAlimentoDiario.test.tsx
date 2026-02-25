import { CardAlimentoDiario } from "@/components/cards/CardAlimentoDiario";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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
    Desayuno: [
      {
        id: 1,
        name: "Pan",
        cantidad: 100,
        unidad: { id: "g", name: "Gramos" },
        foodId: 1,
      },
    ],
    Cena: [],
  },
}));

describe("CardAlimentoDiario", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza los alimentos iniciales", () => {
    render(<CardAlimentoDiario name="Desayuno" />);

    expect(screen.getByText("Desayuno")).toBeInTheDocument();
    expect(screen.getByText("Pan")).toBeInTheDocument();
  });

  it("muestra mensaje si no hay alimentos", () => {
    render(<CardAlimentoDiario name="Cena" />);

    expect(screen.getByText("No hay alimentos agregados.")).toBeInTheDocument();
  });

  it("muestra el nombre de la tarjeta como encabezado", () => {
    render(<CardAlimentoDiario name="Almuerzo" />);

    expect(screen.getByText("Almuerzo")).toBeInTheDocument();
  });

  it("vacía la lista de alimentos desde el menú dropdown", async () => {
    render(<CardAlimentoDiario name="Desayuno" />);

    fireEvent.click(screen.getByRole("button")); // abre menú
    fireEvent.click(screen.getByText("Vaciar alimentos"));

    expect(
      await screen.findByText("No hay alimentos agregados."),
    ).toBeInTheDocument();
  });

  it("elimina un alimento individual al hacer clic en eliminar", async () => {
    render(<CardAlimentoDiario name="Desayuno" />);

    // Activar modo edición
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Editar alimentos"));

    fireEvent.click(screen.getByLabelText(/eliminar/i));

    await waitFor(() => {
      expect(screen.queryByText("Pan")).not.toBeInTheDocument();
    });
  });

  it("abre el modal para agregar alimento al hacer clic en el botón", () => {
    render(<CardAlimentoDiario name="Desayuno" />);

    fireEvent.click(screen.getByText("Agregar alimento"));

    expect(screen.getByText("Alimento")).toBeInTheDocument();
    expect(
      screen.getByText("Escribe los datos del alimento o ingrediente."),
    ).toBeInTheDocument();
  });

  it("agrega un nuevo alimento con nombre y cantidad válidos", async () => {
    render(<CardAlimentoDiario name="Desayuno" />);

    fireEvent.click(screen.getByText("Agregar alimento"));

    fireEvent.change(screen.getByLabelText("Nombre del alimento"), {
      target: { value: "Arroz" },
    });

    fireEvent.change(screen.getByLabelText("Cantidad del alimento"), {
      target: { value: "200" },
    });

    fireEvent.click(screen.getByText("Listo"));

    expect(await screen.findByText("Arroz")).toBeInTheDocument();
  });

  it("no agrega alimento si faltan datos", () => {
    render(<CardAlimentoDiario name="Desayuno" />);

    fireEvent.click(screen.getByText("Agregar alimento"));
    fireEvent.click(screen.getByText("Listo"));

    // No debe haber agregado ningún nuevo alimento
    expect(screen.queryByText("Alimento agregado")).not.toBeInTheDocument();
  });

  it("el botón 'Agregar alimento' siempre es visible", () => {
    render(<CardAlimentoDiario name="Cena" />);

    expect(screen.getByText("Agregar alimento")).toBeInTheDocument();
  });

  it("el menú desplegable contiene las opciones correctas", () => {
    render(<CardAlimentoDiario name="Desayuno" />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Vaciar alimentos")).toBeInTheDocument();
    expect(screen.getByText("Editar alimentos")).toBeInTheDocument();
  });

  it("el modal contiene los campos de nombre, cantidad y unidad", () => {
    render(<CardAlimentoDiario name="Desayuno" />);

    fireEvent.click(screen.getByText("Agregar alimento"));

    expect(screen.getByLabelText("Nombre del alimento")).toBeInTheDocument();
    expect(screen.getByLabelText("Cantidad del alimento")).toBeInTheDocument();
    expect(screen.getByLabelText("Unidad del alimento")).toBeInTheDocument();
  });
});
