class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (lists.length === 0) return null;

    // 使用分治思想进行合并
    return solve(lists, 0, lists.length - 1);
}

/**
 * 辅助函数：通过分治递归合并链表数组
 */
function solve(
    lists: Array<ListNode | null>,
    left: number,
    right: number
): ListNode | null {
    // 递归终止条件
    if (left === right) return lists[left];

    const mid = Math.floor((left + right) / 2);

    // 递归处理左半部分和右半部分
    const l1 = solve(lists, left, mid);
    const l2 = solve(lists, mid + 1, right);

    // 合并两个排好序的链表
    return mergeTwoLists(l1, l2);
}

/**
 * 辅助函数:合并两个升序链表
 */
function mergeTwoLists(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;

    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    // 连接剩余部分
    curr.next = l1 !== null ? l1 : l2;

    return dummy.next;
}
