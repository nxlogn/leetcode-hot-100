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
 * 在二叉搜索树中,中序遍历的结果是一个升序序列,因此,我们只需要按中序遍历的顺序访问节点,当访问到第k个节点时
 * 更改节点的值即为答案
 * @param root
 * @param k
 */
function kthSmallest(root: TreeNode | null, k: number): number {
    const stack: TreeNode[] = [];
    let curr: TreeNode | null = root;

    // 只要栈不为空或当前节点不空，就继续遍历
    while (curr !== null || stack.length > 0) {
        // 尽可能向左走,将路径上的节点入栈
        while (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        // 弹出栈顶节点，当前最小的
        curr = stack.pop()!;

        // 计数
        k--;
        if (k === 0) {
            return curr.val;
        }

        // 转向右子树
        curr = curr.right;
    }
}
