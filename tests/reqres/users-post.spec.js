import { test, expect } from "@playwright/test";

test("POST /api/users creates a user", async ({ request }) => {
  const response = await request.post("/api/users", {
    data: {
      name: "QA Engineer",
      job: "Automation Lead",
    },
  });
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.name).toBe("QA Engineer");
  expect(body.id).toBeTruthy();
});
