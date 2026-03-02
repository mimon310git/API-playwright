import { test, expect } from "@playwright/test";

test("Test DELETE Api with token and booking ID", async ({ request }) => {
  const authdata = {
    username: "admin",
    password: "password123",
  };
  const authResponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      headers: { "Content-Type": "application/json" },
      data: authdata,
    },
  );

  expect(authResponse.ok()).toBeTruthy();
  const { token } = await authResponse.json();

  const createResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      headers: { "Content-Type": "application/json" },
      data: {
        firstname: "Mira",
        lastname: "Freaul",
        totalprice: 269,
        depositpaid: true,
        bookingdates: {
          checkin: "2019-02-11",
          checkout: "2019-07-04",
        },
        additionalneeds: "Breakfast",
      },
    },
  );

  expect(createResponse.ok()).toBeTruthy();
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  const deleteResponse = await request.delete(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    },
  );

  console.log(deleteResponse.status());
  console.log(deleteResponse.statusText());
  expect(deleteResponse.status()).toBe(201);

  const getResponse = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  console.log(getResponse.status());
  expect(getResponse.status()).toBe(404);
});
