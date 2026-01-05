class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function hasCycle(head: ListNode | null): boolean {
    // head为空或者只有一个节点
    if (head === null || head.next === null) return false;

    // slow指针一次走一步
    let slow: ListNode | null = head;
    // fast指针一次走两步
    let fast: ListNode | null = head.next;

    while (slow !== fast) {
        // 如果快指针跑到了null，说明没有环
        if (fast === null || fast.next === null) {
            return false;
        }

        // 慢指针走一步
        slow = slow!.next;
        // 快指针走两步
        fast = fast.next.next;
    }

    return true;
}
