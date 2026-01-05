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
 * 什么是最大直径-->节点的左子树最大深度+右子树最大深度
 * @param root
 */
function diameterOfBinaryTree(root: TreeNode | null): number {
    let maxDiamerter = 0;

    // 辅助函数:计算节点深度,并在此过程中更新全局最大直径
    function getDepth(node: TreeNode | null): number {
        if (node === null) {
            return 0;
        }

        // 递归计算左右子树的深度
        const leftDepth = getDepth(node.left);
        const rightDepth = getDepth(node.right);

        // 更新最大直径
        maxDiamerter = Math.max(maxDiamerter, leftDepth + rightDepth);

        // 返回该节点的深度,供父结点使用
        return Math.max(leftDepth, rightDepth) + 1;
    }

    getDepth(root);
    return maxDiamerter;
}
