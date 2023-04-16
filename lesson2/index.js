import { decode } from "./src/decode.js";
import { encode } from "./src/encode.js";

const schema = [
  [3, "number"], // 3 бита число
  [2, "number"], // 2 бита число
  [1, "boolean"], // 1 бит логический
  [1, "boolean"], // 1 бит логический
  [16, "ascii"], // 16 бит 2 аски символа
];

// 😋

const data = [7, 3, true, false, "ab"];
console.log("🚀 ~ file: index.js:15 ~ data:", data);

const encoded = encode(data, schema);
console.log("🚀 ~ file: index.js:14 ~ encoded:", encoded);

// 😋
const decoded = decode(encoded, schema); // [2, 3, true, false, 'ab']
console.log("🚀 ~ file: index.js:18 ~ decoded:", decoded);
