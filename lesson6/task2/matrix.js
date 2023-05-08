class Matrix3D {
  constructor({ xSize, ySize, zSize }) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.zSize = zSize;

    this.buffer = new Array(xSize * ySize * zSize);
  }

  *[Symbol.iterator]() {
    for (let z = 0; z < this.zSize; z++) {
      for (let y = 0; y < this.ySize; y++) {
        for (let x = 0; x < this.xSize; x++) {
          yield [{ x, y, z }, this.get({ x, y, z })];
        }
      }
    }
  }

  getBuffer() {
    return this.buffer;
  }

  getIndex({ x, y, z }) {
    return (y * this.xSize + x) * this.zSize + z;
  }

  get({ x, y, z }) {
    return this.buffer[this.getIndex({ x, y, z })];
  }

  set({ x, y, z }, value) {
    this.buffer[this.getIndex({ x, y, z })] = value;
  }
}

const matrix = new Matrix3D({ xSize: 3, ySize: 3, zSize: 3 });

matrix.set({ x: 1, y: 3, z: 2 }, 10);
matrix.get({ x: 1, y: 3, z: 2 });

console.log(matrix.get({ x: 1, y: 3, z: 2 }));
