import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';

// Use the pre-saved storage state to skip UI login for these tests.
test.use({ storageState: 'auth/storageState.json' });
import { HomePage } from '../page/homePage';
import { SelectPlan } from '../page/selectPlanPage';
import { ScheduleScanPage } from '../page/scheduleScanPage';


test.describe('Booking Tests', () => {

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.acceptCookiesIfPresent();

        await login.navigateToLogin();
        // perform credentials-based login
        await login.login(process.env.E2E_STAGING_TESTING_EMAIL, process.env.E2E_STAGING_TESTING_PASSWORD, true);
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
        await scheduleScanPage.selectActiveDate(10, 4);
        console.log('Date selected successfully!');
        await scheduleScanPage.addCard(page);
        console.log('Card details added successfully!');
        await selectPlanPage.clickContinue();
        await expect(page.getByRole('button', { name: 'Begin Medical Questionnaire' })).toBeVisible({ timeout: 10000 });



    });

});