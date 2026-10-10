/** Splits "Look at *f7*. That's the *weak spot*!" into words with an emphasis flag. */
export const richWords = (text: string) => {
  const words: { text: string; em: boolean }[] = [];
  let em = false;
  let cur = "";
  let curEm = false;
  const flush = () => {
    if (cur) words.push({ text: cur, em: curEm });
    cur = "";
  };
  for (const ch of text) {
    if (ch === "*") {
      em = !em;
      if (cur && em) {
        // emphasis starts mid-word: keep the word together, mark as emphasised
        curEm = true;
      }
      continue;
    }
    if (ch === " ") {
      flush();
      continue;
    }
    if (!cur) curEm = em;
    else if (em) curEm = true;
    cur += ch;
  }
  flush();
  return words;
};
