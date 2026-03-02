import { fireEvent, render, screen } from "@testing-library/react";
import { DashboardPage } from "@/pages/DashboardPage";
import { MemoryRouter } from "react-router-dom";

// Mocks de secciones y sub-componentes
jest.mock("@/components/sections/OverviewSection", () => ({
  OverviewSection: () => (
    <div data-testid="overview-section">Vista General</div>
  ),
}));

jest.mock("@/components/sections/RecipeSection", () => ({
  RecipeSection: () => <div data-testid="recipe-section">Recetas</div>,
}));

jest.mock("@/components/sections/PlanSection", () => ({
  PlanSection: () => <div data-testid="plan-section">Planes</div>,
}));

jest.mock("@/components/sections/ProfileSection", () => ({
  ProfilePage: () => <div data-testid="profile-section">Perfil</div>,
}));

jest.mock("@/components/sidebar/SideBar", () => ({
  SideBar: ({
    activeItem,
    setActiveItem,
    isOpen,
  }: {
    items: unknown[];
    activeItem: string;
    setActiveItem: (id: string) => void;
    isOpen: boolean;
  }) => (
    <div
      data-testid="sidebar"
      data-active={activeItem}
      data-open={isOpen.toString()}
    >
      <button onClick={() => setActiveItem("general")}>General</button>
      <button onClick={() => setActiveItem("recetas")}>Recetas</button>
      <button onClick={() => setActiveItem("planes")}>Planes</button>
      <button onClick={() => setActiveItem("perfil")}>Perfil</button>
    </div>
  ),
}));

jest.mock("@/components/Navbar", () => ({
  Navbar: ({
    toggleSidebar,
  }: {
    setActiveItem: (id: string) => void;
    toggleSidebar: () => void;
  }) => (
    <div data-testid="navbar">
      <button onClick={toggleSidebar} data-testid="toggle-sidebar">
        Toggle
      </button>
    </div>
  ),
}));

jest.mock("react-hot-toast", () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

const renderDashboardPage = () =>
  render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  );

describe("DashboardPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el layout principal correctamente", () => {
    renderDashboardPage();

    expect(screen.getByRole("application")).toBeInTheDocument();
  });

  it("renderiza el sidebar", () => {
    renderDashboardPage();

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("renderiza la navbar", () => {
    renderDashboardPage();

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("muestra la sección 'general' por defecto", () => {
    renderDashboardPage();

    expect(screen.getByTestId("overview-section")).toBeInTheDocument();
    expect(screen.queryByTestId("recipe-section")).not.toBeInTheDocument();
  });

  it("cambia a la sección 'recetas' al hacer clic en el ítem del sidebar", () => {
    renderDashboardPage();

    fireEvent.click(screen.getByRole("button", { name: "Recetas" }));

    expect(screen.getByTestId("recipe-section")).toBeInTheDocument();
    expect(screen.queryByTestId("overview-section")).not.toBeInTheDocument();
  });

  it("cambia a la sección 'planes' al hacer clic en el ítem del sidebar", () => {
    renderDashboardPage();

    fireEvent.click(screen.getByRole("button", { name: "Planes" }));

    expect(screen.getByTestId("plan-section")).toBeInTheDocument();
  });

  it("cambia a la sección 'perfil' al hacer clic en el ítem del sidebar", () => {
    renderDashboardPage();

    fireEvent.click(screen.getByRole("button", { name: "Perfil" }));

    expect(screen.getByTestId("profile-section")).toBeInTheDocument();
  });

  it("el sidebar comienza abierto (isOpen=true)", () => {
    renderDashboardPage();

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveAttribute("data-open", "true");
  });

  it("togglea el estado del sidebar al hacer clic en el botón toggle", () => {
    renderDashboardPage();

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveAttribute("data-open", "true");

    fireEvent.click(screen.getByTestId("toggle-sidebar"));

    expect(sidebar).toHaveAttribute("data-open", "false");
  });

  it("el main tiene el aria-label correcto según la sección activa", () => {
    renderDashboardPage();

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("aria-label", "Sección de General");
  });

  it("actualiza el aria-label del main al cambiar de sección", () => {
    renderDashboardPage();

    fireEvent.click(screen.getByRole("button", { name: "Recetas" }));

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("aria-label", "Sección de Recetas");
  });

  it("el Toaster se renderiza para las notificaciones", () => {
    renderDashboardPage();

    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });
});
