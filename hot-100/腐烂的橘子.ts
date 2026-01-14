function orangesRotting(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;

    // 队列用于存储当前腐烂橘子的坐标
    const queue: [number, number][] = [];
    let freshCount = 0;

    // 初始化：遍历网格，找出所有源头（腐烂橘子）并统计新鲜橘子
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r,c]);
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    // 如果没有新鲜橘子，直接返回0
    if (freshCount === 0) return 0;

    let minutes = 0;

    // 方向数组
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    // 开始bfs循环
    while (queue.length > 0 && freshCount > 0) {
        const size = queue.length;

        minutes++;

        for (let i = 0; i < size; i++) {
            const [curR, curC] = queue.shift()!; // 取出队首元素

            // 检查四个方向
            for (const [dr, dc] of directions) {
                const newR = curR + dr;
                const newC = curC + dc;

                // 边界检查&是新橘子
                if (newR >= 0 && newR < rows &&
                    newC >= 0 && newC < cols &&
                    grid[newR][newC] === 1
                ) {
                    // 感染
                    grid[newR][newC] = 2;
                    freshCount--;
                    queue.push([newR, newC]);
                }
            }
        }
    }

    // 结果检查
    return freshCount === 0 ? minutes : -1;
};