/**
 * Command line tool to generate regexed 🗯️ puzzles using the NATO phonetic alphabet
 *
 * Example:
 * yarn run nato MY FIVE WORD PHRASE HERE
 */
import friendlyWords from "friendly-words";
import YAML from "yaml";

const NATO_WORDS = new Set<string>([
  "ALFA",
  "BRAVO",
  "CHARLIE",
  "DELTA",
  "ECHO",
  "FOXTROT",
  "GOLF",
  "HOTEL",
  "INDIA",
  "JULIETT",
  "KILO",
  "LIMA",
  "MIKE",
  "NOVEMBER",
  "OSCAR",
  "PAPA",
  "QUEBEC",
  "ROMEO",
  "SIERRA",
  "TANGO",
  "UNIFORM",
  "VICTOR",
  "WHISKEY",
  "XRAY",
  "YANKEE",
  "ZULU",
]);
const NATO_WORDS_BY_FIRST_LETTER = new Map<string, string>(
  Array.from(NATO_WORDS).map((word) => [word[0], word])
);

const NON_NATO_WORDS: string[] = friendlyWords.predicates
  .map((word) => word.toUpperCase())
  .filter((word) => !NATO_WORDS.has(word));

function getRandomNonNATOWords(count: number): string[] {
  const words = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * NON_NATO_WORDS.length);
    words.push(NON_NATO_WORDS[index]);
  }

  return words;
}

const plaintextWords = process.argv
  .slice(2)
  .map((word) => word.replace(/[^a-z]+/gi, ""))
  .map((word) => word.toUpperCase());

const bufferWordsCount = 1 + Math.floor(Math.random() * 3);
const maxWordsPerChallenge =
  bufferWordsCount +
  plaintextWords.reduce((max, cur) => Math.max(max, cur.length), 0);

const challenges = plaintextWords
  .map((word) => ({
    wordsBefore: Math.floor(
      Math.random() * (maxWordsPerChallenge - word.length)
    ),
    needle: Array.from(word).map((letter) =>
      NATO_WORDS_BY_FIRST_LETTER.get(letter)
    ),
  }))
  .map(({ wordsBefore, needle }) => ({
    haystack: [
      ...getRandomNonNATOWords(wordsBefore),
      ...needle,
      ...getRandomNonNATOWords(
        maxWordsPerChallenge - needle.length - wordsBefore
      ),
    ].join(" "),
    needle: needle.join(" "),
  }));

const frontMatter = YAML.stringify({
  title: "",
  author: "",
  authored_at: new Date().toISOString().slice(0, 10),
  date: "2024-01-01",
  challenges,
});

const markdown = `
---
${frontMatter}
---

Find the consecutive [NATO phonetic alphabet][wikipedia] words in each of the challenges.

Note: All words are UPPERCASE.

[wikipedia]: https://en.wikipedia.org/wiki/NATO_phonetic_alphabet
`;

process.stdout.write(markdown);
