function* iterate(str) {
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charCode = char.charCodeAt(0);

    if (charCode >= 0xd800 && charCode <= 0xdbff) {
      if (i + 1 >= str.length) {
        return;
      }

      const nextChar = str[i + 1];
      const nextCharCode = nextChar.charCodeAt(0);

      if (nextCharCode >= 0xdc00 && nextCharCode <= 0xdfff) {
        yield char + nextChar;
        i++;
        continue;
      }
    }
  }
}

console.log(...iterate("😀"));
