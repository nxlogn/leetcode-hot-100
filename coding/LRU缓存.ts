/**
 * 双向链表节点定义
 */
class DNode {
    key: number;
    value: number;
    prev: DNode | null = null;
    next: DNode | null = null;
    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    private capacity: number;
    private map: Map<number, DNode>;
    private head: DNode; // 虚拟头节点
    private tail: DNode; // 虚拟尾结点

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();

        // 初始化虚拟头尾节点,简化边界处理
        this.head = new DNode(0, 0);
        this.tail = new DNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        const node = this.map.get(key);
        if (!node) return -1;

        // 如果存在，先移动到链表头部再返回
        this.moveToHead(node);
        return node.value;
    }

    put(key: number, value: number): void {
        const node = this.map.get(key);

        if (node) {
            // 如果key已存在，更新，移到头部
            node.value = value;
            this.moveToHead(node);
        } else {
            // 如果key不存在,创建新节点
            const newNode = new DNode(key, value);
            this.map.set(key, newNode);
            this.addToHead(newNode);

            // 检查是否超过容量
            if (this.map.size > this.capacity) {
                const removedNode = this.removeTail();
                this.map.delete(removedNode.key);
            }
        }
    }

    /**
     * 将节点添加到双向链表的头部
     */
    private addToHead(node: DNode): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    /**
     * 从双向链表中删除一个节点
     */
    private removeNode(node: DNode): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }

    /**
     * 将现有节点移动到头部
     */
    private moveToHead(node: DNode): void {
        this.removeNode(node);
        this.addToHead(node);
    }

    /**
     * 淘汰最久未使用的节点
     */
    private removeTail(): DNode {
        const lruNode = this.tail.prev!;
        this.removeNode(lruNode);
        return lruNode;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
