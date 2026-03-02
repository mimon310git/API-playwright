# API Playwright

API automation practice project built with Playwright and JavaScript.

The project is focused on learning API testing basics on multiple public APIs with Playwright, including CRUD requests, response validation, negative scenarios, and basic auth-related checks.

## Tech stack

- Playwright
- JavaScript
- Node.js

## Additional tools

- EchoAPI for manual API exploration and request validation before automating tests in Playwright

## Project structure

```text
API-Playwright/
  .env
  data/
    booking.json
  tests/
    reqres/
      auth-negative.spec.js
      users-delete.spec.js
      users-get.spec.js
      users-post.spec.js
      users-put.spec.js
      users-single-get.spec.js
    restfull-booker/
      bookJSON.spec.js
      delete-booking.spec.js
      get-api.spec.js
      monitorAPI.spec.js
      post-booking.spec.js
      post-create-booking.spec.js
      put-booking.spec.js
```

## Covered scenarios

### Restfull Booker

- `GET` API validation
- `POST` create booking
- `PUT` update booking
- `DELETE` booking
- create booking from external JSON data
- simple `/ping` monitor check
- token-based authenticated requests

### ReqRes

- `GET /api/users` paginated users
- `GET /api/users/2` single user
- `GET` non-existent user returns `404`
- `POST /api/users`
- `PUT /api/users/2`
- `DELETE /api/users/2`
- negative login with missing password

## Installation

```bash
npm install
```

For ReqRes tests, add your API key to `.env`:

```env
REQRES_API_KEY=your_api_key_here
```

## Run tests

Run all tests:

```bash
npx playwright test
```

Run only `restfull-booker` tests:

```bash
npx playwright test tests/restfull-booker
```

Run only `reqres` tests:

```bash
npx playwright test --project=reqres
```

Run a single spec file:

```bash
npx playwright test tests/restfull-booker/delete-booking.spec.js
```

## Report

Open the Playwright HTML report after a run:

```bash
npx playwright show-report
```

## Purpose

- learning Playwright API testing from basics
- practicing CRUD operations and assertions
- comparing multiple public APIs in one project
- building a small API automation portfolio project
