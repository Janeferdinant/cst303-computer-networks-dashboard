# Run log, 2026-10-14: complete past-paper solutions

Node v22.20.0, Playwright (Chromium) against `python -m http.server 8091`.

## Scripts
- `node --test`: 30 tests, 30 pass, 0 fail.
- `npm run verify` (`scripts/verify_solutions.js`): 86 of 86 checks pass; coverage 30/30 for `cst303-dec2022` and 30/30 for `cst303-dec2023`.
- All 187 TeX fragments in the solutions were also compiled with KaTeX 0.16.11 using `throwOnError: true, strict: 'warn'` (installed outside the repo): 0 errors, 0 warnings.

## Browser (Playwright)
- 15 views x {390 px, 1280 px}: horizontal overflow 0 px on all 30 checks; 0 console errors and 0 failed requests (only the missing `favicon.ico` returns 404).
- Overview counter reads 60 (computed from the data); the exam card reads "every question of the KTU December 2022 and December 2023 papers".
- Question solver, both papers, detailed and concise views, at both widths: 30 solution cards per paper, 0 `.katex-error` nodes, 0 literal `$` or `**` in the rendered text, 0 empty solution boxes, no page overflow (119 KaTeX nodes on Dec 2022 detailed, 67 on Dec 2023 detailed).
- Module filter on Dec 2023: modules 1 to 5 show 6 questions each; "All Modules" shows 30.
- Screenshots: `docs/screenshots/exam-solver-dec2023-q12b-390.png`, `docs/screenshots/exam-solver-dec2023-q16a-1280.png` (element screenshots; the sticky header overlay in them is a capture artefact).
