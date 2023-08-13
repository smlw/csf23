export const zip = (...iterables) => {
  const iters = iterables.map((i) => i[Symbol.iterator]());

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const res = new Array(iters.length);

      for (const [i, iter] of iters.entries()) {
        const chunk = iter.next();

        if (chunk.done) {
          return { done: true, value: undefined };
        }

        res[i] = chunk.value;
      }

      return {
        done: false,
        value: res,
      };
    },
  };
};
