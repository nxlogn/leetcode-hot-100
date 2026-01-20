const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取 n
    const line1 = await readline();
    if (!line1) return;

    // 2. 读取数组字符串并处理
    const line2 = await readline();
    if (!line2) return;

    // 过滤掉 0，因为 0 不会产生任何连接
    // 使用 BigInt 处理 10^18 的大整数
    const nums = line2.trim().split(/\s+/).filter(x => x !== '0').map(BigInt);
    const n = nums.length;

    // 如果非零节点不足3个，不可能形成环（题目要求回路由至少3个星系组成）
    // 注意：如果有重复的数字且非零，它们算作不同节点，逻辑依然成立
    if (n < 3 && new Set(nums).size === n) { 
        // 稍微严谨一点：如果有重复值，比如 [7, 7]，虽然 n=2，但它们完全重合，
        // 题目定义 i != j，所以需要找第三个点。
        // 不过下面的位运算逻辑天然涵盖了这一点，所以此处不特判也没关系，BFS会自动处理。
    }

    // 存储每一位对应的数字索引列表
    // 只需要记录每一位出现在哪些数字里
    // 由于我们一旦发现某一位出现 >=3 次就停止，所以这里仅作为临时存储
    // 只需要存储当 count == 2 时的边
    const edges = [];

    // 10^18 小于 2^60，遍历 0 到 60 位即可
    for (let bit = 0; bit <= 62; bit++) {
        const mask = 1n << BigInt(bit);
        const indices = [];

        for (let i = 0; i < n; i++) {
            if ((nums[i] & mask) !== 0n) {
                indices.push(i);

                // 优化：一旦某一位找到了 3 个节点，直接返回 3
                if (indices.length >= 3) {
                    console.log(3);
                    return;
                }
            }
        }

        // 如果这一位恰好连接了 2 个节点，这两个节点之间有一条边
        if (indices.length === 2) {
            edges.push([indices[0], indices[1]]);
        }
    }

    // 如果代码运行到这里，说明所有位的出现次数都 <= 2
    // 图非常稀疏，边数 <= 62。
    // 我们构建邻接表来跑 BFS。
    const adj = new Map();
    for (const [u, v] of edges) {
        if (!adj.has(u)) adj.set(u, []);
        if (!adj.has(v)) adj.set(v, []);
        
        // 避免平行边（虽然 BFS 也能处理，但去重更好）
        if (!adj.get(u).includes(v)) adj.get(u).push(v);
        if (!adj.get(v).includes(u)) adj.get(v).push(u);
    }

    let minCycle = Infinity;
    const nodes = Array.from(adj.keys());

    // 在这个小图上对每个点跑 BFS
    for (const startNode of nodes) {
        const dist = new Map();
        const parent = new Map();
        const queue = [startNode];

        dist.set(startNode, 0); // 单源距离
        parent.set(startNode, -1); // 父亲节点

        let head = 0;
        while(head < queue.length) {
            const u = queue[head++];

            const neighbors = adj.get(u) || [];
            for (const v of neighbors) {
                if (!dist.has(v)) {
                    dist.set(v, dist.get(u) + 1);
                    parent.set(v, u);
                    queue.push(v);
                } else if (v !== parent.get(u)) {
                    // 发现环：当前点 u 和已访问点 v 之间有边，且 v 不是 u 的父节点
                    const cycleLen = dist.get(u) + dist.get(v) + 1;
                    if (cycleLen < minCycle) {
                        minCycle = cycleLen;
                    }
                }
            }
        }
    }

    if (minCycle === Infinity) {
        console.log(-1);
    } else {
        console.log(minCycle);
    }
}();