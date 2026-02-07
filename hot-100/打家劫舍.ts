function rob(nums: number[]): number {
    const n = nums.length;

    // 边界情况处理
    if (n === 0) return 0;
    if (n === 1) return nums[0];

    // 初始化前两个状态
    // first 表示 dp[i - 2], 也就是上上一个房屋的最大收益
    let first = nums[0];
    
    // second 表示 dp[i - 1], 也就是上一个房屋的最大收益
    let second = Math.max(nums[0], nums[1]);

    // 从第三间房开始遍历
    for (let i = 2; i < n; i++) {
        const current = Math.max(second, first + nums[i]);

        // 滚动更新
        first = second;
        second = current;
    }

    return second;
}