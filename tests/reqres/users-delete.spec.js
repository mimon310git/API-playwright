import { test, expect } from "@playwright/test";

test("DELETE /api/users removes a user", async ({ request }) => {
  const response = await request.delete("/api/users/2");
  expect(response.status()).toBe(204);
});
