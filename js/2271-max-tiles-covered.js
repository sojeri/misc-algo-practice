/**
 * https://leetcode.com/problems/maximum-white-tiles-covered-by-a-carpet/
 * tests passed in ~60ms
 * runtime O(n) since we might have to check every set of tiles
 * space used is O(1)--- see 5 vars on ln11-12 + the iterators i & j
 * @param {number[][]} tiles
 * @param {number} carpetLen
 * @return {number}
 */
var maximumWhiteTiles = function(tiles, carpetLen) {
    let maxCovered = 0;
    let left, maybeEnd, next, end;
    for (let i=0; i<tiles.length; i++) {
        left = tiles[i][0];
        maybeEnd = tiles[i][1];

        for (let j=i+1; j<tiles.length; j++) {
            next = tiles[j][0];
            end = tiles[j][1];

            if (maybeEnd + 1 !== next) break;
            i++; // no need to re-check part of this continuous group
            if (end - left >= carpetLen) return carpetLen;

            maybeEnd = end;
            end = undefined;
        }

        const covered = maybeEnd - left + 1;
        if (covered > carpetLen) return carpetLen;
        if (covered > maxCovered) maxCovered = covered;
    }
    return maxCovered;
};