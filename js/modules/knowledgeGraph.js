// INTERACTIVE KNOWLEDGE GRAPH ENGINE
// Force-directed network diagram connecting CST303 concepts, protocols & layers

export class KnowledgeGraphEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.edges = [];
    this.selectedNode = null;
    this.hoverNode = null;
    this.transform = { x: 0, y: 0, scale: 1 };
    this.isDragging = false;
    this.dragNode = null;
    this.lastMouse = { x: 0, y: 0 };
    this.filterCategory = 'all';

    this.initData();
    this.initEvents();
    this.startSimulation();
  }

  initData() {
    this.nodes = [
      // Physical Layer (Amber)
      { id: 'phy', name: 'Physical Layer', cat: 'layer', color: '#f59e0b', r: 24, x: -180, y: 180, desc: 'Transmission of raw bitstream over physical media.' },
      { id: 'fiber', name: 'Optical Fiber', cat: 'media', color: '#f59e0b', r: 16, x: -240, y: 220, desc: 'Total internal reflection, high bandwidth, immune to EMI.' },
      { id: 'manchester', name: 'Manchester Encoding', cat: 'encoding', color: '#f59e0b', r: 15, x: -120, y: 230, desc: 'Self-clocking biphase encoding used in 10Base-T Ethernet.' },

      // Data Link Layer (Emerald)
      { id: 'dll', name: 'Data Link Layer', cat: 'layer', color: '#10b981', r: 24, x: -140, y: 40, desc: 'Framing, MAC arbitration, and hop-by-hop error detection.' },
      { id: 'crc', name: 'CRC Error Detection', cat: 'error', color: '#10b981', r: 16, x: -220, y: 30, desc: 'Cyclic redundancy check with polynomial division.' },
      { id: 'csma_cd', name: 'CSMA/CD', cat: 'mac', color: '#10b981', r: 16, x: -80, y: 50, desc: 'Carrier Sense Multiple Access with Collision Detection.' },
      { id: 'sliding_win', name: 'Sliding Window (GBN/SR)', cat: 'flow', color: '#10b981', r: 16, x: -160, y: -30, desc: 'Flow and error control with selective retransmission.' },

      // Network Layer (Cyan)
      { id: 'net', name: 'Network Layer', cat: 'layer', color: '#0ea5e9', r: 26, x: 0, y: -20, desc: 'End-to-end packet routing, logical addressing, and congestion control.' },
      { id: 'ipv4', name: 'IPv4 Addressing & CIDR', cat: 'protocol', color: '#0ea5e9', r: 18, x: 60, y: -70, desc: '32-bit logical hierarchical host addressing.' },
      { id: 'ipv6', name: 'IPv6 Next-Gen', cat: 'protocol', color: '#0ea5e9', r: 16, x: 90, y: -130, desc: '128-bit address space, fixed 40-byte base header.' },
      { id: 'ospf', name: 'OSPF Link-State', cat: 'routing', color: '#0ea5e9', r: 18, x: -60, y: -100, desc: 'Intra-AS routing using Dijkstra SPF and hierarchical areas.' },
      { id: 'bgp', name: 'BGP Path Vector', cat: 'routing', color: '#0ea5e9', r: 17, x: -20, y: -160, desc: 'Inter-Autonomous System routing across Internet backbones.' },
      { id: 'arp', name: 'ARP Protocol', cat: 'resolution', color: '#0ea5e9', r: 16, x: -90, y: -40, desc: 'Resolves 32-bit IP addresses to 48-bit MAC addresses.' },

      // Transport Layer (Indigo/Purple)
      { id: 'transport', name: 'Transport Layer', cat: 'layer', color: '#a855f7', r: 26, x: 160, y: 0, desc: 'End-to-end process-to-process communication and reliability.' },
      { id: 'tcp', name: 'TCP (3-Way Handshake / AIMD)', cat: 'protocol', color: '#a855f7', r: 20, x: 230, y: -50, desc: 'Connection-oriented, byte-stream reliability and congestion control.' },
      { id: 'udp', name: 'UDP Datagram', cat: 'protocol', color: '#a855f7', r: 16, x: 210, y: 50, desc: 'Lightweight connectionless transport with 8-byte header.' },

      // Application Layer (Rose/Pink)
      { id: 'app', name: 'Application Layer', cat: 'layer', color: '#ec4899', r: 24, x: 140, y: 150, desc: 'User-facing network services and high-level abstractions.' },
      { id: 'dns', name: 'DNS Hierarchical System', cat: 'service', color: '#ec4899', r: 17, x: 230, y: 140, desc: 'Resolves human domain names to IP addresses.' },
      { id: 'email', name: 'SMTP / Email Architecture', cat: 'service', color: '#ec4899', r: 16, x: 80, y: 210, desc: 'Message transfer architecture with UA, MTA, and MDA.' },
      { id: 'ftp', name: 'FTP Dual-Port Protocol', cat: 'service', color: '#ec4899', r: 16, x: 190, y: 220, desc: 'Out-of-band file transfer using Ports 21 and 20.' }
    ];

    this.edges = [
      { from: 'fiber', to: 'phy', rel: 'Implements media' },
      { from: 'manchester', to: 'phy', rel: 'Encodes bits' },
      { from: 'phy', to: 'dll', rel: 'Bitstream service' },
      { from: 'crc', to: 'dll', rel: 'Error detection' },
      { from: 'csma_cd', to: 'dll', rel: 'Arbitrates MAC' },
      { from: 'sliding_win', to: 'dll', rel: 'Flow control' },
      { from: 'dll', to: 'net', rel: 'Frame transport' },
      { from: 'arp', to: 'dll', rel: 'Queries MAC' },
      { from: 'arp', to: 'ipv4', rel: 'Translates IP' },
      { from: 'ipv4', to: 'net', rel: 'Implements addressing' },
      { from: 'ipv6', to: 'net', rel: 'Extends IPv4' },
      { from: 'ospf', to: 'net', rel: 'Computes intra-AS routes' },
      { from: 'bgp', to: 'net', rel: 'Computes inter-AS paths' },
      { from: 'net', to: 'transport', rel: 'Packet routing service' },
      { from: 'tcp', to: 'transport', rel: 'Provides byte-stream' },
      { from: 'udp', to: 'transport', rel: 'Provides datagram' },
      { from: 'transport', to: 'app', rel: 'Socket abstraction' },
      { from: 'dns', to: 'udp', rel: 'Fast query transport' },
      { from: 'dns', to: 'app', rel: 'Name resolution' },
      { from: 'email', to: 'tcp', rel: 'Reliable transfer' },
      { from: 'ftp', to: 'tcp', rel: 'Dual-port connection' }
    ];
  }

  initEvents() {
    const c = this.canvas;
    const parent = c.parentElement;
    c.width = parent.clientWidth;
    c.height = 600;

    c.addEventListener('mousedown', (e) => {
      const rect = c.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - c.width / 2 - this.transform.x) / this.transform.scale;
      const mouseY = (e.clientY - rect.top - c.height / 2 - this.transform.y) / this.transform.scale;

      const hit = this.nodes.find(n => Math.hypot(n.x - mouseX, n.y - mouseY) <= n.r);
      if (hit) {
        this.dragNode = hit;
        this.selectedNode = hit;
        this.updateInspector(hit);
      } else {
        this.isDragging = true;
      }
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.dragNode = null;
    });

    c.addEventListener('mousemove', (e) => {
      const rect = c.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - c.width / 2 - this.transform.x) / this.transform.scale;
      const mouseY = (e.clientY - rect.top - c.height / 2 - this.transform.y) / this.transform.scale;

      if (this.dragNode) {
        this.dragNode.x = mouseX;
        this.dragNode.y = mouseY;
      } else if (this.isDragging) {
        this.transform.x += e.clientX - this.lastMouse.x;
        this.transform.y += e.clientY - this.lastMouse.y;
      } else {
        this.hoverNode = this.nodes.find(n => Math.hypot(n.x - mouseX, n.y - mouseY) <= n.r) || null;
        c.style.cursor = this.hoverNode ? 'pointer' : 'default';
      }
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });

    c.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 0.92;
      this.transform.scale = Math.max(0.4, Math.min(2.5, this.transform.scale * factor));
    }, { passive: false });

    // Category Filter Buttons
    const filterContainer = document.getElementById('kg-filter-buttons');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterCategory = btn.dataset.filter;
      });
    }
  }

  updateInspector(node) {
    const pane = document.getElementById('kg-inspector');
    if (!pane) return;
    const relatedEdges = this.edges.filter(e => e.from === node.id || e.to === node.id);

    pane.innerHTML = `
      <div class="glass-panel" style="padding:1.4rem;">
        <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.75rem;">
          <span style="display:inline-block; width:14px; height:14px; border-radius:50%; background:${node.color};"></span>
          <h3 style="font-size:1.25rem; font-weight:700; color:var(--text-main);">${node.name}</h3>
        </div>
        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.25rem;">${node.desc}</p>
        
        <h4 style="font-size:0.82rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--accent-cyan); margin-bottom:0.6rem;">Connected Relationships (${relatedEdges.length})</h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.4rem; font-size:0.85rem;">
          ${relatedEdges.map(e => {
            const isOutgoing = e.from === node.id;
            const otherId = isOutgoing ? e.to : e.from;
            const otherNode = this.nodes.find(n => n.id === otherId);
            return `<li><span class="font-mono" style="color:var(--text-dim);">${isOutgoing ? '➔' : '⬅'}</span> <strong>${e.rel}</strong> ${otherNode ? otherNode.name : otherId}</li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }

  startSimulation() {
    const tick = () => {
      // Gentle force physics
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.05;
            if (n1 !== this.dragNode) { n1.x -= (dx / dist) * force; n1.y -= (dy / dist) * force; }
            if (n2 !== this.dragNode) { n2.x += (dx / dist) * force; n2.y += (dy / dist) * force; }
          }
        }
      }

      this.render();
      requestAnimationFrame(tick);
    };
    tick();
  }

  render() {
    const ctx = this.ctx;
    const c = this.canvas;
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.save();
    ctx.translate(c.width / 2 + this.transform.x, c.height / 2 + this.transform.y);
    ctx.scale(this.transform.scale, this.transform.scale);

    // Draw Edges
    this.edges.forEach(e => {
      const src = this.nodes.find(n => n.id === e.from);
      const dst = this.nodes.find(n => n.id === e.to);
      if (!src || !dst) return;

      const isHighlighted = (this.selectedNode && (this.selectedNode.id === src.id || this.selectedNode.id === dst.id));
      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(dst.x, dst.y);
      ctx.strokeStyle = isHighlighted ? 'rgba(56, 189, 248, 0.8)' : 'rgba(148, 163, 184, 0.18)';
      ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
      ctx.stroke();

      // Draw Relationship Label if highlighted
      if (isHighlighted) {
        const midX = (src.x + dst.x) / 2;
        const midY = (src.y + dst.y) / 2;
        ctx.fillStyle = '#f1f5f9';
        ctx.font = '10px "Roboto Mono"';
        ctx.fillText(e.rel, midX, midY - 4);
      }
    });

    // Draw Nodes
    this.nodes.forEach(n => {
      const isSelected = this.selectedNode && this.selectedNode.id === n.id;
      const isHovered = this.hoverNode && this.hoverNode.id === n.id;

      // Glow
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.fill();
      }

      // Node Body
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = isSelected ? 3 : 1;
      ctx.stroke();

      // Node Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "Exo 2", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, n.x, n.y + n.r + 14);
    });

    ctx.restore();
  }
}
