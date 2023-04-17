import { SchemaValidator } from "./core/schema-validator.js";
import { BinaryConverter } from "./core/binary-converter.js";

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

class Decode {
  constructor(data, schema) {
    this.data = data;
    this.schema = schema;

    this.decodedResult = [];
    this.binaryConverter = new BinaryConverter();
    this.validator = new DecodeSchemaValidator();
  }

  validateValueByIndex(index) {
    const value = this.data[index];
    const [maxBit, type] = this.schema[index];

    return this.validator[type](value, maxBit);
  }

  setDecodedValueByIndex(index) {
    const value = this.data[index];
    const decodedValue = this.binaryConverter.fromBinary(value);

    this.decodedResult.push(decodedValue);
  }

  run() {
    for (let index = 0; index <= this.data.byteLength - 1; index++) {
      const validationResult = this.validateValueByIndex(index);

      if (!validationResult.isValid) {
        console.error(validationResult);

        throw new Error("error");
      }

      this.setDecodedValueByIndex(index);
    }

    return this.decodedResult;
  }
}

export const decode = (data, schema) => {
  const decode = new Decode(data, schema);

  return decode.run();
};
