import { test, expect } from "@playwright/test";

test("log in successfully", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });

  page
    .getByRole("textbox", { name: "Your e-mail" })
    .fill("johndoe@example.com");

  page.getByRole("button", { name: "Access Panel" }).click();

  const toast = page.getByText(
    "We have sent you a magic link 🪄 to your email.",
  );

  expect(toast).toBeVisible();

  await page.waitForTimeout(500);
});

test("log in with wrong credentials", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });

  page
    .getByRole("textbox", { name: "Your e-mail" })
    .fill("notjohndoe@example.com");

  page.getByRole("button", { name: "Access Panel" }).click();

  const toast = page.getByText("Invalid credentials");

  expect(toast).toBeVisible();

  await page.waitForTimeout(500);
});

test("can navigate to registration form", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Register" }).click();

  await page.waitForTimeout(500);

  expect(page.url()).toContain("/register");
});
