function searchMatrix(matrix: number[][], target: number): boolean {
    // 边界检查
    if (matrix.length === 0 || matrix[0].length === 0) return false;

    const m = matrix.length;
    const n = matrix[0].length;

    // 从第一行右上角开始搜索
    let row = 0;
    let col = n - 1;

    while (row < m && col >= 0) {
        const current = matrix[row][col];

        if (current === target) {
            return true;
        } else if (current > target) {
            // 当前值比目标值大，下面的值肯定比目标值大
            col--;
        } else {
            // 当前值比目标值小，左边的值肯定比目标值小
            row++;
        }
    }

    return false;
}
