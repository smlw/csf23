const isValid = (string) => {
  const stack = [];

  const BRACKET_PAIRS = {
    "]": "[",
    ")": "(",
    "}": "{",
  };

  const isOpenBracket = (symbol) => ["[", "(", "{"].includes(symbol);

  const isCloseBracket = (symbol) => ["]", ")", "}"].includes(symbol);

  const isValidPair = (symbol) => BRACKET_PAIRS[symbol] === stack.at(-1);

  try {
    for (let i = 0; i <= string.length - 1; i++) {
      const symbol = string[i];

      if (isOpenBracket(symbol)) {
        stack.push(symbol);
      }

      if (isCloseBracket(symbol)) {
        if (isValidPair(symbol)) {
          stack.pop();
        } else {
          throw new Error("no valid");
        }
      }
    }

    return !stack.length;
  } catch (error) {
    return false;
  }
};

console.log(isValid("(hello{world} and [me])")); // true
console.log(isValid("(hello{world)} and [me])")); // false
console.log(isValid("(()")); // false
