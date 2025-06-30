import { test, expect } from "@playwright/test";

test("display day order amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("25", { exact: true })).toBeVisible();
  expect(page.getByText("+10%than yesterday")).toBeVisible();
});

test("display total revenue metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("2505,00 €")).toBeVisible();
  expect(page.getByText("+25% than last month")).toBeVisible();
});

test("display month order amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("250", { exact: true })).toBeVisible();
  expect(page.getByText("-1% than last month")).toBeVisible();
});

test("display cancelations amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("2", { exact: true })).toBeVisible();
  expect(page.getByText("-1% than last month")).toBeVisible();
});
