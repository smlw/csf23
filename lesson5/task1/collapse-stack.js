const collapse = (object) => {
  const stack = [];
  const result = {};

  const pushStask = (path, value) => stack.push({ path, value });

  pushStask(null, object);

  while (stack.length) {
    const { path, value } = stack.pop();

    if (typeof value !== "object" || value === null) {
      result[path] = value;

      continue;
    }

    const keys = Object.keys(value);
    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i];
      const nextValue = value[key];

      const updatedPath = path === null ? key : `${path}.${key}`;
      pushStask(updatedPath, nextValue);
    }
  }

  return result;
};

const obj = {
  a: {
    b: [1, 2],
    "": {
      c: 2,
    },
  },
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj));
