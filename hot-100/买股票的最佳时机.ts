function maxProfit(prices: number[]): number {
    // 初始化最低价格为无穷大，这样第一个价格肯定会被设置为最低价
    let minPrice = Infinity;
    // 初始化最大利润为 0
    let maxProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        // 1. 如果当前价格比历史最低价还低，更新最低价（尝试在这里买入）
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } 
        // 2. 否则，计算如果今天卖出的利润，并尝试更新最大利润
        else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }

    return maxProfit;
};