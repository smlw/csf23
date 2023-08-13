// Необходимо написать функцию seq, которая бы принимала множество Iterable объектов и возвращала итератор по их элементам

export const seq = (...iterables) => {
  const iter = iterables.map((i) => i[Symbol.iterator]()).values();

  let cursor = iter.next();
  let innerCursor;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      while (true) {
        if (cursor.done) {
          return {
            done: true,
            value: undefined,
          };
        }

        innerCursor ??= cursor.value;
        const chunk = innerCursor.next();

        if (!chunk.done) {
          return chunk;
        }

        cursor = iter.next();
        innerCursor = null;
      }
    },
  };
};

console.log(...seq([1, 2], new Set([3, 4]), "bla")); // 1, 2, 3, 4, 'b', 'l', 'a'
