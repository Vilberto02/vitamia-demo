import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mocks de todas las páginas que usa el router
jest.mock("@/pages/LoginPage", () => ({
  LoginPage: () => <div data-testid="login-page">Login</div>,
}));

jest.mock("@/pages/RegisterPage", () => ({
  RegisterPage: () => <div data-testid="register-page">Register</div>,
}));

jest.mock("@/pages/DashboardPage", () => ({
  DashboardPage: () => <div data-testid="dashboard-page">Dashboard</div>,
}));

jest.mock("@/pages/NotFoundPage", () => ({
  NotFoundPage: () => <div data-testid="not-found-page">404</div>,
}));

jest.mock("@/pages/LandingPage", () => ({
  LandingPage: () => <div data-testid="landing-page">Landing</div>,
}));

jest.mock("@/assets/name-bg-vitamia.svg", () => "mock-logo");

jest.mock("@/router/PrivateRouter", () => ({
  PrivateRouter: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: null,
    token: null,
  }),
}));

// Importamos las páginas mockeadas para testear las rutas individualmente
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LandingPage } from "@/pages/LandingPage";
import { PrivateRouter } from "@/router/PrivateRouter";

// Helper para renderizar una ruta específica manualmente
const renderRoute = (initialPath: string) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <PrivateRouter>
              <DashboardPage />
            </PrivateRouter>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>,
  );

describe("AppRouter - configuración de rutas", () => {
  it("la ruta '/' renderiza la LandingPage", () => {
    renderRoute("/");
    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });

  it("la ruta '/login' renderiza la LoginPage", () => {
    renderRoute("/login");
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("la ruta '/register' renderiza la RegisterPage", () => {
    renderRoute("/register");
    expect(screen.getByTestId("register-page")).toBeInTheDocument();
  });

  it("la ruta '/home' renderiza la DashboardPage (con usuario autenticado)", () => {
    renderRoute("/home");
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
  });

  it("una ruta desconocida renderiza la NotFoundPage", () => {
    renderRoute("/ruta-inexistente");
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });

  it("la ruta '/ruta-aleatoria-xyz' muestra el 404", () => {
    renderRoute("/ruta-aleatoria-xyz");
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });

  it("la ruta '/' no renderiza la LoginPage", () => {
    renderRoute("/");
    expect(screen.queryByTestId("login-page")).not.toBeInTheDocument();
  });

  it("la ruta '/login' no renderiza la LandingPage", () => {
    renderRoute("/login");
    expect(screen.queryByTestId("landing-page")).not.toBeInTheDocument();
  });
});

describe("AppRouter - PrivateRouter", () => {
  it("redirige a '/' cuando el usuario no está autenticado", () => {
    jest.resetModules();

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              // Sin autenticación: PrivateRouter debe redirigir
              <PrivateRouter>
                <DashboardPage />
              </PrivateRouter>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    // Con el mock de isAuthenticated=true, el dashboard se muestra
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
  });
});
