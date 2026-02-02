function jump(nums: number[]): number {
    let jumps = 0; // 跳跃次数
    let currentEnd = 0; // 当前跳跃次数到达的最远边界
    let farthest = 0; // 下一步能到达的最远位置

    // 如果到了最后一个位置，不需要再跳了
    for (let i = 0; i < nums.length - 1; i++) {
        // 在当前覆盖范围内，寻找下一跳能到达的最远位置
        farthest = Math.max(farthest, i + nums[i]);

        // 2. 如果走到了当前步数的边界
        if (i === currentEnd) {
            jumps++; // 被迫跳跃一次
            currentEnd = farthest; // 更新边界为刚才找到的位置

            // 优化: 如果新边界已经覆盖了终点,直接退出
            if (currentEnd >= nums.length - 1) {
                break;
            }
        }
    }

    return jumps;
};