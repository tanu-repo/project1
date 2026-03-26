export class HomePage {
    constructor(page) {
        this.page = page;
        this.bookAScanButton = page.getByRole('button', { name: 'Book a scan' });

    }
    async startBookingProcess() {
        await this.bookAScanButton.click();

    }





}



