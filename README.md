<div align="center">

# 🎭 SauceDemo End-to-End Test Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-v1.49+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Allure](https://img.shields.io/badge/Allure_Report-3.14+-FF9900?style=for-the-badge&logo=qameta&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

An enterprise-grade, end-to-end web test automation suite for [SauceDemo](https://www.saucedemo.com/) built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern. Featuring **Custom Fixtures**, **Data-Driven CSV Testing**, **Environment Configuration**, and interactive **Allure Reports**.

</div>

---

## 🚀 Key Features

- **Page Object Model (POM):** Clean separation between page interaction logic and test assertions.
- **Custom Fixtures & Dependency Injection:** Pre-configured fixtures in `fixtures/baseFixture.ts` inject instantiated Page Objects, typed environment configs, and pre-authenticated sessions (`authenticatedProductsPage`).
- **Data-Driven Testing (CSV & Parameterized):** Automated scenario iteration powered by `csv-parse` reading external test datasets (`test_data/loginData.csv`).
- **Parallel Test Execution:** Configured with `fullyParallel: true` for multi-worker concurrency across CPU cores.
- **Comprehensive Allure Reporting:** 
  - Real-time collapsible step breakdowns via `test.step()`.
  - Dynamic environment metadata widget (OS detection like *Windows 11*, TypeScript version, Playwright version, Browser, and `.env` metadata).
  - Screenshots and videos automatically retained on failure.
- **Environment Driven:** Centralized configuration through `.env` with strict TypeScript typing via `utils/environment.ts`.
- **Test Tagging:** Granular test suite execution with `@smoke`, `@regression`, `@datadriven`, `@csv`, and domain-specific tags.

---

## 📋 Test Coverage Matrix

| Feature Domain | Scenarios Covered | Tags |
|---|---|---|
| **Authentication** | Valid login, locked-out user, invalid credentials, empty field validations | `@smoke`, `@regression`, `@login` |
| **Product Catalog** | Product rendering, images, Name (A to Z) sorting, Price (low to high) sorting, Product details view | `@smoke`, `@regression`, `@products` |
| **Shopping Cart** | Add to cart, Remove button toggle, badge count update, cart persistence, multi-item verification | `@smoke`, `@regression`, `@cart` |
| **Checkout Flow** | Step 1 input visibility, missing field error validation, tax & price overview, order completion | `@smoke`, `@regression`, `@checkout` |
| **Sidebar Menu** | Menu open/close animations, option links, logout session invalidation | `@smoke`, `@regression`, `@menu` |
| **Data-Driven (CSV)** | Multi-user parameterization driven by external `test_data/loginData.csv` | `@datadriven`, `@regression`, `@csv` |

---

## 📁 Project Structure

```text
SauceDemo/
├── .env.example                  # Environment configuration template
├── package.json                  # Dependencies & test execution scripts
├── playwright.config.ts          # Playwright test configuration & Allure setup
├── fixtures/
│   └── baseFixture.ts            # Custom fixtures & dependency injection
├── pages/                        # Page Object Model classes
│   ├── LoginPage.ts              # Authentication elements & methods
│   ├── ProductsPage.ts           # Product catalog, sorting, and cart actions
│   ├── ProductDetailsPage.ts     # Individual product detail view
│   ├── CartPage.ts               # Shopping cart item verification & actions
│   ├── CheckoutStepOnePage.ts    # Customer info form & validation
│   ├── CheckoutStepTwoPage.ts    # Order overview, pricing, and tax calculation
│   ├── CheckoutCompletePage.ts   # Order confirmation & status
│   └── SidebarMenu.ts            # Navigation menu & logout flow
├── test_data/
│   └── loginData.csv             # External CSV dataset for data-driven testing
├── tests/                        # Test specifications (tagged & structured)
│   ├── login.spec.ts             # Authentication tests
│   ├── products.spec.ts          # Catalog, sorting, and detail tests
│   ├── cart.spec.ts              # Cart item management & badge counter tests
│   ├── checkout.spec.ts          # Complete checkout flow & form validation
│   ├── menu.spec.ts              # Sidebar navigation & logout tests
│   ├── loginCsvDataDriven.spec.ts# CSV-driven login tests (csv-parse)
│   └── loginDataDriven.spec.ts   # In-memory parameterized login tests
└── utils/
    └── environment.ts            # Strongly-typed environment configuration
```

---

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Madhan369/playwright-e2e-automation-framework.git
cd playwright-e2e-automation-framework
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install --with-deps
```

### 4. Setup Environment Variables
Create your `.env` file from the provided template:
```bash
cp .env.example .env
```

Ensure your `.env` contains:
```dotenv
# Application Base URL
BASE_URL=https://www.saucedemo.com/

# Test Run & Environment Metadata
ENVIRONMENT=UAT
EXECUTED_BY=Local Automation Engineer

# Test User Credentials
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_OUT_USER=locked_out_user
INVALID_USER=invalid_user
INVALID_PASSWORD=wrong_password

# Customer Checkout Test Data
CHECKOUT_FIRST_NAME=Test
CHECKOUT_LAST_NAME=User
CHECKOUT_POSTAL_CODE=600001

# Product Test Data
PRODUCT_BACKPACK=Sauce Labs Backpack
PRODUCT_BIKE_LIGHT=Sauce Labs Bike Light
```

---

## 🧪 Running Tests

### Execute by Suite / Tags
```bash
# Run all tests headlessly in parallel
npm test

# Run critical Smoke tests (@smoke)
npm run test:smoke

# Run full Regression test suite (@regression)
npm run test:regression

# Run Data-Driven test suite (@datadriven)
npm run test:datadriven

# Run tests in headed browser mode
npm run test:headed

# Run tests in interactive Playwright UI Mode
npm run test:ui
```

---

## 📊 Allure Reporting

This framework includes automated Allure reporting with dynamic environment detection and step-by-step collapsible trace hierarchy.

```bash
# Run all tests, generate Allure report, and open preview server:
npm run test:allure

# Generate static HTML report from existing results:
npm run allure:generate

# Open the generated Allure report:
npm run allure:open

# Live preview results on-the-fly:
npm run allure:serve
```

### Allure Environment Widget
The generated report automatically detects and displays:
- **Operating System:** Build-aware friendly OS string (e.g. `Windows 11`)
- **Browser:** `Chromium (Desktop Chrome)`
- **Environment:** Defined dynamically via `.env` (e.g. `UAT`)
- **Executed By:** Test runner identity from `.env`
- **TypeScript Version:** Installed TypeScript compiler version (`5.7.x`)
- **Playwright Version:** Engine release version
- **Application URL:** Target base URL from `.env`

---

## 🏷️ Test Tagging Strategy

| Tag | Purpose | Trigger |
|---|---|---|
| `@smoke` | Fast sanity verification of critical business paths | PR pre-merge check |
| `@regression` | End-to-end workflow verification, sorting, negative cases | Nightly / Release gate |
| `@datadriven` | Multiple input iterations per scenario (arrays & CSVs) | Data verification cycle |
| `@csv` | External CSV data-driven scenarios | CSV dataset validation |
| `@login` / `@cart` / `@checkout` / `@products` / `@menu` | Functional domain isolation | Feature-specific debugging |

---

## 🛡️ Best Practices & Design Principles

- **Resilient Locators:** Strict prioritization of official SauceDemo `[data-test="..."]` attributes over fragile CSS or XPath chains.
- **Zero Arbitrary Waits:** No hardcoded `page.waitForTimeout()`; relies 100% on Playwright's built-in auto-waiting and web-first assertions.
- **Context Isolation:** Each test executes inside an independent `BrowserContext`, ensuring zero cross-test state leakage.
- **Strong Type Safety:** 100% TypeScript with strict typing across Page Objects, custom fixtures, and environment variables.
- **Separation of Concerns:** Page Objects encapsulate page locators and interaction methods only, keeping test assertions strictly within test specs.

---

## 👨‍💻 Author

Made by [Madhan](https://madhanqa.vercel.app/)

