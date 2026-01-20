const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;



void async function () {
    // 1. 读取所有输入数据
    const lines = [];
    while (true) {
        const line = await readline();
        if (line === undefined) break;
        if (line.trim() !== '') {
            lines.push(line.trim());
        }
    }

    // 将所有输入转换为数字流
    let tokens = [];
    for (const line of lines) {
        // 处理一行可能有多个数字的情况
        const parts = line.split(/\s+/);
        for (const p of parts) {
            if (p !== '') tokens.push(Number(p));
        }
    }

    if (tokens.length === 0) return;

    let ptr = 0;
    const F = tokens[ptr++];
    const M = tokens[ptr++];
    const N = tokens[ptr++];

    // 预检查：如果总车位少于飞船总数，直接不可能
    // 注意：虽然最后也会检查，但这能提前剪枝
    if (N > F * M) {
        console.log("-1");
        return;
    }

    // 2. 将星舰按“首选层级”归类
    // buckets[i] 存储所有首选层级为 i 的星舰
    const buckets = Array.from({ length: F + 1 }, () => []);
    for (let i = 0; i < N; i++) {
        const R = tokens[ptr++];
        const P = tokens[ptr++];
        buckets[R].push({ r: R, p: P });
    }

    // 3. 简单的最大堆实现 (用于贪心策略)
    class MaxHeap {
        constructor() {
            this.heap = [];
        }
        push(val) {
            this.heap.push(val);
            this._siftUp();
        }
        pop() {
            if (this.size() === 0) return null;
            const top = this.heap[0];
            const bottom = this.heap.pop();
            if (this.size() > 0) {
                this.heap[0] = bottom;
                this._siftDown();
            }
            return top;
        }
        size() {
            return this.heap.length;
        }
        _siftUp() {
            let node = this.heap.length - 1;
            while (node > 0) {
                const parent = (node - 1) >>> 1;
                // 按船员人数 P 降序排列
                if (this.heap[node].p > this.heap[parent].p) {
                    [this.heap[node], this.heap[parent]] = [this.heap[parent], this.heap[node]];
                    node = parent;
                } else {
                    break;
                }
            }
        }
        _siftDown() {
            let node = 0;
            while ((node << 1) + 1 < this.heap.length) {
                let child = (node << 1) + 1;
                if (child + 1 < this.heap.length && this.heap[child + 1].p > this.heap[child].p) {
                    child++;
                }
                if (this.heap[child].p > this.heap[node].p) {
                    [this.heap[node], this.heap[child]] = [this.heap[child], this.heap[node]];
                    node = child;
                } else {
                    break;
                }
            }
        }
    }

    const pq = new MaxHeap();
    let totalCost = 0;
    let parkedCount = 0;

    // 4. 从最高层 F 向下遍历到 1
    for (let currentLevel = F; currentLevel >= 1; currentLevel--) {
        // 将所有首选该层的星舰加入候选池
        const newShips = buckets[currentLevel];
        if (newShips) {
            for (const ship of newShips) {
                pq.push(ship);
            }
        }

        // 当前层有 M 个泊位
        let spots = M;

        // 只要还有泊位且还有等待的飞船，就安排停泊
        while (spots > 0 && pq.size() > 0) {
            // 取出 P (船员数) 最大的飞船，因为让它下降一层代价最大
            const ship = pq.pop();
            
            // 计算费用：人数 * (2 + (首选层 - 实际停泊层))
            // 注意：ship.r 是首选层，currentLevel 是实际层
            const cost = ship.p * (2 + (ship.r - currentLevel));
            
            totalCost += cost;
            parkedCount++;
            spots--;
        }
        
        // 这一层没停下的飞船，自动留在 pq 中，带入下一层循环 (currentLevel - 1)
        // 它们的能耗代价会因为层数降低而自动增加（在下一层计算时 (ship.r - nextLevel) 会变大）
    }

    // 5. 输出结果
    // 如果停泊总数小于申请总数，说明无法安排
    if (parkedCount < N) {
        console.log("-1");
    } else {
        console.log(totalCost);
    }
}()