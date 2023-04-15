const getBinaryString = (value) => {
  return value
    .split()
    .map((symbol) => symbol.charCodeAt(0).toString(2))
    .join();
};

const getBinaryBoolean = (value) => {
  return Number(value).toString(2);
};

const getBinaryNumber = (value) => {
  return value.toString(2);
};

class Validator {
  isString(value) {
    return typeof value === "string";
  }

  isNumber(value) {
    return typeof value === "number";
  }

  isBoolean(value) {
    return typeof value === "boolean";
  }

  isAscii(value) {
    return value.split("").every((symbol) => symbol.charCodeAt(0) <= 255);
  }

  isMaxBitLength(value, params) {
    const binaryValue = (() => {
      switch (true) {
        case this.isNumber(value):
          return getBinaryNumber(value);

        case this.isBoolean(value):
          return getBinaryBoolean(value);

        case this.isString(value):
          return getBinaryString(value);

        default:
          return false;
      }
    })();

    return binaryValue.length <= params.maxBit;
  }
}

class SchemaValidator {
  constructor() {
    this.validator = new Validator();
    this.messages = {
      isNumber: "Значение не явялется типом Number",
      isBoolean: "Значение не является типом Boolean",
      isMaxBitLength: "Значение превышает количетсво допустимых бит",
      isAscii: "Строка должна состоять из ascii-символов",
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
      isMaxBitLength: {
        $params: { maxBit },
        $validator: this.validator.isMaxBitLength,
      },
    };

    return this.validate(value, rules);
  }
}

const encode = (data, schema) => {
  const validator = new SchemaValidator();

  for (let i = 0; i <= data.length - 1; i++) {
    const value = data[i];
    const [maxBit, type] = schema[i];

    validator[type](value, maxBit);
  }
};

const schema = [
  [3, "number"], // 3 бита число
  [2, "number"], // 2 бита число
  [1, "boolean"], // 1 бит логический
  [1, "boolean"], // 1 бит логический
  [16, "ascii"], // 16 бит 2 аски символа
];

const data = encode([7, 3, true, false, "þþþ"], schema);
// const data = encode(["þþþ"], schema);

console.log(data);
