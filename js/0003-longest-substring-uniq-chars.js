/**
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * @param {string} s
 * @return {number}
 * runtime O(n), space O(n) b/c the set could hold everything
 * added test case 'pwwkewp'
 */
var lengthOfLongestSubstring = function(s) {
    if (s.length <= 1) return 1;

    let l = 0, left = s[0], max = 1;
    const seen = new Set([left]);

    for (let r = 1; r < s.length; r++) {
        if (l >= r) continue;

        const right = s[r];
        while (seen.has(right)) {
            seen.delete(left);
            l++;
            left = s[l];
        }
        
        seen.add(right);
        max = Math.max(max, r - l + 1);
    }

    return max;
};