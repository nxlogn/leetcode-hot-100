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
 * 问题转化：如何快速在两个数组中找到节点的index和左子树的区间和右子树的区间？--？map
 * @param preorder
 * @param inorder
 * @returns
 */
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    // 构建哈希表,快速定位inorder中的索引
    // key：节点值，value：在inorder数组中的索引
    const indexMap = new Map<number, number>();
    inorder.forEach((val, index) => {
        indexMap.set(val, index);
    });

    // 定义递归函数
    // preStart, preEnd:当前子树在 preorder 中的范围
    // inStart, inEnd: 当前子树在 inorder 中的范围
    function build(
        preStart: number,
        preEnd: number,
        inStart: number,
        inEnd: number
    ): TreeNode | null {
        // 递归终止条件: 范围无效
        if (preStart > preEnd || inStart > inEnd) {
            return null;
        }

        // 第一步,确定根节点
        // 前序遍历的第一个节点就是根节点
        const rootVal = preorder[preStart];
        const root = new TreeNode(rootVal);

        // 第二步，在中序遍历中找到根节点的位置
        const rootIndexInInOrder = indexMap.get(rootVal)!;

        // 第三步，计算左子树的节点数量
        const leftSubtreeSize = rootIndexInInOrder - inStart;

        // 递归构建左右子树

        // 构建左子树
        root.left = build(
            preStart + 1,
            preStart + leftSubtreeSize,
            inStart,
            rootIndexInInOrder - 1
        );

        // 构建右子树
        root.right = build(
            preStart + leftSubtreeSize + 1,
            preEnd,
            rootIndexInInOrder + 1,
            inEnd
        );

        return root;
    }

    // 启动递归
    return build(0, preorder.length - 1, 0, inorder.length - 1);
}
