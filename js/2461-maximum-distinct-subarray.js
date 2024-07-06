/**
 * https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/description/
 * O(n) runtime, uses O(1) space
 * added some test cases to validate edge cases and other sizes:
 * [1] 1 // initially tried [1] 3 but base callouts included k not bigger than array size
 * [1,5,6,4,6] 4
 * [1,5,6,4,6,5,9] 4
 * @param {number[]} nums 
 * @param {number} k size of subarray
 * @return {number}
 */
var maximumSubarraySum = function(nums, k) {
    if (nums.length < k) return 0;

    let i=0, max=0, windowSum=0, windowArr=[];
    let window;

    // first window
    for (; i < k; i++) {
        windowSum += nums[i];
        windowArr.push(nums[i]);
    }
    window = new Set(windowArr);
    if (window.size === k) max = windowSum;

    // remaining windows
    for (; i < nums.length; i++) {
        // cleanup last window
        windowSum -= windowArr.shift();

        // add/check new window
        windowSum += nums[i];
        windowArr.push(nums[i]);
        window = new Set(windowArr);

        if (window.size === k &&
            windowSum > max) {
            max = windowSum;
        }
    }

    return max;
};