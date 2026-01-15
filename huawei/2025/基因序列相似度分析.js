const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 读取第一行，最大容忍度D
    let line = await readline();
    if (!line) return;
    const D = parseInt(line.trim());

    // 读取第二行，序列总数N
    line = await readline();
    const N = parseInt(line.trim());

    // 读取N行基因序列数据库
    const dbSeqs = [];
    for (let i = 0; i < N; i++) {
        const seq = (await readline()).trim();
        dbSeqs.push(seq);
    }

    // 读取最后一行，待测基因片段
    const querySeq = (await readline()).trim();

    // 逻辑处理开始

    // 情况： 精确匹配 如果完全相同，直接输出该序列
    for (const seq of dbSeqs) {
        if (seq === querySeq) {
            console.log(seq);
            return;
        }
    }

    // 情况：模糊匹配
    const results = [];

    for (const seq of dbSeqs) {
        const dist = levenshteinDistance(seq, querySeq);
        if (dist <= D) {
            results.push({ seq: seq, dist: dist});
        }
    }

    // 情况：无匹配
    if (results.length === 0) {
        console.log("None");
        return;
    }

    // 排序逻辑
    // 先按距离从小到大
    // 再按字典序从小到大
    results.sort((a, b) => {
        if (a.dist !== b.dist) {
            return a.dist - b.dist;
        }
        return a.seq < b.seq ? -1 : 1;
    })

    // 输出结果
    console.log(results.map(item => item.seq).join(' '));
}();

/**
 * 计算两个字符串的编辑距离
 * @param {*} s1 
 * @param {*} s2 
 * @returns {number} 编辑距离
 */
function levenshteinDistance(s1, s2) {
    const m = s1.length;
    const n = s2.length;

    // 初始化DP矩阵
    // rows：m+1，cols：n+1
    const dp = Array.from({length: m + 1}, () => new Int32Array(n + 1));

    // 初始化边界
    for (let i = 0; i <= m; i++) dp[i][0] = i; // 全删除
    for (let j = 0; j <= n; j++) dp[0][j] = j; // 全插入

    // dp填表
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                // 字符相同，不需要操作
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // 字符不同，取三种操作的最小值 + 1
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // 删除
                    dp[i][j - 1] + 1, // 插入 
                    dp[i - 1][j - 1] + 1 // 替换
                )
            }
        }
    }

    return dp[m][n];
}