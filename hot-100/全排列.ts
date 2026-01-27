function permute(nums: number[]): number[][] {
    const res: number[][] = [];
    const track: number[] = [];

    // used 数组用于记录当前路径中已使用的数字索引
    const used: boolean[] = new Array(nums.length).fill(false);

    const backtrack = () => {
        // 结束条件: 路径长度等于 nums 长度
        if (track.length === nums.length) {
            // 需要拷贝一份 track
            res.push([...track]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            // 如果该数字已经使用过,则跳过
            if (used[i]) {
                continue;
            }

            // 做选择
            track.push(nums[i]);
            used[i] = true;

            // 进入下一层决策树
            backtrack();

            // 撤销选择
            track.pop();
            used[i] = false;
        }
    };

    backtrack();
    return res;
}