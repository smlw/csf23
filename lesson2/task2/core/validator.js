import { BinaryConverter } from "./binary-converter.js";
import { BYTE_LENGTH } from "./constants.js";

import { isString, isNumber, isBoolean, isNaN } from "lodash-es";

export class Validator {
  constructor() {
    this.binaryConverter = new BinaryConverter();
  }

  isString(value) {
    return isString(value);
  }

  isNumber(value) {
    return isNumber(value);
  }

  isBoolean(value) {
    return isBoolean(value);
  }

  isBinaryOnceValue(value) {
    return Number(value) === 0 || Number(value) === 1;
  }

  isBinaryBoolean(value) {
    return isNumber(value) && this.isBinaryOnceValue(value);
  }

  isBinary(value) {
    return (
      !isNaN(value) &&
      isNumber(value) &&
      value.toString().split("").every(this.isBinaryOnceValue)
    );
  }

  isAscii(value) {
    return value.split("").every((symbol) => symbol.charCodeAt(0) <= 255);
  }

  isMaxBitLength(value, params) {
    let binaryValue = this.binaryConverter.getBinaryOrStringify(value);

    return binaryValue.length <= params.maxBit;
  }

  isCorrectAsciiBitValue(_, params) {
    return params.maxBit % BYTE_LENGTH === 0;
  }

  isUnit8Array(value) {
    return value instanceof Uint8Array;
  }
}
