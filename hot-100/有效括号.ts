function isValid(s: string): boolean {
    // 剪枝: 如果是奇数长度,绝对不可能
    if (s.length % 2 !== 0) return false;

    const stack: string[] = [];

    // 建立一个映射表，方便快速查找匹配关系
    const map: Record<string, string> = {
        ")": "(",
        "]": "[",
        "}": "{" 
    };

    for (const char of s) {
        // 如果当前字符是右括号
        if (char in map) {
            // 取出栈顶元素,如果没有元素则为 undefined
            const topElement = stack.pop();

            // 如果栈顶元素不是对应的左括号，匹配失败
            if (topElement !== map[char]) {
                return false;
            }
        }
        // 如果是左括号，直接入栈
        else {
            stack.push(char);
        }
    }

    // 最后检查栈是否清空
    return stack.length === 0;
};