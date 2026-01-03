/**
 * 链表节点定义
 */
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function reverse(head: ListNode, tail: ListNode): [ListNode, ListNode] {
    let prev = tail.next;
    let p = head;
    while (prev !== tail) {
        let nxt = p.next;
        p.next = prev;
        prev = p;
        p = nxt!;  
    }
    return [tail, head];
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let pre = dummy;

    while (head) {
        let tail: ListNode | null = pre;

        // 查看剩余部分长度是否大于等于k
        for (let i = 0; i < k; ++i) {
            tail = tail!.next;
            if (!tail) {
                // 不足k个，直接返回结果
                return dummy.next;
            }
        }

        const nxt = tail.next;
        // 翻转这一段
        const [newHead, newTail] = reverse(head, tail);

        // 把翻转的子链表接回原链表
        pre.next = newHead;
        newTail.next = nxt;

        // 更新指针
        pre = newTail;
        head = nxt;
    }

    return dummy.next;
};