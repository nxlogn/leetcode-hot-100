function maxProduct(nums: number[]): number {
    if (nums.length === 0) return 0;

    // 初始化
    let maxF = nums[0];
    let minF = nums[0];
    let res = nums[0] // 全局最大值

    // 从第二个元素开始遍历
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];

        if (num < 0) {
            [maxF, minF] = [minF, maxF];
        }

        // 状态转移
        maxF = Math.max(num, maxF * num);
        minF = Math.min(num, minF * num);

        // 更新全局最大
        res = Math.max(res, maxF);
    }

    return res;
};