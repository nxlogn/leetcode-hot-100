function letterCombinations(digits: string): string[] {
    // 处理边界情况：如果输入为空，返回空数组
    if (digits.length === 0) {
        return [];
    }

    // 建立数字到字母的映射表
    const phoneMap: { [key: string]: string} = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz',
    };

    const result: string[] = [];

    // 定义回溯函数
    // index: 当前正在处理 digits 中的第几个数组
    // currentStr: 当前拼接成的字符串
    function backtrack(index: number, currentStr: string) {
        // 终止条件：如果我们处理完了所有的数字
        if (index === digits.length) {
            result.push(currentStr);
            return;
        }

        // 获取当前数字对应的字母字符串
        const currentDigit = digits[index];
        const letters = phoneMap[currentDigit];

        // 遍历该数字代表的每一个字母，并进入下一层递归
        for (let i = 0; i < letters.length; i++) {
            backtrack(index + 1, currentStr + letters[i]);
        }
    }

    // 从第 0 个数字开始启动回溯
    backtrack(0, '');

    return result;
}