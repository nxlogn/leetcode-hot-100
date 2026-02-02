function topKFrequent(nums: number[], k: number): number[] {
    // 统计每个数字的出现频率
    // key: 数字, value: 频率
    const freqMap = new Map<number, number>();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // 桶排序
    // 创建桶数组，下标表示频率
    // buckets[i] 存放的是所有出现频率为i的数字
    const buckets: number[][] = new Array(nums.length + 1).fill(0).map(() => []);

    for (const [num, freq] of freqMap) {
        buckets[freq].push(num);
    }

    // 3. 从后往前遍历桶, 收集结果
    const result: number[] = [];
    for (let i = buckets.length - 1; i >=0; i--) {
        // 如果这和频率下有数字
        if (buckets[i].length > 0) {
            result.push(...buckets[i]);
            if (result.length >= k) {
                break;
            }
        }
    }

    // 可能一次性push多个,截取前 k 个
    return result.slice(0, k);
};