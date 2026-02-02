function canJump(nums: number[]): boolean {
    let maxReach = 0; // 当前能到达的最远索引
    const target = nums.length - 1;

    for (let i = 0; i < nums.length; i++) {
        // 关键判断: 如果当前位置 i 已经超过了我们能到达的极限,说明不可达
        if (i > maxReach) {
            return false;
        }

        // 贪心策略: 更新能到达的最远距离
        // 在位置 i, 最远能跳到 i + nums[i]
        maxReach = Math.max(maxReach, i + nums[i]);

        // 优化: 如果已经能到达终点,直接返回true
        if (maxReach >= target) return true;
    }

    // 兜底
    return maxReach >= target;
};