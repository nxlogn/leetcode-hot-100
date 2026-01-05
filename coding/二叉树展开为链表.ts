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
 Do not return anything, modify root in-place instead.
 */

/**
 * 问题转化:如何找到一个节点左子树最后一个节点?-->如何将左子树移到右子树?
 * @param root
 */
function flatten(root: TreeNode | null): void {
    let curr = root;

    while (curr !== null) {
        // 如果左子树存在,进行移动操作
        if (curr.left !== null) {
            // 找到左子树中最右边的节点
            // 这个节点是左子树在前序遍历中的最后一个节点
            let next = curr.left;
            let predecessor = next;

            while (predecessor.right !== null) {
                predecessor = predecessor.right;
            }

            // 将当前节点原本的右子树,接到左子树最右节点的后面
            predecessor.right = curr.right;

            // 将左子树移动到右边
            curr.right = next;

            // 将左指针置空
            curr.left = null;
        }

        // 继续处理下一个节点
        curr = curr.right;
    }
}
