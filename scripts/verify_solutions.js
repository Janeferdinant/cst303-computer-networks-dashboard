// Machine-checks every numerical or algorithmic result quoted in js/data/examSolutionsData.js.
//
// Each check recomputes a value from first principles (independent of the dashboard's own
// simulators, except one cross-check of js/lib/subnet.js) and then asserts that the finished
// worked solution actually contains the computed value. If a number in a solution is edited
// by hand, or a computation changes, `npm run verify` fails.
//
//   node scripts/verify_solutions.js          run all checks (exit code 1 on any failure)
//   node scripts/verify_solutions.js --show   also print the working used in the write-ups
//
// Written for Node 20+. No dependencies.

import { examSolutionsData } from '../js/data/examSolutionsData.js';
import { calculateSubnet, numberToIp, prefixToMask, ipToNumber } from '../js/lib/subnet.js';
import { pathToFileURL } from 'node:url';

// ---------------------------------------------------------------------------
// Helpers: independent implementations
// ---------------------------------------------------------------------------

/** Modulo-2 (XOR) division. Returns the remainder, the quotient and each long-division line. */
export function crcDivide(dividendBits, generatorBits) {
  const g = generatorBits.length;
  const bits = dividendBits.split('').map(Number);
  const gen = generatorBits.split('').map(Number);
  const work = bits.slice();
  const quotient = [];
  const lines = [];
  for (let i = 0; i + g <= work.length; i++) {
    if (work[i] === 1) {
      quotient.push(1);
      lines.push(`step at bit ${i}: window ${work.slice(i, i + g).join('')} XOR ${generatorBits} = ${work.slice(i, i + g).map((b, k) => b ^ gen[k]).join('')}`);
      for (let k = 0; k < g; k++) work[i + k] ^= gen[k];
    } else {
      quotient.push(0);
    }
  }
  const remainder = work.slice(work.length - (g - 1)).join('');
  return { remainder, quotient: quotient.join(''), lines };
}

export function crcCodeword(data, generator) {
  const r = generator.length - 1;
  const { remainder } = crcDivide(data + '0'.repeat(r), generator);
  return { remainder, codeword: data + remainder };
}

export function evenParityBit(bits) {
  return bits.split('').filter(b => b === '1').length % 2;
}

export function bitStuff(bits) {
  let out = '';
  let ones = 0;
  for (const b of bits) {
    out += b;
    if (b === '1') {
      ones++;
      if (ones === 5) { out += '0'; ones = 0; }
    } else {
      ones = 0;
    }
  }
  return out;
}

export function bitUnstuff(bits) {
  let out = '';
  let ones = 0;
  for (let i = 0; i < bits.length; i++) {
    const b = bits[i];
    out += b;
    if (b === '1') {
      ones++;
      if (ones === 5) { i++; ones = 0; } // skip the stuffed 0
    } else {
      ones = 0;
    }
  }
  return out;
}

/** Byte stuffing with FLAG and ESC bytes (shown as names). */
export function byteStuff(bytes, FLAG = 'FLAG', ESC = 'ESC') {
  const out = [];
  for (const b of bytes) {
    if (b === FLAG || b === ESC) out.push(ESC);
    out.push(b);
  }
  return out;
}

/** Manchester (1 = low-to-high mid-bit, 0 = high-to-low) as half-bit levels (H/L). */
export function manchester(bits) {
  return bits.split('').map(b => (b === '1' ? 'LH' : 'HL')).join('');
}

/** Differential Manchester: mid-bit transition always; 0 = transition at start of bit, 1 = none. */
export function diffManchester(bits, startLevel = 'L') {
  const flip = l => (l === 'H' ? 'L' : 'H');
  let level = startLevel; // level just before the first bit
  let out = '';
  for (const b of bits) {
    if (b === '0') level = flip(level); // transition at the start of the bit
    const first = level;
    level = flip(level);                // mid-bit transition
    out += first + level;
  }
  return out;
}

