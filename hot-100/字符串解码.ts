function decodeString(s: string): string {
    // 栈: 保存 [之前的字符串, 重复次数]
    const stack: [string, number][] = [];
    // 当前正在构建的字符串
    let currentStr = '';
    // 当前正在累积的数字
    let currentNum = 0;

    for (const char of s) {
        // 处理数字
        if (!isNaN(Number(char))) {
            currentNum = currentNum * 10 + Number(char);
        }
        // 处理左括号：压栈并重置
        else if (char === '[') {
            stack.push([currentStr, currentNum]);
            currentStr = '';
            currentNum = 0;
        }
        // 处理右括号：弹出并拼接
        else if (char === ']') {
            const [prevStr, num] = stack.pop()!; // pop不会为空
            currentStr = prevStr + currentStr.repeat(num);
        }
        // 处理普通字母
        else {
            currentStr += char;
        }
    }

    return currentStr;
};