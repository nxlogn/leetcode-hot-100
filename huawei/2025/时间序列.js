const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取 N 和 M
    const line1 = await readline();
    if (!line1) return;
    const [N, M] = line1.trim().split(/\s+/).map(Number);

    // 2. 读取序列 A
    const line2 = await readline();
    const A = line2.trim().split(/\s+/).map(Number);

    // 3. 读取序列 B
    const line3 = await readline();
    const B = line3.trim().split(/\s+/).map(Number);

    // 4. 初始化 DP 数组 ( (N+1) x (M+1) )
    // dp[i][j] 默认为 0
    const dp = Array.from({ length: N + 1 }, () => new Int32Array(M + 1));

    // 5. 开始动态规划计算
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= M; j++) {
            // 计算当前两个元素的共鸣度（注意 A和B 的索引是从 0 开始，所以是 i-1 和 j-1）
            const resonance = Math.abs(A[i - 1] - B[j - 1]);

            // 状态转移：取 上方、左方、左上方+当前共鸣度 中的最大值
            const skipA = dp[i - 1][j];
            const skipB = dp[i][j - 1];
            const match = dp[i - 1][j - 1] + resonance;

            dp[i][j] = Math.max(skipA, skipB, match);
        }
    }

    // 6. 输出结果
    console.log(dp[N][M]);
}();