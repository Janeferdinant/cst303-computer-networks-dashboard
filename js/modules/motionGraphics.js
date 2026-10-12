// MOTION GRAPHICS & EDUCATIONAL ANIMATIONS ENGINE
// Canvas & SVG step-by-step mechanisms for Computer Networks

export class MotionGraphicsEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.currentMode = 'token_bucket';
    this.animationFrameId = null;
    this.isPaused = false;
    this.speed = 1;
    this.t = 0;

    // Simulation states
    this.tokenBucketState = {
      capacity: 10,
      tokens: 6,
      tokenRate: 0.05,
      packetsQueue: [],
      packetsOutput: []
    };

    this.tcpState = {
      cwnd: 1,
      ssthresh: 16,
      rtt: 0,
      phase: 'Slow Start',
      history: []
    };

    this.arpState = {
      step: 0, // 0: Idle, 1: Broadcast sent, 2: Hosts inspect, 3: Unicast reply, 4: Cache updated
      timer: 0
    };

    this.dnsState = {
      step: 0,
      mode: 'recursive', // 'recursive' or 'iterative'
      timer: 0
    };

    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.startLoop();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = 480;
  }

  setMode(mode) {
    this.currentMode = mode;
    this.t = 0;
    this.arpState.step = 0;
    this.dnsState.step = 0;
    this.tcpState = { cwnd: 1, ssthresh: 16, rtt: 0, phase: 'Slow Start', history: [] };
  }

  startLoop() {
    const loop = () => {
      this.animationFrameId = requestAnimationFrame(loop);
      if (!this.isPaused) {
        this.update();
      }
      this.render();
    };
    loop();
  }

  update() {
    this.t += 0.016 * this.speed;

    if (this.currentMode === 'token_bucket') {
      const s = this.tokenBucketState;
      // Add tokens
      s.tokens = Math.min(s.capacity, s.tokens + s.tokenRate * this.speed);
      // Randomly enqueue packets
      if (Math.random() < 0.03 * this.speed && s.packetsQueue.length < 8) {
        s.packetsQueue.push({ id: Math.floor(Math.random() * 900 + 100), x: 50, size: 1 });
      }
      // Process packet if tokens available
      if (s.packetsQueue.length > 0 && s.tokens >= 1) {
        s.tokens -= 1;
        const pkt = s.packetsQueue.shift();
        pkt.x = this.canvas.width * 0.45;
        s.packetsOutput.push(pkt);
      }
      // Move output packets
      s.packetsOutput.forEach(p => p.x += 3 * this.speed);
      s.packetsOutput = s.packetsOutput.filter(p => p.x < this.canvas.width + 50);

    } else if (this.currentMode === 'tcp_aimd') {
      const s = this.tcpState;
      s.rtt += 0.05 * this.speed;
      if (s.rtt >= 1) {
        s.rtt = 0;
        // Congestion window calculation
        if (s.cwnd < s.ssthresh) {
          s.phase = 'Slow Start';
          s.cwnd *= 2; // Exponential growth
        } else {
          s.phase = 'Congestion Avoidance (AIMD)';
          s.cwnd += 1; // Linear growth
        }

        // Simulate random congestion loss at cwnd >= 28
        if (s.cwnd >= 28) {
          s.phase = 'Triple Dup ACK (Fast Recovery)';
          s.ssthresh = Math.floor(s.cwnd / 2);
          s.cwnd = s.ssthresh;
        }

        s.history.push({ cwnd: s.cwnd, phase: s.phase });
        if (s.history.length > 35) s.history.shift();
      }

    } else if (this.currentMode === 'arp') {
      this.arpState.timer += 0.016 * this.speed;
      if (this.arpState.timer > 2.2) {
        this.arpState.timer = 0;
        this.arpState.step = (this.arpState.step + 1) % 5;
      }

    } else if (this.currentMode === 'dns') {
      this.dnsState.timer += 0.016 * this.speed;
      if (this.dnsState.timer > 2.0) {
        this.dnsState.timer = 0;
        this.dnsState.step = (this.dnsState.step + 1) % 6;
      }
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (this.currentMode === 'token_bucket') {
      this.renderTokenBucket(ctx, w, h);
    } else if (this.currentMode === 'tcp_aimd') {
      this.renderTCP(ctx, w, h);
    } else if (this.currentMode === 'arp') {
      this.renderARP(ctx, w, h);
    } else if (this.currentMode === 'dns') {
      this.renderDNS(ctx, w, h);
    }
  }

  /* 1. Render Token Bucket vs Leaky Bucket */
  renderTokenBucket(ctx, w, h) {
    const s = this.tokenBucketState;

    // Title & Legend
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px "Exo 2", sans-serif';
    ctx.fillText('Token Bucket Traffic Shaping Mechanism', 30, 35);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Exo 2", sans-serif';
    ctx.fillText('Tokens arrive at rate ρ. Bursty packets conform and transmit smoothly without buffer drop.', 30, 60);

    // 1. Incoming Packets Queue (Left)
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, h * 0.35, 140, 70);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '12px "Roboto Mono"';
    ctx.fillText('BURSTY QUEUE', 55, h * 0.35 - 10);

    s.packetsQueue.forEach((p, idx) => {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(45 + idx * 16, h * 0.35 + 15, 12, 40);
    });

    // 2. Token Bucket (Center)
    const bx = w * 0.38;
    const by = h * 0.25;
    const bw = 120;
    const bh = 150;

    // Bucket Shape
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + 15, by + bh);
    ctx.lineTo(bx + bw - 15, by + bh);
    ctx.lineTo(bx + bw, by);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Fill Tokens (Circles)
    ctx.fillStyle = '#34d399';
    const tokenCount = Math.floor(s.tokens);
    for (let i = 0; i < tokenCount; i++) {
      const tx = bx + 25 + (i % 3) * 25;
      const ty = by + bh - 20 - Math.floor(i / 3) * 22;
      ctx.beginPath();
      ctx.arc(tx, ty, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px "Roboto Mono"';
    ctx.fillText(`Tokens: ${s.tokens.toFixed(1)} / ${s.capacity}`, bx + 12, by + bh + 25);

    // 3. Regulated Output Pipe (Right)
    ctx.strokeStyle = 'rgba(56,189,248,0.4)';
    ctx.beginPath();
    ctx.moveTo(w * 0.58, h * 0.42);
    ctx.lineTo(w - 40, h * 0.42);
    ctx.moveTo(w * 0.58, h * 0.58);
    ctx.lineTo(w - 40, h * 0.58);
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '12px "Roboto Mono"';
    ctx.fillText('SMOOTH TRANSMISSION STREAM', w * 0.62, h * 0.38);

    s.packetsOutput.forEach(p => {
      ctx.fillStyle = '#10b981';
      ctx.fillRect(p.x, h * 0.45, 24, 30);
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px "Roboto Mono"';
      ctx.fillText(`#${p.id}`, p.x + 2, h * 0.45 + 18);
    });
  }

  /* 2. Render TCP Congestion Control Graph (AIMD) */
  renderTCP(ctx, w, h) {
    const s = this.tcpState;

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px "Exo 2", sans-serif';
    ctx.fillText('TCP Reno Congestion Control (AIMD & Slow Start)', 30, 35);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Exo 2", sans-serif';
    ctx.fillText(`Current Phase: ${s.phase} | cwnd = ${s.cwnd} MSS | ssthresh = ${s.ssthresh} MSS`, 30, 60);

    // Axes
    const ox = 60;
    const oy = h - 60;
    const gw = w - 120;
    const gh = h - 140;

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ox, oy - gh);
    ctx.lineTo(ox, oy);
    ctx.lineTo(ox + gw, oy);
    ctx.stroke();

    // ssthresh Line
    const ssthreshY = oy - (s.ssthresh / 32) * gh;
    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(ox, ssthreshY);
    ctx.lineTo(ox + gw, ssthreshY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f59e0b';
    ctx.font = '11px "Roboto Mono"';
    ctx.fillText(`ssthresh (${s.ssthresh})`, ox + gw - 90, ssthreshY - 6);

    // Plot History Line
    if (s.history.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      s.history.forEach((pt, idx) => {
        const px = ox + (idx / 34) * gw;
        const py = oy - (pt.cwnd / 32) * gh;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Current Point
      const last = s.history[s.history.length - 1];
      const curX = ox + ((s.history.length - 1) / 34) * gw;
      const curY = oy - (last.cwnd / 32) * gh;
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(curX, curY, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* 3. Render ARP Address Resolution Protocol */
  renderARP(ctx, w, h) {
    const step = this.arpState.step;

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px "Exo 2", sans-serif';
    ctx.fillText('ARP (Address Resolution Protocol) Step-by-Step Operation', 30, 35);

    const stepDescs = [
      'Step 1: Host A wants to send an IP packet to 192.168.1.30, but does not know its MAC address.',
      'Step 2: Host A creates an ARP Request and BROADCASTS it to Ethernet address FF:FF:FF:FF:FF:FF.',
      'Step 3: Central Switch floods the ARP frame to all connected hosts (Host B, Host C, Host D).',
      'Step 4: Host B sees IP matches 192.168.1.30! It responds with a UNICAST ARP Reply containing its MAC.',
      'Step 5: Host A updates its ARP Cache table: (192.168.1.30 ➔ 00:1A:2B:3C:4D:5E). Transmission proceeds!'
    ];
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '13px "Exo 2", sans-serif';
    ctx.fillText(stepDescs[step], 30, 65);

    // Draw Nodes
    const switchPos = { x: w * 0.5, y: h * 0.45 };
    const hostA = { x: w * 0.2, y: h * 0.3, ip: '192.168.1.10', mac: 'AA:BB:CC:11:22:33', name: 'Host A (Source)' };
    const hostB = { x: w * 0.8, y: h * 0.3, ip: '192.168.1.30', mac: '00:1A:2B:3C:4D:5E', name: 'Host B (Target)' };
    const hostC = { x: w * 0.3, y: h * 0.75, ip: '192.168.1.40', mac: 'CC:DD:EE:77:88:99', name: 'Host C' };
    const hostD = { x: w * 0.7, y: h * 0.75, ip: '192.168.1.50', mac: 'EE:FF:00:11:33:55', name: 'Host D' };
    const hosts = [hostA, hostB, hostC, hostD];

    // Connect cables to switch
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    hosts.forEach(hNode => {
      ctx.beginPath();
      ctx.moveTo(switchPos.x, switchPos.y);
      ctx.lineTo(hNode.x, hNode.y);
      ctx.stroke();
    });

    // Draw Switch
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(switchPos.x - 45, switchPos.y - 20, 90, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Roboto Mono"';
    ctx.fillText('SWITCH', switchPos.x - 24, switchPos.y + 5);

    // Draw Hosts
    hosts.forEach(hNode => {
      ctx.fillStyle = hNode === hostA ? '#10b981' : (hNode === hostB ? '#a855f7' : '#334155');
      ctx.beginPath();
      ctx.roundRect(hNode.x - 65, hNode.y - 30, 130, 60, 8);
      ctx.fill();
      ctx.strokeStyle = 'var(--glass-border)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "Exo 2"';
      ctx.fillText(hNode.name, hNode.x - 55, hNode.y - 12);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px "Roboto Mono"';
      ctx.fillText(hNode.ip, hNode.x - 55, hNode.y + 5);
      ctx.fillText(hNode.mac, hNode.x - 55, hNode.y + 18);
    });

    // Animate ARP Packets based on Step
    if (step === 1) {
      // Packet moving from A to Switch
      ctx.fillStyle = '#f59e0b';
      const px = hostA.x + (switchPos.x - hostA.x) * (this.arpState.timer / 2.2);
      const py = hostA.y + (switchPos.y - hostA.y) * (this.arpState.timer / 2.2);
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
    } else if (step === 2) {
      // Broadcast from Switch to B, C, D
      ctx.fillStyle = '#f59e0b';
      [hostB, hostC, hostD].forEach(dest => {
        const px = switchPos.x + (dest.x - switchPos.x) * (this.arpState.timer / 2.2);
        const py = switchPos.y + (dest.y - switchPos.y) * (this.arpState.timer / 2.2);
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (step === 3) {
      // Unicast Reply from B to Switch to A
      ctx.fillStyle = '#10b981';
      const progress = this.arpState.timer / 2.2;
      let px, py;
      if (progress < 0.5) {
        px = hostB.x + (switchPos.x - hostB.x) * (progress * 2);
        py = hostB.y + (switchPos.y - hostB.y) * (progress * 2);
      } else {
        px = switchPos.x + (hostA.x - switchPos.x) * ((progress - 0.5) * 2);
        py = switchPos.y + (hostA.y - switchPos.y) * ((progress - 0.5) * 2);
      }
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* 4. Render Recursive vs Iterative DNS Resolution */
  renderDNS(ctx, w, h) {
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px "Exo 2", sans-serif';
    ctx.fillText('Hierarchical DNS Query Resolution (Recursive Flow)', 30, 35);

    const steps = [
      '1. Client Browser asks Local DNS Resolver for www.example.com',
      '2. Local Resolver queries Root DNS Server (.)',
      '3. Root DNS Server directs Resolver to .com TLD Name Server',
      '4. Local Resolver queries .com TLD Name Server',
      '5. .com TLD Server directs Resolver to Authoritative Server (ns1.example.com)',
      '6. Authoritative Server returns IP Address (93.184.216.34) -> Cached and delivered to Client!'
    ];
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '13px "Exo 2", sans-serif';
    ctx.fillText(steps[this.dnsState.step], 30, 65);

    const entities = [
      { name: "Client Browser", x: w * 0.12, y: h * 0.5 },
      { name: "Local Resolver (ISP / 8.8.8.8)", x: w * 0.36, y: h * 0.5 },
      { name: "Root DNS (.)", x: w * 0.65, y: h * 0.25 },
      { name: ".com TLD Server", x: w * 0.65, y: h * 0.5 },
      { name: "Authoritative (example.com)", x: w * 0.65, y: h * 0.75 }
    ];

    entities.forEach(e => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(e.x - 70, e.y - 25, 140, 50, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "Exo 2"';
      ctx.fillText(e.name, e.x - 60, e.y + 4);
    });

    // Arrow indicator based on current step
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 14px "Roboto Mono"';
    ctx.fillText(`Active Phase: Step ${this.dnsState.step + 1} of 6`, w - 240, 35);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
