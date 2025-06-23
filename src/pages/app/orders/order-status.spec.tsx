import { render } from "@testing-library/react";
import { OrderStatus } from "./order-status";

describe("Order Status Component", () => {
  it("should display the right text and badge color when order is pending", () => {
    const wrapper = render(<OrderStatus status="pending" />);

    const statusText = wrapper.getByText("Pending");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });

  it("should display the right text and badge color when order is canceled", () => {
    const wrapper = render(<OrderStatus status="canceled" />);

    const statusText = wrapper.getByText("Canceled");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-400");
  });

  it("should display the right text and badge color when order is delivering", () => {
    const wrapper = render(<OrderStatus status="delivering" />);

    const statusText = wrapper.getByText("In Delivery");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-400");
  });

  it("should display the right text and badge color when order is delivered", () => {
    const wrapper = render(<OrderStatus status="delivered" />);

    const statusText = wrapper.getByText("Delivered");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
});
