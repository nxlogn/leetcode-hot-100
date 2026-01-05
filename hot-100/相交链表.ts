/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function getIntersectionNode(
    headA: ListNode | null,
    headB: ListNode | null
): ListNode | null {
    // 边界情况处理：如果任意链表为空，不可能相交
    if (headA === null || headB === null) {
        return null;
    }

    let pA: ListNode | null = headA;
    let pB: listNode | null = headB;

    // 只要两个指针不相等,就继续遍历
    // 情况1:有交点
    // 情况2:无交点
    while (pA !== pB) {
        // pA到了null,跳到headB
        // 否则，走一步
        pA = pA === null ? headB : pA.next;

        // 如果pB到了null,跳到headA
        // 否则走一步
        pB = pB === null ? headA : pB.next;
    }

    return pA;
}
