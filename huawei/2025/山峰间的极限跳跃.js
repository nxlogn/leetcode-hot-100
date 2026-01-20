const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取第一行 N 和 K
    let line1 = await readline();
    if (!line1) return;
    const [N, K] = line1.trim().split(/\s+/).map(Number);

    // 2. 读取所有的节点描述行到数组中
    // 这样做是因为我们需要同步地递归构建树，先读取所有数据处理起来更方便
    const rawData = [];
    for (let i = 0; i < N; i++) {
        let line = await readline();
        if (line) {
            rawData.push(line.trim().split(/\s+/).map(Number));
        }
    }

    // 全局索引，用于构建树
    let cursor = 0;

    // 节点类定义（简单对象）
    // { val: number, left: node|null, right: node|null }

    /**
     * 递归构建二叉树
     * 根据题目描述，输入严格遵循先序遍历顺序
     */
    function buildTree() {
        if (cursor >= rawData.length) return null;

        const [val, leftVal, rightVal] = rawData[cursor];
        cursor++; // 移动到下一行数据

        const node = { val: val, left: null, right: null };

        // 如果左子节点存在，递归构建左子树
        // 因为是先序遍历，下一行数据必然属于左子树（除非左子树为空）
        if (leftVal !== -1) {
            node.left = buildTree();
        }

        // 左子树构建完毕后，如果右子节点存在，递归构建右子树
        if (rightVal !== -1) {
            node.right = buildTree();
        }

        return node;
    }

    // 构建树的根节点
    const root = buildTree();

    // 记录全局最长路径
    let maxLen = 0;


    /**
     * DFS 遍历寻找最长路径
     * @param {Object} node - 当前节点
     * @param {number} parentVal - 父节点的高度
     * @param {number} lenEndingUp - 以父节点结尾，且最后一步是"上升"的路径长度
     * @param {number} lenEndingDown - 以父节点结尾，且最后一步是"下降"的路径长度
     */
    function dfs(node, parentVal, lenEndingUp, lenEndingDown) {
        if (!node) return;

        // 当前节点作为路径终点的默认长度为 1
        let currentEndingUp = 1;
        let currentEndingDown = 1;

        // 如果不是根节点，尝试从父节点延续路径
        if (parentVal !== -1) {
            const diff = Math.abs(node.val - parentVal);

            // 必须满足极限跳跃阈值 K
            if (diff >= K) {
                if (node.val > parentVal) {
                    // 当前是"上升" (Up)
                    // 要形成交替，上一步必须是"下降" (Down)
                    // 状态转移：延续父节点的 Down 路径
                    currentEndingUp = lenEndingDown + 1;
                } else if (node.val < parentVal) {
                    // 当前是"下降" (Down)
                    // 要形成交替，上一步必须是"上升" (Up)
                    // 状态转移：延续父节点的 Up 路径
                    currentEndingDown = lenEndingUp + 1;
                }
            }
        }

        // 更新全局最大值
        maxLen = Math.max(maxLen, currentEndingUp, currentEndingDown);

        // 继续递归子节点，将当前的状态传递下去
        dfs(node.left, node.val, currentEndingUp, currentEndingDown);
        dfs(node.right, node.val, currentEndingUp, currentEndingDown);
    }

    // 从根节点开始 DFS
    // 根节点没有父节点，parentVal 设为 -1，前序路径长度设为 0
    // 这样子节点计算时，1 = 0 + 1，逻辑成立
    dfs(root, -1, 0, 0);

    console.log(maxLen);
}();