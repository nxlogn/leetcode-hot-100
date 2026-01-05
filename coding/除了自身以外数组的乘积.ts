function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const answer: number[] = [];

    // 获取左侧的前缀乘积
    // answer[i]表示从0到i-1位置的元素乘积
    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // 获取右侧的后缀乘积
    let R = 1;
    for (let i = n - 1; i >= 0; i--) {
        // 左侧乘积*R
        answer[i] = answer[i] * R;
        // 更新R
        R = R * nums[i];
    }

    return answer;
}
