const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 读取 N 和 M
    const line1 = await readline();
    if (!line1) return;
    const parts = line1.trim().split(/\s+/);
    const M = parseInt(parts[0]); // 宽度
    const N = parseInt(parts[1]); // 高度

    // 构建矩阵
    const grid = [];
    for (let i = 0; i < N; i++) {
        const line = await readline();
        // 将每一行转换为数字数组
        const row = line.trim().split(/\s+/).map(Number);
        grid.push(row);
    }

    // 方向数组
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    // 定义bfs来标记连接到边缘的区域
    const markConnected = (startR, startC) => {
        const stack = [[startR, startC]];
        grid[startR][startC] = 2; // 标记为2, 表示它是连接到主体的
        
        while (stack.length > 0) {
            const [r, c] = stack.pop();

            for (const [dr, dc] of dirs) {
                const nr = r + dc;
                const nc = c + dr;

                // 检查边界, 且只处理值为 0 的单元格
                if (nr >= 0 && nr < N && nc >= 0 && nc < M && grid[nr][nc] === 0) {
                    grid[nr][nc] = 2;
                    stack.push([nr, nc]);
                }
            }
        }
    };

    // 扫描四周边界,将所有边缘的 0 及其相连部分标记为 2
    for (let i = 0; i < N; i++) {
        // 左边界
        if (grid[i][0] === 0) markConnected(i, 0);
        // 右边界
        if (grid[i][M - 1] === 0) markConnected(i, M - 1);
    }
    for (let j = 0; j < M; j++) {
        // 上边界
        if (grid[0][j] === 0) markConnected(0, j);
        // 下边界
        if (grid[N - 1][j] === 0) markConnected(N - 1, j);
    }

    // 5. 统计剩下的 0 (即独立密封舱的面积)
    let totalArea = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (grid[i][j] === 0) {
                totalArea++;
            }
        }
    }

    // 输出结果
    console.log(totalArea);
}();