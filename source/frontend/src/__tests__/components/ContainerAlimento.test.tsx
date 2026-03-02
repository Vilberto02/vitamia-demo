import { fireEvent, render, screen } from "@testing-library/react";
import { ContainerAlimento } from "@/components/containers/ContainerAlimento";

const mockToastSuccess = jest.fn();

jest.mock("react-hot-toast", () => ({
  default: {
    success: (...args: unknown[]) => mockToastSuccess(...args),
    error: jest.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}));

jest.mock("sweetalert2", () => ({
  default: { fire: jest.fn() },
}));

jest.mock("@/mocks/mocks", () => ({
  alimentosIniciales: {
    Desayuno: [],
    Almuerzo: [],
    Cena: [],
    Snack: [],
  },
}));

describe("ContainerAlimento", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = render(<ContainerAlimento />);
    expect(container).toBeInTheDocument();
  });

  it("muestra el título 'Alimentos ingeridos'", () => {
    render(<ContainerAlimento />);
    expect(screen.getByText("Alimentos ingeridos")).toBeInTheDocument();
  });

  it("muestra la descripción del contenedor", () => {
    render(<ContainerAlimento />);
    expect(
      screen.getByText("Aquí agregas los alimentos que ingieres en tu día."),
    ).toBeInTheDocument();
  });

  it("renderiza las 4 secciones de comida (Desayuno, Almuerzo, Cena, Snack)", () => {
    render(<ContainerAlimento />);
    expect(screen.getByText("Desayuno")).toBeInTheDocument();
    expect(screen.getByText("Almuerzo")).toBeInTheDocument();
    expect(screen.getByText("Cena")).toBeInTheDocument();
    expect(screen.getByText("Snack")).toBeInTheDocument();
  });

  it("renderiza el Toaster de notificaciones", () => {
    render(<ContainerAlimento />);
    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });

  it("llama a toast.success con el mensaje de reducción al hacer clic en el botón '−'", () => {
    render(<ContainerAlimento />);

    const buttons = screen.getAllByRole("button");
    // El tercer botón es el de restar agua (Minus)
    // buttons[0] = +agua, buttons[1] = disabled glass, buttons[2] = -agua
    // pero como hay muchos botones de CardAlimentoDiario también...
    // buscamos el botón deshabilitado y el botón después de él es el de Minus
    const disabledBtn = buttons.find((btn) => btn.hasAttribute("disabled"));
    const disabledIndex = buttons.indexOf(disabledBtn!);
    const removeWaterBtn = buttons[disabledIndex + 1];

    fireEvent.click(removeWaterBtn);

    expect(mockToastSuccess).toHaveBeenCalledWith(
      "Tu consumo de agua disminuyó.",
    );
  });

  it("el botón de GlassWater está deshabilitado", () => {
    render(<ContainerAlimento />);
    const buttons = screen.getAllByRole("button");
    const disabledBtn = buttons.find((btn) => btn.hasAttribute("disabled"));
    expect(disabledBtn).toBeInTheDocument();
    expect(disabledBtn).toBeDisabled();
  });

  it("renderiza el botón 'Agregar alimento' para cada sección", () => {
    render(<ContainerAlimento />);
    const agregarBtns = screen.getAllByText("Agregar alimento");
    expect(agregarBtns.length).toBe(4);
  });
});
