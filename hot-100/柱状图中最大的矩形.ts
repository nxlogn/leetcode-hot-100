function largestRectangleArea(heights: number[]): number {
    // 1. 在数组尾部添加一个 0 作为哨兵
    // 这样可以确保栈内所有元素最后都能出栈
    const newHeights = [...heights, 0];

    // 单调栈, 存储的是柱子的索引
    const stack: number[] = [];
    let maxArea = 0;

    for (let i = 0; i < newHeights.length; i++) {
        // 当栈不为空,且当前柱子高度 < 栈顶柱子高度
        // 说明栈顶柱子遇到了右边的矮子,无法继续延伸,需要结算
        while (stack.length > 0 && newHeights[i] < newHeights[stack[stack.length - 1]]) {
            // 弹出栈顶元素, 作为矩形的高度 H
            const h = newHeights[stack.pop()!];

            // 计算宽度 W
            // 如果栈为空，说明 H 是目前遍历过的最低高度，宽度就是 0 到 i
            // 如果栈不为空，左边界就是新的栈顶元素，右边界是 i
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

            // 更新最大面积
            maxArea = Math.max(maxArea,  h * w);
        }

        // 当前柱子索引入栈
        stack.push(i);
    }

    return maxArea;
}