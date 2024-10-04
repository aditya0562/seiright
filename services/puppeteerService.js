const puppeteer = require('puppeteer');

async function scrapeWebPage(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const pageContent = await page.evaluate(() => document.body.innerText);
        await browser.close();
        return pageContent.trim();
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        return null;
    }
}

module.exports = {
    scrapeWebPage
};
