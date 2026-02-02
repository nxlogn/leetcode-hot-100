function generate(numRows: number): number[][] {
    // dp 数组用来存储所有的状态
    const dp: number[][] = [];
    
    for (let i = 0; i < numRows; i++) {
        // 初始化当前行，长度为 i + 1
        // new Array(i + 1).fill(1) 其实隐式地处理了边界条件
        // dp[i][0] = 1 和 dp[i][i] = 1
        const row: number[] = new Array(i + 1).fill(1);

        // 状态转移: 计算中间的数值
        // j 从 i 开始，到 row.length - 2 结束
        for (let j = 1; j < row.length - 1; j++) {
            row[j] = dp[i - 1][j - 1] + dp[i - 1][j];
        }

        // 将当前行存入dp表
        dp.push(row);
    }

    return dp;
};