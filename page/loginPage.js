export class LoginPage {
    constructor(page) {
        this.page = page;
    }
    async navigateToLogin() {
        const loginPath = process.env.LOGIN_PATH;

        // Combine baseURL + path
        await this.page.goto(`${process.env.BASE_URL_STAGING}${process.env.LOGIN_PATH_STAGING}`);
    }

    async login(email, password, expectSuccess = true) {
        // Accept cookies if the prompt appears
        await this.page.getByRole('button', { name: 'Accept' }).click();
        await this.page.locator('#email').fill(email);
        await this.page.locator('#password').fill(password);
        await this.page.getByRole('button', { name: 'Submit' }).click();

        if (expectSuccess) {
            // Positive test: wait for Home link to appear
            const homeLink = this.page.getByRole('link', { name: 'Home' });
            await homeLink.waitFor({ state: 'visible', timeout: 10000 })
            return true;
        } else {
            // Negative test scenario: wait for toast error
            const toast = this.page.locator('div.toast.--visible', {
                hasText: 'The username/password combination is invalid.'
            });
            await toast.waitFor({ state: 'visible', timeout: 5000 });
            return await toast.textContent();
        }
    }

    async loginToApplication(expectSuccess = true) {
        await this.navigateToLogin();
        return await this.login(process.env.E2E_STAGING_TESTING_EMAIL, process.env.E2E_STAGING_TESTING_PASSWORD, expectSuccess);
    }

    async logoutFromApplication(expectSuccess = true) {
        await this.page.getByRole('button', { name: 'Sign out' }).click();

    }

    async createNewUser(email, password) {
        await page.getByRole('button', { name: 'Accept' }).click();
        await page.getByRole('link', { name: 'Join' }).click();
        await page.getByText('Legal First Name Why do we').click();
        await page.getByRole('textbox', { name: 'Legal First Name' }).fill(legalFirstName);
        await page.getByRole('textbox', { name: 'Legal First Name' }).press('Tab');
        await page.getByRole('textbox', { name: 'Legal Last Name' }).fill(legalLastName);
        await page.getByRole('textbox', { name: 'Legal Last Name' }).press('Tab');
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.getByRole('textbox', { name: 'Phone Number' }).click();
        await page.getByRole('textbox', { name: 'Phone Number' }).fill(phoneNumber);
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(password);

    }
}



