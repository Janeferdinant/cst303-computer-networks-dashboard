# Review checklist for the new worked solutions

**DRAFT SOLUTIONS FOR OWNER REVIEW.** The 40 solutions below were drafted with AI assistance to complete both papers (30 of 30 questions each). Nothing here has been checked against a lecturer's marking. Please review each answer before the branch is merged.

## How the answers were checked
- **Numerical and algorithmic answers** (propagation delay, Ethernet padding, CRC, parity, subnetting, bit and byte stuffing, Manchester codes, distance vector and Dijkstra examples, count-to-infinity, header and frame sizes, class ranges, multicast MAC mapping, critical angle) are re-computed by `scripts/verify_solutions.js` (run `npm run verify`). The script also checks that each computed value appears in the written solution. These items need only a quick read.
- **Theory answers** follow standard textbooks (Tanenbaum, Forouzan, Peterson and Davie, Kurose and Ross) in exam-answer form, with the mark splits from the KTU valuation schemes in the repository. No script can check them, so they need your judgement.
- **Mark splits** come from `B2 CST303 CN QP SCHEME1-Dec 2022.pdf` (Dec 2022) and `CST303-DRAFT SCHEME1.pdf` (Dec 2023, a draft scheme). Textbook references are at chapter level, copied from `js/data/syllabusData.js`.

## Confidence levels
- **High:** standard textbook content, or a number reproduced by the script. Skim.
- **Medium:** correct as far as I know, but it depends on a convention, an edition or detailed figures that vary by textbook. Please check against the book used in class.
- **Low:** a guess at what the examiner expects, or content I could not confirm. None of the new solutions is rated low.

**Counts of new or rewritten solutions:** high 37, medium 3, low 0 (total 40).

## December 2022 (paper code 1100CST303122106)

| Done | Q | Marks | Topic (source) | Confidence | Machine-checked values |
|---|---|---|---|---|---|
| [ ] | 12a | 8 | Network Classification & Topologies (Tanenbaum Ch 1.2, Forouzan Ch 1) | high | 2: links in a 5-node full mesh; links in a 4-node full mesh (figure) |
| [ ] | 12b | 6 | Transmission Media & Fiber Optics (Tanenbaum Ch 2.2-2.3, Forouzan Ch 7) | high | 1: critical angle for n1=1.48, n2=1.46 (deg, 1 dp) |
| [ ] | 13a | 6 | LAN Technologies (Tanenbaum Ch 4.3-4.4, Peterson & Davie Ch 2.6-2.7); segment lengths from the IEEE 802.3u/z/ab summaries | medium | none (theory) |
| [ ] | 14a | 8 | Framing and HDLC (Tanenbaum Ch 3.1 and 3.3, Forouzan Ch 11) | high | 3: I-frame control = 1 (type) + 3 + 1 + 3 bits; bit-stuffed example; unstuffing recovers the data |
| [ ] | 14b | 6 | Multiple Access Protocols (Tanenbaum Ch 4.2-4.4, Forouzan Ch 12) | high | 2: K upper bounds after collisions 1..4; range capped at 2^10 - 1 after 10th collision |
| [ ] | 15a | 8 | Routing Algorithms (Tanenbaum Ch 5.2.4-5.2.5, Peterson & Davie Ch 3.3) | high | none (theory) |
| [ ] | 15b | 6 | Subnet Service Models (Tanenbaum Ch 5.1.2-5.1.4) | high | none (theory) |
| [ ] | 16b | 8 | Traffic Shaping & QoS Techniques - packet scheduling (Tanenbaum Ch 5.4.4, Forouzan Ch 24) | high | 1: guaranteed rates for weights 3, 2, 1 on 6 Mbps |
| [ ] | 17b | 6 | Internet Routing Architectures - BGP (Tanenbaum Ch 5.6.7, Forouzan Ch 21) | high | none (theory) |
| [ ] | 18a | 7 | Internet Routing Architectures - OSPF (Tanenbaum Ch 5.6.6, Forouzan Ch 21) | high | none (theory) |
| [ ] | 18b | 7 | Address Translation Protocols (Tanenbaum Ch 5.6.4, Forouzan Ch 21) | high | 1: ARP packet bytes = 2+2+1+1+2+6+4+6+4 |
| [ ] | 19b | 6 | Transport Layer Primitives & UDP (Tanenbaum Ch 6.4, Forouzan Ch 14) | high | 2: UDP header bytes = 4 fields x 2; max UDP payload over IPv4 = 65535 - 20 - 8 |
| [ ] | 20a | 9 | Application Protocols - electronic mail (Tanenbaum Ch 7.2, Forouzan Ch 26) | high | none (theory) |
| [ ] | 20b | 5 | Domain Name System (Tanenbaum Ch 7.1, Tanenbaum Ch 8 security) - the scheme states DNS attacks are outside the syllabus and awards the marks for any attempt | medium | none (theory) |

