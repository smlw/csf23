import { SchemaValidator } from "./schema-validator.js";
import { BinaryGetter } from "./binary-getter.js";
import { BYTE_LENGTH } from "./constants.js";

const encode = (data, schema) => {
  const buffer = new ArrayBuffer(data.length);
  const validator = new SchemaValidator();
  const binaryGetter = new BinaryGetter();

  for (let i = 0; i <= data.length - 1; i++) {
    const value = data[i];
    const [maxBit, type] = schema[i];

    validator[type](value, maxBit);

    const binaryValue = binaryGetter.getBinaryValue(value);
    if (Array.isArray(binaryValue)) {
      buffer[i] = new Uint8Array(maxBit / BYTE_LENGTH);
      binaryValue.forEach((v, j) => (buffer[i][j] = "0b" + v));
    } else {
      buffer[i] = value;
    }
  }

  console.log(data, buffer);

  return buffer;
};

const schema = [
  [3, "number"], // 3 бита число
  [2, "number"], // 2 бита число
  [1, "boolean"], // 1 бит логический
  [1, "boolean"], // 1 бит логический
  [16, "ascii"], // 16 бит 2 аски символа
];

// 😋
const data = encode([7, 3, true, false, "ab"], schema);
// const data = encode(["þþþ"], schema);
