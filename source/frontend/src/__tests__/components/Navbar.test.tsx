import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";

const mockUser = {
  id: 1,
  nombre: "Juan",
  apellido: "Perez Morales",
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

const mockSetActiveItem = jest.fn();
const mockToggleSidebar = jest.fn();

const renderNavbar = () =>
  render(
    <Navbar
      setActiveItem={mockSetActiveItem}
      toggleSidebar={mockToggleSidebar}
    />,
  );

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente sin errores", () => {
    const { container } = renderNavbar();
    expect(container).toBeInTheDocument();
  });

  it("renderiza el header con el rol correspondiente", () => {
    renderNavbar();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("muestra el nombre completo del usuario", () => {
    renderNavbar();
    expect(screen.getByText("Juan, Perez Morales")).toBeInTheDocument();
  });

  it("muestra el correo del usuario", () => {
    renderNavbar();
    expect(screen.getByText("juan@test.com")).toBeInTheDocument();
  });

  it("renderiza el botón de menú (hamburguesa)", () => {
    renderNavbar();
    expect(
      screen.getByRole("button", {
        name: /Abrir o cerrar menú de navegación/i,
      }),
    ).toBeInTheDocument();
  });

  it("renderiza el botón de perfil de usuario", () => {
    renderNavbar();
    expect(
      screen.getByRole("button", { name: /Ver perfil de usuario/i }),
    ).toBeInTheDocument();
  });

  it("llama a toggleSidebar al hacer clic en el botón menú", () => {
    renderNavbar();
    fireEvent.click(
      screen.getByRole("button", {
        name: /Abrir o cerrar menú de navegación/i,
      }),
    );
    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("llama a setActiveItem con 'perfil' al hacer clic en el botón de perfil", () => {
    renderNavbar();
    fireEvent.click(
      screen.getByRole("button", { name: /Ver perfil de usuario/i }),
    );
    expect(mockSetActiveItem).toHaveBeenCalledWith("perfil");
  });

  it("no llama a toggleSidebar al hacer clic en el botón de perfil", () => {
    renderNavbar();
    fireEvent.click(
      screen.getByRole("button", { name: /Ver perfil de usuario/i }),
    );
    expect(mockToggleSidebar).not.toHaveBeenCalled();
  });

  it("no llama a setActiveItem al hacer clic en el botón menú", () => {
    renderNavbar();
    fireEvent.click(
      screen.getByRole("button", {
        name: /Abrir o cerrar menú de navegación/i,
      }),
    );
    expect(mockSetActiveItem).not.toHaveBeenCalled();
  });

  it("renderiza el ícono del usuario (CircleUserRound)", () => {
    renderNavbar();
    // lucide-react renderiza un svg
    const svgIcons = document.querySelectorAll("svg");
    expect(svgIcons.length).toBeGreaterThan(0);
  });
});
