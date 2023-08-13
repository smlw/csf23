// Необходимо написать итератор для генерации случайных чисел по заданным параметрам

export const random = (min, max) => {
  return {
    [Symbol.iterator]() {
      return this;
    },

    next: () => {
      return {
        value: Math.floor(Math.random() * (max - min) + min),
        done: false,
      };
    },
  };
};

// const randomInt = random(0, 100);

// console.log(randomInt.next());
// console.log(randomInt.next());
// console.log(randomInt.next());
// console.log(randomInt.next());
