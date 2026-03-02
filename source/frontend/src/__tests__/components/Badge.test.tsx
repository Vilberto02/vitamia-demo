import { render } from "@testing-library/react";
import { Badge } from "../../components/Badge";

describe("Badge Component", () => {
  it("should render correctly with title and value", () => {
    const { getByText } = render(<Badge title="Proteína" value={20} />);
    expect(getByText("Proteína")).toBeTruthy();
    expect(getByText("20 g")).toBeTruthy();
  });
});
