function threeSum(nums: number[]): number[][] {
    // 排序
    nums.sort((a, b) => a - b);
    // 结果数组
    const result: number[][] = [];
    // 遍历数组
    for (let i = 0; i < nums.length - 2; i++) {
        // 跳过重复元素
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        // 双指针
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            // 计算当前和
            const currentSum = nums[i] + nums[right] + nums[left];
            // 如果当前和等于0
            if (currentSum === 0) {
                // 找到一个解
                result.push([nums[i], nums[left], nums[right]]);
                // 跳过重复元素
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                // 跳过重复元素
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                // 调到下一个不同的元素的位置
                left++;
                right--;
            } else if (currentSum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    // 返回结果
    return result;
}
