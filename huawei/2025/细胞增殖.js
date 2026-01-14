const readline = require('readline');

// 创建接口
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lineCount = 0;
let N = 0, M = 0;

// 哈希表: key是观测值,value是出现的次数
const countMap = new Map();
// 记录所有观测值里的最大值
let maxObserved = 0;

rl.on('line', (line) => {
    // 去除首尾空格，防止空行干扰
    line = line.trim();
    if (!line) return;

    if (lineCount === 0) {
        // 阶段1: 读取N和M
        [N, M] = line.split(/\s+/).map(Number);
        lineCount++;
    } else if (lineCount === 1) {
        // 阶段2: 读取观测记录并构建哈希表
        const tokens = line.split(/\s+/);

        for (let i = 0; i < tokens.length; i++) {
            const val = parseInt(tokens[i]);
            // 存入map
            countMap.set(val, (countMap.get(val) || 0) + 1);
            // 更新最大值
            if (val > maxObserved) maxObserved = val;
        }
        lineCount++;
    } else {
        // 阶段3：处理每一行查询
        const [B, S] = line.split(/\s+/).map(Number);
        solve(B, S);
    }
});

function solve(B, S) {
    let totalRecords = 0; // 符合条件的记录总数
    let peakValue = 0; // 单个t对应的最大出现次数

    if (B === 0) {
        // 情况1 公式：C=S
        const count = countMap.get(S) || 0;
        if (count > 0) {
            totalRecords = count;
            peakValue = count;
        }
    } else if (B === 1) {
        // 情况2：C = 1 + S
        const val = 1 + S;
        const count = countMap.get(val) || 0;
        if (count > 0) {
            totalRecords = count;
            peakValue = count;
        }
    } else {
        // 情况3 C = B^t + S
        let currentPow = B;
        while (true) {
            const val = currentPow + S;
            // 剪枝
            if (val > maxObserved) break;

            const count = countMap.get(val);
            if (count) {
                totalRecords += count;
                // 更新峰值
                if (count > peakValue) {
                    peakValue = count;
                }
            }

            // 防止currentPow溢出
            if (currentPow > maxObserved) break;

            currentPow *= B;
        }
    }

    // 直接输出当前查询的结果
    console.log(`${totalRecords} ${peakValue}`);
}