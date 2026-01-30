function searchRange(nums: number[], target: number): number[] {
    // 辅助函数：查找边界
    // isleft = true 查找左边界 （第一个等于 target 的位置）
    // isLeft = false 查找右边界
    const binarySearch = (isLeft: boolean): number => {
        let left = 0;
        let right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                result = mid; // 记录当前找到的位置
                if (isLeft) {
                    right = mid - 1; // 继续向左收缩查找
                } else {
                    left = mid + 1; // 继续向右收缩查找
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }

    const first = binarySearch(true);

    // 如果没有找到左边界
    if (first === -1) {
        return [-1, -1];
    }

    const last = binarySearch(false);

    return [first, last];
}