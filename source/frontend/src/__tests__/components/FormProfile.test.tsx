import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormProfile } from "@/components/forms/FormProfile";

const mockUser = {
  id: 1,
  nombre: "Juan",
  apellido: "Perez",
  correo: "juan@test.com",
  fecha_nacimiento: "2002-05-15",
  meta: "Bajar de peso",
  peso: 84,
  altura: 175,
  imc: 23.52,
  imagen: "",
};

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    user: mockUser,
  }),
}));

const mockOnCancel = jest.fn();

const renderFormProfile = () => render(<FormProfile onCancel={mockOnCancel} />);

describe("FormProfile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el formulario sin errores", () => {
    const { container } = renderFormProfile();
    expect(container).toBeInTheDocument();
  });

  it("muestra el campo 'Nombres' con valor inicial del usuario", () => {
    renderFormProfile();
    const input = screen.getByLabelText("Nombres") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Juan");
  });

  it("muestra el campo 'Apellidos' con valor inicial del usuario", () => {
    renderFormProfile();
    const input = screen.getByLabelText("Apellidos") as HTMLInputElement;
    expect(input.value).toBe("Perez");
  });

  it("muestra el campo 'Fecha de nacimiento' con valor inicial", () => {
    renderFormProfile();
    const input = screen.getByLabelText(
      "Fecha de nacimiento",
    ) as HTMLInputElement;
    expect(input.value).toBe("2002-05-15");
  });

  it("muestra el campo 'Peso (kg)' con valor inicial del usuario", () => {
    renderFormProfile();
    const input = screen.getByLabelText("Peso (kg)") as HTMLInputElement;
    expect(input.value).toBe("84");
  });

  it("muestra el campo 'Altura (cm)' con valor inicial del usuario", () => {
    renderFormProfile();
    const input = screen.getByLabelText("Altura (cm)") as HTMLInputElement;
    expect(input.value).toBe("175");
  });

  it("muestra el campo 'Meta u objetivo' con valor inicial del usuario", () => {
    renderFormProfile();
    const input = screen.getByLabelText("Meta u objetivo") as HTMLInputElement;
    expect(input.value).toBe("Bajar de peso");
  });

  it("muestra el campo 'Correo electrónico' con valor inicial del usuario", () => {
    renderFormProfile();
    const input = screen.getByLabelText(
      "Correo electrónico",
    ) as HTMLInputElement;
    expect(input.value).toBe("juan@test.com");
  });

  it("renderiza el botón 'Guardar Cambios'", () => {
    renderFormProfile();
    expect(
      screen.getByRole("button", { name: /Guardar Cambios/i }),
    ).toBeInTheDocument();
  });

  it("renderiza el botón 'Cancelar'", () => {
    renderFormProfile();
    expect(
      screen.getByRole("button", { name: /Cancelar/i }),
    ).toBeInTheDocument();
  });

  it("llama a onCancel al hacer clic en el botón 'Cancelar'", () => {
    renderFormProfile();
    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("muestra error de validación si el nombre está vacío al enviar", async () => {
    renderFormProfile();

    // Limpiar el campo nombre
    fireEvent.change(screen.getByLabelText("Nombres"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Guardar Cambios/i }));

    expect(
      await screen.findByText("El nombre es requerido."),
    ).toBeInTheDocument();
  });

  it("no llama a onCancel al hacer clic en 'Guardar Cambios'", () => {
    renderFormProfile();
    fireEvent.click(screen.getByRole("button", { name: /Guardar Cambios/i }));
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  it("el campo de correo tiene type='email'", () => {
    renderFormProfile();
    const input = screen.getByLabelText("Correo electrónico");
    expect(input).toHaveAttribute("type", "email");
  });

  it("el campo de peso tiene type='number'", () => {
    renderFormProfile();
    const input = screen.getByLabelText("Peso (kg)");
    expect(input).toHaveAttribute("type", "number");
  });

  it("el campo de altura tiene type='number'", () => {
    renderFormProfile();
    const input = screen.getByLabelText("Altura (cm)");
    expect(input).toHaveAttribute("type", "number");
  });

  it("permite modificar el valor del campo nombre", async () => {
    renderFormProfile();
    const input = screen.getByLabelText("Nombres");
    fireEvent.change(input, { target: { value: "Carlos" } });
    expect((input as HTMLInputElement).value).toBe("Carlos");
  });

  it("envía el formulario sin errores cuando todos los campos son válidos", async () => {
    renderFormProfile();

    fireEvent.click(screen.getByRole("button", { name: /Guardar Cambios/i }));

    await waitFor(() => {
      expect(
        screen.queryByText("El nombre es requerido."),
      ).not.toBeInTheDocument();
    });
  });
});
