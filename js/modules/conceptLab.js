// INTERACTIVE CONCEPT LABORATORY
// Algorithmic Calculators & Step-by-Step Simulators

import { calculateSubnet, isValidIPv4, MIN_PREFIX, MAX_PREFIX } from '../lib/subnet.js';

export class ConceptLab {
  constructor() {
    this.init();
  }

  init() {
    this.setupCRC();
    this.setupSlidingWindow();
    this.setupSubnetCalc();
    this.setupDijkstra();
  }

  /* -------------------------------------------------------------
   * 1. CRC Generator & Verifier (Modulo-2 Polynomial Division)
   * ------------------------------------------------------------- */
  setupCRC() {
    const calcBtn = document.getElementById('crc-calculate-btn');
    const verifyBtn = document.getElementById('crc-verify-btn');
    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
      const dataStr = document.getElementById('crc-data-input').value.trim();
      const polyStr = document.getElementById('crc-poly-input').value.trim();
      const outputDiv = document.getElementById('crc-output');

      if (!/^[01]+$/.test(dataStr) || !/^[01]+$/.test(polyStr)) {
        outputDiv.innerHTML = `<div class="error-msg" style="color:var(--accent-rose);">Error: Please input valid binary strings (0 and 1 only).</div>`;
        return;
      }
      if (polyStr.length < 2) {
        outputDiv.innerHTML = `<div class="error-msg" style="color:var(--accent-rose);">Error: Generator polynomial must be at least 2 bits.</div>`;
        return;
      }

      const result = this.calculateCRC(dataStr, polyStr);
      outputDiv.innerHTML = `
        <div class="result-box glass-panel" style="padding:1.2rem; margin-top:1rem;">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.6rem;">CRC Calculation Completed</h4>
          <p><strong>Appended Zeros:</strong> ${result.k} bits of '0'</p>
          <p><strong>Dividend:</strong> <span class="font-mono">${result.appendedData}</span></p>
          <p><strong>Divisor (Generator):</strong> <span class="font-mono">${polyStr}</span></p>
          <p><strong>Remainder (FCS / CRC Checksum):</strong> <span class="font-mono" style="color:var(--accent-amber); font-weight:700;">${result.remainder}</span></p>
          <p><strong>Transmitted Codeword:</strong> <span class="font-mono" style="color:var(--accent-emerald); font-weight:700;">${result.codeword}</span></p>
          <div style="margin-top:1rem; max-height:220px; overflow-y:auto; background:rgba(0,0,0,0.3); padding:0.8rem; border-radius:6px;">
            <pre class="font-mono" style="font-size:0.85rem; line-height:1.4;">${result.steps.join('\n')}</pre>
          </div>
        </div>
      `;
      // Pre-fill verifier input
      const verifyInput = document.getElementById('crc-verify-input');
      if (verifyInput) verifyInput.value = result.codeword;
    });

    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => {
        const receivedStr = document.getElementById('crc-verify-input').value.trim();
        const polyStr = document.getElementById('crc-poly-input').value.trim();
        const verifyOutput = document.getElementById('crc-verify-output');

        if (!/^[01]+$/.test(receivedStr) || !/^[01]+$/.test(polyStr)) {
          verifyOutput.innerHTML = `<span style="color:var(--accent-rose);">Invalid binary inputs.</span>`;
          return;
        }

        const rem = this.modulo2Divide(receivedStr, polyStr);
        const hasError = rem.includes('1');

        if (hasError) {
          verifyOutput.innerHTML = `
            <div style="padding:0.8rem; background:rgba(239,68,68,0.15); border:1px solid var(--accent-rose); border-radius:6px;">
              <strong style="color:var(--accent-rose);">❌ Transmission Error Detected!</strong>
              <p>Remainder = <span class="font-mono">${rem}</span> (Non-zero). Frame corrupted during transit.</p>
            </div>
          `;
        } else {
          verifyOutput.innerHTML = `
            <div style="padding:0.8rem; background:rgba(16,185,129,0.15); border:1px solid var(--accent-emerald); border-radius:6px;">
              <strong style="color:var(--accent-emerald);">✅ Frame Received Error-Free!</strong>
              <p>Remainder = <span class="font-mono">${rem}</span> (All zeros). No bit errors detected.</p>
            </div>
          `;
        }
      });
    }
  }

  calculateCRC(data, poly) {
    const k = poly.length - 1;
    const appendedData = data + '0'.repeat(k);
    const { remainder, steps } = this.modulo2DivideWithSteps(appendedData, poly);
    const codeword = data + remainder;
    return { k, appendedData, remainder, codeword, steps };
  }

  modulo2Divide(dividend, divisor) {
    let cur = dividend.slice(0, divisor.length);
    for (let i = divisor.length; i <= dividend.length; i++) {
      if (cur[0] === '1') {
        let xorRes = '';
        for (let j = 0; j < divisor.length; j++) {
          xorRes += cur[j] === divisor[j] ? '0' : '1';
        }
        cur = xorRes.slice(1);
      } else {
        cur = cur.slice(1);
      }
      if (i < dividend.length) {
        cur += dividend[i];
      }
    }
    return cur;
  }

  modulo2DivideWithSteps(dividend, divisor) {
    const steps = [];
    steps.push(`Dividing ${dividend} by ${divisor}:`);
    let cur = dividend.slice(0, divisor.length);
    steps.push(`Initial block: ${cur}`);

    for (let i = divisor.length; i <= dividend.length; i++) {
      if (cur[0] === '1') {
        let xorRes = '';
        for (let j = 0; j < divisor.length; j++) {
          xorRes += cur[j] === divisor[j] ? '0' : '1';
        }
        steps.push(`XOR with ${divisor} -> ${xorRes}`);
        cur = xorRes.slice(1);
      } else {
        steps.push(`Leading bit is 0, shift right`);
        cur = cur.slice(1);
      }
      if (i < dividend.length) {
        cur += dividend[i];
        steps.push(`Bring down bit '${dividend[i]}' -> ${cur}`);
      }
    }
    steps.push(`Final Remainder: ${cur}`);
    return { remainder: cur, steps };
  }

  /* -------------------------------------------------------------
   * 2. Sliding Window Protocol Simulator (Stop-and-Wait / GBN / SR)
   * ------------------------------------------------------------- */
  setupSlidingWindow() {
    this.swState = {
      protocol: 'gbn',
      windowSize: 4,
      base: 0,
      nextSeqNum: 0,
      totalFrames: 10,
      frames: []
    };

    const container = document.getElementById('sw-sim-board');
    if (!container) return;

    this.resetSWFrames();
    this.renderSWBoard();

    // Event controls
    const sendBtn = document.getElementById('sw-send-btn');
    const ackBtn = document.getElementById('sw-ack-btn');
    const loseBtn = document.getElementById('sw-lose-btn');
    const protoSelect = document.getElementById('sw-proto-select');

    if (protoSelect) {
      protoSelect.addEventListener('change', (e) => {
        this.swState.protocol = e.target.value;
        this.swState.windowSize = this.swState.protocol === 'saw' ? 1 : (this.swState.protocol === 'gbn' ? 4 : 4);
        this.resetSWFrames();
        this.renderSWBoard();
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        const { base, nextSeqNum, windowSize, totalFrames, frames } = this.swState;
        if (nextSeqNum < base + windowSize && nextSeqNum < totalFrames) {
          frames[nextSeqNum].status = 'sent';
          this.swState.nextSeqNum++;
          this.logSWEvent(`Frame [${nextSeqNum}] dispatched to physical link.`);
          this.renderSWBoard();
        } else {
          this.logSWEvent(`Cannot send: Window is full (Base=${base}, WindowSize=${windowSize}).`);
        }
      });
    }

    if (ackBtn) {
      ackBtn.addEventListener('click', () => {
        const { base, nextSeqNum, frames, protocol } = this.swState;
        if (base < nextSeqNum) {
          if (protocol === 'sr') {
            // Acknowledge first unacknowledged sent frame
            const target = frames.find(f => f.status === 'sent');
            if (target) {
              target.status = 'acked';
              this.logSWEvent(`Selective ACK received for Frame [${target.id}].`);
              while (this.swState.base < this.swState.totalFrames && this.swState.frames[this.swState.base].status === 'acked') {
                this.swState.base++;
                this.logSWEvent(`Window slid forward to Base=${this.swState.base}.`);
              }
            }
          } else {
            // GBN & Stop-and-Wait cumulative ACK
            frames[base].status = 'acked';
            this.logSWEvent(`Cumulative ACK received for Frame [${base}].`);
            this.swState.base++;
          }
          this.renderSWBoard();
        } else {
          this.logSWEvent(`No active outstanding frames to acknowledge.`);
        }
      });
    }

    if (loseBtn) {
      loseBtn.addEventListener('click', () => {
        const { base, frames, protocol } = this.swState;
        if (base < this.swState.nextSeqNum && frames[base].status === 'sent') {
          this.logSWEvent(`⚠️ Timeout! Frame [${base}] or ACK was LOST.`);
          if (protocol === 'gbn') {
            this.logSWEvent(`Go-Back-N triggered: Rewinding nextSeqNum from ${this.swState.nextSeqNum} back to ${base}.`);
            for (let i = base; i < this.swState.nextSeqNum; i++) {
              frames[i].status = 'ready';
            }
            this.swState.nextSeqNum = base;
          } else if (protocol === 'sr') {
            this.logSWEvent(`Selective Repeat triggered: Only Frame [${base}] will be retransmitted.`);
            frames[base].status = 'ready';
          } else {
            frames[base].status = 'ready';
          }
          this.renderSWBoard();
        }
      });
    }
  }

  resetSWFrames() {
    this.swState.base = 0;
    this.swState.nextSeqNum = 0;
    this.swState.frames = [];
    for (let i = 0; i < this.swState.totalFrames; i++) {
      this.swState.frames.push({ id: i, status: 'ready' });
    }
  }

  logSWEvent(msg) {
    const logBox = document.getElementById('sw-log');
    if (!logBox) return;
    const time = new Date().toLocaleTimeString();
    logBox.innerHTML = `<div><span style="color:var(--text-dim);">[${time}]</span> ${msg}</div>` + logBox.innerHTML;
  }

  renderSWBoard() {
    const board = document.getElementById('sw-sim-board');
    if (!board) return;

    const { base, nextSeqNum, windowSize, frames } = this.swState;
    let html = `<div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1.25rem;">`;

    frames.forEach((f, idx) => {
      const inWindow = idx >= base && idx < base + windowSize;
      let bg = 'rgba(255,255,255,0.05)';
      let border = 'var(--glass-border)';
      let statusText = 'Ready';

      if (f.status === 'acked') {
        bg = 'rgba(16,185,129,0.2)';
        border = 'var(--accent-emerald)';
        statusText = 'ACKed';
      } else if (f.status === 'sent') {
        bg = 'rgba(56,189,248,0.2)';
        border = 'var(--accent-cyan)';
        statusText = 'In Flight';
      }

      html += `
        <div style="width:72px; padding:0.8rem 0.4rem; border-radius:8px; text-align:center; background:${bg}; border:2px solid ${inWindow ? 'var(--accent-purple)' : border}; position:relative;">
          ${inWindow ? '<span style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); font-size:9px; background:var(--accent-purple); color:#fff; padding:1px 5px; border-radius:10px;">WINDOW</span>' : ''}
          <div style="font-weight:700; font-size:1.1rem; color:var(--text-main); font-family:var(--font-mono);">#${f.id}</div>
          <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.2rem;">${statusText}</div>
        </div>
      `;
    });

    html += `</div>
      <div style="display:flex; gap:1.5rem; font-size:0.85rem; color:var(--text-muted);">
        <div><strong>Base (Oldest Unacked):</strong> <span class="font-mono" style="color:var(--accent-cyan); font-weight:700;">${base}</span></div>
        <div><strong>NextSeqNum:</strong> <span class="font-mono" style="color:var(--accent-purple); font-weight:700;">${nextSeqNum}</span></div>
        <div><strong>Window Size (W<sub>s</sub>):</strong> <span class="font-mono">${windowSize}</span></div>
      </div>
    `;

    board.innerHTML = html;
  }

  /* -------------------------------------------------------------
   * 3. IPv4 Subnetting & CIDR Calculator (Solves KTU Exam numericals)
   * ------------------------------------------------------------- */
  setupSubnetCalc() {
    const calcBtn = document.getElementById('subnet-calc-btn');
    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
      const ip = document.getElementById('subnet-ip-input').value.trim();
      const cidrRaw = document.getElementById('subnet-cidr-input').value.trim();
      const cidrVal = cidrRaw === '' ? NaN : Number(cidrRaw);
      const out = document.getElementById('subnet-result-output');

      if (!isValidIPv4(ip) || !Number.isInteger(cidrVal) || cidrVal < MIN_PREFIX || cidrVal > MAX_PREFIX) {
        out.innerHTML = `<span style="color:var(--accent-rose);">Please enter a valid IPv4 address (e.g. 181.56.0.0) and CIDR prefix (1 to 30).</span>`;
        return;
      }

      const s = calculateSubnet(ip, cidrVal);
      const classLabel = s.classfulPrefix === null
        ? `Class ${s.addressClass}`
        : `Class ${s.addressClass}, default /${s.classfulPrefix}`;
      let borrowedText;
      if (s.classfulPrefix === null) {
        borrowedText = `Not applicable (Class ${s.addressClass} ${s.addressClass === 'D' ? 'is multicast' : 'is reserved'} and has no default mask)`;
      } else if (s.supernetBits > 0) {
        borrowedText = `0 bits: /${cidrVal} is a supernet of ${(2 ** s.supernetBits).toLocaleString()} Class ${s.addressClass} networks`;
      } else {
        borrowedText = `${s.borrowedBits} bits (${s.subnetCount.toLocaleString()} subnet${s.subnetCount === 1 ? '' : 's'})`;
      }

      out.innerHTML = `
        <div class="glass-panel" style="padding:1.4rem; margin-top:1rem;">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.8rem;">Subnet Calculation Results (/${cidrVal})</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
            <div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Subnet Mask:</p>
              <p class="font-mono" style="font-weight:700;">${s.mask}</p>
            </div>
            <div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Network Address:</p>
              <p class="font-mono" style="color:var(--accent-cyan); font-weight:700;">${s.network}</p>
            </div>
            <div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Broadcast Address:</p>
              <p class="font-mono" style="color:var(--accent-amber); font-weight:700;">${s.broadcast}</p>
            </div>
            <div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Usable Host Range:</p>
              <p class="font-mono" style="color:var(--accent-emerald); font-weight:700;">${s.firstHost} - ${s.lastHost}</p>
            </div>
            <div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Usable Hosts (2<sup>h</sup> &minus; 2, h = ${s.hostBits}):</p>
              <p class="font-mono" style="font-size:1.1rem; font-weight:800; color:var(--accent-purple);">${s.usableHosts.toLocaleString()}</p>
            </div>
            <div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Subnet Bits Borrowed (${classLabel}):</p>
              <p class="font-mono" id="subnet-borrowed-output">${borrowedText}</p>
            </div>
          </div>
        </div>
      `;
    });
  }

  /* -------------------------------------------------------------
   * 4. Dijkstra Shortest Path Router Simulator
   * ------------------------------------------------------------- */
  setupDijkstra() {
    const runBtn = document.getElementById('dijkstra-run-btn');
    if (!runBtn) return;

    // Standard 6-node network graph
    const graph = {
      nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
      edges: [
        { u: 'A', v: 'B', w: 2 },
        { u: 'A', v: 'C', w: 4 },
        { u: 'B', v: 'C', w: 1 },
        { u: 'B', v: 'D', w: 7 },
        { u: 'C', v: 'E', w: 3 },
        { u: 'D', v: 'E', w: 2 },
        { u: 'D', v: 'F', w: 1 },
        { u: 'E', v: 'F', w: 5 }
      ]
    };

    runBtn.addEventListener('click', () => {
      const src = document.getElementById('dijkstra-src-select').value;
      const out = document.getElementById('dijkstra-result-output');

      const dist = {};
      const prev = {};
      const visited = new Set();

      graph.nodes.forEach(n => {
        dist[n] = Infinity;
        prev[n] = null;
      });
      dist[src] = 0;

      while (visited.size < graph.nodes.length) {
        let u = null;
        let minD = Infinity;
        graph.nodes.forEach(n => {
          if (!visited.has(n) && dist[n] < minD) {
            minD = dist[n];
            u = n;
          }
        });

        if (u === null || minD === Infinity) break;
        visited.add(u);

        // Relax neighbors
        graph.edges.forEach(e => {
          let neighbor = null;
          if (e.u === u) neighbor = e.v;
          else if (e.v === u) neighbor = e.u;

          if (neighbor && !visited.has(neighbor)) {
            const alt = dist[u] + e.w;
            if (alt < dist[neighbor]) {
              dist[neighbor] = alt;
              prev[neighbor] = u;
            }
          }
        });
      }

      // Render Table
      let tableHtml = `
        <table class="custom-table" style="margin-top:1rem;">
          <thead>
            <tr>
              <th>Destination Router</th>
              <th>Shortest Cost</th>
              <th>Next Hop</th>
              <th>Complete Path</th>
            </tr>
          </thead>
          <tbody>
      `;

      graph.nodes.forEach(dest => {
        const path = [];
        let curr = dest;
        while (curr) {
          path.unshift(curr);
          curr = prev[curr];
        }
        const nextHop = path.length > 1 ? path[1] : '-';

        tableHtml += `
          <tr>
            <td><strong>Router ${dest}</strong></td>
            <td class="font-mono" style="color:var(--accent-cyan); font-weight:700;">${dist[dest] === Infinity ? 'Unreachable' : dist[dest]}</td>
            <td class="font-mono">${nextHop}</td>
            <td class="font-mono">${path.join(' ➔ ')}</td>
          </tr>
        `;
      });

      tableHtml += `</tbody></table>`;
      out.innerHTML = tableHtml;
    });
  }
}
