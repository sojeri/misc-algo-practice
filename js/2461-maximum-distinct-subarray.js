/**
 * https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/description/
 * O(n) runtime, uses O(1) space
 * could be optimized to use a little less space and lookups by using array instead of set and
 *   then pulling lastNum from array.
 * added some test cases to validate edge cases and other sizes:
 * [1] 1 // initially tried [1] 3 but base callouts included k not bigger than array size
 * [1,5,6,4,6] 4
 * @param {number[]} nums
 * @param {number} k size of subarray
 * @return {number}
 */
var maximumSubarraySum = function(nums, k) {
    if (nums.length < k) return 0;

    let i=0, max=0, windowSum=0;
    let window = new Set();
    let lastNum;

    // first window
    for (; i < k; i++) {
        windowSum += nums[i];
        window.add(nums[i]);
    }
    if (window.size === k) {
        max = windowSum;
        lastNum = nums[0];
    }

    // remaining windows
    for (; i < nums.length; i++) {
        // cleanup last window
        window.delete(lastNum);
        windowSum -= lastNum;

        // add/check new window
        windowSum += nums[i];
        window.add(nums[i]);
        lastNum = nums[i-k+1]; // array index shenanigans

        if (window.size === k &&
            windowSum > max) {
            max = windowSum;
        }
    }

    return max;
};