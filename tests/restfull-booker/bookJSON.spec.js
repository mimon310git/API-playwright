import { test, expect } from "@playwright/test";
import fs from "fs";

test("Test POST Api with JSON file", async ({ request }) => {
  const file = fs.readFileSync("data/booking.json");
  const booking = JSON.parse(file);
  const response = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    { headers: { "Content-Type": "application/json" }, data: booking },
  );
  console.log(response.status());
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.bookingid).not.toBeNull();
});
