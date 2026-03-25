export class HomePage {
    constructor(page) {
        this.page = page;

    }
    async startBookingProcess() {
        await this.page.getByRole('button', { name: 'Book a scan' }).click();

    }





}



