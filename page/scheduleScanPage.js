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

    async selectActiveDate(dayNumber, month) {
        // Click the calendar day — data-testid format: `${month}-${day}-cal-day-content`
        await this.page.getByTestId(`${month}-${dayNumber}-cal-day-content`).click();

        // Wait for time slot labels to appear after selecting a date
        const timeLabels = this.page.locator("div.appointments__individual-appointment label[for*='Time']");
        await timeLabels.first().waitFor({ state: 'visible', timeout: 10000 });

        // Select 3 time slots (indices 0, 1, 2)
        await timeLabels.nth(0).click();

        // The app shows a confirmation dialog after the first slot pick — dismiss it
        const understandBtn = this.page.getByRole('button', { name: 'I understand' });
        if (await understandBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
            await understandBtn.click();
        }

        await timeLabels.nth(1).click();
        await timeLabels.nth(2).click();

        await this.page.locator('[data-test="submit"]').click();
    }

    async addCard() {
        // Stripe renders multiple iframes — target the one containing the card number input
        // by iterating over all matching frames until we find the right one
        const stripeFrameLocator = this.page.frameLocator("iframe[name*='__privateStripeFrame']").first();
        await stripeFrameLocator.locator('#payment-numberInput').waitFor({ state: 'visible', timeout: 10000 });
        await stripeFrameLocator.locator('#payment-numberInput').fill('4242424242424242');
        await stripeFrameLocator.locator('#payment-expiryInput').fill('12/34');
        await stripeFrameLocator.locator('#payment-cvcInput').fill('123');
        await stripeFrameLocator.locator('#payment-postalCodeInput').fill('95634');
    }
}