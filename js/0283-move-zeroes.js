/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    return moveZerosInPlaceTwoPointers(nums);
};

/**
 * initial thought
 * O(n) runtime but uses O(n) space
 * @param {*} nums 
 */
function moveZeroesNaive(nums) {
    const values = [];
    nums.forEach(num => {
        if (num !== 0) {
            values.push(num);
        }
    });

    nums.forEach((_, n) => {
        const next = values[n] || 0;
        nums[n] = next;
    });
}

/**
 * brute force modify in place
 * O(n^2) runtime and modifies in place
 * O(1) space
 * @param {*} nums 
 */
function moveZerosNaiveInPlace(nums) {
    for (let l = 0; l < nums.length; l++) {
        if (nums[l] !== 0) continue;
        innerLoop:
            for (let r=l+1; r < nums.length; r++) {
                if (nums[r] !== 0) {
                    nums[l] = nums[r];
                    nums[r] = 0;
                    break innerLoop;
                }
            }
    }
}

/**
 * two pointer modify in place
 * O(n) runtime, O(1) space
 * @param {*} nums 
 */
function moveZerosInPlaceTwoPointers(nums) {
    let r = 0;
    for (let l = 0; l < nums.length; l++) {
        while (r < nums.length && nums[l] === 0) {
            if (nums[r] === 0) {
                r++;
            } else {
                nums[l] = nums[r];
                nums[r] = 0;
            }
        }
        r++;
    }
}