function subarraySum(nums: number[], k: number): number {
    let count = 0;
    let presum = 0;
    const mp = new Map<number, number>();

    for (let num of nums) {
        presum += num;
        
        // 判断中间为presum - k的区间
        if (mp.has(presum - k)) {
            // 取出所有前缀和为presum-k的个数
            count += mp.get(presum - k)!;
        }

        // 当前前缀和加入mp
        mp.set(presum, (mp.get(presum) || 0) + 1)
    }

    return count;
};