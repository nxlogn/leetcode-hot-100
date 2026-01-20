const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取节点总数 N
    let line1 = await readline();
    if (!line1) return;
    const N = parseInt(line1.trim());

    // 2. 读取节点数组 V
    let line2 = await readline();
    // 处理可能的空行或格式问题，按空格分割并转为数字
    const V = line2.trim().split(/\s+/).map(Number);

    // 3. 读取目标能量值 E
    let line3 = await readline();
    const E = parseInt(line3.trim());

    // 用于存储满足条件的路径总数
    let totalPaths = 0;
    // 标记是否存在"任意"符合结构规则的共鸣路径 (无论能量和是多少)
    let hasAnyValidPath = false;

    /**
     * 判断节点是否为叶子节点
     * @param {number} idx - 节点在数组中的索引
     * @returns 
     */
    function isLeaf(idx) {
        const leftIdx = 2 * idx + 1;
        const rightIdx = 2 * idx + 2;

        const leftExists = leftIdx < N && V[leftIdx] !== -1;
        const rightExists = rightIdx < N && V[rightIdx] !== -1;

        return !leftExists && !rightExists;
    }

    /**
     * 深度优先搜索寻找共鸣路径
     * @param {number} currIdx - 当前节点索引
     * @param {number} currentSum - 当前路径能量和
     * @param {number} length - 当前路径长度（节点数）
     * @param {number} lastDir - 上一步的方向。0: 起点(无方向), 1: 来自左边(即当前是左子节点), 2: 来自右边(即当前是右子节点)
     */
    function dfs(currIdx, currentSum, length, lastDir) {
        // 如果当前是叶子节点，检查路径有效性
        if (isLeaf(currIdx)) {
            // 只要长度 >= 3，就说明树中存在合法的共鸣路径结构
            if (length >= 3) {
                hasAnyValidPath = true;
                // 只有能量和也匹配时，才计入结果
                if (currentSum === E) {
                    totalPaths++;
                }
            }
            return;
        }

        const leftChildIdx = 2 * currIdx + 1;
        const rightChildIdx = 2 * currIdx + 2;

        // 尝试向左走 (Left Child)
        // 条件：左子节点存在，且 (是第一步 或者 上一步是向右走的)
        if (leftChildIdx < N && V[leftChildIdx] !== -1) {
            if (length === 1 || lastDir === 2) {
                dfs(leftChildIdx, currentSum + V[leftChildIdx], length + 1, 1);
            }
        }

        // 尝试向右走 (Right Child)
        // 条件：右子节点存在，且 (是第一步 或者 上一步是向左走的)
        if (rightChildIdx < N && V[rightChildIdx] !== -1) {
            if (length === 1 || lastDir === 1) {
                dfs(rightChildIdx, currentSum + V[rightChildIdx], length + 1, 2);
            }
        }
    }

    // 4. 主循环：尝试将树中的每一个节点作为路径的起点
    for (let i = 0; i < N; i++) {
        // 跳过不存在的节点 (-1)
        if (V[i] === -1) continue;

        // 发起搜索：
        // 参数：当前索引 i，当前和 V[i]，长度 1，上一步方向 0 (起点)
        dfs(i, V[i], 1, 0);
    }

    // 如果连一条符合结构的路径（长度>=3且之字形）都找不到，说明树太小或结构不满足，输出 -1
    if (!hasAnyValidPath) {
        console.log("-1");
    } else {
        // 否则输出找到的匹配能量的路径数（可能是 0，也可能是正整数）
        console.log(totalPaths);
    }

}();