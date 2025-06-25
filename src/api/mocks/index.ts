import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { loginMock } from "./login-mock";

export const worker = setupWorker(loginMock);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
}
