class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

/**
 * 层序遍历的最后一个节点组成的答案就是右视图
 * @param root
 */
function rightSideView(root: TreeNode | null): number[] {
    // 如果根节点为空，直接返回空数组
    if (!root) return [];

    const result: number[] = [];
    const queue: TreeNode[] = [root]; // 初始化队列，放入根节点

    // 当队列不为空时，说明还有层级没遍历完
    while (queue.length > 0) {
        const levelSize = queue.length; // 当前层的节点数量
        let lastNodeOfLevel: TreeNode;

        // 遍历当前层的每一个节点
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!; // 取出首节点
            lastNodeOfLevel = node;

            // 如果有左子节点,加入队列
            if (node.left) {
                queue.push(node.left);
            }
            // 如果有右子节点,加入队列
            if (node.right) {
                queue.push(node.right);
            }
        }

        // 当前层结束
        result.push(lastNodeOfLevel!.val);
    }
}
