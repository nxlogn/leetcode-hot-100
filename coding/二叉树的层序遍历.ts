class TreeNode {
    val: number;
    right: TreeNode | null;
    left: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

/**
 * 如何一层一层-->bfs
 * @param root
 */
function levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) return result;

    // 使用数组模拟队列
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        // 记录当前层的节点个数
        const levelSize = queue.length;
        const currentLevel: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            // 弹出队列最前面的节点
            const node = queue.shift()!;
            currentLevel.push(node.val);

            // 将下一层的孩子节点入队
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // 将当前层的结果存入总结果中
        result.push(currentLevel);
    }

    return result;
}
