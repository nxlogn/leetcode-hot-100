function findDuplicate(nums: number[]): number {
    let slow = 0;
    let fast = 0;

    // 第一阶段：寻找相遇点
    // 使用 do-while 循环确保至少执行一次，因为初始都是0
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    // 第二阶段：寻找环的入口（重复数）
    // 将 slow 重置回起点，fast 保持在相遇点
    slow = 0;
    while (slow !== fast) {
        slow = nums[slow]; // 每次走一步
        fast = nums[fast]; // 每次走一步
    }

    return slow;
};