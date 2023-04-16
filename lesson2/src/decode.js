import { SchemaValidator } from "./schema-validator.js";
import { BinaryGetter } from "./binary-getter.js";

export class DecodeSchemaValidator extends SchemaValidator {
  number(value, maxBit) {
    const rules = {
      isBinary: {
        $params: null,
        $validator: this.validator.isBinary,
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
      isBinaryBoolean: {
        $params: { maxBit },
        $validator: this.validator.isBinaryBoolean,
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
      isUnit8Array: {
        $params: null,
        $validator: this.validator.isUnit8Array,
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

export const decode = (data, schema) => {
  const result = [];
  const validator = new DecodeSchemaValidator();
  const binaryGetter = new BinaryGetter();

  for (let i = 0; i <= data.byteLength - 1; i++) {
    const value = data[i];
    const [maxBit, type] = schema[i];

    validator[type](value, maxBit);

    const convertedValue = binaryGetter.convertBinaryValue(value);

    result.push(convertedValue);
  }

  return result;
};
