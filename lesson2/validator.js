import { BinaryGetter } from "./binary-getter.js";
import { BYTE_LENGTH } from "./constants.js";

export class Validator {
  constructor() {
    this.binaryGetter = new BinaryGetter();
  }

  isString(value) {
    return typeof value === "string";
  }

  isNumber(value) {
    return typeof value === "number";
  }

  isBoolean(value) {
    return typeof value === "boolean";
  }

  isAscii(value) {
    return value.split("").every((symbol) => symbol.charCodeAt(0) <= 255);
  }

  isMaxBitLength(value, params) {
    let binaryValue = this.binaryGetter.getBinaryValue(value);

    if (Array.isArray(binaryValue)) {
      binaryValue = binaryValue.join();
    }

    return binaryValue.length <= params.maxBit;
  }

  isCorrectAsciiBitValue(_, params) {
    return params.maxBit % BYTE_LENGTH === 0;
  }
}
