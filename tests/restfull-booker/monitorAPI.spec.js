import { test, expect } from "@playwright/test";

test("Checking the monitor API", async ({ request }) => {
  //default timeout is 30 seconds
  // test.setTimeout(60000); // Set timeout to 60 seconds
  while (true) {
    const startTime = Date.now();

    const response = await request.get(
      "https://restful-booker.herokuapp.com/ping",
    );
    const endTime = Date.now();
    const duration = endTime - startTime;

    if (duration > 600) {
      throw new Error(`Response is slow : ${duration} ms`);
    } else {
      console.log(`Response time: ${duration} ms`);
    }

    const status = response.status();
    console.log(`Response status: ${status}`);
    expect(status).toBe(201);
  }
});
