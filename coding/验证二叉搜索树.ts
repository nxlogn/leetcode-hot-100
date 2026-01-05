/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * 每个节点的比较上界和下界是不同->递归过程中更新上下界为本节点val
 * @param root
 */
function isValidBST(root: TreeNode | null): boolean {
    function validata(
        node: TreeNode | null,
        low: number,
        high: number
    ): boolean {
        if (!node) return true;

        // 检查当前节点值是否在允许的范围内(low, high)
        if (node.val <= low || node.val >= high) {
            return false;
        }

        // 递归检查左右子树
        // 左子树所有节点必须小于当前节点:范围变为(low, node.val)
        // 右子树所有节点必须大于当前节点:范围变为(node.val, high)
        return (
            validata(node.left, low, node.val) &&
            validata(node.right, node.val, high)
        );
    }

    return validata(root, -Infinity, Infinity);
}
