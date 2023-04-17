import { encode } from "./encode.js";
import { decode } from "./decode.js";
import { jest } from "@jest/globals";

describe("encode", () => {
  it("Данные кодируются успешно", () => {
    const schema = [
      [3, "number"],
      [3, "number"],
      [1, "boolean"],
      [1, "boolean"],
      [16, "ascii"],
    ];

    const data = [2, 3, true, false, "ab"];
    const encoded = encode(data, schema);

    expect(encoded[0]).toEqual(10);
    expect(encoded[1]).toEqual(11);
    expect(encoded[2]).toEqual(1);
    expect(encoded[3]).toEqual(0);
    expect(encoded[4][0]).toEqual(97);
    expect(encoded[4][1]).toEqual(98);
  });

  it("Данные кодируются и декодируются успешно", () => {
    const schema = [
      [3, "number"],
      [3, "number"],
      [1, "boolean"],
      [1, "boolean"],
      [16, "ascii"],
    ];
    const data = [2, 3, true, false, "ab"];

    const encoded = encode(data, schema);
    const decoded = decode(encoded, schema);

    expect(decoded).toEqual(data);
  });

  [10];

  it.each`
    schema              | data      | expects
    ${[[1, "number"]]}  | ${[10]}   | ${{ field: [{ errorMessage: false, isValid: true, key: "isNumber" }, { errorMessage: "Значение превышает количетсво допустимых бит", isValid: false, key: "isMaxBitLength" }] }}
    ${[[0, "boolean"]]} | ${[true]} | ${{ field: [{ key: "isBoolean", isValid: true, errorMessage: false }, { key: "isMaxBitLength", isValid: false, errorMessage: "Значение превышает количетсво допустимых бит" }] }}
    ${[[1, "boolean"]]} | ${[1]}    | ${{ field: [{ key: "isBoolean", isValid: false, errorMessage: "Значение должно быть типом Boolean" }, { key: "isMaxBitLength", isValid: true, errorMessage: false }] }}
  `(`Валидация работает корректно`, ({ data, schema, expects }) => {
    console.error = jest.fn();

    expect(() => encode(data, schema)).toThrowError(/^Ошибка валидации$/);

    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining(expects)
    );
  });
});

const a = {
  field: [
    { errorMessage: false, isValid: true, key: "isNumber" },
    {
      errorMessage: "Значение превышает количетсво допустимых бит",
      isValid: false,
      key: "isMaxBitLength",
    },
  ],
  isValid: false,
  value: 10,
};
