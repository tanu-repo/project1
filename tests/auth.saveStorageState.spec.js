import { test } from '@playwright/test';
import { LoginPage } from '../page/loginPage';

// This test saves an authenticated storage state to `auth/storageState.json`.
// Run once locally or in CI before running authenticated tests:
// npx playwright test tests/auth.saveStorageState.spec.js --project=chromium

test('save storage state after login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigateToLogin();
  // perform credentials-based login
  await login.login(process.env.E2E_STAGING_TESTING_EMAIL, process.env.E2E_STAGING_TESTING_PASSWORD, true);

  // Persist auth state for subsequent tests
  await page.context().storageState({ path: 'auth/storageState.json' });
});
