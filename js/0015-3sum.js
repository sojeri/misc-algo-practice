/**
 * https://leetcode.com/problems/3sum/description/
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    return threeSumSorted(nums)
};

/**
 * initial brute force solution
 * - runtime O(n^3) 💀
 * - space O(n)
 */
function threeSumNaive(nums) {
    const seen = {};
    const output = [];
    for (let i=0; i < nums.length; i++) {
        for (let j=i+1; j < nums.length; j++) {
            if (i===j) continue;
            for (let k=j+1; k < nums.length; k++) {
                if (i===k || j===k) continue;
                const first = nums[i], second=nums[j], third=nums[k];
                if (first + second + third === 0) {
                    const match = [first, second, third].sort();
                    // bonus perf issue! see matchKey comments below
                    const matchStr = match.join(',');
                    if (!seen[matchStr]) {
                        seen[matchStr] = true;
                        output.push(match);
                    }
                }
            }
        }
    }

    return output;
}

/**
 * second thought: add another dict for values to skip the inner loop.
 * still have to store/check indices to ensure not reusing unique values.
 * eg, don't want to find match [-1, -1, 2] if input is [-1, 2].
 * faster than @see threeSumNaive.
 * 
 * - runtime: O(n^2)
 * - space: O(n)
 */
function threeSumFaster(nums) {
    const values = {};
    nums.forEach((num, n) => {
        if (values[num]) {
            if (values[num].length < 3) values[num].push(n);
        } else {
            values[num] = [n];
        }
    })
    if (Object.keys(values).length === 1 && nums[0] === 0) return [[0,0,0]];

    const seen = {};
    const output = [];
    for (let i=0; i < nums.length; i++) {
        for (let j=i+1; j < nums.length; j++) {
            if (i===j) continue;
            const first = nums[i], second=nums[j];
            const needThird = (first + second) * -1;
            const possibleKs = values[needThird] || [];
            let isValidK = false;
            for (let p=0; p < possibleKs.length; p++) {
                const k = possibleKs[p];
                if (i===k || j===k) continue;
                isValidK = true;
                break;
            }
            if (isValidK) {
                const match = [first, second, needThird].sort();
                // some kinda sus logic here just to get around js num->str slowness
                // initial thought was just to match.join(","), but it timed out large inputs
                // can't use native JS Set, either, because it uses strict equal === which
                // only checks instrinsic object sameness, doesn't check deep equal values.
                // ie, any two arrays, whether same values or not, would never be considered
                // same unless they are the same exact instance of array. and you can't reuse
                // the array getting pushed in, because the pointer to the array is pushed in
                // future updates to the array would alter the one in the Set.
                // and thus---- matchKey sus math to track seen on an object
                const matchKey = match[0] + (match[1] * 1_000) + (match[2] * 100_000);
                if (!seen[matchKey]) {
                    seen[matchKey] = true;
                    output.push(match);
                }
            }
        }
    }
    return output;
}

/**
 * - space O(n)
 * - runtime O(n^2) -- but faster than @see threeSumFaster because:
 *   - it sorts whole set once rather than each triplet over and over,
 *     which clogs processing for long inputs
 *   - also some minor perf & memory improvement in dupe check logic,
 *     because only creating match array on finding new match
 */
function threeSumSorted(unsortedNums) {
    const nums = unsortedNums.sort((a,b) => a - b);
    const seen = {};
    const output = [];
    for (let i=0; i < nums.length; i++) {
        const first = nums[i];
        let low = i+1; high = nums.length - 1;
        while (low < high && high > i) {
            const second = nums[low];
            const third = nums[high];
            const sum = first + second + third;
            if (sum > 0) {
                high--;
            } else if (sum < 0) {
                low++;
            } else { // sum === 0
                const matchKey = first + (second * 1_000) + (third * 100_000);
                if (!seen[matchKey]) {
                    seen[matchKey] = true;
                    output.push([first, second, third]);
                }
                low++;
                high--;
            }
        }
    }
    return output;
}
