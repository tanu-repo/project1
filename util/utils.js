// Utility functions for tests and page objects
export function generateRobustEmail(prefix = 'testuser', domain = 'spohn.co') {
    const random = Math.random().toString(36).substring(2, 6);
    const timestamp = Date.now();
    return `${prefix}+${random}${timestamp}@${domain}`;
}

export function generateUSPhone() {
    const random = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const areaCode = random(200, 999);
    const centralOffice = random(200, 999);
    const lineNumber = random(0, 9999);

    return `(${areaCode}) ${centralOffice}-${String(lineNumber).padStart(4, '0')}`;
}

export function generateRandomName() {
    const prefixes = ["Al", "Jo", "Mi", "Da", "Ka", "El", "Sa", "Ro"];
    const suffixes = ["son", "a", "ie", "an", "er", "y", "ah", "en"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return prefix + suffix;
}