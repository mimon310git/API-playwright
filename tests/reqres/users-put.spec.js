import { test, expect } from "@playwright/test";

test("PUT /api/users updates a user", async ({ request }) => {
  const response = await request.put("/api/users/2", {
    data: {
      name: "Jane Updated",
      job: "Senior QA Engineer",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe("Jane Updated");
  expect(body.job).toBe("Senior QA Engineer");
  expect(body.updatedAt).toBeTruthy();
});
