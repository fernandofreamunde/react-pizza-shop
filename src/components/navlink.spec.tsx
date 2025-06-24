import { render } from "@testing-library/react";
import { Navlink } from "./navlink";
import { MemoryRouter } from "react-router";

describe("Component Navlink", () => {
  it("should highlight the navlink when it is the current page", () => {
    const component = render(
      <>
        <Navlink to="/">Home</Navlink>
        <Navlink to="/about">About</Navlink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    expect(component.getByText("About").dataset.current).toEqual("true");
    expect(component.getByText("Home").dataset.current).toEqual("false");
  });
});
