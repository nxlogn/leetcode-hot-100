function firstMissingPositive(nums: number[]): number {
    const n = nums.length;

    // 第一次遍历，每个数字到自己该到的位置
    for (let i = 0; i < n; i++) {
        // 只处理[1,n]范围内的正整数
        // 如果没在位置上，交换
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const targetIndex = nums[i] - 1;
            [nums[targetIndex], nums[i]] = [nums[i], nums[targetIndex]];
        }
    }

    // 第二次遍历，寻找第一个位置不匹配的数
    for (let i = 0; i < n; i++) {
        // 如果索引i处的数字不是i+1，说明i+1就是缺失的数字
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    // 所有位置对应上，缺失的是n+1
    return n + 1;
}
