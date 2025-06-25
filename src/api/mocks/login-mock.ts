import { http, HttpResponse } from "msw";
import type { LoginBody } from "../login";

export const loginMock = http.post<never, LoginBody>(
  "/authenticate",
  async ({ request }) => {
    const { email } = await request.json();

    if (email === "johndoe@example.com") {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Set-Cookie": "auth=sample-jwt-token",
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  },
);
