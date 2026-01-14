const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 1. 读取文件名数量 N
    let line = await readline();
    if (!line) return;
    const N = parseInt(line.trim());

    // 2. 读取 N 个文件名，并保留原始索引以保证稳定性
    const files = [];
    for (let i = 0; i < N; i++) {
        const name = (await readline()).trim();
        files.push({ 
            name: name, 
            index: i,
            // 预处理：直接将文件名拆解成片段，避免排序时重复计算
            segments: parseSegments(name) 
        });
    }

    // 3. 执行排序
    files.sort((a, b) => compareFiles(a, b));

    // 4. 输出结果
    files.forEach(f => console.log(f.name));
}();

/**
 * 辅助函数：解析文件名
 * 将 "ts010tc12" 解析为 -> 
 * [ {isDigit: false, val: "ts"}, {isDigit: true, val: 10}, ... ]
 */
function parseSegments(str) {
    // 正则说明：(\d+) 匹配连续数字，([^\d]+) 匹配连续非数字
    const parts = str.match(/(\d+|[^\d]+)/g) || [];
    
    return parts.map(part => {
        if (/\d/.test(part)) {
            // 如果是数字，解析为整数用于数值比较
            return { isDigit: true, val: parseInt(part, 10) };
        } else {
            // 如果是非数字，保留原字符串
            return { isDigit: false, val: part };
        }
    });
}

/**
 * 核心比较逻辑
 */
function compareFiles(fileA, fileB) {
    const segsA = fileA.segments;
    const segsB = fileB.segments;
    const minLen = Math.min(segsA.length, segsB.length);

    // 逐段比较
    for (let i = 0; i < minLen; i++) {
        const segA = segsA[i];
        const segB = segsB[i];

        // 规则 2.3: 类型不同，数字串排在非数字串前面
        if (segA.isDigit && !segB.isDigit) return -1;
        if (!segA.isDigit && segB.isDigit) return 1;

        // 类型相同
        if (segA.isDigit) {
            // 规则 2.2: 都是数字，按数值大小比较
            if (segA.val !== segB.val) {
                return segA.val - segB.val;
            }
        } else {
            // 规则 2.1: 都是非数字，按字典序比较
            if (segA.val !== segB.val) {
                return segA.val < segB.val ? -1 : 1;
            }
        }
    }

    // 规则 3: 前缀优先（短的排前面）
    // 如果循环结束还没分出胜负，说明其中一个是另一个的前缀
    if (segsA.length !== segsB.length) {
        return segsA.length - segsB.length;
    }

    // 规则 4: 稳定性
    // 如果所有规则都无法区分（等价），按原始输入顺序排
    return fileA.index - fileB.index;
}