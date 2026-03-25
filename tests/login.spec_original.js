import { test, expect } from '@playwright/test';
import { Login } from '../page/loginPage';
import { Utils } from '../util/utils';
test.describe('Login Tests', () => {

    test.skip('Positive login test', async ({ page }) => {
        const login = new Login(page);
        const result = await login.loginToApplication(true);
        expect(result).toBe(true);
        console.log('Login successful, Home link is visible');
        await login.logoutFromApplication(true);
    });

    test.skip('Negative login test - invalid credentials', async ({ page }) => {
        const login = new Login(page);

        // Using invalid credentials
        const errorMessage = await login.login('wrong@email.com', 'wrongpass', false);

        expect(errorMessage.trim()).toBe('The username/password combination is invalid.');
        console.log('Negative login verified:', errorMessage);
    });
    test.skip('Create new user test', async ({ page }) => {
        const login = new Login(page);
        const utils = new Utils(page);
        const email = await utils.generateRobustEmail();
        const password = process.env.RANDOM_NEWUSER_PASSWORD;
        await login.navigateToLogin();
        await login.createNewUser(email, password);
    });


});