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

test("Test POST Api with Token and Booking ID", async ({ request }) => {
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
