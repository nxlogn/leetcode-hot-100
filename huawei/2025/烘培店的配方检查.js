const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 读取一行输入
    const line = await readline();
    if (!line) return;

    // 按空格分隔字符
    const parts = line.trim().split(/\s+/);

    // 如果输入不足，直接结束
    if (parts.length < 1) {
        return;
    }

    // 第一个是主配方
    const T = parts[0];
    // 剩下的是配料包数组
    const candidates = parts.slice(1);

    // 用 map 来统计兼容配料包的出现次数
    const validCounts = new Map();

    for (const pack of candidates) {
        // 判断: pack 必须是 T 的前缀
        if (T.startsWith(pack)) {
            validCounts.set(pack, (validCounts.get(pack) || 0) + 1);
        }
    }

    // 如果没有兼容的配料包,输出 null
    if (validCounts.size === 0) {
        console.log("null");
        return;
    }

    // 将 map 转为数组排序
    const sortedPacks = Array.from(validCounts.entries());

    // 按照字符串长度从长到短排序
    sortedPacks.sort((a, b) => b[0].length - a[0].length);

    // 按格式输出
    for (const [pack, count] of sortedPacks) {
        console.log(`${pack} ${count}`);
    }
}()