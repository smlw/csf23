const collapse = (object) => {
  const result = {};

  const recursiveFn = (path = null, value) => {
    if (typeof value !== "object" || value === null) {
      result[path] = value;

      return true;
    }

    const keys = Object.keys(value);
    for (let i = 0; i <= keys.length - 1; i++) {
      const key = keys[i];
      const nextValue = value[key];

      const updatedPath = path === null ? key : `${path}.${key}`;

      recursiveFn(updatedPath, nextValue);
    }
  };

  recursiveFn(null, object);

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
