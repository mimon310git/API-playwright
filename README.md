# API Playwright

API automation practice project built with Playwright and JavaScript.

The current focus is learning API testing basics on the `Restful Booker` service: request methods, response validation, token usage, and simple CRUD flows.

## Tech stack

- Playwright
- JavaScript
- Node.js

## Project structure

```text
API-Playwright/
  data/
    booking.json
  tests/
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

- `GET` API validation
- `POST` create booking
- `PUT` update booking
- `DELETE` booking
- create booking from external JSON data
- simple `/ping` monitor check
- token-based authenticated requests

## Installation

```bash
npm install
```

## Run tests

Run all tests:

```bash
npx playwright test
```

Run only the `restfull-booker` folder:

```bash
npx playwright test tests/restfull-booker
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
- building a small API automation portfolio project
