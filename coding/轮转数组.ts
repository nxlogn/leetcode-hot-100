import { stat } from "node:fs";

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    // k为0的情况
    if (k === 0) return;

    // k的处理
    if (k > nums.length) {
        k = k % nums.length;
    }

    // reverse:固定区间的翻转
    const reverse = (arr: number[], start:number, end:number) => {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }

    // 三次翻转
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);

    return;
};