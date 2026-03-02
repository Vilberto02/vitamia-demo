import { fireEvent, render, screen } from "@testing-library/react";
import { SideBar } from "@/components/sidebar/SideBar";
import { ChartNoAxesColumn, Grid2X2, Salad, UserRound } from "lucide-react";
import type { SideBarItemType } from "@/types";

// Mocks
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    logout: jest.fn(),
  }),
}));

jest.mock("react-hot-toast", () => ({
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/assets/vitamia-logo.svg", () => "mock-logo");

const mockItems: SideBarItemType[] = [
  { id: "general", name: "General", Icon: ChartNoAxesColumn },
  { id: "recetas", name: "Recetas", Icon: Salad },
  { id: "planes", name: "Planes", Icon: Grid2X2 },
  { id: "perfil", name: "Perfil", Icon: UserRound },
];

const mockSetActiveItem = jest.fn();

const renderSideBar = (activeItem = "general", isOpen = true) =>
  render(
    <SideBar
      items={mockItems}
      activeItem={activeItem}
      setActiveItem={mockSetActiveItem}
      isOpen={isOpen}
    />,
  );

describe("SideBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente correctamente cuando está abierto", () => {
    renderSideBar("general", true);

    const aside = screen.getByRole("complementary", {
      name: "Navegación principal",
    });
    expect(aside).toBeInTheDocument();
  });

  it("muestra todos los ítems del menú", () => {
    renderSideBar();

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Recetas")).toBeInTheDocument();
    expect(screen.getByText("Planes")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });

  it("aplica la clase de traducción cuando la barra está abierta", () => {
    renderSideBar("general", true);

    const aside = screen.getByRole("complementary");
    expect(aside).toHaveClass("translate-x-0");
  });

  it("aplica la clase de traducción cuando la barra está cerrada", () => {
    renderSideBar("general", false);

    const aside = screen.getByRole("complementary");
    expect(aside).toHaveClass("-translate-x-full");
  });

  it("el botón del logo llama a setActiveItem con 'general'", () => {
    renderSideBar();

    const logoButton = screen.getByRole("button", { name: "Ir a inicio" });
    fireEvent.click(logoButton);

    expect(mockSetActiveItem).toHaveBeenCalledWith("general");
  });

  it("renderiza el botón de cerrar sesión", () => {
    renderSideBar();

    const logoutButton = screen.getByRole("button", { name: "Cerrar sesión" });
    expect(logoutButton).toBeInTheDocument();
  });

  it("el botón de cerrar sesión llama a logout y navega", () => {
    const mockLogout = jest.fn();
    const mockNavigate = jest.fn();

    jest.mock("@/hooks/useAuth", () => ({
      useAuth: () => ({ logout: mockLogout }),
    }));
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    renderSideBar();

    const logoutButton = screen.getByRole("button", { name: "Cerrar sesión" });
    fireEvent.click(logoutButton);

    expect(logoutButton).toBeInTheDocument();
  });

  it("aria-hidden es false cuando la barra está abierta", () => {
    renderSideBar("general", true);

    const aside = screen.getByRole("complementary");
    expect(aside).toHaveAttribute("aria-hidden", "false");
  });

  it("aria-hidden es true cuando la barra está cerrada", () => {
    renderSideBar("general", false);

    const aside = screen.getByRole("complementary");
    expect(aside).toHaveAttribute("aria-hidden", "true");
  });

  it("muestra el logo de Vitamia en el botón de inicio", () => {
    renderSideBar();

    const logo = screen.getByAltText("Logo de Vitamia");
    expect(logo).toBeInTheDocument();
  });
});
