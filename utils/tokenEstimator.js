function estimateTokenCount(text) {
    const tokenPerCharRatio = 4;  // Approximation: 1 token ~ 4 characters
    return Math.ceil(text.length / tokenPerCharRatio);
}

module.exports = {
    estimateTokenCount
};
