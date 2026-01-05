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
 * 核心思路：前缀和 (Prefix Sum)这道题其实是“两数之和”或“和为 K 的子数组”在树上的变种。
 * 我们维护一个哈希表（Map），记录从根节点到当前节点路径上所有前缀和出现的次数。
 * 公式推导：如果有两个节点A 和 B（A 是 B 的祖先），且 前缀和(B) - 前缀和(A) = targetSum，
 * 那么 A 到 B 之间的路径和就等于 targetSum。转换一下就是：我们到了节点 $B$，
 * 只需要查找哈希表里是否存在 前缀和(B) - targetSum。
 * 回溯 (Backtracking)：这是树形结构的关键。当我们遍历完左子树回到父节点，准备去右子树时，
 * 必须把左子树产生的前缀和从 Map 中移除，否则右子树会错误地用到左子树的数据。
 * @param root
 * @param targetSum
 */
function pathSum(root: TreeNode | null, targetSum: number): number {
    // key:前缀和，value：该前缀和出现的次数
    const prefixMap = new Map<number, number>();

    // 初始化，前缀和为0的情况出现1次
    // 作用：如果某个节点的前缀和本身就等于targetSum，那么（currSum - targetSum） = 0
    // 这时候我们需要map里有一个0来代表这种情况
    prefixMap.set(0, 1);

    let count = 0;

    /**
     * 深度优先搜索
     * @param node 
     * @param currSum 
     */
    function dfs(node: TreeNode | null, currSum: number) {
        if(node === null) {
            return;
        }

        // 更新当前路径的前缀和
        currSum += node.val;

        // 核心判断
        const valToCheck = currSum - targetSum;
        if (prefixMap.has(valToCheck)) {
            count += prefixMap.get(valToCheck)!;
        }

        // 将当前的前缀和记录到Map中,供子节点使用
        prefixMap.set(currSum, (prefixMap.get(currSum) || 0) + 1);

        // 递归左右子树
        dfs(node.left, currSum);
        dfs(node.right, currSum);

        // 回溯
        prefixMap.set(currSum, prefixMap.get(currSum)! - 1);
    }

    dfs(root, 0);

    return count;
}
