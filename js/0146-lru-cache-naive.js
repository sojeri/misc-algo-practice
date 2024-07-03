
/**
 * https://leetcode.com/problems/lru-cache/
 * I missed that this was a linked list question, so solved it in incorrect way with hashmap.
 * resulting algo is O(1) get, O(n) put, and O(n) space.
 * basic test result was 51ms runtime, but that was only capacity 2 and a few operations.
 * @param {number} capacity
 */
class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.size = 0; // count of all stored values
      this.data = {}; // map of all stored values
      this.lru = 0; // lru counter, increment on get or put
    }
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.data[key]) {
        this.lru++;
        this.data[key].lru = this.lru;
        return this.data[key].value;
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (!this.data[key]) this.size++;
  this.lru++;
  this.data[key] = {value, lru: this.lru};

  // this is the O(n) -- have to check every key on remove
  if (this.size > this.capacity) {
    const keys = Object.keys(this.data);
    let minKey = keys[0];
    let min = this.data[minKey];
    keys.forEach(key => {
        const maybeLess = this.data[key];
        if (maybeLess.lru < min.lru) {
            minKey = key;
            min = maybeLess;
        }
    })

    delete this.data[minKey];
    this.size--;
  }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */