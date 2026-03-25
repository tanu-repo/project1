export class ScheduleScanPage {
    constructor(page) {
        this.page = page;

    }
    async selectState(page, stateName) {
        await page.waitForTimeout(2000);
        await this.page.getByRole('combobox').getByRole('img').click();

        await this.page.locator("//div[@role='combobox']//li//span[text()='California']").click();

    }
    async selectIrvineLocation(page, locationName) {

        await page.locator(`//div[@class='location-cards']//p[text()='${locationName}']`).first().click();


    }


    async selectActiveDate(page, dayNumber, month) {
        // await page.locator(`//span[@role='button' and @class='vc-day-content']//div[text()='${dayNumber}']`).first().click();

        await page.getByTestId(`${month}-${dayNumber}-cal-day-content`).click();
        await page.locator("//div[@class='appointments__individual-appointment']//label[contains(@for,'Time')]").first().click();
        await page.getByRole('button', { name: 'I understand' }).click();
        await page.locator("//div[@class='appointments__individual-appointment']//label[contains(@for,'Time')]").nth(2).click();
        await page.locator("//div[@class='appointments__individual-appointment']//label[contains(@for,'Time')]").nth(3).click();
        await page.locator('[data-test="submit"]').click();

    }

    async addCard(page) {
        await page.waitForTimeout(2000);
        const frame = page.locator("//iframe[contains(@name,'__privateStripeFrame')]").nth(0).contentFrame();

        await frame.locator('#payment-numberInput').fill('4242424242424242');
        await frame.locator('#payment-expiryInput').fill('12/34');
        await frame.locator('#payment-cvcInput').fill('123');
        await frame.locator('#payment-postalCodeInput').fill('95634');


    }
}