/**
 * 核心思路
 * 操作的本质:将负号在矩阵中任意移动,或者两两抵消
 * 如果负数个数是偶数,所有负数都可以配对并抵消
 * 如果负数个数是奇数,总有一个符号无法消除
 * @param matrix 
 */
function maxMatrixSum(matrix: number[][]): number {
    let totalSum = 0;
    let minAbsVal = Infinity; // 用于记录矩阵中最小的绝对值
    let negativeCount = 0; // 用于记录负数的个数

    const n = matrix.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const val = matrix[i][j];
            const absVal = Math.abs(val);

            // 累加所有数的绝对值
            totalSum += absVal;

            // 更新最小的绝对值
            if (absVal < minAbsVal) {
                minAbsVal = absVal;
            }

            // 统计负数个数
            if (val < 0) {
                negativeCount++;
            }
        }
    }

    return (negativeCount % 2) === 0 ? totalSum : totalSum - 2 * minAbsVal; 
};