import { test, expect } from "@playwright/test";

test("Test POST API create booking", async ({ request }) => {
  const authdata = {
    firstname: "John",
    lastname: "Blee",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2012-04-01",
      checkout: "2018-01-05",
    },
    additionalneeds: "Breakfast",
  };
  const response = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    { headers: { "Content-Type": "application/json" }, data: authdata },
  );
  console.log(response.status());
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.token).not.toBeNull();
  expect(responseBody.bookingid).not.toBeNull();
});
