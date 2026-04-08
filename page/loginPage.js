import { generateRobustEmail, generateUSPhone, generateRandomName } from '../util/utils';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.joinInput = page.getByRole('link', { name: 'Join' });
        this.legalFirstNameInput = page.getByRole('textbox', { name: 'Legal First Name' });
        this.legalLastNameInput = page.getByRole('textbox', { name: 'Legal Last Name' });
        this.emailJoinInput = page.getByRole('textbox', { name: 'Email' });
        this.phoneJoinInput = page.getByRole('textbox', { name: 'Phone Number' });
        this.passwordJoinInput = page.getByRole('textbox', { name: 'Password' });
        this.ezraAgreementCheckbox = page.getByRole('button', { name: 'I agree to Ezra\'s terms of' });
        this.submitJoinButton = page.getByRole('button', { name: 'Submit' });
        this.signOutButton = page.getByRole('button', { name: 'Sign out' });
    }

    async createNewUser() {
        await this.joinInput.click();
        await this.legalFirstNameInput.fill(generateRandomName());
        await this.legalLastNameInput.fill(generateRandomName());
        await this.emailJoinInput.fill(generateRobustEmail());
        await this.phoneJoinInput.fill(generateUSPhone());
        await this.passwordJoinInput.fill(process.env.E2E_STAGING_TESTING_PASSWORD);
        await this.ezraAgreementCheckbox.click();
        await this.submitJoinButton.click();

    }

    async navigateToLogin() {

        // Combine baseURL + path
        await this.page.goto(`${process.env.BASE_URL}${process.env.LOGIN_PATH_STAGING}`);

    }
    // Accept cookies if the prompt appears
    async acceptCookiesIfPresent() {
        const acceptBtn = this.page.getByRole('button', { name: /accept/i });

        if (await acceptBtn.isVisible().catch(() => false)) {
            await acceptBtn.click();
        }
    }

    async login(email, password, expectSuccess = true) {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();

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
        await this.signOutButton.click();
    }

    // Utility functions moved to `util/utils.js`

}



