export class Range {
  constructor(from, to) {
    this.type = typeof from === "string" ? "string" : "number";

    this.from = this.getNumber(from);
    this.to = this.getNumber(to);

    this.reversed = this.from > this.to;
  }

  [Symbol.iterator]() {
    return this.values();
  }

  values() {
    let start = this.reversed ? this.to : this.from;

    const end = this.reversed ? this.from : this.to;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next: () => {
        if (start >= end) {
          return {
            done: true,
            value: undefined,
          };
        }

        return {
          done: false,
          value: this.getT(start++),
        };
      },
    };
  }

  getNumber(value) {
    if (this.type === "string") {
      return value.codePointAt(0) ?? NaN;
    }

    return Number(value);
  }

  getT(value) {
    if (this.type === "string") {
      return String.fromCodePoint(value);
    }

    return value;
  }
}

const r = new Range(100, 500);

console.log(...r);
