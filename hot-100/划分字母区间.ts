function partitionLabels(s: string): number[] {
    // 1. 第一次便利, 记录每次字符最后出现的位置
    const lastPos: Record<string, number> = {};
    for (let i = 0; i < s.length; i++) {
        lastPos[s[i]] = i;
    }

    const result: number[] = [];
    let start = 0; // 当前片段的起始位置
    let end = 0; // 当前片段需要延伸的最远位置

    // 2. 第二次便利,确定片段边界
    for (let i = 0; i < s.length; i++) {
        // 当前字符的最远位置如果比现在的 end 远，就更新 end
        end = Math.max(end, lastPos[s[i]]);

        // 如果遇到了 end, 说明当前片段可以结束了
        if (i === end) {
            result.push(end - start + 1);
            start = end + 1; // 更新下一个片段的起始位置
        }
    }

    return result;
};