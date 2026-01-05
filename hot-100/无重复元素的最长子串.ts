function lengthOfLongestSubstring(s: string): number {
    // 滑动窗口
    let left = 0;
    let right = 0;
    // 记录窗口中的字符
    const window: Set<string> = new Set();
    // 记录最长子串的长度
    let maxLength = 0;
    // 遍历字符串
    while (right < s.length) {
        // 如果窗口中不包含当前字符
        if (!window.has(s[right])) {
            // 加入窗口
            window.add(s[right]);
            // 更新最长子串的长度
            maxLength = Math.max(maxLength, right - left + 1);
            // 移动右指针
            right++;
        } else {
            // 移除窗口中的字符
            window.delete(s[left]);
            // 移动左指针
            left++;
        }
    }
    // 返回最长子串的长度
    return maxLength;
}
