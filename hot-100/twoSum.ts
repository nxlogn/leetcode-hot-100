function twoSum(nums: number[], target: number): number[] {
    // 存储数组元素的下标
    const mp = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const complementNum = target - currentNum;
        // 在mp中找到对应的数字，返回
        if (mp.has(complementNum)) {
            return [mp.get(complementNum)!, i];
        }
        mp.set(nums[i], i);
    }
    return [];
}
