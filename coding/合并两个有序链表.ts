class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function mergeTwoLists(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
    // 创建一个哨兵节点,next指针指向合并后链表的真正头部
    const prehead = new ListNode(-1);

    // 保持一个指针,指向当前合并链表的最后一个节点
    let prev = prehead;

    // 循环比较两个链表的节点值
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            prev.next = list1;
            list1 = list1.next;
        } else {
            prev.next = list2;
            list2 = list2.next;
        }
        prev = prev.next;
    }

    // 处理剩余节点
    if (list1 !== null) {
        prev.next = list1;
    } else {
        prev.next = list2;
    }

    return prehead.next;
}
