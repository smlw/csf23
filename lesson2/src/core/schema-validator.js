import { Validator } from "./validator.js";
import { BYTE_LENGTH } from "./constants.js";

export class SchemaValidator {
  constructor() {
    this.validator = new Validator();
    this.messages = {
      isString: "Значение должно быть типом String",
      isNumber: "Значение должно быть типом Number",
      isBinary: "Значение должно быть в бинаром виде",
      isBoolean: "Значение должно быть типом Boolean",
      isAscii: "Строка должна состоять из ascii-символов",
      isUnit8Array: "Значение должно быть типом Number Unit8Array",
      isMaxBitLength: "Значение превышает количетсво допустимых бит",
      isBinaryBoolean: "Значение должно быть типом Boolean в бинаром виде",
      isCorrectAsciiBitValue: `Количество бит должно быть кратно ${BYTE_LENGTH}`,
    };
  }

  validate(value, rules) {
    const result = {
      value,
      isValid: true,
      field: [],
    };

    for (const name in rules) {
      const { $validator, $params } = rules[name];
      const isValid = $validator.call(this.validator, value, $params);

      result.field.push({
        key: name,
        isValid,
        errorMessage: !isValid && this.messages[name],
      });

      if (!isValid) {
        result.isValid = false;
      }
    }

    return result;
  }
}
