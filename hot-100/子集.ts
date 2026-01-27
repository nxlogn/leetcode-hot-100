function subsets(nums: number[]): number[][] {
    const res: number[][] = [];
    const track: number[] = [];

    // start 参数用于控制从哪里开始选择,避免重复和乱序
    const backtrack = (start: number) => {
        // 前序遍历位置: 进入节点就记录当前路径
        res.push([...track]);

        for (let i = start; i < nums.length; i++) {
            // 选择
            track.push(nums[i]);

            // 递归
            backtrack(i + 1);

            // 撤销选择
            track.pop();
        }
    };

    backtrack(0);

    return res;
};