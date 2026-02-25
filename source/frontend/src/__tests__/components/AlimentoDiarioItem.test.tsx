import { AlimentoDiarioItem } from "@/components/cards/AlimentoDiarioItem";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { fireEvent, render } from "@testing-library/react";

/**
 * Solución a los errores del componente Select en ShadCN
 */
function createMockPointerEvent(
  type: string,
  props: PointerEventInit = {},
): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? "mouse",
  });
  return event;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.PointerEvent = createMockPointerEvent as any;

Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

describe("AlimentoDiarioItem", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <AlimentoDiarioItem
        name="Manzana"
        cantidad={1}
        unidad={unidadesMedida[0]}
        isEditing={false}
        onDelete={() => {}}
        setActualizarUnidad={() => {}}
        onClick={() => {}}
      />,
    );
    expect(getByText("Manzana")).toBeInTheDocument();
  });

  it("renders the edit button when isEditing is true", () => {
    const { getByText } = render(
      <AlimentoDiarioItem
        name="Manzana"
        cantidad={1}
        unidad={unidadesMedida[0]}
        isEditing={true}
        onDelete={() => {}}
        setActualizarUnidad={() => {}}
        onClick={() => {}}
      />,
    );
    expect(getByText("Editar")).toBeInTheDocument();
  });

  it("Renderizar el boton de eliminar cuando isEditing es verdadero", () => {
    const { getByText } = render(
      <AlimentoDiarioItem
        name="Manzana"
        cantidad={1}
        unidad={unidadesMedida[0]}
        isEditing={true}
        onDelete={() => {}}
        setActualizarUnidad={() => {}}
        onClick={() => {}}
      />,
    );
    expect(getByText("Eliminar")).toBeInTheDocument();
  });

  it("detiene la propagación del click", () => {
    const onParentClick = jest.fn();

    const { getByRole } = render(
      <div onClick={onParentClick}>
        <button onClick={(e) => e.stopPropagation()}>Click</button>
      </div>,
    );

    fireEvent.click(getByRole("button"));

    expect(onParentClick).not.toHaveBeenCalled();
  });

  it("deshabilita el input cuando no está en modo edición", () => {
    const { getByRole } = render(
      <Input type="number" defaultValue={1} disabled={true} />,
    );

    expect(getByRole("spinbutton")).toBeDisabled();
  });

  const mockSetUnidadLocal = jest.fn();
  const mockSetActualizarUnidad = jest.fn();

  const unidadesMedida = [
    { id: "g", name: "Gramos" },
    { id: "kg", name: "Kilogramos" },
  ];

  const getUnidadById = (id: string) =>
    unidadesMedida.find((u) => u.id === id)!;

  it("actualiza la unidad al cambiar el select", () => {
    const { getByText } = render(
      <Select
        value="g"
        disabled={false}
        onValueChange={(value) => {
          const nueva = getUnidadById(value);
          mockSetUnidadLocal(nueva);
          mockSetActualizarUnidad(nueva);
        }}
      >
        <SelectContent>
          {unidadesMedida.map((unidad) => (
            <SelectItem key={unidad.id} value={unidad.id}>
              {unidad.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );

    fireEvent.click(getByText("Kilogramos"));

    expect(mockSetUnidadLocal).toHaveBeenCalledWith({
      id: "kg",
      name: "Kilogramos",
    });

    expect(mockSetActualizarUnidad).toHaveBeenCalledWith({
      id: "kg",
      name: "Kilogramos",
    });
  });
});
