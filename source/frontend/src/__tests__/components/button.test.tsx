import { Button } from "@/components/ui/button";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("renders the button", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
