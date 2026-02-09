function sortColors(nums: number[]): void {
    let p0 = 0;
    let curr = 0;
    let p2 = nums.length - 1;

    while (curr <= p2) {
        if (nums[curr] === 0) {
            // 情况1 遇到0 交换到左边p0的位置
            [nums[curr], nums[p0]] = [nums[p0], nums[curr]];
            p0++;
            curr++;
        } else if (nums[curr] === 2) {
            // 情况2 遇到2 交换到右边p2的位置
            [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
            p2--;
        } else {
            curr++;
        }
    }
};