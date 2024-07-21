/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumSmaller = function(nums, target) {
    return threeSumSmallerNaive(nums, target)
};

/**
 * runtime O(n^3) (+n log n from sorting)
 * space O(n) from sorting array
 */
function threeSumSmallerNaive(unsorted, target) {
    const sorted = unsorted.sort((a,b) => a - b);
    let matches = 0;

    firstLoop:
        for (let i=0; i < sorted.length; i++) {
            const first = sorted[i];
            if (target > 0 && first > target) break firstLoop;

            secondLoop:
                for (let j=i+1; j < sorted.length; j++) {
                    const second = sorted[j];
                    if (i===j) continue secondLoop;
                    if (first > 0 && second > 0 && first + second > target) continue firstLoop;

                    thirdLoop:
                        for (let k=j+1; k < sorted.length; k++) {
                            const third = sorted[k];
                            if (k === j) continue thirdLoop;
                            if (first + second + third >= target) continue secondLoop;
                            matches++;
                        }
                }
        }

    return matches;
}