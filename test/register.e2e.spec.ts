import { test, expect } from "@playwright/test";

test("can navigate to registration form", async ({ page }) => {
  await page.goto("/register", { waitUntil: "networkidle" });

  expect(page.url()).toContain("/register");
});

test("register restaurant successfully", async ({ page }) => {
  await page.goto("/register", { waitUntil: "networkidle" });

  await page.locator("#restaurantName").fill("Pizza Shop");
  await page.getByRole("textbox", { name: "Your Name" }).fill("John Doe");
  await page
    .getByRole("textbox", { name: "Your Phonenumber" })
    .fill("912245678");
  await page
    .getByRole("textbox", { name: "Your e-mail" })
    .fill("johndoe@example.com");

  await page.getByRole("button", { name: "Finish Registration" }).click();

  const toast = page.getByText("Restaurant successfully registred. 🎉");

  await expect(toast).toBeVisible();

  // await page.waitForTimeout(500);
});

test("error registering restaurant", async ({ page }) => {
  await page.goto("/register", { waitUntil: "networkidle" });

  await page.locator("#restaurantName").fill("Not Pizza Shop");
  await page.getByRole("textbox", { name: "Your Name" }).fill("John Doe");
  await page
    .getByRole("textbox", { name: "Your Phonenumber" })
    .fill("912245678");
  await page
    .getByRole("textbox", { name: "Your e-mail" })
    .fill("johndoe@example.com");

  await page.getByRole("button", { name: "Finish Registration" }).click();

  const toast = page.getByText("Error registering your restaurant.");

  await expect(toast).toBeVisible();

  // await page.waitForTimeout(500);
});
