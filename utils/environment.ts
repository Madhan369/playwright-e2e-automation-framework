import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env configuration
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
  environment: process.env.ENVIRONMENT || 'UAT',
  executedBy: process.env.EXECUTED_BY || 'Local Automation Engineer',
  users: {
    standard: {
      username: process.env.STANDARD_USER || 'standard_user',
      password: process.env.STANDARD_PASSWORD || 'secret_sauce',
    },
    lockedOut: {
      username: process.env.LOCKED_OUT_USER || 'locked_out_user',
      password: process.env.STANDARD_PASSWORD || 'secret_sauce',
    },
    invalid: {
      username: process.env.INVALID_USER || 'invalid_user',
      password: process.env.INVALID_PASSWORD || 'wrong_password',
    },
  },
  checkout: {
    firstName: process.env.CHECKOUT_FIRST_NAME || 'Test',
    lastName: process.env.CHECKOUT_LAST_NAME || 'User',
    postalCode: process.env.CHECKOUT_POSTAL_CODE || '600001',
  },
  products: {
    backpack: process.env.PRODUCT_BACKPACK || 'Sauce Labs Backpack',
    bikeLight: process.env.PRODUCT_BIKE_LIGHT || 'Sauce Labs Bike Light',
  },
};
