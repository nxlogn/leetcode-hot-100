const rl = require('readline').createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    try {
        // 读取一行,球员评分
        let line1 = await readline();

        // 读取第二行, k 值
        let line2 = await readline();

        // 数据解析和校验
        const tokens = line1.trim().split(/\s+/);
        const players = [];

        // 正则校验: 必须是纯数字
        const validNumRegex = /^\d+$/;

        for (const t of tokens) {
            if (!validNumRegex.test(t)) {
                console.log("error");
                return;
            }
            players.push(Number(t));
        }

        if (!validNumRegex.test(line2.trim())) {
            console.log("error");
            return;
        }

        const k = Number(line2.trim());
        const n = players.length;

        // 逻辑边界校验
        if (k > n || k <= 0) {
            return;
        }

        // 贪心算法 + 单调栈
        const stack = [];

        for (let i = 0; i < n; i++) {
            const currentVal = players[i];
            const remainingPlayers = n - 1 - i; // 当前元素之后还剩多少人

            // 核心逻辑:
            // 栈不为空
            // 当前球员比栈顶球员强
            // 安全性检查,如果踢掉栈顶,剩下的加上栈里留下的,能否凑齐 k 个人?
            while (stack.length > 0 && currentVal > stack[stack.length - 1] && (stack.length + remainingPlayers) >= k) {
                stack.pop();
            }

            // 如果还没凑齐 k 人,加入
            if (stack.length < k) {
                stack.push(currentVal);
            }
        }

        // 输出
        console.log(stack.join(' '));
    } catch (e) {
        console.log("error");
    }
}();