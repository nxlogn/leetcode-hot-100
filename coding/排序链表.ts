class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function sortList(head: ListNode | null): ListNode | null {
    // 1.递归终止条件: 如果链表为空或只有一个节点,直接返回
    if (!head || !head.next) return head;

    // 2.找到链表的中点并断开
    // 使用快慢指针，mid是前半部分的末尾
    const mid = getMid(head);
    const rightHead = mid.next;
    mid.next = null; // 断开连接

    // 3. 递归排序左右两部分
    const left = sortList(head);
    const right = sortList(rightHead);

    // 合并两个有序链表
    return merge(left, right);
}

/**
 * 辅助函数：使用快慢指针找到链表的中点
 */
function getMid(head: ListNode): ListNode {
    let slow = head;
    let fast = head.next; // fast从第二个节点开始，确保slow停在前半部分的末尾

    while (fast && fast.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }
    return slow;
}

/**
 * 辅助函数：合并两个有序链表
 */
function merge(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }

    // 处理剩余节点
    curr.next = list1 ? list1 : list2;

    return dummy.next;
}
