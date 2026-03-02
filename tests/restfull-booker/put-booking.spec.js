import { test, expect } from "@playwright/test";

test("Test PUT Api with Token and Booking ID", async ({ request }) => {
  const authdata = {
    username: "admin",
    password: "password123",
  };

  const response = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    { headers: { "Content-Type": "application/json" }, data: authdata },
  );
  const responseBody = await response.json();
  const token = responseBody.token;
  console.log("token:", token);

  const bookingData = {
    firstname: "Michael",
    lastname: "Newar",
    totalprice: 171,
    depositpaid: true,
    bookingdates: {
      checkin: "2017-06-02",
      checkout: "2019-08-05",
    },
    additionalneeds: "Breakfast",
  };

  const newResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      headers: { "Content-Type": "application/json" },
      data: bookingData,
    },
  );
  const newResponsejson = await newResponse.json();
  const bookingId = newResponsejson.bookingid;
  console.log("bookingId:", bookingId);

  const updatebookingData = {
    firstname: "Annie",
    lastname: "Leun",
    totalprice: 179,
    depositpaid: true,
    bookingdates: {
      checkin: "2016-02-11",
      checkout: "2017-07-04",
    },
    additionalneeds: "Breakfast",
  };

  const updatedResponse = await request.put(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: { "Content-Type": "application/json", Cookie: `token=${token}` },
      data: updatebookingData,
    },
  );

  const updatedResponseBody = await updatedResponse.json();
  console.log(updatedResponseBody);
  expect(updatedResponse.status()).toBe(200);
  expect(updatedResponseBody).toHaveProperty("firstname", "Annie");
  expect(updatedResponseBody).toHaveProperty("lastname", "Leun");
  expect(updatedResponseBody).toHaveProperty("totalprice", 179);
});
