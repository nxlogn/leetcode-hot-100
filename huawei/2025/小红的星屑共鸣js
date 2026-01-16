const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let n = 0; // 存储点的数量
    let points = []; // 存储所有点

    n = parseInt((await readline()).trim());

    // 读取n个坐标
    for (let i = 0; i < n; i++) {
        let line = (await readline()).trim();
        let parts = line.split(/\s+/);
        points.push({
            x: parseInt(parts[0]),
            y: parseInt(parts[1])
        })
    }

    // 收集满n个节点，开始计算
    if (points.length === n) {
        console.log(solve(points));
    }
}();

// 计算两点间的距离平方
function distSq(p1, p2) {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return dx * dx + dy * dy;
}

// 主函数
function solve(points) {
    // 按 x 坐标排序，如果 x 相同则按 y 排序
    points.sort((a, b) => a.x - b.x || a.y - b.y);
    return closest(points, 0, points.length - 1);
}

// 分治递归函数
function closest(points, left, right) {
    // 递归终止条件: 如果只有 1 个点或没有点,返回无穷大
    if (left >= right) return Infinity;

    // 如果只有 2 个点,直接计算距离
    if (right - left === 1) {
        return distSq(points[left], points[right]);
    }

    // 分割，找到中点
    let mid = (left + right) >> 1;
    let midX = points[mid].x;

    // 递归求解左右两边的最小距离
    let d1 = closest(points, left, mid);
    let d2 = closest(points, mid + 1, right);
    let d = Math.min(d1, d2);

    // 合并: 检查跨越中线的点对
    // 创建一个strip数组，只包含横坐标距离中线小于sqrt（d）的点
    let strip = [];
    for (let i = left; i <= right; i++) {
        let dx = points[i].x - midX;
        if (dx * dx < d) {
            strip.push(points[i]);
        }
    }

    // 将 strip 中的点按 y 坐标排序
    strip.sort((a, b) => a.y - b.y);

    // 线性扫描 strip，对于每个点，只检查它后面 y 坐标差距在 sqrt（d）以内的点
    for (let i = 0; i < strip.length; i++) {
        for (let j = i + 1; j < strip.length; j++) {
            let dy = strip[j].y - strip[i].y;
            if (dy * dy >= d) break;

            let currentDist = distSq(strip[i], strip[j]);
            d = Math.min(d, currentDist);
        }
    }

    return d;
}
