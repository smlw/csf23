import { BinaryGetter } from "./binary-getter.js";

import { BYTE_LENGTH } from "./constants.js";
import { SchemaValidator } from "./schema-validator.js";

export class EncodeSchemaValidator extends SchemaValidator {
  number(value, maxBit) {
    const rules = {
      isNumber: {
        $params: null,
        $validator: this.validator.isNumber,
      },
      isMaxBitLength: {
        $params: { maxBit },
        $validator: this.validator.isMaxBitLength,
      },
    };

    return this.validate(value, rules);
  }

  boolean(value, maxBit) {
    const rules = {
      isBoolean: {
        $params: null,
        $validator: this.validator.isBoolean,
      },
      isMaxBitLength: {
        $params: { maxBit },
        $validator: this.validator.isMaxBitLength,
      },
    };

    return this.validate(value, rules);
  }

  ascii(value, maxBit) {
    const rules = {
      isString: {
        $params: null,
        $validator: this.validator.isString,
      },
      isAscii: {
        $params: null,
        $validator: this.validator.isAscii,
      },
      isCorrectAsciiBitValue: {
        $params: { maxBit },
        $validator: this.validator.isCorrectAsciiBitValue,
      },
      isMaxBitLength: {
        $params: { maxBit },
        $validator: this.validator.isMaxBitLength,
      },
    };

    return this.validate(value, rules);
  }
}

export const encode = (data, schema) => {
  const buffer = new ArrayBuffer(data.length);
  const validator = new EncodeSchemaValidator();
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
      buffer[i] = Number(binaryValue);
    }
  }

  return buffer;
};
