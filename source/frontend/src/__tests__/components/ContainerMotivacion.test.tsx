import { render, screen, act } from "@testing-library/react";
import { ContainerMotivacion } from "@/components/containers/ContainerMotivacion";

const mockMensajes = [
  { id: "1", message: "No busques ser perfecto, busca ser constante" },
  { id: "2", message: "El progreso lento sigue siendo progreso" },
  { id: "3", message: "Descansa si lo necesitas, pero no te rindas" },
];

jest.mock("@/mocks/mocks", () => ({
  mensajesMotivacion: [
    { id: "1", message: "No busques ser perfecto, busca ser constante" },
    { id: "2", message: "El progreso lento sigue siendo progreso" },
    { id: "3", message: "Descansa si lo necesitas, pero no te rindas" },
  ],
}));

describe("ContainerMotivacion", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = render(<ContainerMotivacion />);
    expect(container).toBeInTheDocument();
  });

  it("muestra un mensaje de motivación al renderizar", () => {
    render(<ContainerMotivacion />);

    // El índice inicial es 1, por lo que se muestra el segundo mensaje
    expect(
      screen.getByText(`"${mockMensajes[1].message}"`),
    ).toBeInTheDocument();
  });

  it("cambia al siguiente mensaje después del intervalo de tiempo", () => {
    render(<ContainerMotivacion />);

    // El mensaje inicial (índice 1)
    expect(
      screen.getByText(`"${mockMensajes[1].message}"`),
    ).toBeInTheDocument();

    // Avanza 300000ms (5 minutos)
    act(() => {
      jest.advanceTimersByTime(300000);
    });

    // Ahora debe mostrar el mensaje con índice 2
    expect(
      screen.getByText(`"${mockMensajes[2].message}"`),
    ).toBeInTheDocument();
  });

  it("cicla de vuelta al primer mensaje después del último", () => {
    render(<ContainerMotivacion />);

    // Avanza 2 intervalos para ir de índice 1 -> 2 -> 0
    act(() => {
      jest.advanceTimersByTime(600000);
    });

    expect(
      screen.getByText(`"${mockMensajes[0].message}"`),
    ).toBeInTheDocument();
  });

  it("limpia el intervalo al desmontar el componente", () => {
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");

    const { unmount } = render(<ContainerMotivacion />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it("renderiza el contenido dentro de un Card con gradiente", () => {
    const { container } = render(<ContainerMotivacion />);

    const card = container.querySelector("[data-slot='card']");
    expect(card).toBeInTheDocument();
  });

  it("el mensaje visible tiene clases de estilo de animación", () => {
    render(<ContainerMotivacion />);

    const mensajeEl = screen.getByText(`"${mockMensajes[1].message}"`);
    expect(mensajeEl).toHaveClass("animate-in");
    expect(mensajeEl).toHaveClass("fade-in");
  });
});