## December 2023 (paper code 1100CST303122101)

| Done | Q | Marks | Topic (source) | Confidence | Machine-checked values |
|---|---|---|---|---|---|
| [ ] | 5 | 3 | Routing Algorithms (Tanenbaum Ch 5.1-5.2) | high | none (theory) |
| [ ] | 6 | 3 | Traffic Shaping & QoS Techniques (Tanenbaum Ch 5.4) | high | none (theory) |
| [ ] | 7 | 3 | Multicast routing and IGMP (Tanenbaum Ch 5.2.8 and 5.6.8, Forouzan Ch 21) | high | 4: class D range; multicast MAC for 224.1.2.3; multicast MAC for 239.129.0.1 (shares MAC with 224.1.0.1); 5 high-order bits of the group address are ignored: 2^5 groups per MAC |
| [ ] | 8 | 3 | IPv4 Addressing & Subnetting (Forouzan Ch 19, Tanenbaum Ch 5.6) | high | 1: class A/B/C ranges and masks |
| [ ] | 9 | 3 | Transport Layer Primitives & UDP (Tanenbaum Ch 6.1.2) | high | none (theory) |
| [ ] | 10 | 3 | Domain Name System (Tanenbaum Ch 7.1.3, Forouzan Ch 26) | high | none (theory) |
| [ ] | 11a | 4 | Layering Principles & Reference Models (Tanenbaum Ch 1.4, Forouzan Ch 2) | high | none (theory) |
| [ ] | 11b | 10 | Network Classification & Topologies (Tanenbaum Ch 1.2, Forouzan Ch 1.2) | high | 2: links in a 5-node full mesh; I/O ports per device in a 5-node mesh |
| [ ] | 12a | 8 | Network Classification & Topologies (Tanenbaum Ch 1.2, Forouzan Ch 1.2) | high | none (theory) |
| [ ] | 12b | 6 | Physical Layer Encoding (Forouzan Ch 4.1, Peterson & Davie Ch 2.2). Medium: textbooks differ on which transition means 1 for Manchester | medium | 2: Manchester of 10110010 (1 = low-to-high); Differential Manchester of 10110010, line starting low |
| [ ] | 13a | 10 | Framing Mechanisms (Tanenbaum Ch 3.1.2, Peterson & Davie Ch 2.3) | high | 3: byte stuffing A FLAG B ESC C; bit stuffing example; unstuffing recovers the data |
| [ ] | 13b | 4 | Error Detection & Correction (Tanenbaum Ch 3.2, Forouzan Ch 10) | high | 3: single-bit error flips exactly one bit; burst length counted first-to-last corrupted bit; bits hit by a 1 ms burst at 10 Mbps |
| [ ] | 14a | 7 | LAN Technologies & IEEE 802.11 (Tanenbaum Ch 4.4.4, Peterson & Davie Ch 2.7) | high | 3: frame-control subfields total 16 bits; MAC header with 4 addresses = 30 bytes; maximum MPDU = 30 + 2312 + 4 |
| [ ] | 14b | 7 | Error Detection & Correction - CRC (Tanenbaum Ch 3.2.2, Peterson & Davie Ch 2.4). Rewritten: the original division layout showed an incorrect quotient | high | 3: CRC remainder; transmitted codeword; receiver division gives zero remainder |
| [ ] | 15a | 8 | Routing Algorithms - distance vector (Tanenbaum Ch 5.2.4, Peterson & Davie Ch 3.3) | high | 4: final costs from A to B,C,D; A reaches C and D via B; final costs from D to A,B,C; tables stop changing after 2 exchange rounds |
| [ ] | 15b | 6 | Congestion Control Approaches - traffic throttling (Tanenbaum Ch 5.3.4, Forouzan Ch 24) | high | none (theory) |
| [ ] | 16a | 10 | Routing Algorithms - link state (Tanenbaum Ch 5.2.5, Peterson & Davie Ch 3.3) | high | 3: shortest distances from A; shortest paths from A; order in which nodes are settled |
| [ ] | 16b | 4 | Congestion Control Approaches - load shedding (Tanenbaum Ch 5.3.5) | high | none (theory) |
| [ ] | 17a | 7 | IPv4 Addressing & Subnetting (Forouzan Ch 19, Peterson & Davie Ch 3.2) | high | 3: four /26 subnets of 192.168.1.0/24; usable hosts per /26; 192.168.1.100 AND 255.255.255.192 |
| [ ] | 17b | 7 | IPv6 Next-Generation Protocol (Tanenbaum Ch 5.6.3, Forouzan Ch 22) | high | 1: IPv6 base header = 320 bits = 40 bytes |
| [ ] | 18a | 9 | Internet Routing Architectures - BGP (Tanenbaum Ch 5.6.7, Forouzan Ch 21) | high | none (theory) |
| [ ] | 18b | 5 | Address Translation Protocols - BOOTP (Forouzan Ch 21 and 18, RFC 951) | high | 1: BOOTP message = 300 bytes |
| [ ] | 19a | 6 | Application Protocols - FTP (Forouzan Ch 27, Tanenbaum Ch 7) | high | none (theory) |
| [ ] | 19b | 8 | Application Protocols - SNMP (Forouzan Ch 28, Tanenbaum Ch 7) | high | none (theory) |
| [ ] | 20a | 7 | Transmission Control Protocol (TCP) - connection establishment (Tanenbaum Ch 6.2.2 and 6.5.6, Kurose & Ross Ch 3.5) | high | 1: SYN-ACK acks x+1; final ACK acks y+1 |
| [ ] | 20b | 7 | Application Protocols - electronic mail (Tanenbaum Ch 7.2, Forouzan Ch 26) | high | none (theory) |

