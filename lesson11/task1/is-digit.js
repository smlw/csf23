const alphabets = [
  ["arabic", (code) => (code < 0x0030 ? -1 : code > 0x0039 ? 1 : 0)],
  ["rome", (code) => (code < 0x2160 ? -1 : code > 0x2188 ? 1 : 0)],
  ["greek", (code) => (code < 0x10140 ? -1 : code > 0x10174 ? 1 : 0)],
];

export const getComparator = (char) => {
  let from = 0;
  let to = alphabets.length;

  const charCode = char.codePointAt(0);

  if (charCode == null) {
    return null;
  }

  while (from < to) {
    const mid = Math.floor((from + to) / 2);
    const [_, comparator] = alphabets[mid];

    const comp = comparator(charCode);

    if (comp === 0) {
      return comparator;
    }

    if (comp < 0) {
      to = mid;
    } else {
      from = mid + 1;
    }
  }

  return null;
};

export const isDigit = (str) => {
  if (str.length === 0) {
    return false;
  }

  let comparator;

  for (const char of str) {
    comparator ??= getComparator(char);

    if (comparator == null || comparator(char.codePointAt(0)) !== 0) {
      return false;
    }

    return true;
  }
};
