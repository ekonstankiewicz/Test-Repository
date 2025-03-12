# Playwright JS Tests for the GAD

This repository contains end-to-end (E2E) tests for the **GAD** test application, developed by the team **jaktestowac.pl**. The tests are written using **Playwright JS** to ensure the application's stability and functionality.

## 🚀 Getting Started

### 1. Install Dependencies
Ensure you have **Node.js** installed. Then, install dependencies by running:
```sh
yarn install  # or npm install
```

### 2. Run Tests
To execute all tests in **headless mode**:
```sh
yarn playwright test  # or npx playwright test
```

To run tests in **headed mode** (with browser UI):
```sh
yarn playwright test --headed
```

To run a **specific test file**:
```sh
yarn playwright test tests/example.spec.ts
```

### 3. View Test Report
After running tests, generate and open an interactive report:
```sh
yarn playwright show-report
```

## 🛠️ Useful Playwright Commands

- **Run tests in parallel**:
  ```sh
  yarn playwright test --workers=4
  ```
- **Run tests on a specific browser**:
  ```sh
  yarn playwright test --browser=chromium  # Options: chromium, firefox, webkit
  ```
- **Run tests with debugging enabled**:
  ```sh
  yarn playwright test --debug
  ```
- **Record new test scenarios**:
  ```sh
  yarn playwright codegen http://localhost:3000
  ```
```

## 📌 Notes
- Ensure the GAD application is running before executing tests. REPO: https://github.com/jaktestowac/gad-gui-api-demo
