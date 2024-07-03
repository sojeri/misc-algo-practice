/**
 * https://leetcode.com/problems/contains-duplicate-ii/
 * from description, it was not clear to me whether i had to be less than j,
 * so algo is O(n^2) runtime because we have to check both forwards and backwards.
 * eg, for input 1,2,3, we have to check 1 - 3, but we have also to check 3 - 1
 * -- or at least that's how I read this. the test cases did NOT confirm this assumption.
 * though now that I am thinking about it more, the absolute of 1 - 3 and 3 - 1 are both 2,
 * so maybe mathematically you don't need to check both ways? then you can improve runtime by
 * updating line 17 to let j = i+1, and deleting or commenting out line 18.
 * basic tests for this version ran in 66ms.
 * with the adjustments described on line 9, tests ran in 52ms.
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i===j) continue;
            const first = nums[i];
            const second = nums[j];
            if (first === second) {
                if (Math.abs(i - j) <= k) {
                    return true;
                }
            }
        }
    }

    return false;
};