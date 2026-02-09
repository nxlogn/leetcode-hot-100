function longestValidParentheses(s: string): number {
    const n = s.length;
    if (n === 0) return 0;

    // 初始化dp数组，长度为n，默认值为0
    // dp[i]表示以索引i结尾的最长有效括号长度
    const dp: number[] = new Array(n).fill(0);

    let maxLen = 0;

    for (let i = 1; i < n; i++) {
        // 只有遇到右括号才可能形成有效闭合
        if (s[i] === ')') {
            // 情况1 ....()
            if (s[i - 1] === '(') {
                // 当前长度
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            }

            // 情况2 ...))
            else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === '(') {
                // 找到了匹配的左括号,位置在prevIdx
                // 当前长度 = 内部长度dp[i-1] + 2 + 这一对之前连着的有效长度
                const prevValidLen = (i - dp[i - 1] - 2 >= 0) ? dp[i - dp[i - 1] - 2] : 0;
                dp[i] = dp[i - 1] + 2 + prevValidLen;
            }
        }

        maxLen = Math.max(maxLen, dp[i]);
    }

    return maxLen;
}