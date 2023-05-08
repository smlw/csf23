class Vector {
  constructor(TypedArray, options) {
    this.TypedArray = TypedArray;
    this.options = options;

    this.buffer = new TypedArray(options.capacity);

    this.lastIndex = -1;
  }

  resizeIfNeeded(valuesLength) {
    if (this.buffer.byteLength - this.length < valuesLength) {
      const newSize = this.buffer.byteLength * 2;
      const resizedArray = new this.TypedArray(newSize);

      resizedArray.set(this.buffer, 0);

      this.buffer = resizedArray;
    }
  }

  // Добавляет один или более элементов в конец массива и возвращает новую длину массива.
  push(...values) {
    this.resizeIfNeeded(values.length);

    this.buffer.set(values, this.length);

    this.lastIndex = this.lastIndex + values.length;

    return this.length;
  }

  // Добавляет один или более элементов в начало массива и возвращает новую длину массива.
  unshift(...values) {
    this.resizeIfNeeded(values.length);

    // Срез элементов от индекса 0 до последнего
    const spread = this.buffer.slice(0, this.length);

    // Сдвигаем все элементы вправо на количество новых элементов
    this.buffer.set(spread, values.length);

    // Устанавливаем элементы в начало массива
    this.buffer.set(values, 0);

    // lastIndex будет равен предыдущей длине + количество новых элементов
    this.lastIndex = this.lastIndex + values.length;

    return this.length;
  }

  // Удаляет последний элемент из массива и возвращает его значение.
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    // Сохраняем значение последнего элемента
    const tempValue = this.buffer[this.lastIndex];

    // Зануляем последний элемент
    this.buffer[this.lastIndex] = 0;

    this.lastIndex--;

    return tempValue;
  }

  // Удаляет первый элемент из массива и возвращает его значение.
  shift() {
    if (this.isEmpty()) {
      return undefined;
    }

    // Сохраняем значение первого элемента
    const tempValue = this.buffer[0];

    // Срез элементов от индекса 1 до последнего
    const spread = this.buffer.slice(1, this.length);

    // Сдвигаем все элементы влево на один индекс
    this.buffer.set(spread, 0);

    // Зануляем последний элемент, т.к. все значения теперь сдвинуты
    this.buffer[this.lastIndex] = 0;

    this.lastIndex--;

    return tempValue;
  }

  get length() {
    return this.lastIndex + 1;
  }

  isEmpty() {
    return !this.length;
  }
}

const uint8Vector = new Vector(Uint8Array, { capacity: 2 });

console.log(uint8Vector.push(100)); // 1
console.log(uint8Vector.push(20, 10)); // 3

console.log(uint8Vector.pop()); // 10
console.log(uint8Vector.shift()); // 100

console.log(uint8Vector.unshift(1)); // 2
console.log(uint8Vector.length); // 2
