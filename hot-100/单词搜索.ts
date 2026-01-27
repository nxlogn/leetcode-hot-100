function partition(s: string): string[][] {
    const result: string[][] = [];
    const path: string[] = []; // 记录当前的分割方案

    // 辅助函数：判断子串 s[left...right] 是否为回文
    const isPalindrome = (left: number, right: number): boolean => {
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    // 回溯函数
    const backtrack = (startIndex: number) => {
        // 终止条件：起始位置已经到了字符串末尾，说明分割完成
        if (startIndex === s.length) {
            result.push([...path]);
            return;
        }

        // 尝试从 startIndex 开始的每一个位置进行切割
        for (let i = startIndex; i < s.length; i++) {
            // 判断当前切出来的子串 s[startIndex...i] 是否为回文
            if (isPalindrome(startIndex, i)) {
                // 是回文,加入路径
                const substring = s.substring(startIndex, i + 1);
                path.push(substring);

                // 递归: 继续分割剩下的部分
                backtrack(i + 1);

                // 回溯: 撤销刚才的选择,尝试别的切法
                path.pop();
            }
        }
    };

    backtrack(0);

    return result;
}