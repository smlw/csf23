// Необходимо написать функцию enumerate, которая принимает любой Iterable объект
// и возвращает итератор по парам (номер итерации, элемент)

import { random } from "./1_random.js";
import { take } from "./2_take.js";

export const enumerate = (iter) => {
  let cursor = 0;
  const innerIter = iter[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next: () => {
      return {
        value: [cursor++, innerIter.next()],
        done: false,
      };
    },
  };
};

const randomInt = random(0, 100);

console.log([...take(enumerate(randomInt), 3)]); // [[0, ...], [1, ...], [2, ...]]
