---
title: "Phoning it in"
author: Daniel James
authored_at: 2024-12-21
date: 2024-01-01
challenges:
  - haystack: "You can reach our London office at +44 (020) 5555 7777 or New York office at +1 (877) 555-7777."
    needle: "+1 (877) 555-7777"
  - haystack: "+525587654321 gets you to the Mexico office"
    needle: "+525587654321"
  - haystack: '"19005558008" is an example of a premium-rate telephone number in the US and Canada'
    needle: "19005558008"
  - haystack: "Alice told me to call Eve at 52 55 3746 5111, but she didn't answer!"
    needle: "52 55 3746 5111"
  - haystack: "You can usually use a comma to separate a phone number from an extension in your Contacts app. For example: +18885551212,1234"
    needle:
      - "+18885551212"
      - "+18885551212,1234"
---

Find phone numbers that are valid in North America.
