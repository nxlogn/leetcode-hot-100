function majorityElement(nums: number[]): number {
    let count = 0; // 当前候选的兵力
    let candidate: number | null = null; // 当前最可能是多数元素的数字

    for (const num of nums) {
        // 如果计数为0，说明之前的兵力都消耗完了，当前的数字成为新的候选人
        if (count === 0) {
            candidate = num;
        }
        // 如果是队友，+1
        // 如果是敌人，-1
        count += (num === candidate) ? 1 : -1;
    }

    return candidate as number;
}