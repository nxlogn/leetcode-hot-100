// 最小堆类
class KthLargestMinHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    size(): number {
        return this.heap.length;
    }

    peek(): number {
        return this.heap[0];
    }

    push(val: number): void {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop(): number | undefined {
        // 堆为空
        if (this.size() === 0) return undefined;
        // 暂存堆顶元素
        const top = this.heap[0];
        // 取出数组末尾的元素
        const last = this.heap.pop();
        if (this.size() > 0 && last !== undefined) {
            // 末尾元素放到堆顶,填补空缺
            this.heap[0] = last;
            // 执行下沉,恢复堆的性质
            this.bubbleDown(0);
        }
        return top;
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private bubbleUp(index: number): void {
        while (index > 0) {
            // 计算父结点索引
            const parentIndex = Math.floor((index - 1) / 2);

            // 如果当前节点 >= 父结点，说明满足最小对性质，无需上浮
            if (this.heap[index] >= this.heap[parentIndex]) break;

            // 否则，交换当前节点和父结点
            this.swap(index, parentIndex);

            // 更新索引，继续向上检查
            index = parentIndex;
        }
    }

    private bubbleDown(index: number): void {
        while (true) {
            // 计算左右子节点的索引
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let smallest = index; // 假设当前节点是最小的

            // 比较左子节点: 如果左子节点存在 且 比当前最小值还小
            if (leftChild < this.size() && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }

            // 比较右子节点: 如果右子节点存在 且 比当前最小值还小
            if (rightChild < this.size() && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }

            // 如果当前节点已经是最小的，停止循环
            if (smallest === index) break;
            // 否则，交换当前节点和最小子节点
            this.swap(index, smallest);
            // 更新索引，继续从新的位置向下检查
            index = smallest;
        }
    } 
}

function findKthLargest(nums: number[], k: number): number {
    const minHeap = new KthLargestMinHeap();

    for (const num of nums) {
        minHeap.push(num);
        // 如果堆的大小超过k,弹出最小的元素
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    // 堆顶就是第 k 大的元素
    return minHeap.peek();
}

