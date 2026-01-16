const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const rawLine = await readline();
    if (rawLine === undefined) return;
    let line = rawLine.trim();
    if (!line) return;
    solve(line);
}();

function solve(line) {
    // 分割等号左右
    let [lhsStr, rhsStr] = line.split('=');
    lhsStr = lhsStr.replace(/\s+/g, '');
    let rhs = BigInt(rhsStr.trim());

    // 预处理左边表达式: 处理隐式乘法
    let formattedLhs = formatExpression(lhsStr);

    // 计算左边表达式,得到{k, b} kx + b
    let res = evaluate(formattedLhs);

    // 求解kx + b = rhs => x = (rhs - b) / k;
    if (res.k === 0n) {
        return;
    }
    let x = (rhs - res.b) / res.k;
    console.log(x.toString());
}

// 插入隐式乘号的逻辑
function formatExpression(s) {
    let res = [];
    for (let i = 0; i < s.length; i++) {
        res.push(s[i]);
        if (i < s.length - 1) {
            let curr = s[i];
            let next = s[i + 1];
            let isDigit = (c) => c >= '0' && c <= '9';
            let isX = (c) => c === 'x';
            let isLeftPar = (c) => c === '(';
            let isRightPar = (c) => c === ')';

            // 需要补乘号的情况：
            // 数字(  数字x
            // x(  x数字
            // )数字 )x )(
            let needMul = false;
            if (isDigit(curr) && (isX(next) || isLeftPar(next))) needMul = true;
            if (isX(curr) && (isDigit(next) || isLeftPar(next))) needMul = true;
            if (isRightPar(curr) && (isDigit(next) || isX(next) || isLeftPar(next))) needMul = true;

            if (needMul) {
                res.push('*');
            }
        }
    }
    return res.join('');
}

// 表达式求值
function evaluate(s) {
    // 线性结构 kx + b
    class Linear {
        constructor(k, b) {
            this.k = BigInt(k);
            this.b = BigInt(b);
        }
    }

    let nums = []; // 存放 Linear 对象
    let ops = []; // 存放运算符

    // 定义优先级
    const precedence = { '+': 1, '-': 1, '*': 2 };

    const applyOp = () => {
        let op = ops.pop();
        let b = nums.pop();
        let a = nums.pop();

        let res;
        if (op === '+') {
            res = new Linear(a.k + b.k, a.b + b.b);
        } else if (op === '-') {
            res = new Linear(a.k - b.k, a.b - b.b);
        } else if (op === '*') {
            // 线性方程中,乘法的一边必须是常数
            if (a.k !== 0n && b.k !== 0n) {
                // 题目保证是线性
                throw new Error('Non-linear');
            }
            if (a.k === 0n) {
                res = new Linear(b.k * a.b, b.b * a.b);
            } else {
                res = new Linear(a.k * b.b, a.b * b.b);
            }
        }
        nums.push(res);
    }

    let i = 0;

    while (i < s.length) {
        let c = s[i];
        if (c === '(') {
            ops.push('(');
            i++;
        } else if (c === ')') {
            while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                applyOp();
            }
            ops.pop(); // 弹出'('
            i++;
        } else if (c === 'x') {
            nums.push(new Linear(1, 0)); // x => 1*x + 0
            i++;
        } else if (c >= '0' && c <= '9') {
            let numStr = "";
            while (i < s.length && s[i] >= '0' && s[i] <= '9') {
                numStr += s[i];
                i++;
            }
            nums.push(new Linear(0, numStr)) // 常数 n => 0*x + n 
        } else if (c === '+' || c === '-' || c === '*') {
            // 如果 - 号出现在开或者 ( 后面,视作 0 - x
            if (c === '-' && (i === 0 || s[i - 1] === '(')) {
                nums.push(new Linear(0, 0));
            }

            // 保证先乘除后加减
            while (ops.length > 0 && ops[ops.length - 1] !== '(' &&
                precedence[ops[ops.length - 1]] >= precedence[c]) {
                    applyOp();
            }

            ops.push(c);
            i++;
        } else {
            i++; // 忽略空格等非法字符
        }
    }

    // 有可能最后一个右括号但是ops还有操作符
    while (ops.length > 0) {
        applyOp();
    }

    return nums[0];
}