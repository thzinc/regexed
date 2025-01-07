---
title: "An inline 5"
author: Daniel James
authored_at: 2025-01-06
date: 2024-01-01
challenges:
  - haystack: "While text simply can be made <b>bold</b>, the <strong> tag is a better way to convey importance."
    needle: "bold"
  - haystack: "Emphasis may be implied by <i>italics</i>, but the <em> tag is useful in the same way."
    needle: "italics"
  - haystack: It's good practice to explain <abbr title="Three-Letter Acronyms">TLAs</abbr> with the tag for abbreviations.
    needle: "TLAs"
  - haystack: "Similarly, the <b> and <i> tags, depending on the context, <s>strikethrough</s> text may better be represented with the <del> tag–in conjunction with its sibling <ins>–for conveying editing notations."
    needle: "strikethrough"
  - haystack: Of course, ARIA also exists to provide authors a means to specify semantics even for <span role="emphasis">elements that have no semantics of their own</span> defined.
    needle: "elements that have no semantics of their own"
---

Find the text content of the [HTML][spec] tag in each of the challenges.

[spec]: https://html.spec.whatwg.org/multipage
