import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { HomePage } from '../page/homePage';
import { SelectPlan } from '../page/selectPlanPage';
import { ScheduleScanPage } from '../page/scheduleScanPage';


test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        const result = await login.loginToApplication(true);
        expect(result).toBe(true);
        console.log('Login successful, Home link is visible');

    });

    test('validate user can schedule a MRI scan', async ({ page }) => {
        test.setTimeout(60000);
        const homePage = new HomePage(page);
        const selectPlanPage = new SelectPlan(page);
        const scheduleScanPage = new ScheduleScanPage(page);
        // await homePage.selectTimeZone();
        await homePage.startBookingProcess();
        // await selectPlanPage.addDOB('12-01-1991');
        // await selectPlanPage.addGender('Female');
        await selectPlanPage.selectMRIScan();
        await selectPlanPage.clickContinue();
        await scheduleScanPage.selectState(page, 'California');
        console.log('California selected successfully!');
        await scheduleScanPage.selectIrvineLocation(page, 'North Irvine');
        console.log('Irvine location selected successfully!');
        await scheduleScanPage.selectActiveDate(page, 29, 4);
        console.log('Date selected successfully!');
        await scheduleScanPage.addCard(page);
        console.log('Card details added successfully!');
        await selectPlanPage.clickContinue();



        await expect(page.getByRole('button', { name: 'Begin Medical Questionnaire' })).toBeVisible({ timeout: 10000 });



    });

});