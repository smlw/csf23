import { isString, isNumber, isBoolean, isNaN } from "lodash-es";

const isBinaryOnceValue = (value) => {
  return Number(value) === 0 || Number(value) === 1;
};

const isBinaryBoolean = (value) => {
  return isNumber(value) && (Number(value) === 0 || Number(value) === 1);
};

const isBinaryValue = (value) => {
  return (
    !isNaN(value) &&
    isNumber(value) &&
    value.toString().split("").every(isBinaryOnceValue)
  );
};

export class BinaryConverter {
  toBinaryString(value) {
    return value.split("").map((symbol) => symbol.charCodeAt(0).toString(2));
  }

  toBinaryBoolean(value) {
    return Number(value).toString(2);
  }

  toBinaryNumber(value) {
    return value.toString(2);
  }

  toBinaryArrayBuffer(value) {
    return value.map((symbol) => symbol.toString(2));
  }

  fromBinaryBoolean(value) {
    return Boolean(value);
  }

  fromBinaryNumber(value) {
    return parseInt(value, 2);
  }

  fromBinaryArrayBufferSymbols(value) {
    return String.fromCharCode(...value);
  }

  toBinary(value) {
    switch (true) {
      case ArrayBuffer.isView(value):
        return this.toBinaryArrayBuffer(value);

      case isNumber(value):
        return this.toBinaryNumber(value);

      case isBoolean(value):
        return this.toBinaryBoolean(value);

      case isString(value):
        return this.toBinaryString(value);

      default:
        return false;
    }
  }

  fromBinary(value) {
    switch (true) {
      case value instanceof Uint8Array:
        return this.fromBinaryArrayBufferSymbols(value);

      case isBinaryBoolean(value):
        return this.fromBinaryBoolean(value);

      case isNumber(value):
        return this.fromBinaryNumber(value);

      default:
        return false;
    }
  }

  getBinaryOrStringify(value) {
    if (isBinaryValue(value)) {
      return value.toString();
    }

    let binaryValue = this.toBinary(value);

    if (Array.isArray(binaryValue)) {
      binaryValue = binaryValue.join("");
    }

    return binaryValue;
  }
}
