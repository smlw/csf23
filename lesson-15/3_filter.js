// Необходимо написать функцию filter, которая принимает любой Iterable объект
// и функцию-предикат. И возвращает итератор по элементам которые удовлетворяют предикату.

// import { random } from "./1_random.js";
// import { take } from "./2_take.js";

export const filter = (iter, fn) => {
  const innerIter = iter[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next: () => {
      let chunk = innerIter.next();

      while (true) {
        if (chunk.done || fn(chunk.value)) {
          return chunk;
        }

        chunk = innerIter.next();
      }
    },
  };
};

// const randomInt = random(0, 100);

// console.log([
//   ...take(
//     filter([1, 2, 3, 4, 5], (el) => el > 3),
//     3
//   ),
// ]);
