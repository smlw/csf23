class Link {
  constructor(data) {
    this.value = data;
    this.next = null;
    this.prev = null;
  }

  displayLink() {
    console.log(this.value);
  }
}

class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
  }

  isEmpty() {
    return this.first === null;
  }

  prepend(data) {
    const newLink = new Link(data);

    if (this.isEmpty()) {
      this.last = newLink;
    } else {
      this.first.prev = newLink;
    }

    newLink.next = this.first;
    this.first = newLink;
  }

  append(data) {
    const newLink = new Link(data);

    if (this.isEmpty()) {
      this.first = newLink;
    } else {
      this.last.next = newLink;
      newLink.prev = this.last;
    }
    this.last = newLink;
  }

  displayList() {
    let current = this.first;

    while (current !== null) {
      current.displayLink();
      current = current.next;
    }
  }

  *[Symbol.iterator]() {
    let current = this.first;

    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }
}

const list = new LinkedList();

list.append(1);
list.append(2);
// list.append(3);

// console.log(list.first.value); // 1
console.log(list.first); // 2
console.log(list.last); // 3
// console.log(list.first.next.prev.value); // 1

// for (const value of list) {
//   console.log(value);
// }
