/**
 * https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring/
 * tests passed in ~50ms
 * runtime O(n), space O(1) -- max, current, left, right + i/j iterators.
 * would have preferred to add test case for '()=abc to force myself to sanitize inputs
 *   -- because I am using the underlying code points solve this.
 *   '()= is four continuous ASCII/unicode chars, but per the problem should return 3 for the abc.
 *   only letters are valid.
 *   also no handling for capital vs lowercase letters! though it should still work for english.
 *   this might fail on other alphabet languages depending on how they're stored in unicode.
 * refs:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
 * + https://www.asciitable.com/ to find symbols which should fail this but technically don't
 * @param {string} s
 * @return {number}
 */
var longestContinuousSubstring = function(s) {
    let max = 0;
    let current, left, right;
    for (let i=0; i < s.length; i++) {
        current = 1;
        left = s.charCodeAt(i);
        for (let j=i+1; j < s.length; j++) {
            right = s.charCodeAt(j);
            if (left + 1 !== right) break;

            current++;
            left = right;
            i++; // no need to recheck part of current
        }

        if (current > max) max = current;
    }

    return max;
};