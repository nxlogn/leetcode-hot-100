function singleNumber(nums: number[]): number {
    // 遍历nums做异或操作
    let result = 0;
    for(let num of nums) {
        result ^= num;
    }
    return result;
};