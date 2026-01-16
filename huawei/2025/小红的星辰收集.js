const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 循环读取每一行输入
    while (line = await readline()) {
        let nums = line.trim().split(/\s+/).map(Number);

        // 如果数组为空
        if (nums.length === 0) {
            console.log(0);
            continue;
        }

        // 动态规划
        // prev2: dp[i-2]
        // prev1: dp[i-1]
        let prev2 = 0;
        let prev1 = 0;

        for (let num of nums) {
            // 核心公式：比较“不拿当前”和拿当前
            let currentMax = Math.max(prev1, prev2 + num);

            prev2 = prev1;
            prev1 = currentMax;
        }

        // 最终结果存储在prev1中
        console.log(prev1);
    }
}();