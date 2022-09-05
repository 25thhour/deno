# deno

Utility scripts written in Deno 🦕

- [regex-replace.ts](./src/regex-replace.ts)
  - function to test a RE2-like regex in JavaScript. Supply 3 arguments;
    `source` string, `match` regex to match with, `replacement`
  ```
  e.g. deno run src/regex-replace.ts source match replacement
  ❯ deno run src/regex-replace.ts '/images/nature/animals/tiger.png' '^/images/[^/]+/[^/]+/(.+)$' '/img/${1}'
  /img/tiger.png
  ```
- [time-requests.ts](./src/time-requests.ts)
  - fire `x` requests at a URL and log if breaching `y` response time (ms)
  ```
  e.g. deno run --allow-net src/time-requests.ts https://example.com y x
  ❯ deno run --allow-net src/time-requests.ts https://example.com 250 10
  ```
