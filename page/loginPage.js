export class LoginPage {
    constructor(page) {
        this.page = page;
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
        // Accept cookies if the prompt appears
        // await this.page.getByRole('button', { name: 'Accept' }).click();
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

    async createNewUser() {
        await this.page.getByRole('link', { name: 'Join' }).click();
        await this.page.getByRole('textbox', { name: 'Legal First Name' }).fill(await this.generateRandomName());
        await this.page.getByRole('textbox', { name: 'Legal Last Name' }).fill(await this.generateRandomName());
        await this.page.getByRole('textbox', { name: 'Email' }).fill(await this.generateRobustEmail());
        await this.page.getByRole('textbox', { name: 'Phone Number' }).fill(await this.generateUSPhone());
        await this.page.getByRole('textbox', { name: 'Password' }).fill(process.env.E2E_STAGING_TESTING_PASSWORD);
        await this.page.getByRole('button', { name: 'I agree to Ezra\'s terms of' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
    async generateRobustEmail(prefix = "testuser", domain = "spohn.co") {
        const random = Math.random().toString(36).substring(2, 6);
        const timestamp = Date.now();
        return `${prefix}+${random}${timestamp}@${domain}`;
    }
    async generateUSPhone() {
        const random = (min, max) =>
            Math.floor(Math.random() * (max - min + 1)) + min;

        const areaCode = random(200, 999);
        const centralOffice = random(200, 999);
        const lineNumber = random(0, 9999);

        return `(${areaCode}) ${centralOffice}-${String(lineNumber).padStart(4, '0')}`;
    }

    async generateRandomName() {
        const prefixes = ["Al", "Jo", "Mi", "Da", "Ka", "El", "Sa", "Ro"];
        const suffixes = ["son", "a", "ie", "an", "er", "y", "ah", "en"];

        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

        return prefix + suffix;
    }

}



