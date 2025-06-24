import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Login } from "./login";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

describe("Page Login", () => {
  it("should set default email input value if email is passed as search param", () => {
    const component = render(<Login />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <MemoryRouter
                initialEntries={["/login?email=fulanotal@example.com"]}
              >
                {children}
              </MemoryRouter>
            </QueryClientProvider>
          </HelmetProvider>
        );
      },
    });
    //  to dump the rendered code, probably only as it is mounted
    // component.debug();
    const emailInput = component.getByLabelText(
      "Your e-mail",
    ) as HTMLInputElement;
    expect(emailInput.value).toEqual("fulanotal@example.com");
  });
});
