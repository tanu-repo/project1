export class Utils {
    constructor(page) {
        this.page = page;
    }

    // Utility method to generate a unique email address for testing
    async generateRobustEmail(prefix = "testuser", domain = "spohn.co") {
        const random = Math.random().toString(36).substring(2, 6);
        const timestamp = Date.now();
        return `${prefix}+${random}${timestamp}@${domain}`;
    }
}