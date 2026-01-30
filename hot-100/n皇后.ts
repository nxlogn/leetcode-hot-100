function solveNQueens(n: number): string[][] {
    const res: string[][] = [];
    // 初始化棋盘，用'.'表示空位
    const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'));

    // 辅助函数: 检查当前位置是否可以放置皇后
    const isValid = (row: number, col: number): boolean => {
        // 检查列冲突
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // 检查左上对角线 (row - 1, col - 1)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // 检查右上对角线(row - 1, col + 1)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    };

    const backtrack = (row: number) => {
        // 终止条件: 所有行都放好了
        if (row === n) {
            // 将二维数组转为题目要求的字符串格式
            res.push(board.map(rowArray => rowArray.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q'; // 放置皇后
                backtrack(row + 1); // 递归下一行
                board[row][col] = '.' // 回溯，重置棋盘
            }
        }
    };

    backtrack(0);
    return res;
}