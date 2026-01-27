function combination(candidates: number[], target: number): number[][] {
    // result[][] 存储所有可能的排列
    const result: number[][] = [];
    const track: number[] = [];

    // 先排序
    candidates.sort((a, b) => a - b);

    function backtrack(sum: number, start: number) {
        // 和为target,加入
        if (sum === target) {
            result.push([...track]);
            return;
        }

        // 如果超过 target, 剪枝
        if (sum > target) {
            return;
        }

        // 遍历所有可能的分支
        for (let i = start; i < candidates.length; i++) {
            // 加入当前元素
            track.push(candidates[i]);
            // 进入下一层
            backtrack(sum + candidates[i], i);
            // 撤销
            track.pop();
        }
    }

    backtrack(0, 0);

    return result;
};