---
layout: default
---

# How to play

Write a [Regular Expression][mdn] pattern to satisfy the prompt and match all five of the challenges in 6
tries or fewer.

At the start, none of the challenges are revealed yet. Rely on the prompt to guide you to make your best guess.

With each attempt, challenges will be revealed from top to bottom. If a pattern matches a challenge, the next challenge will be revealed.

While writing a pattern, each revealed challenge highlights the matching text and displays an indicator of whether the challenge is satisfied by the pattern.

The [ECMAScript Regular Expression][ecma] implementation is used here, with the Unicode sets mode (i.e., the `v` flag) enabled. This permits use of named Unicode sets in the pattern.

# Contribute

If you want to contribute a puzzle, [open an issue on GitHub][gh] with your puzzle idea.

[gh]: https://github.com/thzinc/regexed/issues/new
[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
[ecma]: https://tc39.es/ecma262/multipage/text-processing.html#sec-regexp-regular-expression-objects

# Why?

See [xkcd #208][comic].

[comic]: https://xkcd.com/208/
[comic-license]: https://xkcd.com/license.html
