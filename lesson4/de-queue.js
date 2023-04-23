import { LinkedList } from "./linked-list.js";

class DeQueue {
  constructor() {
    this.queue = new LinkedList();
  }

  push(data) {
    return this.queue.insertFirst(data);
  }

  pop() {
    return this.queue.deleteFirst();
  }

  unshift(data) {
    return this.queue.insertLast(data);
  }

  shift() {
    return this.queue.deleteLast();
  }

  get head() {
    return this.queue.last.data;
  }
}

const dequeue = new DeQueue();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop()); // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop()); // 10
// console.log(dequeue.pop()); // Exception
console.log("🚀 ~ file: de-queue.js:38 ~ dequeue:", dequeue);
