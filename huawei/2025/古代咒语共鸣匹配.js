const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    while (true) {
        let line = await readline();
        if (!line) break;

        // 1. 解析输入
        const parts = line.split('|');
        const scrollTextRaw = parts[0];
        const incantationsRaw = parts.slice(1);

        // 辅助函数：分词、去标点、转小写
        const parseRunes = (text) => {
            if (!text) return [];
            return text.trim().split(/\s+/).map(token => {
                // 去除首尾的非字母数字字符 (保留中间的如 hyphen)
                return token.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '').toLowerCase();
            }).filter(t => t.length > 0);
        };

        const scrollRunes = parseRunes(scrollTextRaw);
        const L = scrollRunes.length;

        // 2. 预计算卷轴中符文的位置能量信息
        // Map: 符文 -> 第一次出现的索引 (p)
        const scrollMap = new Map();
        scrollRunes.forEach((word, index) => {
            if (!scrollMap.has(word)) {
                scrollMap.set(word, index);
            }
        });

        // 获取单个符文的位置能量函数
        const getPositionEnergy = (word) => {
            if (!scrollMap.has(word)) return 0.0;
            const p = scrollMap.get(word);
            if (L <= 1) return 1.0; // 特殊情况 L=1
            return 1.0 - (p / (L - 1));
        };

        const results = [];

        // 3. 处理每一条咒语
        for (const incRaw of incantationsRaw) {
            const incRunes = parseRunes(incRaw);
            const k = incRunes.length;

            if (k === 0) {
                results.push("0.0000");
                continue;
            }

            // 找出所有匹配的符文
            const matchedRunes = incRunes.filter(r => scrollMap.has(r));
            const i = matchedRunes.length;

            // --- 计算匹配度 (Match Score) ---
            let matchScore = 0.0;

            if (i === 0) {
                // 静默 (Silence)
                matchScore = 0.0;
            } else if (i === k) {
                // 所有符文都匹配，判断是完美还是部分
                // 检查是否为子序列 (Subsequence Check)
                let scrollIdx = 0;
                let incIdx = 0;
                while (scrollIdx < L && incIdx < k) {
                    if (scrollRunes[scrollIdx] === incRunes[incIdx]) {
                        incIdx++;
                    }
                    scrollIdx++;
                }

                if (incIdx === k) {
                    matchScore = 1.0; // 完美谐振
                } else {
                    matchScore = 0.8; // 部分谐振
                }
            } else {
                // 微弱回响 (Faint Echo)
                matchScore = 0.6 * (i / k);
            }

            // --- 计算位置能量 (Positional Energy) ---
            // 咒语的总位置能量 = 所有匹配到的符文的位置能量之和
            let totalPositionalEnergy = 0.0;
            const uniqueMatchedRunes = new Set(matchedRunes); // 使用 Set 去重
            for (const r of uniqueMatchedRunes) {
                totalPositionalEnergy += getPositionEnergy(r);
            }

            // --- 最终计算 ---
            // 共鸣分数 = 匹配度 * 总位置能量
            const rawScore = matchScore * totalPositionalEnergy;

            // 精度处理：小数点后第4位之后的直接截断
            // Math.floor(1.23456 * 10000) = 12345 -> /10000 = 1.2345
            const finalScore = Math.floor(rawScore * 10000) / 10000;

            results.push(finalScore.toFixed(4));
        }

        // 输出结果，用 | 分隔
        console.log(results.join('|'));
    }
}();