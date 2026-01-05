class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function addTwoNumbers(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    // 创建虚拟头节点
    let dummyNode: ListNode | null = new ListNode(0);

    // cur指针指向该加入的位置
    let cur: ListNode = dummyNode;

    // 进位
    let carry: number = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
        let l1val = l1 === null ? 0 : l1.val;
        let l2val = l2 === null ? 0 : l2.val;

        // l1和l2相加
        let sum: number = l1val + l2val + carry;

        // 修改carry
        carry = Math.floor(sum / 10);

        // 本位的结果用新建节点存储
        let newNode = new ListNode(sum % 10);

        cur.next = newNode;
        cur = cur.next;

        // l1和l2进位
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    // return
    return dummyNode.next;
}
