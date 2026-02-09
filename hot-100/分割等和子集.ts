function canPartition(nums: number[]): boolean {
    // 计算总和
    const sum = nums.reduce((acc, curr) => acc + curr, 0);

    // 如果是奇数，直接失败
    if (sum % 2 !== 0) {
        return false;
    }

    const target = sum / 2;

    // dp[i]表示能够凑出和为i
    const dp = new Array(target + 1).fill(false);

    dp[0] = true;

    // 外层循环，遍历每一个数字
    for (const num of nums) {
        // 内层循环，遍历背包容量
        for (let j = target; j >= num; j--) {
            // 状态转移
            if (dp[j - num]) {
                dp[j] = true;
            }

            // 剪枝优化
            if (dp[target]) return true;
        }
    }

    return dp[target];
};