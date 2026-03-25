export class SelectPlan {
    constructor(page) {
        this.page = page;

    }
    async selectMRIScan() {
        const mriCard = this.page.locator('li[data-testid="FB30-encounter-card"]', {
            hasText: 'MRI Scan'
        });
        await mriCard.waitFor({ state: 'visible', timeout: 5000 });
        await mriCard.click();
        // await this.page.getByRole('button', { name: 'MRI Scan' }).click();
    }
    async clickContinue() {
        await this.page.getByRole('button', { name: 'Continue' }).click();


    }
    async addDOB(dateOfBirth) {
        await this.page.getByRole('textbox', { name: 'Date of birth (MM-DD-YYYY)' }).fill(dateOfBirth);
        // await this.page.getByRole('textbox', { name: 'Date of birth (MM-DD-YYYY)' }).press('Tab');
    }
    async addGender(gender) {

        await this.page.locator('.multiselect__select').click();
        //  Wait for the options to appear and find the desired state
        const option = this.page.locator('span.multiselect__option >> span', { hasText: gender });
        await option.waitFor({ state: 'visible', timeout: 5000 });
        //  Click the gender
        await option.click();


    }

}