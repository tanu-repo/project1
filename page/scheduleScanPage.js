export class ScheduleScanPage {
    constructor(page) {
        this.page = page;

    }
    async selectState(page, stateName) {
        // wait for the combobox to be visible instead of an arbitrary timeout
        await page.getByRole('combobox').waitFor({ state: 'visible', timeout: 5000 });
        await page.getByRole('combobox').getByRole('img').click();
        await page.locator(`//div[@role='combobox']//li//span[text()='${stateName}']`).click();

    }
    async selectIrvineLocation(page, locationName) {

        await page.locator(`//div[@class='location-cards']//p[text()='${locationName}']`).first().click();

    }

    async selectActiveDate(page, dayNumber, month) {
        await page.getByTestId(`${month}-${dayNumber}-cal-day-content`).click();
        await page.locator("//div[@class='appointments__individual-appointment']//label[contains(@for,'Time')]").first().click();
        await page.getByRole('button', { name: 'I understand' }).click();
        await page.locator("//div[@class='appointments__individual-appointment']//label[contains(@for,'Time')]").nth(2).click();
        await page.locator("//div[@class='appointments__individual-appointment']//label[contains(@for,'Time')]").nth(3).click();
        await page.locator('[data-test="submit"]').click();

    }

    async addCard(page) {
        // wait for stripe iframe input to be visible instead of a fixed timeout
        const stripeFrameLocator = page.frameLocator("iframe[name*='__privateStripeFrame']");
        await stripeFrameLocator.locator('#payment-numberInput').waitFor({ state: 'visible', timeout: 7000 });

        await stripeFrameLocator.locator('#payment-numberInput').fill('4242424242424242');
        await stripeFrameLocator.locator('#payment-expiryInput').fill('12/34');
        await stripeFrameLocator.locator('#payment-cvcInput').fill('123');
        await stripeFrameLocator.locator('#payment-postalCodeInput').fill('95634');


    }
}