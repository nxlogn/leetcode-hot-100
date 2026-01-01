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

function isPalindrome(head: ListNode | null): boolean {
    // 边界情况：空链表或只有一个节点
    if (head === null || head.next === null) {
        return true;
    }

    // 使用快慢指针找到链表的中间节点
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next; // 慢指针走一步
        fast = fast.next.next; // 快指针走两步
    }
    // 循环结束时，slow指向链表终点，如果是偶数个，指向下中位

    // 翻转后半部分链表
    const secondHalfStart = reverseList(slow);

    // 比较前半部分后翻转后的后半部分
    let p1: ListNode | null = head;
    let p2: ListNode | null = secondHalfStart;
    let result = true;

    while (result && p2 !== null) {
        if (p1!.val !== p2.val) {
            result = false;
        }
        p1 = p1!.next;
        p2 = p2.next;
    }

    return result;
};

// 辅助函数:翻转链表
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;

    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    return prev;
}