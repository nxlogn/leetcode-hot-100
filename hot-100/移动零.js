/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let left = 0;
    let right = 0;
    while (right < nums.length) {
        // right指向的元素为0,跳过
        if (nums[right] === 0) {
            right++;
        } else {
            // right指向的元素不为0，交换
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right++;
        }
    }
};
