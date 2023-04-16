import { isString, isNumber, isBoolean } from "lodash-es";

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

  getBinaryValue(value) {
    switch (true) {
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
}