## Existing solutions that were changed

| Paper | Q | Change |
|---|---|---|
| cst303-dec2022 | 1 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 2 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 3 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 4 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 5 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 6 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 6 | method names aligned to the scheme (source-based and core-based) |
| cst303-dec2022 | 7 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 8 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 9 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 10 | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 11a | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 13b | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 16a | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 17a | marking notes aligned to the valuation scheme |
| cst303-dec2022 | 19a | marking notes aligned to the valuation scheme |
| cst303-dec2023 | 1 | marking notes aligned to the valuation scheme |
| cst303-dec2023 | 2 | marking notes aligned to the valuation scheme |
| cst303-dec2023 | 3 | marking notes aligned to the valuation scheme |
| cst303-dec2023 | 4 | marking notes aligned to the valuation scheme |
| cst303-dec2023 | 14b | rewritten (see note below) |

The December 2023 Q14b worked solution was rewritten because its long-division diagram showed a wrong quotient (10001101); the correct quotient is 10001100. The remainder 100 and the transmitted frame 10011101100 were already correct. The marking notes of the older solutions were aligned to the valuation schemes (several had mark splits that did not match the scheme).

## Notes for the reviewer
- The 16 questions of December 2022 and 5 of December 2023 that existed before this change keep their original answers except where listed above; their numerical values are covered by the same script.
- Section numbers in the `syllabusRef` fields of the older solutions (for example Tanenbaum Ch 5.5.3) were not re-checked against a specific edition.
- Both papers were read from the PDF text layer. There were no figures or unreadable scans among the questions, so every question could be answered from the paper text.
