/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * https://leetcode.com/problems/reverse-linked-list/
 * runs in O(n), SHOULD use O(1) space
 *   re space-- however specific implementation forced me to create new listnodes
 *   to bypass runtime errors. therefore, this version is actually using O(n) space
 *   because every node is created anew based on the previous node.
 * added test case for single node and many nodes
 * tests passed in ~50ms
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head?.val || !head?.next) return head;

    let forward = new ListNode(head?.val, head?.next);
    let reverse, next;
    while (forward.next) {
        next = forward.next;
        reverse = new ListNode(forward?.val, reverse);
        forward = next;
    }

    return new ListNode(forward?.val, reverse);
};