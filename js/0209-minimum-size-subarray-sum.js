/**
 * https://leetcode.com/problems/minimum-size-subarray-sum/
 * runtime O(n^2), space O(1)
 * test cases added:
 * 74 [1,1,1,(.... 73 total 1s)]
 * 74 [2,3,1,2,4,3,20,80,1,2,5,5,5,5,1,33,44,42]
 * @param {number} target | target sum
 * @param {number[]} nums | array of numbers to find continuous subarray which sum up to (or greater than) target
 * @return {number} the size of the continuous subarray, or 0 if no matches
 */
var minSubArrayLen = function(target, nums) {
    let size=nums.length, isMatch=false;
    for (let i=0; i<nums.length; i++) {
        let sum = nums[i];
        if (sum >= target && 1 < size) {
            return 1;
        }
        for (let j=i+1; j<nums.length; j++) {
            sum += nums[j];
            if (sum >= target && j - i < size) {
                size = j - i + 1;
                if (size === 1) return 1;
                isMatch = true;
                continue;
            }
        }

        if (i===0 && !isMatch) break;
    }

    return isMatch ? size : 0;
};