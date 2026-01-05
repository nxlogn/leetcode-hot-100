class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // 创建dummynode，指向头节点
    const dummy = new ListNode(0);
    dummy.next = head;

    // 初始化快慢指针，都指向dummy节点
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    // 快指针先走n+1步
    // 为了让slow停在被删除节点的前一个位置
    for (let i = 0; i <= n; i++) {
        fast = fast!.next;
    }

    // 快慢指针同时移动，直到快指针到达链表末尾
    while (fast !== null) {
        fast = fast.next;
        slow = slow!.next;
    }

    // 此时slow就在待删除节点的前面，执行删除
    slow!.next = slow!.next!.next;

    // 返回dummy节点的下一个节点
    return dummy.next;
}
