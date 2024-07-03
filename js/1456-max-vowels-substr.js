/**
 * https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
 * needed to add a test case to force sliding window vs checking distinct separate cycles
 * new test case: bbaaaabb, returns 2 if only checking sep cycles, returns 4 if checking correctly
 * algo runtime is O(n) because we have to check every character once
 *   space complexity is O(1)
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    const isVowel = /a|e|i|o|u/g;
    let max = 0;
    let currentScore = 0;
    for (let i=0; i+k <= s.length; i++) {
        const isFirstCycle = i === 0;
        const isIVowel = s[i].match(isVowel);
        if (isFirstCycle) {
            let initialScore = 0;
            if (isIVowel) initialScore++;
            for (let j=i+1; j < i + k && j < s.length; j++) {
                const isJVowel = s[j].match(isVowel);
                if (isJVowel) initialScore++;
            }
            currentScore = initialScore;
            if (initialScore > max) {
                max = initialScore;
            };
        } else {
            const j = i + k - 1;
            const isJVowel = s[j]?.match(isVowel);
            if (isJVowel) currentScore++;
            if (currentScore > max) max = currentScore;
        }
        if (isIVowel) currentScore--;
    }
    return max;
};