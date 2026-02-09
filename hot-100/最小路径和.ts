function minPathSum(grid: number[][]): number {
    // 长度为0的情况
    if (grid.length === 0) return 0;
    const m = grid.length;
    const n = grid[0].length;

    // dp[i][j]:位置i,j处的最小路径和
    const dp = Array.from({length: m}, ()=> new Array(n).fill(0));
    dp[0][0] = grid[0][0];
    
    // 初始化第一行
    for (let i = 1; i < n; i++) {
        dp[0][i] = dp[0][i-1] + grid[0][i];
    }
    // 初始化第一列
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }

    // 遍历每一个格子
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1]);
        }
    }

    return dp[m-1][n-1];
};