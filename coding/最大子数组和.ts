function maxSubArray(nums: number[]): number {
    // 最大子数组和
    let maxSum = nums[0];
    // 当前子数组和
    let currentSum = nums[0];

    // 遍历数组，kadne算法
    for (let i = 1; i < nums.length; i++) {
        // currentSum为负数，则从当前重新开始计算
        currentSum = Math.max(nums[i], nums[i] + currentSum);
        maxSum = Math.max(currentSum, maxSum);
    }

    return maxSum;
};