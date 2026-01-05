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

function maxDepth(root: TreeNode | null): number {
    // 基础情况：如果节点为空，深度为0
    if (root === null) return 0;

    // 递归计算左子树和柚子树的最大深度
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    // 返回较大值 + 1
    return Math.max(leftDepth, rightDepth) + 1;
}
