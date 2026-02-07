function numSquares(n: number): number {
    const dp = new Array(n + 1).fill(0).map((_, i) => i);

    // 遍历背包容量，从1到n
    for (let i = 1; i <= n; i++) {
        // 遍历物品
        for (let j = 1; j *j <= i; j++) {
            // 状态转移
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }

    return dp[n];
};