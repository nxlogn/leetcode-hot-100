function searchMatrix(matrix: number[][], target: number): boolean {
    const m = matrix.length;
    if (m === 0) return false;
    const n = matrix[0].length;

    // 将二维矩阵视为一个长度为 m * n 的一维数组
    // 索引范围从 0 到 m * n - 1
    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
        // 计算一维中间索引
        const mid = Math.floor((left + right) / 2);

        // 核心步骤：将一维索引映射回二维坐标
        // 行号 = 索引 / 列数
        // 列号 = 索引 % 列数
        const row = Math.floor(mid / n);
        const col = mid % n;

        const midVal = matrix[row][col];

        if (midVal === target) {
            return true;
        } else if (midVal < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}