/**
  ## Написать функцию, которая принимает Uint8Array и позволяет обратиться к биту конкретного элемента
  const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

  Второй параметр это порядок бита "справа-налево"
  console.log(bitGetter.get(0, 1)); // 1
  console.log(bitGetter.get(1, 1)); // 0


  ## Расширить функцию из прошлого задания возможностью изменять значение конкретного бита
  const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

  Второй параметр это порядок бита "справа-налево"
  console.log(bitAccessor.set(0, 1, 0));
  console.log(bitAccessor.set(1, 0, 1));
*/

export const createBitAccessor = (uint8array) => {
  const get = (index, position) => {
    return (uint8array[index] & (1 << position)) === 0 ? 0 : 1;
  };

  const set = (index, position, value) => {
    return value === 0
      ? (uint8array[index] &= ~(1 << position))
      : (uint8array[index] |= 1 << position);
  };

  return {
    get,
    set,
  };
};
