const getHashCode = Symbol();
const hashCode = Symbol();

Object.defineProperty(Object.defineProperty, getHashCode, {
  configurable: true,

  value() {
    if (!(hashCode in this)) {
      Object.defineProperty(this, hashCode, {
        value: getRandomInt(0, 2 ** 32),
      });
    }

    return this[hashCode];

    function getRandomInt(from, to) {
      return Math.floor(Math.random() * (to - from)) + from;
    }
  },
});

class LinkedListNode {
  value;
  next;

  constructor(value, next) {
    this.value = value;
    this.next = next ?? null;
  }
}

class LinkedList {
  #first;

  push(value) {
    this.#first = new LinkedListNode(value, this.#first);
  }

  pop() {
    this.#first = this.#first?.next;
  }

  *nodes() {
    let cursor = this.#first;

    while (cursor != null) {
      yield cursor;
      cursor = cursor.next;
    }
  }

  *values() {
    for (const { value } of this.nodes()) {
      yield value;
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }
}

class HashTable {
  #buffer;
  #capacity;
  #hasher;
  #length = 0;

  constructor(hasher, capacity = 31) {
    this.#hasher = new hasher(capacity);
    this.#capacity = capacity;
    this.#buffer = new Array(capacity).fill(null);
  }

  set(key, value) {
    if (this.#length >= this.#capacity * 0.7) {
      this.#grow();
    }

    const index = this.#hasher.hash(key);

    let list = this.#buffer[index];

    if (list === null) {
      list = new LinkedList();
      this.#buffer[index] = list;
    }

    for (const tuple of list) {
      if (key === tuple[0]) {
        tuple[1] = value;
        return;
      }
    }

    list.push([key, value]);
    this.#length++;
  }

  get(key) {
    const index = this.#hasher.hash(key);
    const list = this.#buffer[index];

    if (list != null) {
      for (const [valueKey, value] of list) {
        if (key === valueKey) {
          return value;
        }
      }
    }
  }

  has(key) {
    const index = this.#hasher.hash(key);
    const list = this.#buffer[index];

    if (list != null) {
      for (const [valueKey] of list) {
        if (key === valueKey) {
          return true;
        }
      }
    }

    return false;
  }

  *values() {
    for (const el of this.#buffer) {
      if (el === null) {
        continue;
      }

      yield* el;
    }
  }

  #grow() {
    this.#capacity = this.#capacity * 2 + 1;

    const cursor = this.#buffer.values();

    this.#buffer = new Array(this.#capacity);

    for (const list of cursor) {
      if (list === null) {
        continue;
      }

      for (const [key, value] of list) {
        this.set(key, value);
      }
    }
  }
}

class Hasher {
  #size;

  constructor(size) {
    this.#size = size;
  }

  hash(value) {
    switch (typeof value) {
      case "number":
        return this.#getNumberHash(value);

      case "string":
        return this.#getStringHash(value);

      case "object":
        return this.#getObjectHash(value);

      default:
        throw new TypeError("invalid data");
    }
  }

  #getNumberHash(number) {
    return number % this.#size;
  }

  #getStringHash(str) {
    const base = 2 ** 16;

    let res = str.charCodeAt(0);

    for (let i = 1; i < str.length; i++) {
      res += this.#getNumberHash(str.charCodeAt(i) * base ** i);
    }

    return this.#getNumberHash(res);
  }

  #getObjectHash(obj) {
    if (obj === null) {
      throw new TypeError("Invalid object");
    }

    return this.#getNumberHash(obj[getHashCode]());
  }
}

const map = new HashTable(Hasher, 5);

map.set(10, 1);
console.log(map.get(10));
