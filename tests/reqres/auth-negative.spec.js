import { test, expect } from "@playwright/test";

test("POST /api/login returns 400 for missing password", async ({
  request,
}) => {
  const response = await request.post("/api/login", {
    data: {
      email: "eve.holt@reqres.in",
    },
  });

  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.error).toBe("Missing password");
});
