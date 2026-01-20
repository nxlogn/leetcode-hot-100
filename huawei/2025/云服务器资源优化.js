const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
rl.on('line', (line) => {
    line = line.trim();
    if (line) lines.push(line);
});

rl.on('close', () => {
    if (lines.length === 0) return;

    let lineIdx = 0;
    // 读取 n 和 K
    const n = parseInt(lines[lineIdx++]);
    const K = parseInt(lines[lineIdx++]);

    // 读取所有服务数据
    const items = [];
    for (let i = 0; i < n; i++) {
        const parts = lines[lineIdx++].split(/\s+/).map(Number);
        items.push({
            id: i + 1, // 记录原始编号（1-based）
            c: parts[0], // 功耗
            v: parts[1]  // 价值
        });
    }

    solve(n, K, items);
});

function solve(n, K, items) {
    // 初始化 DP 表
    // dp[i][w] 存储前 i 个物品在容量限制 w 下的最优状态 {val, cost, count}
    // 使用 null 或全 0 初始化，base case 是 0 物品 0 容量均为 0
    let dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: K + 1 }, () => ({ val: 0, cost: 0, count: 0 }))
    );

    // 用于记录路径：keep[i][w] = true 表示在状态 dp[i][w] 中选择了物品 i
    let keep = Array.from({ length: n + 1 }, () =>
        new Uint8Array(K + 1)
    );

    for (let i = 1; i <= n; i++) {
        const item = items[i - 1]; // items 数组是 0-based
        const { c, v } = item;

        for (let w = 0; w <= K; w++) {
            // 选项 1: 不选当前物品
            let bestOp = { ...dp[i - 1][w] };
            keep[i][w] = 0;

            // 选项 2: 选当前物品 (前提是装得下)
            if (w >= c) {
                const prev = dp[i - 1][w - c];
                const candidate = {
                    val: prev.val + v,
                    cost: prev.cost + c,
                    count: prev.count + 1
                };

                // 比较 candidate 和 bestOp，决定是否更新
                if (isBetter(candidate, bestOp)) {
                    bestOp = candidate;
                    keep[i][w] = 1;
                }
            }

            dp[i][w] = bestOp;
        }
    }

    // 回溯找出被选中的物品
    let w = K;
    const resultIds = [];
    for (let i = n; i > 0; i--) {
        if (keep[i][w] === 1) {
            const item = items[i - 1];
            resultIds.push(item.id);
            w -= item.c;
        }
    }

    // 输出结果
    if (resultIds.length === 0) {
        // 如果没有选任何服务（或者最优解是空集），根据题意输出 -1
        // 注意：如果题目允许空集且其为最优解（虽然不太可能优于非空），通常逻辑是如果没有合法的组合满足条件才输出-1。
        // 但根据题目的输入限制 1 <= c_i，如果 K 小于所有 c_i，则选不出任何东西，此时应输出 -1。
        console.log("-1");
    } else {
        // 题目要求编号从小到大排序
        resultIds.sort((a, b) => a - b);
        console.log(resultIds.join(' '));
    }
}

// 核心比较逻辑：判断 newState 是否优于 oldState
function isBetter(newState, oldState) {
    // 规则 1: 价值越大越好
    if (newState.val > oldState.val) return true;
    if (newState.val < oldState.val) return false;

    // 规则 2: 价值相同，功耗越小越好
    if (newState.cost < oldState.cost) return true;
    if (newState.cost > oldState.cost) return false;

    // 规则 3: 价值和功耗都相同，数量越少越好
    if (newState.count < oldState.count) return true;
    
    return false;
}