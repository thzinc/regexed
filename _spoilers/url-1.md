---
title: "Uniform Resource Locators"
author: Daniel James
authored_at: 2024-12-23
date: 2024-01-01
challenges:
  - haystack: "A URL has a scheme and a scheme-specific part. e.g., in the URL http://example.com, the scheme is http and the scheme-specific part is //example.com"
    needle: "http://example.com"
  - haystack: "The common internet scheme syntax uses a // to signify the start of the scheme-specific part, but is not used by other schemes, such as in tel:+18885551212"
    needle: "tel:+18885551212"
  - haystack: 'Schemes like FTP often make use of username and password scheme data, as in ftp://alice:PlaintextPassword@ftp.example.com to authenticate as the user "alice"'
    needle: "ftp://alice:PlaintextPassword@ftp.example.com"
  - haystack: "A scheme often implies a port number by default, such as 80 for HTTP or 443 for HTTPS. However, an arbitrary port can be specified after the host as in gopher://library.example:7070/README"
    needle: "gopher://library.example:7070/README"
  - haystack: "While it's uncommon to see in practice, scheme names can contain plus, period, and hyphen characters, as in this fictional example: buuz-baar.abc+xyz:example.com/about"
    needle: "buuz-baar.abc+xyz:example.com/about"
---

Find the [URL](https://datatracker.ietf.org/doc/html/rfc1738) in each of the challenges.
