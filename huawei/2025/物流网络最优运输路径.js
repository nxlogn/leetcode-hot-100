const rl = require('readline').createInterface({ input: process.stdin});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 读取 N
    let line = await readline();
    if (!line) return;
    const N = parseInt(line.trim());

    // 初始化数据结构
    const adj = new Array(1001).fill(null).map(() => []);
    const inDegree = new Array(1001).fill(0);
    const nodes = new Set(); // 记录图中实际出现过的所有节点

    // 构建图
    for (let i = 0; i < N; i++) {
        line = await readline();
        const parts = line.trim().split(/\s+/).map(Number);
        const u = parts[0];
        const v = parts[1];
        const p = parts[2];

        nodes.add(u);
        nodes.add(v);

        // 邻接表： u => {v, profit}
        adj[u].push({v, p});

        // 统计入度
        inDegree[v]++;
    }

    // 初始化dp和拓扑排序序列
    // dpProfit[i] 记录到达节点 i 的最大利润
    // dpLen[i] 记录到达节点 i 的最大城市数量
    const dpProfit = new Array(1001).fill(-1);
    const dpLen = new Array(1001).fill(0);

    const queue = [];

    for (let node of nodes) {
        if (inDegree[node] === 0) {
            queue.push(node);
            dpProfit[node] = 0; // 起点利润为 0
            dpLen[node] = 1; // 起点包含自身，城市数为 1
        }
    }

    let processedCount = 0;
    let head = 0; // 模拟队列指针

    // 拓扑排序 + 动态规划
    while (head < queue.length) {
        const u = queue[head++];
        processedCount++;

        // 如果当前节点是从生产中心可达的，则尝试更新邻居
        if (dpProfit[u] !== -1) {
            for (const edge of adj[u]) {
                const v = edge.v;
                const profit = edge.p;

                const newProfit = dpProfit[u] + profit;
                const newLen = dpLen[u] + 1; 

                // 贪心更新策略
                if (newProfit > dpProfit[v]) {
                    dpProfit[v] = newProfit;
                    dpLen[v] = newLen;
                } else if (newProfit === dpProfit[v]) {
                    if (newLen > dpLen[v]) {
                        dpLen[v] = newLen;
                    }
                }
            }
        }

        // 无论是否更新dp，都要处理拓扑逻辑
        for (const edge of adj[u]) {
            const v = edge.v;
            inDegree[v]--;
            if (inDegree[v] === 0) {
                queue.push(v);
            }
        }
    }

    // 环检测
    if (processedCount < nodes.size) {
        console.log("-1");
        return;
    }

    // 寻找全局最优解
    let maxProfit = 0;
    let maxCities = 0;

    // 遍历所有出现过的节点，寻找最优节点
    for (let node of nodes) {
        if (dpProfit[node] !== -1) {
            if (dpProfit[node] > maxProfit) {
                maxProfit = dpProfit[node];
                maxCities = dpLen[node];
            } else if (dpProfit[node] === maxProfit) {
                if (dpLen[node] > maxCities) {
                    maxCities = dpLen[node];
                }
            }
        }
    }
    
    console.log(`${maxProfit} ${maxCities}`);
}()