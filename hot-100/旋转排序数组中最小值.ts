function findMin(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    // 注意这里循环条件是 left < right, 不要 <=
    // 因为当 left === right 时，已经锁定了唯一的最小值
    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        // 如果中间值大于右边值,说明最小值在右半边
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        }
        // 否则,最小值在左半边或者就是 mid 自己
        else {
            right = mid;
        }
    }

    // 循环结束时，left === right,指向最小值
    return nums[left];
};