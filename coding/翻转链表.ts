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

function reverseList(head: ListNode | null): ListNode | null {
    // 记录前一个节点
    let prev: ListNode | null = null;
    // curr记录当前节点
    let curr: ListNode | null = head;

    while (curr !== null) {
        // 暂存下一个节点
        const nextTemp: ListNode | null = curr.next;

        // 当前节点的指针反向
        curr.next = prev;

        // 指针后移
        prev = curr;

        // 指针后移
        curr = nextTemp;
    }

    // 循环结束，curr为null
    return prev;
}
