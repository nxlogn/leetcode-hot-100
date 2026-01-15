
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 读取n和m
    let line = await readline();
    if (!line) return;
    const [n, m] = line.trim().split(/\s+/).map(Number);

    // 读取任务成本数组
    line = await readline();
    const c = line.trim().split(/\s+/).map(Number);
    
    // 预处理前缀和，方便快速求区间和
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + c[i];
    }

    // 获取区间[start, end)的和
    const getSum = (start, end) => prefix[end] - prefix[start];

    // 记忆化缓存：key = 'taskIdx, batchIdx'
    const memo = new Map();

    /**
     * DFS函数
     * @param {*} taskIdx 当前从第几个任务开始切分
     * @param {*} batchIdx 当前是第几个批次
     * @returns {Object} { score: 最小平方和， counts：[本批次数量，下批次数量...] }
     */
    function solve(taskIdx, batchIdx) {
        // 如果已经到了最后一个批次
        // 那么剩下的所有任务必须全部归入这最后一个批次
        if (batchIdx === m - 1) {
            const sum = getSum(taskIdx, n);
            const count = n - taskIdx;
            // 返回结果 平方和，以及这一批的任务数量
            return {
                score: sum * sum,
                counts: [count]
            };
        }

        const key = `${taskIdx}, ${batchIdx}`;
        if (memo.has(key)) return memo.get(key);

        let minScore = Infinity;
        let bestCounts = [];

        // 枚举当前批次的结束位置i
        // 限制：i 必须大于 taskIdx （每批次至少一个任务）
        // 限制：必须给剩下的（m - 1 - batchIdx）个批次留出足够的任务
        const minNextTasks = m - 1 - batchIdx;
        const maxEnd = n - minNextTasks;

        for (let i = taskIdx + 1; i <= maxEnd; i++) {
            // 计算当前批次的得分
            const currentSum = getSum(taskIdx, i);
            const currentScore = currentSum * currentSum;

            // 递归去切剩下的
            const remain = solve(i, batchIdx + 1);

            // 更新最小值
            const totalScore = currentScore + remain.score;
            if (totalScore < minScore) {
                minScore = totalScore;
                // 记录路径:当前批次任务数(i - taskIdx) + 后续最后切分方案
                bestCounts = [i - taskIdx, ...remain.counts];
            }
        }

        const result = { score: minScore, counts: bestCounts};
        memo.set(key, result);
        return result;
    }

    // 开始计算
    const result = solve(0, 0);

    // 输出结果
    console.log(result.counts.join(' '));
}();