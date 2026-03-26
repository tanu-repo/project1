import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const env = process.env.TEST_ENV || 'stage';

dotenv.config({
  path: `config/env/${env}.env`
});

export default defineConfig({
  reporter: [['html', { open: 'never' }]],
  timeout: 180 * 1000,
  use: {
    baseURL: process.env.BASE_URL,
    headless: false
  }
});
