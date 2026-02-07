function lengthOfLIS(nums: number[]): number {
    // 处理边界情况
    if (nums.length === 0) return 0;
    // dp[i]:以i结尾的最长递增子序列长度
    const dp = Array(nums.length + 1).fill(1);
    // maxLen
    let maxLen = 1;
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
};