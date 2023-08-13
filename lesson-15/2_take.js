// Необходимо написать функцию take, которая принимает любой Iterable объект
// и возвращает итератор по заданному количеству его элементов

import { random } from "./1_random.js";

export const take = (iter, count) => {
  let limit = 0;

  const cursor = iter[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next: () => {
      if (limit >= count) {
        return {
          value: undefined,
          done: true,
        };
      }

      limit++;

      return cursor.next();
    },
  };
};

// const randomInt = random(5, 10);
// console.log([...take(randomInt, 100)]);
