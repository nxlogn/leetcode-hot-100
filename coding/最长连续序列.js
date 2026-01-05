/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    let maxLength = 0;
    // 转换为set
    const numSet = new Set(nums);

    // 遍历numSet
    for (let num of numSet) {
        // 如果num-1不在numSet中，说明num是一个连续序列的起点
        if (!numSet.has(num - 1)) {
            // 从num开始，计算连续序列的长度
            let currentNum = num;
            let currentLength = 1;
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }
            // 更新maxLength
            maxLength = Math.max(maxLength, currentLength);
        }
    }

    // 返回maxLength
    return maxLength;
};
