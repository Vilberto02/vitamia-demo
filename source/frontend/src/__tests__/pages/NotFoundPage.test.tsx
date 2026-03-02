import { render, screen } from "@testing-library/react";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { MemoryRouter } from "react-router-dom";

jest.mock("@/assets/name-bg-vitamia.svg", () => "mock-vitamia-name");

const renderNotFoundPage = () =>
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>,
  );

describe("NotFoundPage", () => {
  it("renderiza el componente sin errores", () => {
    const { container } = renderNotFoundPage();
    expect(container).toBeInTheDocument();
  });

  it("muestra el código de error '404'", () => {
    renderNotFoundPage();
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("muestra el mensaje descriptivo del error", () => {
    renderNotFoundPage();
    expect(
      screen.getByText("Lo sentimos, la página que buscas no se encuentra."),
    ).toBeInTheDocument();
  });

  it("renderiza el enlace 'Regresar'", () => {
    renderNotFoundPage();
    expect(screen.getByRole("link", { name: /Regresar/i })).toBeInTheDocument();
  });

  it("el enlace 'Regresar' apunta a la ruta '/'", () => {
    renderNotFoundPage();
    const link = screen.getByRole("link", { name: /Regresar/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renderiza la imagen decorativa de Vitamia", () => {
    renderNotFoundPage();
    const img = screen.getByAltText("Nombre de Vitamia");
    expect(img).toBeInTheDocument();
  });

  it("el texto '404' tiene estilo prominente (text-9xl)", () => {
    renderNotFoundPage();
    const errorCode = screen.getByText("404");
    expect(errorCode).toHaveClass("text-9xl");
    expect(errorCode).toHaveClass("font-bold");
  });
});