/** Synchronous distance-vector rounds. links: [a, b, cost]. Returns tables after each round. */
export function distanceVector(nodes, links) {
  const INF = Infinity;
  const cost = {};
  nodes.forEach(n => { cost[n] = {}; nodes.forEach(m => { cost[n][m] = n === m ? 0 : INF; }); });
  links.forEach(([a, b, c]) => { cost[a][b] = c; cost[b][a] = c; });
  const direct = JSON.parse(JSON.stringify(cost, (k, v) => (v === INF ? 'inf' : v)));
  const snapshot = t => nodes.map(n => ({ n, row: nodes.map(m => t[n][m]) }));
  // table[n][dest] = {cost, via}
  let table = {};
  nodes.forEach(n => {
    table[n] = {};
    nodes.forEach(d => {
      table[n][d] = { cost: n === d ? 0 : (cost[n][d] < INF ? cost[n][d] : INF), via: n === d ? '-' : (cost[n][d] < INF ? d : '-') };
    });
  });
  const rounds = [JSON.parse(JSON.stringify(table, (k, v) => (v === INF ? 'inf' : v)))];
  for (let round = 1; round <= nodes.length; round++) {
    const next = {};
    let changed = false;
    nodes.forEach(n => {
      next[n] = {};
      nodes.forEach(d => {
        let best = table[n][d];
        if (n !== d) {
          nodes.forEach(nb => {
            if (nb !== n && cost[n][nb] < INF) {
              const via = cost[n][nb] + table[nb][d].cost;
              if (via < best.cost) best = { cost: via, via: nb };
            }
          });
        }
        if (best.cost !== table[n][d].cost) changed = true;
        next[n][d] = best;
      });
    });
    table = next;
    rounds.push(JSON.parse(JSON.stringify(table, (k, v) => (v === INF ? 'inf' : v))));
    if (!changed) break;
  }
  return { rounds, final: table, direct, snapshot };
}

/** Dijkstra with a step log. edges: [a, b, w]. */
export function dijkstra(nodes, edges, source) {
  const adj = {};
  nodes.forEach(n => { adj[n] = []; });
  edges.forEach(([a, b, w]) => { adj[a].push([b, w]); adj[b].push([a, w]); });
  const dist = {}, prev = {};
  nodes.forEach(n => { dist[n] = Infinity; prev[n] = null; });
  dist[source] = 0;
  const done = new Set();
  const steps = [];
  while (done.size < nodes.length) {
    let u = null;
    nodes.forEach(n => { if (!done.has(n) && (u === null || dist[n] < dist[u])) u = n; });
    if (dist[u] === Infinity) break;
    done.add(u);
    adj[u].forEach(([v, w]) => {
      if (!done.has(v) && dist[u] + w < dist[v]) { dist[v] = dist[u] + w; prev[v] = u; }
    });
    steps.push({ settled: u, dist: { ...dist }, prev: { ...prev } });
  }
  const path = t => { const p = []; for (let x = t; x !== null; x = prev[x]) p.unshift(x); return p.join('-'); };
  return { dist, prev, steps, path };
}

/** Count-to-infinity on A - B - C when B-C fails (A and B exchange vectors each round). */
export function countToInfinity(infinity = 16) {
  // Before the failure: A->C = 2 (via B), B->C = 1. B-C then fails.
  let a = 2, b = Infinity; // after B-C fails B has no direct route; A still advertises 2
  const seq = [];
  for (let round = 1; round <= 40; round++) {
    // B hears A's vector: cost to C via A = 1 + a
    b = Math.min(infinity, 1 + a);
    seq.push(['B', b]);
    if (b >= infinity) break;
    a = Math.min(infinity, 1 + b);
    seq.push(['A', a]);
    if (a >= infinity) break;
  }
  return seq;
}

const ip = numberToIp;

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

const results = [];
const show = process.argv.includes('--show');

function solutionText(paperId, qNo) {
  const paper = examSolutionsData.find(p => p.paperId === paperId);
  for (const s of paper.sections) {
    const q = s.questions.find(x => String(x.qNo) === String(qNo));
    if (q) return `${q.conciseAnswer}\n${q.detailedAnswer}`;
  }
  return null;
}

/** Record an equality check on a computed value. */
function check(id, paperId, qNo, what, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  results.push({ id, paperId, qNo, what, ok, detail: ok ? '' : `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}` });
}

/** Record that the written solution contains each given string. */
function appears(id, paperId, qNo, strings) {
  const text = solutionText(paperId, qNo);
  const missing = text === null ? ['(question not found)'] : strings.filter(s => !text.includes(s));
  results.push({ id, paperId, qNo, what: `solution text contains ${strings.length} computed value(s)`, ok: missing.length === 0, detail: missing.length ? `missing: ${missing.join(' | ')}` : '' });
}

