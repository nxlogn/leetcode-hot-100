
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

/**
 * @param root
 * 对于树中的每一个节点，交换左右孩子
 */

function invertTree(root: TreeNode | null): TreeNode | null {
    // base case:如果节点为空,返回null
    if (root === null) return null;

    // 暂存左子树,后面会被覆盖
    const left = invertTree(root.left);
    const right = invertTree(root.right);

    // 交换左右孩子
    root.left = right;
    root.right = left;

    // 返回翻转后的根节点
};