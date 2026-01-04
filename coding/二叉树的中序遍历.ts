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

function inorderTraversal(root: TreeNode | null): number[] {
    const res: number[] = [];
    const stack: TreeNode[] = [];
    let curr: TreeNode | null = root;

    while (curr !== null || stack.length > 0) {
        // 尽可能向左走,并把路径上的节点入栈
        while (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        // 此时左边已经到底了,弹出最近的节点(当前的根)
        curr = stack.pop()!;
        res.push(curr.val);

        // 转向柚子树
        curr = curr.right;
    }

    return res;
};