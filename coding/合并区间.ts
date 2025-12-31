function merge(intervals: number[][]): number[][] {
    // 空数组情况
    if (intervals.length === 0) return [];

    // intervals按照左端点做升序排序
    intervals.sort((a, b) => a[0] - b[0]);

    // 初始化结果数组
    const merged: number[][] = [];
    merged.push(intervals[0]);

    // 遍历intervals，比较端点
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];

        // 如果当前区间的左端在lastMerged的右端点的左侧，重叠
        if (current[0] < lastMerged[1]) {
            lastMerged[1] = current[1];
        } else {
            // 如果不重叠，直接加入
            merged.push(current);
        }
    }

    // return
    return merged;
};