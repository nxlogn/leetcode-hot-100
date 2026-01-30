function searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        // 防止溢出的写法
        // 使用math.floor取整
        const mid = left + Math.floor((right - left) / 2);

        if (nums[mid] === target) {
            // 找到了目标值
            return mid;
        } else if (nums[mid] < target) {
            // 目标值在右半部分
            left = mid + 1;
        } else {
            // 目标值在左半部分
            right = mid - 1;
        }
    }
    // 循环结束如果没有找到 left就是插入位置
    return left;
};