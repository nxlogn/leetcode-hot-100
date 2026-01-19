const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取 N
    const line1 = await readline();
    if (!line1) return;
    const N = parseInt(line1.trim());

    // 2. 初始化分组容器
    const groups = {
        1: [], // 巨龙血脉
        2: [], // 精灵之森
        3: []  // 深海智者
    };

    // 3. 读取并解析每一个候选人
    for (let i = 0; i < N; i++) {
        const line = await readline();
        if (!line) break;
        const parts = line.trim().split(/\s+/).map(Number);
        
        const id = parts[0];
        const type = parts[1];
        // 提取印记，并过滤掉 0 (0表示没有印记，不算冲突)
        // Set 可以加快查找速度
        const runes = new Set(parts.slice(2).filter(r => r !== 0));

        if (groups[type]) {
            groups[type].push({ id, runes });
        }
    }

    // 4. 预排序：确保每个组内的候选人按 ID 升序排列
    // 这样后续的多层循环直接产生的输出顺序就是符合题目要求的
    groups[1].sort((a, b) => a.id - b.id);
    groups[2].sort((a, b) => a.id - b.id);
    groups[3].sort((a, b) => a.id - b.id);

    const results = [];

    // 辅助函数：检查两个人的印记是否有重合
    const hasOverlap = (personA, personB) => {
        // 遍历 A 的印记，看 B 是否有
        for (let r of personA.runes) {
            if (personB.runes.has(r)) return true;
        }
        return false;
    };

    // 5. 三层循环暴力枚举
    for (const p1 of groups[1]) {
        for (const p2 of groups[2]) {
            // 剪枝：如果前两人已经冲突，不需要看第三人
            if (hasOverlap(p1, p2)) continue;

            for (const p3 of groups[3]) {
                // 检查 p1-p3 和 p2-p3 是否冲突
                if (hasOverlap(p1, p3)) continue;
                if (hasOverlap(p2, p3)) continue;

                // 找到合法组合
                results.push(`${p1.id} ${p2.id} ${p3.id}`);
            }
        }
    }

    // 6. 输出结果
    if (results.length === 0) {
        console.log("-1");
    } else {
        // 题目要求每个组合占一行
        console.log(results.join("\n"));
    }
}();