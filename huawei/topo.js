const rl = require('readline').createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    const lines = [];
    const N = parseInt(await readline());
    for (let i = 0; i < N; i++) {
        const line = (await readline()).trim().split(' ').map(Number);
        lines.push(line);
    }

    // 邻接表
    const adj = new Map();
    // 所有节点集合
    const nodes = new Set();
    // 节点入度存储
    const inDegree = new Map();

    // 处理输入的边和节点
    for (let i = 0; i < N; i++) {
        const [u, v, p] = lines[i];
        // 没有处理过就初始化
        if (!adj.has(u)) adj.set(u, []);
        adj.get(u).push({ v, p });
        // 更新节点集合
        nodes.add(u);
        nodes.add(v);
        // 更新入度表
        if (!inDegree.has(v)) inDegree.set(v, 0);
        inDegree.set(v, inDegree.get(v) + 1);
        // 起点的入度如果不存在也初始化为 0
        if (!inDegree.has(u)) inDegree.set(u, 0);
    }

    // 处理无节点的特殊情况
    if (nodes.size === 0) {
        console.log('0 0');
        return;
    }

    // 拓扑排序检测环，并记录拓扑序列
    const inDegreeCopy = new Map(inDegree);
    // 拓扑序列
    const topoOrder = [];
    // 入度为0的队列
    const queue = [];

    for (const node of nodes) {
        if (inDegreeCopy.get(node) === 0) {
            queue.push(node);
        }
    }

    // 拓扑序列的节点个数
    let count = 0;
    while (queue.length > 0) {
        const u = queue.shift();
        topoOrder.push(u);
        count++;
        // 遍历u的领居
        if (adj.has(u)) {
            for (const { v } of adj.get(u)) {
                inDegreeCopy.set(v, inDegreeCopy.get(v) - 1);
                if (inDegreeCopy.get(v) === 0) {
                    queue.push(v);
                }
            }
        }
    }

    // 存在环的情况
    if (count !== nodes.size) {
        console.log(-1);
        return;
    }

    // 到达节点时的最大利润
    const dp = new Map();
    // 最大利润下的节点数
    const cnt = new Map();
    for (const node of nodes) {
        dp.set(node, -Infinity);
        cnt.set(node, 0);
    }

    // 入度为0的节点初始化
    for (const node of nodes) {
        if (inDegree.get(node) === 0) {
            dp.set(node, 0);
            cnt.set(node, 1);
        }
    }

    // 按照拓扑序列更新dp和cnt
    for (const u of topoOrder) {
        if (adj.has(u)) {
            // 遍历邻居
            for (const { v, p } of adj.get(u)) {
                const newProfit = dp.get(u) + p;
                const newCount = cnt.get(u) + 1;
                if (newProfit > dp.get(v)) {
                    dp.set(v, newProfit);
                    cnt.set(v, newCount);
                } else if (newProfit === dp.get(v)) {
                    // 利润相同,根据个数
                    if (newCount > cnt.get(v)) {
                        cnt.set(v, newCount);
                    }
                }
            }
        }
    }

    // 寻找最大利润和对应的最长节点数
    let maxProfit = -Infinity;
    let maxCount = 0;

    for (const node of topoOrder) {
        const currentProfit = dp.get(node);
        const currentCount = cnt.get(node);
        if (currentProfit > maxProfit) {
            maxProfit = currentProfit;
            maxCount = currentCount;
        } else if (currentCount === maxProfit) {
            if (currentCount > maxCount) {
                maxCount = currentCount;
            }
        }
    }

    console.log(`${maxProfit} ${maxCount}`);
})();
