class Stask {
  constructor(array, size) {
    this.size = size;
    this.array = new array(size);

    this.currentIndex = -1;
  }

  isEmpty() {
    return this.currentIndex <= -1;
  }

  isFull() {
    return this.currentIndex === this.size - 1;
  }

  push(value) {
    if (this.isFull()) {
      throw new Error("stack is full");
    }

    this.currentIndex++;

    this.array[this.currentIndex] = value;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("stack is empty");
    }

    const last = this.array[this.currentIndex];

    this.array[this.currentIndex] = 0;

    this.currentIndex--;

    return last;
  }

  get head() {
    return this.array[this.currentIndex];
  }
}

const stack = new Stask(Int32Array, 10);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head); // 12

console.log(stack.pop()); // 12

console.log(stack.head); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
// console.log(stack.pop()); // Exception
