/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head, orig) {
    if (head === null || head.next === null) {
        return orig;
    }

    while (head.val === head.next?.val) {
        head.next = head.next.next;
    }

    return deleteDuplicates(head.next, orig || head);
};