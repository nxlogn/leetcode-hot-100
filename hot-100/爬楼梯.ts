function climbStairs(n: number): number {
    // 基础情况处理
    if (n <= 2) {
        return n;
    }

    // 初始化: dp[1] = 1, dp[2] = 2
    let p1 = 1;
    let p2 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = p1;
        p1 = p1;
        p2 = current;
    }

    return p2;
};