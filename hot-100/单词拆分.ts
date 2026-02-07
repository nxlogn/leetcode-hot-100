function wordBreak(s: string, wordDict: string[]): boolean {
    // 将字典转换为set，提升查询速度
    const wordSet = new Set(wordDict);

    const n = s.length;

    // 初始化dp
    const dp = new Array(n + 1).fill(false);

    dp[0] = true;

    // 外层循环，遍历字符串的所有长度
    for (let i = 1; i <= n; i++) {
        // 内层循环，遍历所有可能的分割点
        for (let j = 0; j < i; j++) {
            if (dp[i] && wordSet.has(s.substring(i, j))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};