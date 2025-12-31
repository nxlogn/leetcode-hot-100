
var maxArea = function(height: number[]): number {
    // 能盛多少水由更短的一方决定
    let left = 0;
    let right = height.length - 1;

    let maxArea = 0;
    while (left < right) {
        // 计算当前面积
        const currentArea = Math.min(height[left], height[right]) * (right - left);
        // 更新maxArea
        maxArea = Math.max(maxArea, currentArea);
        // 移动指向较短一方的指针
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    // 返回maxArea
    return maxArea;
};