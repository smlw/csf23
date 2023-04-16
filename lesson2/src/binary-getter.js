import { isString, isNumber, isBoolean } from "lodash-es";

const isBinaryBoolean = (value) => {
  return isNumber(value) && (Number(value) === 0 || Number(value) === 1);
};

export class BinaryGetter {
  getBinaryString(value) {
    return value.split("").map((symbol) => symbol.charCodeAt(0).toString(2));
  }

  getBinaryBoolean(value) {
    return Number(value).toString(2);
  }

  getBinaryNumber(value) {
    return value.toString(2);
  }

  getBinaryArrayBuffer(value) {
    return value.map((symbol) => symbol.toString(2));
  }

  getBoolean(value) {
    return Boolean(value);
  }

  getNumber(value) {
    return parseInt(value, 2);
  }

  getArrayBufferSymbols(value) {
    return String.fromCharCode(...value);
  }

  getBinaryValue(value) {
    switch (true) {
      case ArrayBuffer.isView(value):
        return this.getBinaryArrayBuffer(value);

      case isNumber(value):
        return this.getBinaryNumber(value);

      case isBoolean(value):
        return this.getBinaryBoolean(value);

      case isString(value):
        return this.getBinaryString(value);

      default:
        return false;
    }
  }

  convertBinaryValue(value) {
    switch (true) {
      case value instanceof Uint8Array:
        return this.getArrayBufferSymbols(value);

      case isBinaryBoolean(value):
        return this.getBoolean(value);

      case isNumber(value):
        return this.getNumber(value);

      default:
        return false;
    }
  }
}
