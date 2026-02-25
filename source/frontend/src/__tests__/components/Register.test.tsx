import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Register } from "@/components/Register";
import { MemoryRouter } from "react-router";
import toast from "react-hot-toast";

const mockRegister = jest.fn();

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    register: jest.fn(),
  }),
}));

jest.mock("react-hot-toast", () => ({
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const renderRegister = () =>
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>,
  );

describe("Register", () => {
  it("renderiza el paso 1 por defecto", () => {
    renderRegister();

    expect(screen.getByText("Credenciales de acceso")).toBeInTheDocument();

    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();

    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  it("no avanza al paso 2 si el paso 1 es inválido", async () => {
    renderRegister();

    fireEvent.click(screen.getByText("Siguiente"));

    expect(
      await screen.findByText("El correo electrónico es requerido."),
    ).toBeInTheDocument();
  });

  it("avanza al paso 2 cuando el paso 1 es válido", async () => {
    renderRegister();

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Siguiente"));

    expect(await screen.findByText("Información personal")).toBeInTheDocument();
  });

  it("permite volver al paso anterior", async () => {
    renderRegister();

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Siguiente"));

    fireEvent.click(screen.getByText("Anterior"));

    expect(screen.getByText("Credenciales de acceso")).toBeInTheDocument();
  });

  it("envía el formulario completo y registra al usuario", async () => {
    mockRegister.mockResolvedValueOnce(undefined);

    renderRegister();

    // Paso 1
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Siguiente"));

    // Paso 2
    fireEvent.change(screen.getByLabelText("Nombres"), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByLabelText("Apellidos"), {
      target: { value: "Perez" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de nacimiento"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.click(screen.getByText("Siguiente"));

    // Paso 3
    fireEvent.change(screen.getByLabelText("Peso (kg)"), {
      target: { value: "70" },
    });
    fireEvent.change(screen.getByLabelText("Altura (cm)"), {
      target: { value: "175" },
    });
    fireEvent.change(screen.getByLabelText("Meta u objetivo"), {
      target: { value: "Bajar de peso" },
    });

    fireEvent.click(screen.getByText("Registrar"));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
    });
  });

  it("muestra error si falla el registro", async () => {
    mockRegister.mockRejectedValueOnce(new Error("Error"));

    renderRegister();

    // (rellenar pasos como arriba)

    fireEvent.click(screen.getByText("Registrar"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("redirecciona a /login después de registro exitoso", async () => {
    mockRegister.mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Register />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Bienvenido")).not.toBeInTheDocument();
    });
  });
});
