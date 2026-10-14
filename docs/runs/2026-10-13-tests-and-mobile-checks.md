# Run log: unit tests and mobile layout checks (2026-10-13)

Run locally on Windows 11, Node v22.20.0, Playwright Chromium. Status: Verified (re-run 2026-10-13).

## Unit tests

Command: `node --test` (from the repository root, no dependencies)

Result: 21 tests, 21 pass, 0 fail (`tests/subnet.test.js`, `tests/richText.test.js`).

## Layout check, all 15 views

Method: serve with `python -m http.server 8090`, open `http://127.0.0.1:8090/`, call `window.app.navigateTo(view)` for each of the 15 sidebar views, then compare `document.documentElement.scrollWidth` with `clientWidth` and count elements clipped by an `overflow:hidden` ancestor (KaTeX's visually hidden MathML copy excluded). A screenshot of each view was taken at each width.

| Width | Views checked | Horizontal overflow | Clipped elements | Console errors/warnings | Failed requests |
|---|---|---|---|---|---|
| 390 x 844 | 15 | 0 px on all 15 | 0 | 0 | 0 |
| 1280 x 800 | 15 | 0 px on all 15 | 0 | 0 | 0 |

The only 404 is `/favicon.ico`. Before the CSS change the same measurement at 390 px gave 55 to 1,043 px of overflow on all 15 views.

## Behaviour checks (390 and 1280 px)

- Exam solver: 93 KaTeX nodes rendered on the December 2022 paper, no literal `$` left on screen, 4 tables rendered. December 2023 paper: no literal `$`; question 14b appears under a "PART B" heading.
- Subnet tool: 181.56.0.0 /26 shows "10 bits (1,024 subnets)" (Class B). 192.168.10.77 /26 is labelled "Class C, default /24" (2 bits, 4 subnets; asserted in the unit tests). 999.1.1.1 is rejected with an error message.
- CRC tool: 10011101 with 1001 gives codeword 10011101100; input `10201` is rejected with an error message.
