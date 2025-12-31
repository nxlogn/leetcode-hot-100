/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    const m = matrix.length;
    const n = matrix[0].length;

    // 记录第一行和第一列是否本来就包含0
    // 因为我们会用它们来当标志位,所以必须先记录它们自己的原始状态
    let firstRowHasZero = false;
    let firstColHasZero = false;

    // 检查第一列
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColHasZero = true;
            break;
        }
    }

    // 检查第一行
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowHasZero = true;
            break;
        }
    }

    // 遍历除去第一行和第一列之外的剩余矩阵
    // 如果发现为0,就将它对应的 行首 和 列首 置为0作为标记
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // 根据标志位,将内部矩阵置为0
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // 只要行首或者列首有一个是0,这个位置就该是0
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // 最后处理第一行和第一列
    if (firstRowHasZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }

    if (firstColHasZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
};