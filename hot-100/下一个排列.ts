/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
    const n = nums.length;
    let i = n - 2;

    // 步骤 1: 从后向前寻找第一个升序对 (i, i+1)，确定需要被替换的较小数 nums[i]
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) {
        // 步骤 2: 在 i 之后寻找第一个比 nums[i] 大的数 nums[j]
        let j = n - 1;
        while (j >= 0 && nums[j] <= nums[i]) {
            j--;
        }
        // 步骤 3: 交换 nums[i] 和 nums[j]
        swap(nums, i, j);
    }

    // 步骤 4: 反转 i 之后的所有元素，使其变为升序
    // 如果 i < 0 (即整个数组本来就是降序)，这里会反转整个数组
    reverse(nums, i + 1, n - 1);
};

// 辅助函数：交换数组中两个元素
function swap(nums: number[], i: number, j: number): void {
    [nums[i], nums[j]] = [nums[j], nums[i]];
}

// 辅助函数：反转数组指定区间 [start, end]
function reverse(nums: number[], start: number, end: number): void {
    while (start < end) {
        swap(nums, start, end);
        start++;
        end--;
    }
}