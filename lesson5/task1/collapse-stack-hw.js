function collapse(obj) {
  const result = {};
  const stack = [[Object.entries(obj).values(), ""]];

  while (stack.length > 0) {
    const [cursor, path] = stack.pop();

    for (const [key, value] of cursor) {
      const newPath = path !== "" ? `${path}.${key}` : key;

      if (value !== null && typeof value === "object") {
        stack.push([cursor, path]);
        stack.push([Object.entries(value).values(), newPath]);
        break;
      } else {
        result[newPath] = value;
      }
    }
  }

  return result;
}

const obj = {
  a: {
    b: [1, 2],
    "": { c: 2 },
  },
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj));