const D22 = 'cst303-dec2022';
const D23 = 'cst303-dec2023';

export function runChecks() {
  results.length = 0;

  // ---- December 2022 ------------------------------------------------------

  // Q2 propagation delay
  const tprop = 12000e3 / 2.4e8;
  check('d22-q2', D22, 2, 'propagation delay in seconds', tprop, 0.05);
  appears('d22-q2-text', D22, 2, ['50 ms', '0.05']);

  // Q3 Ethernet minimum data field and slot time
  const slotUs = 512 / 10e6 * 1e6;
  check('d22-q3-pad', D22, 3, 'minimum data field = 64 - (6+6+2+4)', 64 - (6 + 6 + 2 + 4), 46);
  check('d22-q3-slot', D22, 3, 'slot time of 512 bits at 10 Mbps (us)', Math.round(slotUs * 10) / 10, 51.2);
  appears('d22-q3-text', D22, 3, ['46', '1500', '51.2']);

  // Q12a links in a full mesh
  check('d22-q12a-mesh5', D22, '12a', 'links in a 5-node full mesh', 5 * 4 / 2, 10);
  check('d22-q12a-mesh4', D22, '12a', 'links in a 4-node full mesh (figure)', 4 * 3 / 2, 6);
  appears('d22-q12a-text', D22, '12a', ['10 links', '6 links']);

  // Q12b optical fibre critical angle (n1 = 1.48, n2 = 1.46)
  const critical = Math.asin(1.46 / 1.48) * 180 / Math.PI;
  check('d22-q12b', D22, '12b', 'critical angle for n1=1.48, n2=1.46 (deg, 1 dp)', Math.round(critical * 10) / 10, 80.6);
  appears('d22-q12b-text', D22, '12b', ['80.6']);

  // Q13b sliding window sizes for m = 3
  check('d22-q13b-gbn', D22, '13b', 'GBN sender window, m=3', 2 ** 3 - 1, 7);
  check('d22-q13b-sr', D22, '13b', 'SR window, m=3', 2 ** (3 - 1), 4);

  // Q14a HDLC: control-field widths and bit stuffing of the flag
  check('d22-q14a-i', D22, '14a', 'I-frame control = 1 (type) + 3 + 1 + 3 bits', 1 + 3 + 1 + 3, 8);
  const hdlcData = '0111110111111011111';
  const stuffed = bitStuff(hdlcData);
  check('d22-q14a-stuff', D22, '14a', 'bit-stuffed example', stuffed, '0111110011111010111110');
  check('d22-q14a-unstuff', D22, '14a', 'unstuffing recovers the data', bitUnstuff(stuffed), hdlcData);
  appears('d22-q14a-text', D22, '14a', [hdlcData, stuffed]);

  // Q14b CSMA/CD binary exponential back-off
  const bebRanges = [1, 2, 3, 4].map(n => 2 ** n - 1);
  check('d22-q14b-beb', D22, '14b', 'K upper bounds after collisions 1..4', bebRanges, [1, 3, 7, 15]);
  check('d22-q14b-cap', D22, '14b', 'range capped at 2^10 - 1 after 10th collision', 2 ** 10 - 1, 1023);
  appears('d22-q14b-text', D22, '14b', ['51.2', '1023']);

  // Q16a count to infinity (A-B-C, infinity = 16)
  const cti = countToInfinity(16);
  check('d22-q16a-first', D22, '16a', 'first updates are B=3, A=4, B=5', cti.slice(0, 3), [['B', 3], ['A', 4], ['B', 5]]);
  check('d22-q16a-last', D22, '16a', 'metric reaches 16 (infinity) at A after B=15', cti.slice(-2), [['B', 15], ['A', 16]]);
  appears('d22-q16a-text', D22, '16a', ['3', '4', '16']);

  // Q16b weighted fair queuing example: weights 3:2:1 on a 6 Mbps link
  check('d22-q16b-wfq', D22, '16b', 'guaranteed rates for weights 3, 2, 1 on 6 Mbps', [3, 2, 1].map(w => 6 * w / 6), [3, 2, 1]);
  appears('d22-q16b-text', D22, '16b', ['6 \\times 3/6', '6 Mbps']);

  // Q17a subnetting 181.56.0.0, 1000 subnets
  const bitsNeeded = Math.ceil(Math.log2(1000));
  const prefix = 16 + bitsNeeded;
  const sn = calculateSubnet('181.56.0.0', prefix);
  check('d22-q17a-bits', D22, '17a', 'subnet bits for 1000 subnets', bitsNeeded, 10);
  check('d22-q17a-subnets', D22, '17a', 'number of subnets', 2 ** bitsNeeded, 1024);
  check('d22-q17a-mask', D22, '17a', 'subnet mask', ip(prefixToMask(prefix)), '255.255.255.192');
  check('d22-q17a-hosts', D22, '17a', 'usable hosts per subnet', 2 ** (32 - prefix) - 2, 62);
  check('d22-q17a-lib', D22, '17a', 'js/lib/subnet.js agrees on usable hosts', sn.usableHosts, 62);
  appears('d22-q17a-text', D22, '17a', ['1024', '255.255.255.192', '62', '/26']);

  // Q18b ARP packet size for IPv4 over Ethernet
  check('d22-q18b-size', D22, '18b', 'ARP packet bytes = 2+2+1+1+2+6+4+6+4', 2 + 2 + 1 + 1 + 2 + 6 + 4 + 6 + 4, 28);
  appears('d22-q18b-text', D22, '18b', ['28 bytes']);

  // Q19b UDP header
  check('d22-q19b-hdr', D22, '19b', 'UDP header bytes = 4 fields x 2', 4 * 2, 8);
  const udpPayloadMax = 65535 - 8 - 20;
  check('d22-q19b-max', D22, '19b', 'max UDP payload over IPv4 = 65535 - 20 - 8', udpPayloadMax, 65507);
  appears('d22-q19b-text', D22, '19b', ['8 bytes', '65,507']);

  // ---- December 2023 ------------------------------------------------------

  // Q2 BDP
  check('d23-q2', D23, 2, 'BDP = 1 Gbps x 0.1 s (bits)', 1e9 * 0.1, 1e8);
  check('d23-q2-bytes', D23, 2, 'BDP in MB', 1e8 / 8 / 1e6, 12.5);

  // Q4 parity
  check('d23-q4', D23, 4, 'even parity bits for 1011010, 000000, 10010001', ['1011010', '000000', '10010001'].map(evenParityBit), [0, 0, 1]);

  // Q7 internet multicast: class D range and IP-to-MAC mapping of 224.1.2.3 and 239.255.0.1
  const toMac = a => {
    const n = ipToNumber(a) & 0x7FFFFF;
    return '01:00:5e:' + [(n >> 16) & 0x7F, (n >> 8) & 0xFF, n & 0xFF].map(x => x.toString(16).padStart(2, '0')).join(':');
  };
  check('d23-q7-range', D23, 7, 'class D range', [ip(0xE0000000), ip(0xEFFFFFFF)], ['224.0.0.0', '239.255.255.255']);
  check('d23-q7-mac1', D23, 7, 'multicast MAC for 224.1.2.3', toMac('224.1.2.3'), '01:00:5e:01:02:03');
  check('d23-q7-mac2', D23, 7, 'multicast MAC for 239.129.0.1 (shares MAC with 224.1.0.1)', [toMac('239.129.0.1'), toMac('224.1.0.1')], ['01:00:5e:01:00:01', '01:00:5e:01:00:01']);
  check('d23-q7-groups', D23, 7, '5 high-order bits of the group address are ignored: 2^5 groups per MAC', 2 ** 5, 32);
  appears('d23-q7-text', D23, 7, ['224.0.0.0', '239.255.255.255', '01:00:5e:01:02:03']);

  // Q8 classful ranges and masks
  const classes = [
    ['A', 0, 127, 8], ['B', 128, 191, 16], ['C', 192, 223, 24]
  ];
  const classRows = classes.map(([c, lo, hi, p]) => [c, `${lo}.0.0.0`, `${hi}.255.255.255`, ip(prefixToMask(p))]);
  check('d23-q8', D23, 8, 'class A/B/C ranges and masks', classRows, [
    ['A', '0.0.0.0', '127.255.255.255', '255.0.0.0'],
    ['B', '128.0.0.0', '191.255.255.255', '255.255.0.0'],
    ['C', '192.0.0.0', '223.255.255.255', '255.255.255.0']
  ]);
  appears('d23-q8-text', D23, 8, ['0.0.0.0', '127.255.255.255', '128.0.0.0', '191.255.255.255', '192.0.0.0', '223.255.255.255', '255.0.0.0', '255.255.0.0', '255.255.255.0']);

  // Q11b topologies: links in a full mesh
  check('d23-q11b-mesh5', D23, '11b', 'links in a 5-node full mesh', 5 * 4 / 2, 10);
  check('d23-q11b-ports5', D23, '11b', 'I/O ports per device in a 5-node mesh', 5 - 1, 4);
  appears('d23-q11b-text', D23, '11b', ['n(n-1)/2', '10 links']);

  // Q12b Manchester and differential Manchester for 10110010
  const bits12 = '10110010';
  const man = manchester(bits12);
  const dman = diffManchester(bits12, 'L');
  const pairs = x => x.match(/../g).join(' ');
  check('d23-q12b-man', D23, '12b', 'Manchester of 10110010 (1 = low-to-high)', pairs(man), 'LH HL LH LH HL HL LH HL');
  check('d23-q12b-dman', D23, '12b', 'Differential Manchester of 10110010, line starting low', pairs(dman), 'LH LH HL LH LH LH HL HL');
  appears('d23-q12b-text', D23, '12b', [pairs(man), pairs(dman)]);

  // Q13a framing examples
  const bytes = ['A', 'FLAG', 'B', 'ESC', 'C'];
  check('d23-q13a-byte', D23, '13a', 'byte stuffing A FLAG B ESC C', byteStuff(bytes), ['A', 'ESC', 'FLAG', 'B', 'ESC', 'ESC', 'C']);
  const bs = '01101111110111110';
  check('d23-q13a-bit', D23, '13a', 'bit stuffing example', bitStuff(bs), '0110111110101111100');
  check('d23-q13a-bit-undo', D23, '13a', 'unstuffing recovers the data', bitUnstuff(bitStuff(bs)), bs);
  appears('d23-q13a-text', D23, '13a', [bs, bitStuff(bs)]);

  // Q13b error examples
  const sent = '10110100', recv1 = '10100100', recv2 = '10011000';
  const diffPos = (a, b) => a.split('').map((c, i) => (c !== b[i] ? i : -1)).filter(i => i >= 0);
  check('d23-q13b-single', D23, '13b', 'single-bit error flips exactly one bit', diffPos(sent, recv1).length, 1);
  const burstPos = diffPos(sent, recv2);
  check('d23-q13b-burst', D23, '13b', 'burst length counted first-to-last corrupted bit', burstPos[burstPos.length - 1] - burstPos[0] + 1, 4);
  check('d23-q13b-noise', D23, '13b', 'bits hit by a 1 ms burst at 10 Mbps', 10e6 * 1e-3, 10000);
  appears('d23-q13b-text', D23, '13b', [sent, recv1, recv2, '10,000']);

  // Q14a IEEE 802.11 frame
  const fcBits = 2 + 2 + 4 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1;
  check('d23-q14a-fc', D23, '14a', 'frame-control subfields total 16 bits', fcBits, 16);
  const hdrBytes = 2 + 2 + 6 + 6 + 6 + 2 + 6;
  check('d23-q14a-hdr', D23, '14a', 'MAC header with 4 addresses = 30 bytes', hdrBytes, 30);
  check('d23-q14a-max', D23, '14a', 'maximum MPDU = 30 + 2312 + 4', hdrBytes + 2312 + 4, 2346);
  appears('d23-q14a-text', D23, '14a', ['2312', '2346']);

  // Q14b CRC 10011101, x^3 + 1
  const crc14 = crcCodeword('10011101', '1001');
  check('d23-q14b-rem', D23, '14b', 'CRC remainder', crc14.remainder, '100');
  check('d23-q14b-cw', D23, '14b', 'transmitted codeword', crc14.codeword, '10011101100');
  check('d23-q14b-rx', D23, '14b', 'receiver division gives zero remainder', crcDivide(crc14.codeword, '1001').remainder, '000');
  const q14 = crcDivide('10011101000', '1001').quotient;
  appears('d23-q14b-text', D23, '14b', ['10011101000', '10011101100', q14]);

  // Q15a distance vector example
  const dvNodes = ['A', 'B', 'C', 'D'];
  const dvLinks = [['A', 'B', 1], ['A', 'C', 4], ['B', 'C', 2], ['B', 'D', 6], ['C', 'D', 3]];
  const dv = distanceVector(dvNodes, dvLinks);
  const fin = dv.final;
  check('d23-q15a-A', D23, '15a', 'final costs from A to B,C,D', [fin.A.B.cost, fin.A.C.cost, fin.A.D.cost], [1, 3, 6]);
  check('d23-q15a-via', D23, '15a', 'A reaches C and D via B', [fin.A.C.via, fin.A.D.via], ['B', 'B']);
  check('d23-q15a-D', D23, '15a', 'final costs from D to A,B,C', [fin.D.A.cost, fin.D.B.cost, fin.D.C.cost], [6, 5, 3]);
  check('d23-q15a-rounds', D23, '15a', 'tables stop changing after 2 exchange rounds', dv.rounds.length - 1 >= 2 && JSON.stringify(dv.rounds[dv.rounds.length - 1]) === JSON.stringify(dv.rounds[2]), true);
  appears('d23-q15a-text', D23, '15a', ['Round 0', 'Round 1', 'Round 2']);

  // Q16a link state example: Dijkstra on a 6-router graph
  const lsNodes = ['A', 'B', 'C', 'D', 'E', 'F'];
  const lsEdges = [['A', 'B', 7], ['A', 'C', 9], ['A', 'F', 14], ['B', 'C', 10], ['B', 'D', 15], ['C', 'D', 11], ['C', 'F', 2], ['D', 'E', 6], ['E', 'F', 9]];
  const dj = dijkstra(lsNodes, lsEdges, 'A');
  check('d23-q16a-dist', D23, '16a', 'shortest distances from A', lsNodes.map(n => dj.dist[n]), [0, 7, 9, 20, 20, 11]);
  check('d23-q16a-paths', D23, '16a', 'shortest paths from A', lsNodes.map(n => dj.path(n)), ['A', 'A-B', 'A-C', 'A-C-D', 'A-C-F-E', 'A-C-F']);
  check('d23-q16a-order', D23, '16a', 'order in which nodes are settled', dj.steps.map(s => s.settled), ['A', 'B', 'C', 'F', 'D', 'E']);
  appears('d23-q16a-text', D23, '16a', ['A-C-F-E', 'A-C-D']);

  // Q17a subnetting example 192.168.1.0/24 into 4 subnets
  const rows = [];
  for (let k = 0; k < 4; k++) {
    const s = calculateSubnet(ip((ipToNumber('192.168.1.0') + k * 64) >>> 0), 26);
    rows.push([s.network, s.firstHost, s.lastHost, s.broadcast]);
  }
  check('d23-q17a-subnets', D23, '17a', 'four /26 subnets of 192.168.1.0/24', rows, [
    ['192.168.1.0', '192.168.1.1', '192.168.1.62', '192.168.1.63'],
    ['192.168.1.64', '192.168.1.65', '192.168.1.126', '192.168.1.127'],
    ['192.168.1.128', '192.168.1.129', '192.168.1.190', '192.168.1.191'],
    ['192.168.1.192', '192.168.1.193', '192.168.1.254', '192.168.1.255']
  ]);
  check('d23-q17a-hosts', D23, '17a', 'usable hosts per /26', 2 ** 6 - 2, 62);
  check('d23-q17a-and', D23, '17a', '192.168.1.100 AND 255.255.255.192', ip((ipToNumber('192.168.1.100') & prefixToMask(26)) >>> 0), '192.168.1.64');
  appears('d23-q17a-text', D23, '17a', ['192.168.1.100', '192.168.1.64', '192.168.1.127', '192.168.1.192', '192.168.1.254', '255.255.255.192']);

  // Q17b IPv6 header
  const v6 = [4, 8, 20, 16, 8, 8, 128, 128];
  check('d23-q17b-size', D23, '17b', 'IPv6 base header = 320 bits = 40 bytes', [v6.reduce((a, b) => a + b, 0), v6.reduce((a, b) => a + b, 0) / 8], [320, 40]);
  appears('d23-q17b-text', D23, '17b', ['40 bytes', '128']);

  // Q18b BOOTP message
  const bootp = { op: 1, htype: 1, hlen: 1, hops: 1, xid: 4, secs: 2, flags: 2, ciaddr: 4, yiaddr: 4, siaddr: 4, giaddr: 4, chaddr: 16, sname: 64, file: 128, vend: 64 };
  check('d23-q18b-size', D23, '18b', 'BOOTP message = 300 bytes', Object.values(bootp).reduce((a, b) => a + b, 0), 300);
  appears('d23-q18b-text', D23, '18b', ['300 bytes']);

  // Q20a three-way handshake: ISN acknowledgement arithmetic for the worked example
  const isnX = 1000, isnY = 5000;
  check('d23-q20a-seq', D23, '20a', 'SYN-ACK acks x+1; final ACK acks y+1', [isnX + 1, isnY + 1], [1001, 5001]);
  appears('d23-q20a-text', D23, '20a', ['1001', '5001']);

  return results;
}

