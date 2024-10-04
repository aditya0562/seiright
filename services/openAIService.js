const OpenAI = require('openai');
const { estimateTokenCount } = require('../utils/tokenEstimator');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function splitIntoChunks(content, maxTokens) {
    const words = content.split(' ');
    let chunks = [];
    let currentChunk = [];

    for (const word of words) {
        currentChunk.push(word);
        const tokenCount = estimateTokenCount(currentChunk.join(' '));
        if (tokenCount >= maxTokens) {
            chunks.push(currentChunk.join(' '));
            currentChunk = [];
        }
    }

    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
    }

    return chunks;
}

async function checkComplianceAgainstPolicy(policyContent, targetContent) {
    const maxTokens = 8192; // Token limit for GPT-4 (input + output)
    const policyTokenCount = estimateTokenCount(policyContent);
    const targetTokenCount = estimateTokenCount(targetContent);
    const combinedTokenCount = policyTokenCount + targetTokenCount;

    // If combined content is within the token limit, process as a single chunk
    if (combinedTokenCount <= maxTokens) {
        return await processChunk(policyContent, targetContent);
    }

    // Otherwise, split only the target content into chunks
    const availableTargetTokens = maxTokens - policyTokenCount;
    const targetChunks = splitIntoChunks(targetContent, availableTargetTokens);
    let finalReport = '';

    for (let i = 0; i < targetChunks.length; i++) {
        const chunkReport = await processChunk(policyContent, targetChunks[i]);
        finalReport += chunkReport + '\n';
    }

    return finalReport.trim();
}

async function processChunk(policyContent, targetContent) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: 'system',
                    content: 'You are a compliance checker. Compare the target webpage content against the provided compliance policy and report any issues. Also return the compliance issues in a well-structured format, using bullet points, headings, and proper spacing. Make it easy to read and clear.',
                },
                {
                    role: 'user',
                    content: `Policy: ${policyContent}\n\nTarget Webpage: ${targetContent}`,
                },
            ],
        });

        let rawContent = response.choices[0].message.content;
        const cleanedContent = rawContent.replace(/\n{2,}/g, '\n');
        return cleanedContent.trim();
    } catch (error) {
        console.error('Error using OpenAI API:', error);
        return null;
    }
}

module.exports = {
    checkComplianceAgainstPolicy
};
