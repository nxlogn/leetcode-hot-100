/**
 * 遍历每一个格子
 * 遇到1，count+1
 * 从当前1出发，dfs递归，每搜索到一个1，改为0
 * @param grid 
 */
function numIslands(grid: string[][]): number {
    // 边界情况处理
    if (!grid || grid.length === 0) return 0;

    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    // dfs
    const dfs = (r: number, c: number) => {
        // 递归终止条件
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
            return;
        }

        // 标记
        grid[r][c] = '0';

        // 递归
        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    // 遍历
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // 遇到1，触发dfs
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }

    return count;
};