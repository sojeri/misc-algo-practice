/**
 * https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/
 * resulting algo is O(n) runtime and O(1) space.
 * a very minimal runtime savings is made by multiplying threshold by k
 *   rather than checking the subarray average in each loop.
 * basic tests ran in 62ms.
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function(arr, k, threshold) {
    let matches = 0;
    const stop = arr.length - k;
    const check = threshold * k; // for checking against full sum
    for (let i = 0; i <= stop; i++) {
        let sum = arr[i];
        for (let j = i+1; j < i+k; j++) {
            sum += arr[j];
        }
        if (sum >= check) {
            matches++;
        }
    }
    return matches;
};