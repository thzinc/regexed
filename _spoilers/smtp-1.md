---
title: "HELO from the other side"
author: Daniel James
authored_at: 2025-01-09
date: 2024-01-01
challenges:
  - haystack: |
      HELLO you@example.com
      HELO example.com
      SUBJ Go over everything?
    needle: "HELO example.com"
  - haystack: |
      FROM:<otherside@example.com>
      MAIL:<otherside@example.com>
      MAIL FROM:<otherside@example.com>
    needle: "MAIL FROM:<otherside@example.com>"
  - haystack: |
      RCPT TO:<you@example.com>
      TO:<you@example.com>
      RCTO:<you@example.com>
    needle: "RCPT TO:<you@example.com>"
  - haystack: |
      DATA: I've tried
      NOOP
      VRFY
    needle: "NOOP"
  - haystack: |
      REST
      QUIT
      EXPD
    needle: "QUIT"
---

Find the _valid_ [SMTP][rfc] commands with their associated data in each of the challenges.

[rfc]: https://datatracker.ietf.org/doc/html/rfc5321
