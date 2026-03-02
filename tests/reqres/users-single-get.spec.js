import { test, expect } from "@playwright/test";

test("GET /api/users/2 returns a single user", async ({ request }) => {
  const response = await request.get("/api/users/2");
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data).toBeTruthy();
  expect(body.data.id).toBe(2);
  expect(body.data.email).toBeTruthy();
  expect(body.data.first_name).toBeTruthy();
  expect(body.data.last_name).toBeTruthy();
});
