function coinChange(coins: number[], amount: number): number {
    const maxVal = amount + 1;
    const dp = new Array(amount + 1).fill(maxVal);

    dp[0] = 0;

    // 遍历所有金额
    for (let i = 1; i <= amount; i++) {
        // 遍历所有硬币
        for (let coin of coins) {
            // 如果当前金额i足以容纳这枚硬币
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}