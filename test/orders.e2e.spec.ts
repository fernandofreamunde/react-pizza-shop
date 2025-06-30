import { test, expect } from "@playwright/test";

test("list orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "order-10", exact: true }),
  ).toBeVisible();
});

test("navigate paginated orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  // next page
  await page.getByRole("button", { name: "Next Page" }).click();

  await expect(
    page.getByRole("cell", { name: "order-11", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-20", exact: true }),
  ).toBeVisible();

  // last page
  await page.getByRole("button", { name: "Last Page" }).click();

  await expect(
    page.getByRole("cell", { name: "order-51", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-60", exact: true }),
  ).toBeVisible();

  // previous page
  await page.getByRole("button", { name: "Previous Page" }).click();

  await expect(
    page.getByRole("cell", { name: "order-41", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-50", exact: true }),
  ).toBeVisible();

  // first page
  await page.getByRole("button", { name: "First Page" }).click();

  await expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-10", exact: true }),
  ).toBeVisible();
});

test("filter orders by id", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("textbox", { name: "Order Id" }).fill("order-1");
  await page.getByRole("button", { name: "Filter Results" }).click();

  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-5", exact: true }),
  ).toBeHidden();
});

test("filter orders by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("textbox", { name: "Customer Name" }).fill("Customer-1");
  await page.getByRole("button", { name: "Filter Results" }).click();

  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-5", exact: true }),
  ).toBeHidden();
});

test("filter orders by status pending", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Pending" }).click();
  await page.getByRole("button", { name: "Filter Results" }).click();

  await page.waitForTimeout(500);

  const tableRows = await page.getByRole("cell", { name: "Pending" }).all();
  await expect(tableRows).toHaveLength(10);
});

test("filter orders by status delivering", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Delivering" }).click();
  await page.getByRole("button", { name: "Filter Results" }).click();

  await page.waitForTimeout(500);

  const tableRows = await page.getByRole("cell", { name: "In Delivery" }).all();
  await expect(tableRows).toHaveLength(10);
});

test("filter orders by status delivered", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Delivered" }).click();
  await page.getByRole("button", { name: "Filter Results" }).click();

  await page.waitForTimeout(500);

  const tableRows = await page.getByRole("cell", { name: "Delivered" }).all();
  await expect(tableRows).toHaveLength(10);
});

test("filter orders by status processing", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Processing" }).click();
  await page.getByRole("button", { name: "Filter Results" }).click();

  await page.waitForTimeout(500);

  const tableRows = await page.getByRole("cell", { name: "Processing" }).all();
  await expect(tableRows).toHaveLength(10);
});

test("filter orders by status canceled", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Canceled" }).click();
  await page.getByRole("button", { name: "Filter Results" }).click();

  await page.waitForTimeout(500);

  const tableRows = await page.getByRole("cell", { name: "Canceled" }).all();
  await expect(tableRows).toHaveLength(10);
});
