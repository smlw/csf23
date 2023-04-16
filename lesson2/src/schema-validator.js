import { Validator } from "./validator.js";
import { BYTE_LENGTH } from "./constants.js";

export class SchemaValidator {
  constructor() {
    this.validator = new Validator();
    this.messages = {
      isNumber: "Значение не явялется типом Number",
      isBoolean: "Значение не является типом Boolean",
      isMaxBitLength: "Значение превышает количетсво допустимых бит",
      isAscii: "Строка должна состоять из ascii-символов",
      isCorrectAsciiBitValue: `Количество бит должно быть кратно ${BYTE_LENGTH}`,
    };
  }

  validate(value, rules) {
    const result = {
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

    if (!result.isValid) {
      console.error({ value, params: result.field });

      throw new Error("Ошибка валидации");
    }

    return result;
  }
}
