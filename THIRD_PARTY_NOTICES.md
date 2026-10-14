# Third-party notices

Original work in this repository is © Jane Rose Ferdinant, licensed CC BY-NC-ND 4.0 (see `LICENSE`).
The licence does **not** apply to the third-party material listed below, which keeps its own copyright and terms.

## 1. Reference PDFs in `docs/reference_materials/`

These 18 files are third-party documents kept in the repository as study references. No licence or
permission to redistribute them has been recorded for any of them. They are listed here for attribution
and so the owner can decide what stays public (see "Proposed removals" in the pull request).

"Status" means: **Confirmed** is checked from the file itself (text, metadata or page content);
**Phase 1 audit** is a finding recorded in the 2026-10-12 audit that has not been re-checked file by file;
**Unconfirmed** means the source could not be established from the file.

### Lab manuals

| File | Source | Status |
|---|---|---|
| `lab_manuals/OSPF_Routing.pdf` | Page 1 is headed "Vidya Academy of Science and Technology, PCCSL507 Networks Lab, Experiment 14". Another institution's manual. | Confirmed (header). Authorship and permission unconfirmed |
| `lab_manuals/RIPv2_Routing.pdf` | Same header, "Experiment 13". | Confirmed (header). Authorship and permission unconfirmed |

### KTU question papers (CST303, 2019 scheme)

Published by APJ Abdul Kalam Technological University (KTU). Copyright in KTU examination papers rests with KTU.

| File | What it is | Status |
|---|---|---|
| `question_papers/B1 CST303 CN QP - Dec 2022.pdf` | CST303 paper, code 1100CST303122106 (December 2022) | Confirmed (text) |
| `question_papers/B1 CST303 CN QP1 - Dec 2022.pdf` | Same paper and code as the file above | Confirmed (text). Near-duplicate |
| `question_papers/Qp-2022.pdf` | Listed in the Phase 1 audit as the third December 2022 copy | Phase 1 audit. Could not be opened for this notice (truncated file) |
| `question_papers/CST303-QP.pdf` | CST303 paper, code 1100CST303122101 (used by the app as the December 2023 paper) | Confirmed (text) |
| `question_papers/CST303-QP (2).pdf` | CST303 paper, code 1100CST303122102 | Confirmed (text) |
| `question_papers/CST303-QP (2) (1).pdf` | Byte-identical to `CST303-QP (2).pdf` (same SHA-256) | Confirmed. Exact duplicate |
| `question_papers/CST303-QP (4).pdf` | CST303 paper, code 1100CST303122104 (December 2021 text copy) | Confirmed (text) |
| `question_papers/CST303 COMPUTER NETWORKS, DECEMBER 2021 (1).pdf` | Scan of the December 2021 paper. PDF producer is "A-PDF Watermark", so it carries a third-party watermark (the audit reads it as `ktunotes.in`). Reg. No. and Name fields are blank. | Confirmed (producer, blank fields). Watermark text from Phase 1 audit |

### KTU valuation schemes

| File | What it is | Status |
|---|---|---|
| `question_papers/B2 CST303 CN QP SCHEME1-Dec 2022.pdf` | Scheme of Valuation, code 1100CST303122106, headed "FINAL SCHEME". Page 1 says "Page 1 of 4, Total Pages: 3". The audit notes an internal heading reading "December 2021". | Confirmed (header). Official release unconfirmed |
| `question_papers/CST303-DRAFT SCHEME1.pdf` | Scheme of Valuation, code 1100CST303122101, headed "DRAFT SCHEME" | Confirmed (header). A draft marking scheme, so publication was probably not intended |

### Scanned papers from other courses and colleges

| File | What it is | Status |
|---|---|---|
| `question_papers/s6-b-tech-computer-networks-april-2018.pdf` | Computer Networks paper, April 2018 (S6, 2015 scheme, CS306). Not CST303. | Phase 1 audit (course and year). Producer metadata empty |
| `question_papers/s6-cs-computer-networks-may-2019-1.pdf` | Computer Networks paper, May 2019 (S6, 2015 scheme, CS306). Not CST303. | Phase 1 audit. Producer metadata empty |
| `question_papers/q3.pdf` | CS306 scan (2018 or 2019). Same size as `qstn3.pdf`. | Phase 1 audit. Encrypted, not readable here |
| `question_papers/qstn3.pdf` | CS306 scan. Same size as `q3.pdf`. | Phase 1 audit. Encrypted, not readable here |
| `question_papers/qstn 1.pdf` | CS306 scan. Within 1 byte of `qstn2.pdf`. | Phase 1 audit. Encrypted, not readable here |
| `question_papers/qstn2.pdf` | CS306 scan. Within 1 byte of `qstn 1.pdf`. | Phase 1 audit. Encrypted, not readable here |

The Phase 1 audit found that three scanned papers in this folder carry other colleges' library stamps
(two legible, both naming other institutions). The December 2021 scan above is one candidate; the others are among
the encrypted scans. Which three, and the names on the stamps, have not been confirmed here.

## 2. Libraries loaded at run time

Loaded from a CDN by `index.html`. They are not copied into this repository, so their licence text is not redistributed here.

| Component | Version | Licence | Source |
|---|---|---|---|
| Three.js | r128 | MIT | https://threejs.org/, https://cdnjs.com/libraries/three.js/r128 |
| KaTeX | 0.16.11 | MIT | https://katex.org/, https://cdnjs.com/libraries/KaTeX/0.16.11 |
| Exo 2 (Google Fonts) | current | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Exo+2 |
| Roboto Mono (Google Fonts) | current | Apache License 2.0 | https://fonts.google.com/specimen/Roboto+Mono |

The Three.js and KaTeX scripts and the KaTeX stylesheet are loaded with Subresource Integrity hashes.

## 3. Referenced works

The Industry Research view cites papers and standards (Cerf and Kahn 1974, Dijkstra 1959, the P4 paper of Bosshart et al.,
IETF RFCs). They are cited by DOI or link only; no text is reproduced.
