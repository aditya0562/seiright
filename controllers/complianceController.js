const { scrapeWebPage } = require('../services/puppeteerService');
const { checkComplianceAgainstPolicy } = require('../services/openAIService');

async function checkCompliance(req, res) {
    const { policyUrl, targetUrl } = req.body;

    if (!policyUrl || !targetUrl) {
        return res.status(400).json({ error: 'Please provide both policyUrl and targetUrl' });
    }

    const policyContent = await scrapeWebPage(policyUrl);
    const targetContent = await scrapeWebPage(targetUrl);

    if (!policyContent || !targetContent) {
        return res.status(500).json({ error: 'Error scraping one or both of the URLs' });
    }

    const complianceReport = await checkComplianceAgainstPolicy(policyContent, targetContent);

    if (complianceReport) {
        res.setHeader('Content-Type', 'text/plain');
        res.send(complianceReport);  
    } else {
        res.status(500).json({ error: 'Error generating compliance report' });
    }
}

module.exports = {
    checkCompliance
};
