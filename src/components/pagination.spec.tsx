import { render } from "@testing-library/react";
import { Pagination } from "./pagination";
import { userEvent } from "@testing-library/user-event";

const onPageChangeCallback = vi.fn();

describe("Pagination Component", () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it("should display the correct amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(wrapper.getByText("Page 1 of 20")).toBeInTheDocument();
    expect(wrapper.getByText("200 item(s) in total.")).toBeInTheDocument();
  });

  it("should calculate the correct amount of pages", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={201}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(wrapper.getByText("Page 1 of 21")).toBeInTheDocument();
  });

  it("should be able to navigate to the next page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Next Page",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);
    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it("should be able to navigate to the previous page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Previous Page",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);
    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it("should be able to navigate to the last page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Last Page",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);
    // reminder that this is the page index
    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });

  it("should be able to navigate to the first page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={100}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "First Page",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);
    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });
});
