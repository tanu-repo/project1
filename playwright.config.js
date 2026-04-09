import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.TEST_ENV || 'stage';

// Load env in the config process (resolves baseURL etc. at config-parse time)
dotenv.config({ path: path.resolve(process.cwd(), `config/env/${env}.env`) });

export default defineConfig({
  testDir: './tests',
  // globalSetup re-loads the same .env inside every worker process so that
  // process.env vars are available in page objects, beforeEach hooks, etc.
  globalSetup: './util/globalSetup.js',
  outputDir: './test-results',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: process.env.BASE_URL,
    // Run headless in CI; locally preserve user's default (false by default unless CI is set)
    headless: !!process.env.CI,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
