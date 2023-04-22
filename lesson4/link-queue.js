import { LinkedList } from "./linked-list.js";

class Queue {
  constructor() {
    this.queue = new LinkedList();
  }

  push(data) {
    return this.queue.insertFirst(data);
  }

  pop() {
    return this.queue.deleteLast();
  }

  get head() {
    return this.queue.last.data;
  }
}

const queue = new Queue();

queue.push(10);
queue.push(11);
queue.push(12);

console.log(queue.head); // 10

console.log(queue.pop()); // 10

console.log(queue.head); // 11

console.log(queue.pop()); // 11
console.log(queue.pop()); // 12
// console.log(queue.pop()); // Exception
