export class ScheduleScanPage {
    constructor(page) {
        this.page = page;

    }
    async selectState(stateName) {
        // wait for the combobox to be visible instead of an arbitrary timeout
        await this.page.getByRole('combobox').waitFor({ state: 'visible', timeout: 5000 });
        await this.page.getByRole('combobox').getByRole('img').click();
        // Use Playwright native role/text locators instead of XPath
        await this.page.getByRole('option', { name: stateName }).click();
       

    }
    async selectIrvineLocation(locationName) {

        //await this.page.locator('.location-cards').getByText(locationName).first().click();
        await this.page.locator(`//div[@class='location-cards']//p[text()='${locationName}']`).first().click();

    }

    async selectActiveDate(page, dayNumber, month) {
        await this.page.getByTestId(`${month}-${dayNumber}-cal-day-content`).click();
        // Use CSS selectors for appointment time labels
        const timeLabels = this.page.locator("div.appointments__individual-appointment label[for*='Time']");
        await timeLabels.first().click();
        await this.page.getByRole('button', { name: 'I understand' }).click();
        await timeLabels.nth(2).click();
        await timeLabels.nth(3).click();
        await this.page.locator('[data-test="submit"]').click();

    }

    async addCard(page) {
        // wait for stripe iframe input to be visible instead of a fixed timeout
        const stripeFrameLocator = this.page.frameLocator("iframe[name*='__privateStripeFrame']");
        await stripeFrameLocator.locator('#payment-numberInput').waitFor({ state: 'visible', timeout: 7000 });
        await stripeFrameLocator.locator('#payment-numberInput').fill('4242424242424242');
        await stripeFrameLocator.locator('#payment-expiryInput').fill('12/34');
        await stripeFrameLocator.locator('#payment-cvcInput').fill('123');
        await stripeFrameLocator.locator('#payment-postalCodeInput').fill('95634');


    }
}