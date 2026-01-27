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

function maxPathSum (root: TreeNode | null): number {
    // 初始化最大路径和为负无穷，防止全为负时出错
    let maxSum = -Infinity;

    /**
     * 辅助函数：计算节点能给父结点提供的最大贡献值
     */

    const maxGain = (node: TreeNode | null): number => {
        if (!node) return 0;

        // 递归计算左右子节点的最大贡献值
        // 如果子树路径和为负数,不选,当做0处理
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);

        // 计算以当前节点为拐点的路径和
        const priceNewPath = node.val + leftGain + rightGain;

        // 更新全局最大值
        maxSum = Math.max(maxSum, priceNewPath);

        // 返回当前节点能提供给父结点的路径和
        // 注意： 作为子路径通过父路径时，只能选择左边或者右边更大的一条
        return node.val + Math.max(leftGain, rightGain);
    } 

    maxGain(root);
    return maxSum;
};