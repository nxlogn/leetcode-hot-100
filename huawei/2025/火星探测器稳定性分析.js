const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var iter = rl[Symbol.asyncIterator]();

const readline = async () => (await iter.next()).value;

void async function () {
    // 读取N
    let line = await readline();
    if (!line) return;
    const N = parseInt(line.trim());

    // 读取数组数据
    const nums = [];
    while (nums.length < N) {
        line = await readline();
        if (!line) break;
        // 使用正则分割空格，防止多个空格的情况
        const parts = line.trim().split(/\s+/);
        for (const part of parts) {
            if (part) nums.push(parseInt(part));
        }
    }

    // 核心逻辑
    let maxLength = 0;
    let results = []; // 存储[start, end]

    // 统计当前窗口内每个数字出现的次数
    // 题目数据范围[0.30]
    const freq = new Int32Array(31);

    let left = 0;

    // 辅助函数：获取当前窗口的极差
    // 只需要扫描18-24这几个数字
    const getDiff = () => {
        let min = -1, max = -1;
        for (let i = 18; i <= 24; i++) {
            if (freq[i] > 0) {
                if (min === -1) min = i;
                max = i;
            }
        }
        // 如果窗口为空，返回0
        if (min === -1) return 0;
        return max - min;
    };

    for (let right = 0; right < N; right++) {
        const val = nums[right];

        // 条件：数值必须在18-24之间
        if (val < 18 || val > 24) {
            left = right + 1;
            freq.fill(0); // 清空计数
            continue;
        }

        // 加入窗口
        freq[val]++;

        // 条件：max-min <= 4
        while (getDiff() > 4) {
            const leftVal = nums[left];
            freq[leftVal]--; // 收缩左边界
            left++;
        }

        // 此时窗口是合法的
        const currentLen = right - left + 1;

        if (currentLen > maxLength) {
            maxLength = currentLen;
            results = [[left, right]];
        } else if (currentLen === maxLength) {
            results.push([left, right]);
        }
    }

    // 输出结果
    for (const res of results) {
        console.log(`${res[0]} ${res[1]}`);
    }
}();