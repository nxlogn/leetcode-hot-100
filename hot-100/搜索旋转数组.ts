function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // 判断哪一部分是有序的
        if (nums[left] <= nums[mid]) {
            // 检查 target 是否在左边的有序区间内
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // 目标在左边
            } else {
                left = mid + 1; // 目标在右边
            }
        } else {
            // 检查 target 是否在右边的有序区间内
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // 目标在右半边
            } else {
                right = mid - 1; // 目标在左半边
            }
        }
    }

    return -1;
}