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
 * 中点作为根节点-->递归
 * @param nums
 */
function sortedArrayToBST(nums: number[]): TreeNode | null {
    // 辅助函数：通过区间[left, right]构建BST
    function build(left: number, right: number): TreeNode | null {
        if (left > right) return null;

        // 总是选择中间位置左侧的数字作为根节点
        const mid = Math.floor((left + right) / 2);
        const root = new TreeNode(nums[mid]);

        // 递归构建左右子树
        root.left = build(left, mid - 1);
        root.right = build(mid + 1, right);

        return root;
    }

    return build(0, nums.length - 1);
}
