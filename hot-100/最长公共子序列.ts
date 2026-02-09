
function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    // 初始化
    // dp[i][j]表示前i个字符和前j个字符的最长公共子序列长度
    const dp: number[][] = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

    // i和j从1开始，代表第i个字符和第j个字符
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                // 情况1 字符匹配 长度 + 1
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // 情况2 字符不匹配 取左边或上边的最大值
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
};