import { test, expect } from "@playwright/test";

test("fail to update profile info", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Shop Profile" }).click();

  await page.getByRole("textbox", { name: "Name" }).fill("Not Rocket Pizza");
  await page
    .getByRole("textbox", { name: "Description" })
    .fill("Something else");

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText(
    "Profile failed to update! Please try again. ⚠️",
  );

  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  await page
    .getByRole("dialog", { name: "Shop Profile" })
    .waitFor({ state: "hidden" });

  await expect(page.getByRole("button", { name: "Pizza Shop" })).toBeVisible();

  // await page.waitForTimeout(500);
});

test("successfuly update profile info", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Shop Profile" }).click();

  await page.getByRole("textbox", { name: "Name" }).fill("Rocket Pizza");
  await page
    .getByRole("textbox", { name: "Description" })
    .fill("Something else");

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Profile updated successfuly! ✅");

  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  await page
    .getByRole("dialog", { name: "Shop Profile" })
    .waitFor({ state: "hidden" });

  await expect(
    page.getByRole("button", { name: "Rocket Pizza" }),
  ).toBeVisible();

  //await page.waitForTimeout(500);
});
