/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  //helper methods

  errorHandler(idx) {
    if (idx > this.length || idx < 0)
      throw new Error("Element is out of bounds")
  }

  getNode(idx) {
    let pos = 0;
    let node = this.head;
    while (node !== null && pos < idx) {
      node = node.next;
      pos += 1;
    }
    return node;
  }
  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) // empty list
      this.head = newNode;
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
  // for 1 elem list - set head and tail the same
    if (this.length === 0)
      this.tail = this.head
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    this.errorHandler(idx);
    return this.getNode(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    this.errorHandler(idx);
    let node = this.getNode(idx);
    node.val = val;

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    this.errorHandler(idx);

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);
    
    let prevNode = this.getNode(idx - 1);
    let newNode = new Node(val);
    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    
    // out of bounds
    this.errorHandler(idx);

    // shift() element
    if (idx === 0) {
      let val = this.getNode(0).val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prevNode = this.getNode(idx - 1);
    let val = prevNode.next.val;

    // pop() element and return tail value
    if (idx === this.length - 1) {
      prevNode.next = null;
      this.tail = prevNode;
      this.length -= 1;
      return val;
    }

    //remove elem in the middle
    prevNode.next = prevNode.next.next;
    this.length -= 1;
    return val;
  }


  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    let total = 0;
    let node = this.head;
    while (node) {
      total += node.val;
      node = node.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
