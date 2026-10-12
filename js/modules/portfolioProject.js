// PORTFOLIO PROJECT LABORATORY: NETPULSE SDN & TOPOLOGY ANALYZER
// Interactive Working MVP with Packet Flow Simulator & Cisco IOS Config Generator

export class PortfolioProjectLab {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.links = [];
    this.packets = [];
    this.selectedNode = null;
    this.selectedLink = null;
    this.stats = { sent: 0, delivered: 0, dropped: 0, avgLatency: 14 };
    this.animationId = null;

    this.initSampleTopology();
    this.initEvents();
    this.startSimulation();
  }

  initSampleTopology() {
    this.nodes = [
      { id: 'R1', label: 'Router R1 (Gateway)', type: 'router', x: 120, y: 180, ip: '172.16.10.1', status: 'online' },
      { id: 'R2', label: 'Core Router R2', type: 'router', x: 300, y: 90, ip: '172.16.20.1', status: 'online' },
      { id: 'R3', label: 'Core Router R3', type: 'router', x: 300, y: 270, ip: '172.16.30.1', status: 'online' },
      { id: 'R4', label: 'Edge Router R4', type: 'router', x: 480, y: 180, ip: '172.16.40.1', status: 'online' },
      { id: 'PC1', label: 'Host PC1', type: 'host', x: 40, y: 180, ip: '172.16.10.10', status: 'online' },
      { id: 'PC2', label: 'Server PC2', type: 'host', x: 560, y: 180, ip: '172.16.40.10', status: 'online' }
    ];

    this.links = [
      { id: 'L1', u: 'PC1', v: 'R1', cost: 1, active: true },
      { id: 'L2', u: 'R1', v: 'R2', cost: 3, active: true },
      { id: 'L3', u: 'R1', v: 'R3', cost: 5, active: true },
      { id: 'L4', u: 'R2', v: 'R4', cost: 2, active: true },
      { id: 'L5', u: 'R3', v: 'R4', cost: 2, active: true },
      { id: 'L6', u: 'R4', v: 'PC2', cost: 1, active: true }
    ];

    this.updateStatsDisplay();
    this.generateCiscoConfig();
  }

  initEvents() {
    const c = this.canvas;
    const parent = c.parentElement;
    c.width = parent.clientWidth;
    c.height = 380;

    c.addEventListener('click', (e) => {
      const rect = c.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check click on nodes
      const clickedNode = this.nodes.find(n => Math.hypot(n.x - x, n.y - y) <= 22);
      if (clickedNode) {
        this.selectedNode = clickedNode;
        this.selectedLink = null;
        this.render();
        return;
      }

      // Check click on links (to toggle link break/recovery)
      for (const link of this.links) {
        const uNode = this.nodes.find(n => n.id === link.u);
        const vNode = this.nodes.find(n => n.id === link.v);
        const dist = this.pointToSegmentDistance(x, y, uNode.x, uNode.y, vNode.x, vNode.y);
        if (dist <= 8) {
          link.active = !link.active;
          this.logEvent(`Link [${link.u} <-> ${link.v}] toggled: ${link.active ? 'RESTORED' : 'SEVERED (Simulated Break)'}`);
          this.selectedLink = link;
          this.selectedNode = null;
          this.generateCiscoConfig();
          this.render();
          return;
        }
      }
    });

    const sendPktBtn = document.getElementById('portfolio-send-packet-btn');
    if (sendPktBtn) {
      sendPktBtn.addEventListener('click', () => this.injectPacket());
    }

    const breakLinkBtn = document.getElementById('portfolio-break-primary-btn');
    if (breakLinkBtn) {
      breakLinkBtn.addEventListener('click', () => {
        const primaryLink = this.links.find(l => l.id === 'L2');
        if (primaryLink) {
          primaryLink.active = !primaryLink.active;
          this.logEvent(`Primary Link R1-R2 is now ${primaryLink.active ? 'UP' : 'DOWN'}. OSPF SPF recalculation triggered.`);
          this.generateCiscoConfig();
        }
      });
    }
  }

  pointToSegmentDistance(px, py, x1, y1, x2, y2) {
    const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  }

  injectPacket() {
    // Calculate shortest path PC1 -> PC2 using active links
    const path = this.computeShortestPath('PC1', 'PC2');
    this.stats.sent++;

    if (!path) {
      this.stats.dropped++;
      this.logEvent(`❌ Packet DROP: No active path found from PC1 to PC2! All links severed.`);
      this.updateStatsDisplay();
      return;
    }

    this.packets.push({
      id: Math.floor(Math.random() * 9000 + 1000),
      path,
      currentHop: 0,
      t: 0
    });
    this.logEvent(`Packet dispatched via path: ${path.join(' ➔ ')}`);
    this.updateStatsDisplay();
  }

  computeShortestPath(src, dst) {
    const dist = {};
    const prev = {};
    const unvisited = new Set(this.nodes.map(n => n.id));

    this.nodes.forEach(n => dist[n.id] = Infinity);
    dist[src] = 0;

    while (unvisited.size > 0) {
      let u = null;
      let minD = Infinity;
      unvisited.forEach(nId => {
        if (dist[nId] < minD) {
          minD = dist[nId];
          u = nId;
        }
      });

      if (!u || dist[u] === Infinity) break;
      if (u === dst) break;
      unvisited.delete(u);

      // Neighbors connected via ACTIVE links
      this.links.filter(l => l.active && (l.u === u || l.v === u)).forEach(l => {
        const neighbor = l.u === u ? l.v : l.u;
        if (unvisited.has(neighbor)) {
          const alt = dist[u] + l.cost;
          if (alt < dist[neighbor]) {
            dist[neighbor] = alt;
            prev[neighbor] = u;
          }
        }
      });
    }

    if (dist[dst] === Infinity) return null;

    const path = [];
    let curr = dst;
    while (curr) {
      path.unshift(curr);
      curr = prev[curr];
    }
    return path;
  }

  logEvent(msg) {
    const logBox = document.getElementById('portfolio-event-log');
    if (!logBox) return;
    const time = new Date().toLocaleTimeString();
    logBox.innerHTML = `<div><span style="color:var(--text-dim);">[${time}]</span> ${msg}</div>` + logBox.innerHTML;
  }

  updateStatsDisplay() {
    const sentEl = document.getElementById('netpulse-stat-sent');
    const delivEl = document.getElementById('netpulse-stat-delivered');
    const dropEl = document.getElementById('netpulse-stat-dropped');
    const latEl = document.getElementById('netpulse-stat-latency');

    if (sentEl) sentEl.textContent = this.stats.sent;
    if (delivEl) delivEl.textContent = this.stats.delivered;
    if (dropEl) dropEl.textContent = this.stats.dropped;
    if (latEl) latEl.textContent = `${this.stats.avgLatency} ms`;
  }

  generateCiscoConfig() {
    const codeArea = document.getElementById('portfolio-cisco-config');
    if (!codeArea) return;

    let configText = `! NetPulse Generated Cisco IOS Configuration Script
! Compatible with Cisco 2811 / Packet Tracer (PCCSL507 Lab 14)
! -------------------------------------------------------------
`;

    const routers = this.nodes.filter(n => n.type === 'router');
    routers.forEach(r => {
      configText += `
hostname ${r.id}
enable
configure terminal
interface FastEthernet0/0
 ip address ${r.ip} 255.255.255.0
 no shutdown
exit
router ospf 1
 network ${r.ip.substring(0, r.ip.lastIndexOf('.'))}.0 0.0.0.255 area 0
exit
end
write memory
`;
    });

    codeArea.value = configText;
  }

  startSimulation() {
    const loop = () => {
      this.animationId = requestAnimationFrame(loop);
      this.updatePackets();
      this.render();
    };
    loop();
  }

  updatePackets() {
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const pkt = this.packets[i];
      pkt.t += 0.025;

      if (pkt.t >= 1) {
        pkt.t = 0;
        pkt.currentHop++;

        if (pkt.currentHop >= pkt.path.length - 1) {
          // Packet reached destination PC2
          this.stats.delivered++;
          this.stats.avgLatency = Math.floor(12 + Math.random() * 5);
          this.logEvent(`✅ Packet #${pkt.id} DELIVERED to Server PC2! Latency: ${this.stats.avgLatency}ms.`);
          this.updateStatsDisplay();
          this.packets.splice(i, 1);
        }
      }
    }
  }

  render() {
    const ctx = this.ctx;
    const c = this.canvas;
    ctx.clearRect(0, 0, c.width, c.height);

    // Draw Links
    this.links.forEach(l => {
      const u = this.nodes.find(n => n.id === l.u);
      const v = this.nodes.find(n => n.id === l.v);
      if (!u || !v) return;

      ctx.beginPath();
      ctx.moveTo(u.x, u.y);
      ctx.lineTo(v.x, v.y);

      if (l.active) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Link Cost Badge
      const midX = (u.x + v.x) / 2;
      const midY = (u.y + v.y) / 2;
      ctx.fillStyle = l.active ? 'rgba(15, 23, 42, 0.85)' : 'rgba(239, 68, 68, 0.25)';
      ctx.fillRect(midX - 12, midY - 10, 24, 20);
      ctx.fillStyle = l.active ? '#f1f5f9' : '#f87171';
      ctx.font = 'bold 10px "Roboto Mono"';
      ctx.fillText(l.active ? `c=${l.cost}` : 'OFF', midX - 9, midY + 4);
    });

    // Draw Nodes
    this.nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = n.type === 'router' ? '#0ea5e9' : '#10b981';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node Label
      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 11px "Exo 2"';
      ctx.textAlign = 'center';
      ctx.fillText(n.id, n.x, n.y + 4);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px "Roboto Mono"';
      ctx.fillText(n.ip, n.x, n.y + 32);
    });

    // Draw In-Flight Packets
    this.packets.forEach(pkt => {
      const u = this.nodes.find(n => n.id === pkt.path[pkt.currentHop]);
      const v = this.nodes.find(n => n.id === pkt.path[pkt.currentHop + 1]);
      if (!u || !v) return;

      const px = u.x + (v.x - u.x) * pkt.t;
      const py = u.y + (v.y - u.y) * pkt.t;

      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ec4899';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
