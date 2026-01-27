function generateParenthesis(n: number): string[] {
    const result: string[] = [];

    /**
     * 
     * @param currentStr 当前构建的字符串
     * @param left 已经使用的左括号数量
     * @param right 已经使用的右括号数量
     */
    const backtrack = (currentStr: string, left: number, right: number) => {
        // 终止条件: 当字符串长度等于 2 * n时,说明找到了一组有效组合
        if (currentStr.length === 2 * n) {
            result.push(currentStr);
            return;
        }

        // 剪枝与递归

        // 如果左括号数量小于 n, 我们可以添加一个左括号
        if (left < n) {
            backtrack(currentStr + '(', left + 1, right);
        }
        
        // 如果右括号数量小于左括号数量,可以添加一个右括号
        if (right < left) {
            backtrack(currentStr + ')', left, right + 1);
        }
    };

    // 初始调用：空字符串，左括号0个，右括号0个
    backtrack("", 0, 0);

    return result;
};