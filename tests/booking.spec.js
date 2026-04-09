import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { HomePage } from '../page/homePage';
import { SelectPlan } from '../page/selectPlanPage';
import { ScheduleScanPage } from '../page/scheduleScanPage';

// NOTE: This app uses HttpOnly session cookies which cannot be captured by
// storageState (they are invisible to JS/CDP). A full UI login is required
// per test context. Consider calling the login API directly in globalSetup
// if login speed becomes a bottleneck.

test.describe('Booking Tests', () => {

    // Allow 90s per test: ~5s login + ~60s booking flow + buffer
    test.describe.configure({ timeout: 90_000 });

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateToLogin();
        await login.acceptCookiesIfPresent();
        const result = await login.loginToApplication(true);
        expect(result).toBe(true);
    });

    test('validate user can schedule a MRI scan', async ({ page }) => {
        const homePage = new HomePage(page);
        const selectPlanPage = new SelectPlan(page);
        const scheduleScanPage = new ScheduleScanPage(page);
        // await homePage.selectTimeZone();
        await homePage.startBookingProcess();
        // await selectPlanPage.addDOB('12-01-1991');
        // await selectPlanPage.addGender('Female');
        await selectPlanPage.selectMRIScan();
        await selectPlanPage.clickContinue();
        await scheduleScanPage.selectState('California');
        console.log('California selected successfully!');
        await scheduleScanPage.selectIrvineLocation('North Irvine');
        console.log('Irvine location selected successfully!');
        // 20 days from April 7 2026 = April 27 → day=27, month=4
        await scheduleScanPage.selectActiveDate(27, 4);
        console.log('Date selected successfully!');
        await scheduleScanPage.addCard();
        console.log('Card details added successfully!');
        await selectPlanPage.clickContinue();
        await expect(page.getByRole('button', { name: 'Begin Medical Questionnaire' })).toBeVisible({ timeout: 10000 });



    });

});