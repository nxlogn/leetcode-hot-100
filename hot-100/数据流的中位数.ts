class MedianFinder {
    // 维护一个有序数组
    private nums: number[];
    constructor() {
        this.nums = [];
    }

    /**
     * 添加数字,使用二分查找找到插入位置,保证 nums 始终有序
     * @param num 
     */
    addNum(num: number): void {
        if (this.nums.length === 0) {
            this.nums.push(num);
            return;
        }

        // 二分查找寻找插入点
        let left = 0;
        let right = this.nums.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (num < this.nums[mid]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        // 在索引 left 处插入num
        this.nums.splice(left, 0, num);
    }

    /**
     * 查找中位数
     */
    findMedian(): number {
        const n = this.nums.length;
        const mid = Math.floor(n / 2);

        if (n % 2 === 1) {
            // 奇数个元素，直接返回中间那个
            return this.nums[mid];
        } else {
            // 偶数个元素，返回中间两个的平均值
            return (this.nums[mid - 1] + this.nums[mid]) / 2;
        }
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */