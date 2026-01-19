const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取 N
    const line1 = await readline();
    if (!line1) return;
    const N = parseInt(line1.trim());

    // 2. 读取数组 A
    // 为了应对大数据量（10^6），直接读取第二行并分割
    const line2 = await readline();
    if (!line2) return

    // 使用 split 分割并转换为数字
    const nums = line2.trim().split(/\s+/).map(Number);

    // 3. 初始化哈希表和变量
    // Map 的 Key 是前缀和，Value 是该前缀和出现过的下标数组
    const map = new Map();
    // 初始状态：前缀和为 0 出现在下标 0 (对应数组开始前的位置)
    map.set(0, [0]);

    let currentSum = 0;
    let minLen = Infinity;
    let count = 0;

    // 遍历数组计算前缀和
    for (let i = 0; i < N; i++) {
        currentSum += nums[i];

        // 获取当前和的历史下标列表
        let list = map.get(currentSum);
        if (!list) {
            list = [];
            map.set(currentSum, list);
        }

        // 当前的前缀和对应的下标是 i + 1
        // (因为 P[0] 是初始状态，P[1] 对应 nums[0])
        list.push(i + 1);

        // 检查是否凑齐了 3 个点
        const k = list.length;
        if (k >= 3) {
            // 取出倒数第 3 个点的下标，计算长度
            // 只要看最近的这三个点即可，因为它们构成了以当前点结尾的最短合法区间
            const len = list[k-1] - list[k-3];

            if (len < minLen) {
                // 发现更短的长度，更新最小值，重置计数
                minLen = len;
                count = 1;
            } else if (len === minLen) {
                // 发现相同长度，累加计数
                count++;
            }
        }
    }
    
    // 5. 输出结果
    if (minLen === Infinity) {
        console.log("-1 -1");
    } else {
        console.log(`${minLen} ${count}`);
    }
}();