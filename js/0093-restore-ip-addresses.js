/**
 * lookup is faster than str -> num compute in JS,
 * so keep track of seen IP segments */
let seen = {}

/** 
 * @param {*} numStr a numeric string which might
 * be a valid IP segment
 * @returns a boolean flag indicating whether the
 * string value is a valid segment (true=yes)
 */
function isValidIpSegment(numStr) {
    if (seen[numStr]) return seen[numStr];

    if (numStr.length > 1 && numStr[0] == '0') {
        seen[numStr] = false;
    } else {
        seen[numStr] = Number.parseInt(numStr) <= 255;
    }

    return seen[numStr];
}

/**
 * https://leetcode.com/problems/restore-ip-addresses/
 * runtime is sort of O(n), sort of O(n^3)
 * -- because there is a loop in a loop in a loop.
 * this ran in ~40ms, faster than 97%?
 * 
 * space is also O(n^3) because of my isValidIPSegment implementation. for a reduction in performance, the seen map could easily be skips and we could compute number/string things every time. that would bring space down to roughly O(n)
 * 
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const validIPs = [], i=0;
    for (let j=i+1; j < s.length - 2; j++) {
        let first = s.slice(i, j);
        if (!isValidIpSegment(first)) continue;

        for (let k=j+1; k < s.length - 1; k++) {
            let second = s.slice(j, k);
            if (!isValidIpSegment(second)) continue;

            for (let l=k+1; l < s.length; l++) {
                let third = s.slice(k, l);
                let fourth = s.slice(l);
                if (
                    !isValidIpSegment(third) ||
                    !isValidIpSegment(fourth)
                ) continue;
                validIPs.push(
                    `${first}.${second}.${third}.${fourth}`
                )
            }
        }
    }
    
    return validIPs;
};