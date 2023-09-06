import { render } from "@testing-library/react";
import LoginPageLeftSplit from "../ui/LoginPageLeftSplit";

describe("LoginPageLeftSplit", () => {
  it("should render the component with the correct title", () => {
    const { getByText } = render(<LoginPageLeftSplit />);

    expect(getByText("PLAYGROUND")).toBeInTheDocument();
  });

  it("should render the component with an image", () => {
    const { getByAltText } = render(<LoginPageLeftSplit />);

    expect(getByAltText("LoginImg")).toBeInTheDocument();
  });

});
