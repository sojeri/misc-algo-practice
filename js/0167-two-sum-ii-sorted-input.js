/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    return ohhhhhhhh(numbers, target);
};

/**
 * initial solutionto meet constant space req 
 * runtime: O(n^2)
 * space: O(1)
 */
function twoSumConstantSpace(numbers, target) {
    for (let i=0; i < numbers.length; i++) {
        const left = numbers[i];
        for (let j=i+1; j < numbers.length; j++) {
            const right = numbers[j];
            if (left + right === target) return [i+1, j+1];
            if (left + right > target) break;
        }
    }
    return [];
}

/**
 * instinctual solution which doesn't meet space req
 * runtime O(n)
 * space O(n)
 */
function twoSumFast(numbers, target) {
    const dict = {};
    for (let i=0; i < numbers.length; i++) {
        const right = numbers[i];
        const left = dict[target - right];
        if (left) return [left, i+1];

        dict[right] = i + 1;
    }

    return [];
}

/**
 * runtime: O(n/2)
 * space: O(1)
 * but honestly doesn't run much faster than twoSumFast
 */
function ohhhhhhhh(numbers, target) {
    let l=0, r = numbers.length-1;
    let left=numbers[l], right=numbers[r];
    while (l < r) {
        if (left + right == target) return [l+1, r+1];
        if ((left + right) > target) {
            r--;
            right = numbers[r];
        } else {
            l++;
            left = numbers[l];
        }
    }

    return [];
}
