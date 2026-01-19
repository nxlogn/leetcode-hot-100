const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取第一行：m 和 n
    const line1 = await readline();
    if (!line1) return;
    const [m, n] = line1.trim().split(/\s+/).map(Number);

    // 2. 读取网格地图
    const grid = [];
    for (let i = 0; i < m; i++) {
        const line = await readline();
        const row = line.trim().split(/\s+/).map(Number);
        grid.push(row);
    }

    // 3. 读取起点
    const lineStart = await readline();
    const [rs, cs] = lineStart.trim().split(/\s+/).map(Number);

    // 4. 读取终点
    const lineEnd = await readline();
    const [rd, cd] = lineEnd.trim().split(/\s+/).map(Number);

    // 5. 读取最大氧气 k
    const lineK = await readline();
    const k = parseInt(lineK.trim());

    // 6. BFS 初始化
    // 状态数组：记录到达某点时的最大剩余氧气量，初始为 -1
    const maxOxygen = Array.from({ length: m }, () => new Int32Array(n).fill(-1));

    // 队列：存储 [row, col, current_oxygen, steps]
    // 为了性能，在大数据量下尽量避免 shift，这里使用数组+指针模拟队列
    const queue = []; 
    queue.push([rs, cs, k, 0]);
    maxOxygen[rs][cs] = k;

    let head = 0; // 队头指针
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // 右、左、下、上

    while (head < queue.length) {
        const [r, c, ox, steps] = queue[head++];

        // 到达终点，直接返回步数
        // 因为是 BFS，第一次到达终点的一定是最短路径
        if (r === rd && c === cd) {
            console.log(steps);
            return;
        }

        // 如果氧气耗尽，无法再移动，跳过
        if (ox === 0) continue;

        // 遍历四个方向
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            // 越界检查
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

            // 障碍物检查
            const cellType = grid[nr][nc];
            if (cellType === 1) continue;

            // 计算到达该邻居后的氧气状态
            // 如果是补给站(2)，氧气回满；否则消耗 1
            const newOx = (cellType === 2) ? k : ox - 1;

            // 核心剪枝逻辑：
            // 只有当我们能以“比之前更多的氧气”到达该点时，才需要继续探索
            // 如果现在的氧气比之前记录的少或相等，说明这条路不仅长（因为是 BFS 后续层级），而且状态还差，直接剪掉
            if (newOx > maxOxygen[nr][nc]) {
                maxOxygen[nr][nc] = newOx;
            }
            queue.push([nr, nc, newOx, steps + 1]);
        }
    }
    
    // 如果队列空了还没找到终点，说明不可达
    console.log(-1);
}();
