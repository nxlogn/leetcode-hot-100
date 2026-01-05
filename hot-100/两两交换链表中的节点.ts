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

function swapPairs(head: ListNode | null): ListNode | null {
    // 创建虚拟节点，指向head
    const dummy = new listNode(0, head);
    let temp = dummy;

    // 只有当temp后面至少两个节点时才进行交换
    while (temp.next !== null && temp.next.next !== null) {
        let node1 = temp.next;
        let node2 = temp.next.next;

        // 交换，涉及到四个节点
        temp.next = node2;
        node1.next = node2.next;
        node2.next = node1;

        // 移动temp指针，跳过已经交换的两个节点
        temp = node1;
    }

    return dummy.next;
}
