import { test, expect } from "@playwright/test";

test("Test GET Api", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  const responseBody = await response.json();

  // console.log(responseBody);

  const responseheaders = response.headers();
  // console.log(responseheaders);

  const responseStatus = response.status();
  // console.log(responseStatus);

  const responseStatusText = response.statusText();
  console.log(responseStatusText);

  expect(responseStatus).toBe(200);
  expect(responseStatusText).toBe("OK");
  expect(response.ok()).toBeTruthy();
  expect(responseBody).toHaveProperty("id", 1);
  expect(responseBody).toHaveProperty(
    "title",
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  );
});
