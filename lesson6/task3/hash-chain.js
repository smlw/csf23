const hashSymbol = Symbol();

function getObjectHash(obj) {
  if (obj[hashSymbol] != null) {
    return obj[hashSymbol];
  }
  obj[hashSymbol] = Math.floor(Math.random() * (2 ** 32 - 1));

  return obj[hashSymbol];
}

function getStringHash(str) {
  return str.split("").reduce((acc, char) => acc * 27 + char.charCodeAt(0), 0);
}

class Link {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  getValue() {
    return this.data;
  }

  displayLink() {
    console.log(this.data);
  }
}

class SortedList {
  constructor() {
    this.first = null;
  }

  insert(link) {
    const value = link.getValue();

    let prev = null;
    let current = this.first;

    while (current !== null && value > current.getValue()) {
      prev = current;
      current = current.next;
    }

    if (prev === null) {
      this.first = link;
    } else {
      prev.next = link;
    }
  }

  delete() {
    const temp = this.first;

    this.first = null;

    return temp;
  }

  displayList() {
    return this.first;
  }
}

class HashTable {
  constructor(size) {
    this.size = size;
    this.hashArray = new SortedList();

    for (let i = 0; i < size; i++) {
      this.hashArray[i] = new SortedList();
    }
  }

  displayTable() {
    for (let i = 0; i < this.size; i++) {
      console.log(i + ". ");
      this.hashArray[i].displayList();
    }
  }

  hashFunc(key) {
    return this.getHash(key) % this.size;
  }

  set(key, value) {
    const link = new Link(value);
    const hashValue = this.hashFunc(key);

    this.hashArray[hashValue].insert(link);
  }

  get(key) {
    const hashValue = this.hashFunc(key);

    return this.hashArray[hashValue].displayList();
  }

  has(key) {
    const hashValue = this.hashFunc(key);

    return Boolean(this.hashArray[hashValue].first);
  }

  delete(key) {
    const hashValue = this.hashFunc(key);

    return this.hashArray[hashValue].delete();
  }

  getHash(key) {
    switch (typeof key) {
      case "number": {
        return key;
      }
      case "string": {
        return getStringHash(key);
      }
      case "object": {
        return getObjectHash(key);
      }
      default: {
        throw new Error(`Unhashable type ${typeof key}`);
      }
    }
  }
}

const document = {};

const map = new HashTable(120);

map.set("foo", 1);
map.set("foo", 2);
map.set("foo", 3);
map.set(42, 10);
map.set(document, 100);

console.log(map.get("foo")); // 10
console.log(map.get(42)); // 10
console.log(map.has(document)); // true
console.log(map.delete(document)); // 10
console.log(map.has(document)); // false
