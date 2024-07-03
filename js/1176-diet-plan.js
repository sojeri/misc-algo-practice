/**
 * https://leetcode.com/problems/diet-plan-performance/
 * algo uses O(1) space and runs in O(n) time.
 * tests passed in 57ms.
 * there is no handling for irregular data, eg, if k is 7 days but 10 are passed in,
 *   then an error would be thrown in the second cycle when trying to sum the week.
 * @param {number[]} calories
 * @param {number} k
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var dietPlanPerformance = function(calories, k, lower, upper) {
    let points = 0;
    for (let i=0; i < calories.length; i += k) {
        let sum = calories[i];
        for (let j = i+1; j < i+k; j++) {
            sum += calories[j];
        }
        if (sum < lower) points--;
        if (sum > upper) points++;
    }
    return points;
};