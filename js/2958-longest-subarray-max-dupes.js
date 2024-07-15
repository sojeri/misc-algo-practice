/**
 * https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/description/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function(nums, k) {
    return maxLessNaive(nums, k);
};

/**
 * second solution using a more sliding window-y approach to solving
 * runtime O(n) since only checking each element approx once
 * space is still O(2n) because I throw everything in a map
 * @param {*} nums 
 * @param {*} k 
 * @returns 
 */
function maxLessNaive(nums, k) {
    if (k==1 && nums.length == 1) return 1;
    let max = -1, i=0, j=0;
    let dict = { [nums[i]]: 1 }
    while (i < nums.length && j < nums.length) {
        if (max === nums.length) return max;
        if (i === j) {
            dict = { [nums[i]]: 1 };
            j++;
            continue;
        }

        const left = nums[i];
        const right = nums[j];
        if (dict[right] == k)  {
            max = Math.max(j - i, max);
            dict[left] -= 1;
            i++;
            continue;
        }

        if (dict[right]) {
            dict[right] += 1;
        } else {
            dict[right] = 1;
        }

        if (j + 1 == nums.length) {
            max = Math.max(j - i + 1, max);
            dict[left] -= 1;
            i++;
            continue;
        }
        
        j++;
    }
    return max;
}

/**
 * initial brute force solution
 * runtime O(n^2) because for every n, might have to check every other n
 * space is O(2n) since I shove everything into a map each outer loop
 * @param {*} nums 
 * @param {*} k 
 * @returns 
 */
function maxNaive(nums, k) {
    if (k==1 && nums.length == 1) return 1;
    let max = -1;
    for (let i=0; i< nums.length; i++) {
        const dict = { [nums[i]]: 1 }
        for (let j=i+1; j < nums.length; j++) {
            const current = nums[j];
            if (dict[current] == k)  {
                max = Math.max(j - i, max);
                break;
            }

            if (dict[current]) {
                dict[current] += 1;
            } else {
                dict[current] = 1;
            }

            if (j + 1 == nums.length) {
                max = Math.max(j - i + 1, max);
            }
        }
    }
    return max;
}