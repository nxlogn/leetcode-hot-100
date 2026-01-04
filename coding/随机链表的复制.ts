class _Node {
    val: number
    next: _Node | null
    random: _Node | null

    constructor(val?: number, next?: _Node, random?: _Node) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
        this.random = (random === undefined ? null : random)
    }
}



function copyRandomList(head: _Node | null): _Node | null {
    if (!head) return null;

    // key是原节点,value是对应的克隆节点
    const map = new Map<_Node, _Node>();

    // 第一遍,创建所有节点并存入map
    let curr: _Node | null = head;
    while (curr) {
        map.set(curr, new _Node(curr.val));
        curr = curr.next;
    }

    // 第二遍，连接next和random指针
    curr = head;
    while (curr) {
        const newNode = map.get(curr)!;
        // 如果原节点有next.则新节点指向map中对应的克隆next
        newNode.next = curr.next ? map.get(curr.next)! : null;
        // 关键:处理随机指针
        newNode.random = curr.random ? map.get(curr.random)! : null;
        curr = curr.next;
    }

    return map.get(head)!;
};