/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    return hasCycleConstantSpace(head);
}

// tests passed in ~50ms
// space O(n) -- saving every seen node val
// runtime O(n) -- checks every node until finds repeat or list termination
function hasCycleNaive(head, seen = {}) {
    if (seen[head.val]) return true;
    seen[head.val] = true;
    
    if (!head.next) return false;
    return hasCycleNaive(head.next, seen);
}

// tests passed in ~70ms
// space O(1) -- anotherhead and head only
// runtime O(n) -- checks every node at least once, might be O(2n) worst case if cycle is whole list
function hasCycleConstantSpace(head, anotherHead) {
    if (!anotherHead) { // first fn call only
        if (!head.next?.next) return false;
        anotherHead = head.next.next;
    }

    if (!anotherHead.next?.next) return false;
    if (anotherHead.val === head.val) return true;

    return hasCycleConstantSpace(head.next, anotherHead.next.next);
}