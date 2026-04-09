import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import path from 'path';

// This test saves an authenticated storage state to `auth/storageState.json`.
// Run once locally or in CI before running authenticated tests:
// npx playwright test tests/auth.saveStorageState.spec.js --project=chromium

test('save storage state after login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigateToLogin();
  await login.login(process.env.E2E_STAGING_TESTING_EMAIL, process.env.E2E_STAGING_TESTING_PASSWORD, true);

  // Dismiss cookie consent if present (blocks interaction if left open)
  await login.acceptCookiesIfPresent();

  // Confirm we are on the authenticated home page before saving state
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 10000 });

  // Persist auth state using an absolute path so it resolves correctly in all contexts
  const storagePath = path.resolve(process.cwd(), 'auth/storageState.json');
  await page.context().storageState({ path: storagePath });
  console.log(`[auth] Storage state saved to: ${storagePath}`);
});
