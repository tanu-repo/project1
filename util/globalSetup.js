import dotenv from 'dotenv';
import path from 'path';

/**
 * Playwright globalSetup — runs once in the main process before any workers start.
 * Loading dotenv here ensures all env vars from config/env/<TEST_ENV>.env are
 * available in every worker process (page objects, tests, beforeEach hooks, etc.).
 *
 * Uses process.cwd() so the path resolves correctly regardless of where
 * the `npx playwright test` command is invoked from.
 */
export default async function globalSetup() {
    const env = process.env.TEST_ENV || 'stage';
    const envPath = path.resolve(process.cwd(), `config/env/${env}.env`);
    dotenv.config({ path: envPath });
    console.log(`[globalSetup] Loaded env from: ${envPath}`);
    console.log(`[globalSetup] BASE_URL = ${process.env.BASE_URL}`);
    console.log(`[globalSetup] E2E_STAGING_TESTING_EMAIL = ${process.env.E2E_STAGING_TESTING_EMAIL}`);
}