// ---------------------------------------------------------------------------
// Coverage: every sub-question of both papers must have a solution
// ---------------------------------------------------------------------------

export const EXPECTED_QUESTIONS = {
  [D22]: [...Array.from({ length: 10 }, (_, i) => String(i + 1)), ...Array.from({ length: 10 }, (_, i) => [`${11 + i}a`, `${11 + i}b`]).flat()],
  [D23]: [...Array.from({ length: 10 }, (_, i) => String(i + 1)), ...Array.from({ length: 10 }, (_, i) => [`${11 + i}a`, `${11 + i}b`]).flat()]
};

export function coverage() {
  const out = {};
  for (const paper of examSolutionsData) {
    const have = new Set(paper.sections.flatMap(s => s.questions.map(q => String(q.qNo))));
    const want = EXPECTED_QUESTIONS[paper.paperId];
    out[paper.paperId] = { have: have.size, want: want.length, missing: want.filter(q => !have.has(q)), extra: [...have].filter(q => !want.includes(q)) };
  }
  return out;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function main() {
  const res = runChecks();
  const cov = coverage();
  let failed = 0;
  for (const r of res) {
    if (!r.ok) { failed++; console.log(`FAIL ${r.id} (${r.paperId} Q${r.qNo}): ${r.what} -> ${r.detail}`); }
  }
  for (const [paperId, c] of Object.entries(cov)) {
    const bad = c.missing.length || c.extra.length;
    if (bad) { failed++; console.log(`FAIL coverage ${paperId}: have ${c.have}/${c.want}, missing [${c.missing.join(', ')}], unexpected [${c.extra.join(', ')}]`); }
  }
  console.log(`${res.length - res.filter(r => !r.ok).length}/${res.length} numeric checks passed`);
  for (const [paperId, c] of Object.entries(cov)) console.log(`coverage ${paperId}: ${c.have}/${c.want}`);

  if (show) {
    console.log('\n--- working used in the write-ups ---');
    const crc = crcDivide('10011101000', '1001');
    console.log('CRC 10011101000 / 1001: quotient', crc.quotient, 'remainder', crc.remainder);
    crc.lines.forEach(l => console.log('  ', l));
    console.log('Manchester 10110010      :', manchester('10110010').match(/../g).join(' '));
    console.log('Diff. Manchester (start L):', diffManchester('10110010', 'L').match(/../g).join(' '));
    const dv = distanceVector(['A', 'B', 'C', 'D'], [['A', 'B', 1], ['A', 'C', 4], ['B', 'C', 2], ['B', 'D', 6], ['C', 'D', 3]]);
    dv.rounds.forEach((t, i) => {
      console.log(`Round ${i}:`);
      for (const n of Object.keys(t)) console.log('  ' + n + ': ' + Object.entries(t[n]).filter(([d]) => d !== n).map(([d, v]) => `${d}=${v.cost}(${v.via})`).join(' '));
    });
    const dj = dijkstra(['A', 'B', 'C', 'D', 'E', 'F'], [['A', 'B', 7], ['A', 'C', 9], ['A', 'F', 14], ['B', 'C', 10], ['B', 'D', 15], ['C', 'D', 11], ['C', 'F', 2], ['D', 'E', 6], ['E', 'F', 9]], 'A');
    dj.steps.forEach(s => console.log(`settle ${s.settled}: ` + Object.entries(s.dist).map(([n, d]) => `${n}=${d}`).join(' ') + ' | prev ' + Object.entries(s.prev).map(([n, p]) => `${n}<-${p ?? '-'}`).join(' ')));
    console.log('count-to-infinity:', countToInfinity(16).map(([n, c]) => `${n}=${c}`).join(' '));
    console.log('bit-stuff 0111110111111011111 ->', bitStuff('0111110111111011111'));
    console.log('bit-stuff 01101111110111110   ->', bitStuff('01101111110111110'));
  }

  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
