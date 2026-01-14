const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 读取N
    const line1 = await readline();
    if (!line1) return;
    const N = parseInt(line1.trim());

    // 读取数组
    const line2 = await readline();
    const P = line2.trim().split(/\s+/).map(Number);

    // 读取L和R
    const line3 = await readline();
    const [L, R] = line3.trim().split(/\s+/).map(Number);

    // 构建前缀和数组
    // S的长度比P多1,S[0]存0,方便计算从头开始的区间
    const S = new Int32Array(N+1);
    S[0] = 0;
    for (let i = 0; i < N; i++) {
        S[i + 1] = S[i] + P[i];
    }
    let count = 0;

    // 双重循环枚举所有子区间
    // i是起始位置,对应下标i
    // j是结束位置,对应下标j
    // p[i,j] = S[j + 1] - S[i]
    for (let i = 0; i < N; i++) {
        for (let j = i; j < N; j++) {
            // 利用前缀和计算区间和
            const rangeSum = S[j + 1] - S[i];

            // 判断是否在目标区间内
            if (rangeSum >= L && rangeSum <= R) {
                count++;
            }
        }
    }

    console.log(count);
}();
