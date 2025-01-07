---
title: "A precursor to the generic URI"
author: Daniel James
authored_at: 2025-01-06
date: 2024-01-01
challenges:
  - haystack: "Many URL schemes follow Common Internet Scheme Syntax. In the example of https://awesome.example, the scheme-specific data of the URL is //awesome.example."
    needle: "https://awesome.example"
  - haystack: "URL schemes that follow Common Internet Scheme Syntax have default port numbers, but the syntax allows for nonstandard ports to be specified as in ftp://files.example.org:21021/README.md"
    needle: "ftp://files.example.org:21021/README.md"
  - haystack: "A username and password may be included in the scheme data. Client implementations translate an HTTP URL like http://alice:s3cretp4ssw0rd@obscure.example into a request to obscure.example with an Authorization header set to YWxpY2U6czNjcmV0cDRzc3cwcmQ="
    needle: "http://alice:s3cretp4ssw0rd@obscure.example"
  - haystack: "It's possible to form a valid URL with both a username and a password as an empty string as in https://:@host.example.com"
    needle: "https://:@host.example.com"
  - haystack: "Of course, the host portion of the URL does not have to be a DNS name: http://1:1@[::1]:1111!"
    needle: "http://1:1@[::1]:1111"
---

Find the [URL](https://datatracker.ietf.org/doc/html/rfc1738) in each of the challenges.
