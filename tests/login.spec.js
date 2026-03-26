import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { Utils } from '../util/utils';
test.describe('Login Tests', () => {

    test('login test', async ({ page }) => {
        const login = new LoginPage(page);
        await login.acceptCookiesIfPresent();
        const result = await login.loginToApplication(true);
        expect(result).toBe(true);
        console.log('Login successful, Home link is visible');
        
    });

    test('Negative login test - invalid credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.acceptCookiesIfPresent();
        await login.navigateToLogin();
        // Using invalid credentials
        const errorMessage = await login.login('wrong@email.com', 'wrongpass', false);

        expect(errorMessage.trim()).toBe('The username/password combination is invalid.');
        console.log('Negative login verified:', errorMessage);
    });
    test('Create new user test', async ({ page }) => {
        const login = new LoginPage(page);
        await login.acceptCookiesIfPresent();
        await login.navigateToLogin();
        await login.createNewUser();


    });


});