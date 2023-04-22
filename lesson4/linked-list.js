class Link {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
  }

  isEmpty() {
    return this.first === null;
  }

  insertFirst(data) {
    const newLink = new Link(data);

    if (this.isEmpty()) {
      this.last = newLink;
    } else {
      this.first.prev = newLink;
    }

    newLink.next = this.first;
    this.first = newLink;
  }

  insertLast(data) {
    const newLink = new Link(data);

    if (this.isEmpty()) {
      this.first = newLink;
    } else {
      this.last.next = newLink;
      newLink.prev = this.last;
    }

    this.last = newLink;
  }

  deleteFirst() {
    if (this.isEmpty()) {
      throw new Error("list is empty");
    }

    const temp = this.first.data;

    this.first = this.first.next;

    return temp;
  }

  deleteLast() {
    if (this.isEmpty()) {
      throw new Error("list is empty");
    }

    const temp = this.last.data;

    this.last = this.last.prev;

    if (this.last === null) {
      this.first = null;
    }

    return temp;
  }
}
