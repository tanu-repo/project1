// playwright.config.js
const { defineConfig } = require('@playwright/test');
const dotenv = require('dotenv');

// Load environment file BEFORE config
const env = process.env.TEST_ENV || 'stage';

dotenv.config({
  path: `config/env/${env}.env`
});

module.exports = defineConfig({
  reporter: [['html', { open: 'never' }]],
  timeout: 180 * 1000, // 3 minutes per test
  use: {
    baseURL: process.env.BASE_URL,

    headless: false
  }
});

