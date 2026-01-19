const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取所有输入数据
    const tokens = [];
    while (true) {
        const line = await readline();
        if (!line) break;
        // 处理可能存在的换行或多个空格
        const parts = line.trim().split(/\s+/);
        for (const p of parts) {
            if (p) tokens.push(Number(p));
        }
    }

    if (tokens.length < 2) return;

    const k = tokens[0];
    const m = tokens[1];
    const byteSeq = tokens.slice(2);

    // 2. 构建比特数组 (Bit Array)
    const bits = [];
    for (const byte of byteSeq) {
        // 题目规定 bit0 对应前一个位置，bit7 对应后一个位置
        for (let i = 0; i < 8; i++) {
            bits.push((byte >> i) & 1);
        }
    }

    const totalBits = bits.length;
    const holes = [];
    let currentStart = -1;

    // 3. 线性扫描找出连续的空闲段
    for (let i = 0; i < totalBits; i++) {
        if (bits[i] === 1) {
            if (currentStart === -1) currentStart = i;
        } else {
            if (currentStart !== -1) {
                holes.push({ start: currentStart, len: i - currentStart });
                currentStart = -1;
            }
        }
    }
    // 处理结尾的连续段
    if (currentStart !== -1) {
        holes.push({ start: currentStart, len: totalBits - currentStart });
    }

    // 4. 处理环形首尾相连的情况
    // 如果不只一个块，且首尾都是空闲的，则合并它们
    // (如果只有一个块且覆盖了全环，则不需要合并)
    if (holes.length > 1 && holes[0].start === 0 && (holes[holes.length - 1].start + holes[holes.length - 1].len === totalBits)) {
        const first = holes[0];
        const last = holes[holes.length - 1];
        
        // 合并：保留尾部块的 start，长度加上头部块的长度
        last.len += first.len;
        // 移除头部块（因为它已经被合并到尾部块里了）
        holes.shift();
    }

    // 5. 筛选符合长度要求的块
    const candidates = holes.filter(h => h.len >= k);

    if (candidates.length === 0) {
        console.log("-1");
        return;
    }

    // 6. 计算距离的辅助函数
    const getDist = (start, currentM, total) => {
        if (start > currentM) return start - currentM;
        return (start + total) - currentM;
    };

    // 7. 排序 (Best-Fit, 然后 Nearest-First)
    candidates.sort((a, b) => {
        // 优先按长度升序 (Best-Fit: 长度越小越接近 k)
        if (a.len !== b.len) {
            return a.len - b.len;
        }
        // 长度相同，按距离升序 (Nearest-First)
        const distA = getDist(a.start, m, totalBits);
        const distB = getDist(b.start, m, totalBits);
        return distA - distB;
    });

    // 输出最优块的起始位置
    console.log(candidates[0].start);
}();