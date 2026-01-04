
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
 * 如何层层比较-->先序遍历
 * @param root 
 * @returns 
 */
function isSymmetric(root: TreeNode | null): boolean {
    if (!root) return true;

    // 检查左右子树是否对称
    return check(root.left, root.right);
};

function check(p: TreeNode | null, q: TreeNode | null): boolean {
    // 两个都为空,对称
    if (!p && !q) return true;

    // 其中一个为空或val不等
    if (!p || !q || p.val !== q.val) return false;

    // 递归比较
    return check(p.left, q.right) && check(p.right, q.left);
}