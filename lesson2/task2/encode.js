import { BinaryConverter } from "./core/binary-converter.js";

import { BYTE_LENGTH } from "./core/constants.js";
import { SchemaValidator } from "./core/schema-validator.js";

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

class Encode {
  constructor(data, schema) {
    this.data = data;
    this.schema = schema;

    this.buffer = new ArrayBuffer(data.length);
    this.validator = new EncodeSchemaValidator();
    this.binaryConverter = new BinaryConverter();
  }

  validateValueByIndex(index) {
    const value = this.data[index];
    const [maxBit, type] = this.schema[index];

    return this.validator[type](value, maxBit);
  }

  setBufferValueByIndex(index) {
    const value = this.data[index];
    const maxBit = this.schema[index][0];

    const binaryValue = this.binaryConverter.toBinary(value);

    // Если binaryValue - массив, то создаем Uint8Array и заполняем его значениями
    if (Array.isArray(binaryValue)) {
      this.buffer[index] = this._createUint8Array(maxBit);
      return binaryValue.forEach((v, j) => (this.buffer[index][j] = "0b" + v));
    }

    // Иначе просто заполянем буффер бинарным значением
    return (this.buffer[index] = Number(binaryValue));
  }

  run() {
    for (let index = 0; index <= this.data.length - 1; index++) {
      const validationResult = this.validateValueByIndex(index);

      if (!validationResult.isValid) {
        console.error(validationResult);

        throw new Error("Ошибка валидации");
      }

      this.setBufferValueByIndex(index);
    }

    return this.buffer;
  }

  _createUint8Array(size) {
    return new Uint8Array(size / BYTE_LENGTH);
  }
}

export const encode = (data, schema) => {
  const encode = new Encode(data, schema);

  return encode.run();
};
