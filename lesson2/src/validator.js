import { BinaryGetter } from "./binary-getter.js";
import { BYTE_LENGTH } from "./constants.js";

import { isString, isNumber, isBoolean, isNaN } from "lodash-es";

export class Validator {
  constructor() {
    this.binaryGetter = new BinaryGetter();
  }

  isString(value) {
    return isString(value);
  }

  isNumber(value) {
    return isNumber(value);
  }

  isNaN(value) {
    return isNaN(value);
  }

  isBinaryBoolean(value) {
    return isNumber(value) && this.isBinaryValue(value);
  }

  isBoolean(value) {
    return isBoolean(value);
  }

  isAscii(value) {
    return value.split("").every((symbol) => symbol.charCodeAt(0) <= 255);
  }

  isMaxBitLength(value, params) {
    let binaryValue = this.isBinary(value)
      ? value.toString()
      : this.binaryGetter.getBinaryValue(value);

    if (Array.isArray(binaryValue)) {
      binaryValue = binaryValue.join("");
    }

    return binaryValue.length <= params.maxBit;
  }

  isCorrectAsciiBitValue(_, params) {
    return params.maxBit % BYTE_LENGTH === 0;
  }

  isUnit8Array(value) {
    return value instanceof Uint8Array;
  }

  isBinaryValue(value) {
    return Number(value) === 0 || Number(value) === 1;
  }

  isBinary(value) {
    return (
      this.isNumber(value) &&
      !this.isNaN(value) &&
      value.toString().split("").every(this.isBinaryValue)
    );
  }
}
