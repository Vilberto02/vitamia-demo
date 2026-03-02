import { LandingPage } from "@/pages/LandingPage";
import { render, screen } from "@testing-library/react";

jest.mock("@/assets/name-bg-vitamia.svg", () => "mock-logo");

describe("LandingPage", () => {
  it("Debería de renderizar la página de presentación", async () => {
    render(<LandingPage></LandingPage>);

    expect(
      screen.getByRole("heading", {
        name: /Tu nutrición, nuestro compromiso/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Comenzar ahora/i }),
    ).toBeInTheDocument();
  });
});
