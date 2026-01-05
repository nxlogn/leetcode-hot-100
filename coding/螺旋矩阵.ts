function spiralOrder(matrix: number[][]): number[] {
    // 如果是空矩阵,直接返回空数组
    if (matrix.length === 0) return [];

    const result: number[] = [];

    // 定义四个边界
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (true) {
        // 向右移动
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        // 上边界下移,如果越界则结束
        top++;
        if (top > bottom) break;

        // 向下移动
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        // 右边界左移，如果越界则结束
        right--;
        if (left > right) break;

        // 向左移动
        for (let i = right; i >= left; i--) {
            result.push(matrix[bottom][i]);
        }
        bottom--;
        if (top > bottom) break;

        // 向上移动
        for (let i = bottom; i >= top; i--) {
            result.push(matrix[i][left]);
        }
        left++;
        if (left > right) break;
    }

    return result;
}
