function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    // 1. 初始化 (m+1) x (n+1) 的二维数组
    // dp[i][j] 表示 word1的前i个字符 -> word2的前j个字符 的最小步数
    const dp: number[][] = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

    // 2. 初始化边界条件
    // 第一列：word2为空，word1需要删除 i 个字符
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    // 第一行：word1为空，word1需要插入 j 个字符
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // 3. 动态规划填表
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            
            // 如果字符相同，不需要额外操作，直接继承左上角
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // 如果字符不同，取 (增、删、改) 中的最小值 + 1
                dp[i][j] = Math.min(
                    dp[i][j - 1],    // 插入
                    dp[i - 1][j],    // 删除
                    dp[i - 1][j - 1] // 替换
                ) + 1;
            }
        }
    }

    // 4. 返回右下角的结果
    return dp[m][n];
};