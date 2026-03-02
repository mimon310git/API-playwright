import { test, expect } from "@playwright/test";

test("GET /api/users returns paginated users", async ({ request }) => {
  const response = await request.get("/api/users?page=2");
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.page).toBe(2);
});

test("GET non-existent user returns 404", async ({ request }) => {
  const response = await request.get("/api/users/999999");
  expect(response.status()).toBe(404);
});
