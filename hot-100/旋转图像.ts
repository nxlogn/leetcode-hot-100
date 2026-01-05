/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    const n = matrix.length;

    // 第一步，转置矩阵
    for (let i = 0; i < n; i++) {
        // 注意j从i开始，避免重复交换导致换回去
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // 第二步，翻转每一行
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}
