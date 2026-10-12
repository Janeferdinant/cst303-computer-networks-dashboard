// 7 FUNCTIONAL EDUCATIONAL GAMES FOR CST303 COMPUTER NETWORKS
// Games A through G with scoring, immediate feedback, and replay options

export class EducationalGames {
  constructor() {
    this.currentGame = 'rapid_quiz';
    this.score = 0;
    this.streak = 0;
    this.init();
  }

  init() {
    this.setupGameSwitcher();
    this.loadGame(this.currentGame);
  }

  setupGameSwitcher() {
    const nav = document.getElementById('games-nav');
    if (!nav) return;
    nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.game-nav-btn');
      if (!btn) return;
      document.querySelectorAll('.game-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.currentGame = btn.dataset.game;
      this.loadGame(this.currentGame);
    });
  }

  loadGame(gameId) {
    const board = document.getElementById('game-play-area');
    if (!board) return;

    switch (gameId) {
      case 'rapid_quiz':
        this.renderRapidQuiz(board);
        break;
      case 'matching':
        this.renderConceptMatching(board);
        break;
      case 'frame_builder':
        this.renderFrameBuilder(board);
        break;
      case 'routing_challenge':
        this.renderRoutingChallenge(board);
        break;
      case 'scenario_architect':
        this.renderScenarioChallenge(board);
        break;
      case 'graph_connector':
        this.renderGraphConnector(board);
        break;
      case 'network_debugger':
        this.renderNetworkDebugger(board);
        break;
      default:
        this.renderRapidQuiz(board);
    }
  }

  updateHUD(points = 0, isCorrect = true) {
    if (isCorrect) {
      this.streak++;
      this.score += points * Math.min(3, this.streak);
    } else {
      this.streak = 0;
    }
    const scoreEl = document.getElementById('game-score-display');
    const streakEl = document.getElementById('game-streak-display');
    if (scoreEl) scoreEl.textContent = this.score;
    if (streakEl) streakEl.textContent = `${this.streak}x`;
  }

  /* ==========================================================
   * GAME A: Concept Matching
   * ========================================================== */
  renderConceptMatching(board) {
    const pairs = [
      { id: 1, term: "CSMA/CD", match: "Ethernet Collision Detection (IEEE 802.3)" },
      { id: 2, term: "Port 21", match: "FTP Control Connection" },
      { id: 3, term: "Dijkstra", match: "Link State Shortest Path (OSPF)" },
      { id: 4, term: "BGP", match: "Inter-Autonomous System Path Vector" },
      { id: 5, term: "Poison Reverse", match: "Solves Count-to-Infinity in Distance Vector" }
    ];

    let selectedTerm = null;
    let matchesMade = 0;

    const terms = [...pairs].sort(() => Math.random() - 0.5);
    const defs = [...pairs].sort(() => Math.random() - 0.5);

    board.innerHTML = `
      <div class="glass-card">
        <h3 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Game A: Protocol Concept Matching</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">Click a Protocol on the left, then click its corresponding Function on the right.</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
          <div id="match-terms" style="display:flex; flex-direction:column; gap:0.75rem;">
            ${terms.map(t => `<button class="btn btn-glass match-item-btn font-mono" data-id="${t.id}" style="text-align:left; justify-content:flex-start;">${t.term}</button>`).join('')}
          </div>
          <div id="match-defs" style="display:flex; flex-direction:column; gap:0.75rem;">
            ${defs.map(d => `<button class="btn btn-glass match-def-btn" data-id="${d.id}" style="text-align:left; justify-content:flex-start;">${d.match}</button>`).join('')}
          </div>
        </div>
        <div id="matching-feedback" style="margin-top:1.5rem;"></div>
      </div>
    `;

    const termBtns = board.querySelectorAll('.match-item-btn');
    const defBtns = board.querySelectorAll('.match-def-btn');
    const feedback = board.getElementById('matching-feedback');

    termBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        termBtns.forEach(b => b.style.borderColor = 'var(--glass-border)');
        btn.style.borderColor = 'var(--accent-cyan)';
        selectedTerm = btn.dataset.id;
      });
    });

    defBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!selectedTerm) {
          feedback.innerHTML = `<span style="color:var(--accent-amber);">Select a protocol on the left first!</span>`;
          return;
        }
        if (selectedTerm === btn.dataset.id) {
          this.updateHUD(100, true);
          matchesMade++;
          btn.style.background = 'rgba(16,185,129,0.2)';
          btn.style.borderColor = 'var(--accent-emerald)';
          btn.disabled = true;
          const matchedTermBtn = board.querySelector(`.match-item-btn[data-id="${selectedTerm}"]`);
          if (matchedTermBtn) {
            matchedTermBtn.style.background = 'rgba(16,185,129,0.2)';
            matchedTermBtn.style.borderColor = 'var(--accent-emerald)';
            matchedTermBtn.disabled = true;
          }
          selectedTerm = null;
          feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">✅ Correct match! +100 Points</span>`;
          if (matchesMade === pairs.length) {
            feedback.innerHTML = `<div style="color:var(--accent-emerald); font-size:1.1rem; font-weight:700;">🎉 Outstanding! All 5 concepts matched successfully!</div>`;
          }
        } else {
          this.updateHUD(0, false);
          feedback.innerHTML = `<span style="color:var(--accent-rose);">❌ Incorrect pairing! Try again.</span>`;
        }
      });
    });
  }

  /* ==========================================================
   * GAME B: Frame & Architecture Builder
   * ========================================================== */
  renderFrameBuilder(board) {
    const correctOrder = [
      { id: "preamble", name: "Preamble & SFD (8B)", hint: "Synchronizes receiver clocks (10101010...10101011)" },
      { id: "dst_mac", name: "Destination MAC (6B)", hint: "Physical recipient hardware address" },
      { id: "src_mac", name: "Source MAC (6B)", hint: "Transmitter hardware address" },
      { id: "type", name: "EtherType / Length (2B)", hint: "Specifies payload protocol (e.g., 0x0800 for IPv4)" },
      { id: "payload", name: "Data Payload (46-1500B)", hint: "Carries upper-layer IP packet" },
      { id: "fcs", name: "FCS / CRC-32 (4B)", hint: "Cyclic redundancy check error detector" }
    ];

    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    const userPlaced = [];

    board.innerHTML = `
      <div class="glass-card">
        <h3 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Game B: Ethernet Frame Architect</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">Assemble the IEEE 802.3 Ethernet frame fields in the exact byte order from left to right.</p>

        <div style="min-height:90px; border:2px dashed var(--glass-border); border-radius:10px; padding:1rem; display:flex; gap:0.6rem; align-items:center; flex-wrap:wrap; margin-bottom:1.5rem;" id="frame-dropzone">
          <span style="color:var(--text-dim); font-size:0.85rem;" id="dropzone-empty-hint">Click fields below to append them into the frame sequence...</span>
        </div>

        <div style="display:flex; gap:0.6rem; flex-wrap:wrap;" id="frame-pool">
          ${shuffled.map(f => `<button class="btn btn-glass frame-field-btn font-mono" data-id="${f.id}">${f.name}</button>`).join('')}
        </div>

        <div style="display:flex; gap:1rem; margin-top:1.5rem;">
          <button class="btn btn-primary" id="verify-frame-btn">Verify Sequence</button>
          <button class="btn btn-outline" id="reset-frame-btn">Reset</button>
        </div>
        <div id="frame-builder-feedback" style="margin-top:1rem;"></div>
      </div>
    `;

    const dropzone = board.querySelector('#frame-dropzone');
    const pool = board.querySelector('#frame-pool');
    const feedback = board.querySelector('#frame-builder-feedback');

    board.querySelectorAll('.frame-field-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        userPlaced.push(id);
        const item = correctOrder.find(f => f.id === id);
        const span = document.createElement('span');
        span.className = 'iridescent-badge';
        span.textContent = item.name;
        dropzone.appendChild(span);
        const emptyHint = board.querySelector('#dropzone-empty-hint');
        if (emptyHint) emptyHint.style.display = 'none';
        btn.style.display = 'none';
      });
    });

    board.querySelector('#verify-frame-btn').addEventListener('click', () => {
      if (userPlaced.length !== correctOrder.length) {
        feedback.innerHTML = `<span style="color:var(--accent-amber);">Place all 6 frame components first.</span>`;
        return;
      }
      const isCorrect = userPlaced.every((val, idx) => val === correctOrder[idx].id);
      if (isCorrect) {
        this.updateHUD(150, true);
        feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">🏆 Perfect! Valid IEEE 802.3 Frame assembled in exact sequence! +150 Points</span>`;
      } else {
        this.updateHUD(0, false);
        feedback.innerHTML = `<span style="color:var(--accent-rose);">❌ Incorrect byte order. Standard Ethernet order: Preamble ➔ Dst MAC ➔ Src MAC ➔ Type ➔ Data ➔ FCS.</span>`;
      }
    });

    board.querySelector('#reset-frame-btn').addEventListener('click', () => {
      this.renderFrameBuilder(board);
    });
  }

  /* ==========================================================
   * GAME C: Routing Algorithm Challenge (Distance Vector)
   * ========================================================== */
  renderRoutingChallenge(board) {
    board.innerHTML = `
      <div class="glass-card">
        <h3 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Game C: Next-Hop Routing Challenge</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">
          Router <strong>R1</strong> receives distance vectors from its direct neighbors <strong>R2</strong> (cost 2) and <strong>R3</strong> (cost 5):
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
          <div class="glass-panel" style="padding:1rem;">
            <h4 style="color:var(--accent-cyan);">Neighbor R2 Table (Link Cost = 2)</h4>
            <p class="font-mono" style="font-size:0.85rem;">Dest NetX: 6 hops<br>Dest NetY: 3 hops<br>Dest NetZ: 8 hops</p>
          </div>
          <div class="glass-panel" style="padding:1rem;">
            <h4 style="color:var(--accent-purple);">Neighbor R3 Table (Link Cost = 5)</h4>
            <p class="font-mono" style="font-size:0.85rem;">Dest NetX: 2 hops<br>Dest NetY: 1 hops<br>Dest NetZ: 4 hops</p>
          </div>
        </div>

        <p><strong>Question:</strong> What is the optimal path cost and Next-Hop from R1 to reach <strong>NetX</strong>?</p>

        <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:1rem;">
          <button class="btn btn-glass routing-ans-btn" data-correct="true">Via R3 with Total Cost 7 (5 + 2)</button>
          <button class="btn btn-glass routing-ans-btn" data-correct="false">Via R2 with Total Cost 8 (2 + 6)</button>
          <button class="btn btn-glass routing-ans-btn" data-correct="false">Via R2 with Total Cost 6</button>
          <button class="btn btn-glass routing-ans-btn" data-correct="false">Via R3 with Total Cost 2</button>
        </div>
        <div id="routing-feedback" style="margin-top:1.5rem;"></div>
      </div>
    `;

    board.querySelectorAll('.routing-ans-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        const feedback = board.querySelector('#routing-feedback');
        if (isCorrect) {
          this.updateHUD(100, true);
          btn.style.background = 'rgba(16,185,129,0.2)';
          btn.style.borderColor = 'var(--accent-emerald)';
          feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">✅ Correct! Cost via R2 is 2+6=8; Cost via R3 is 5+2=7. R1 installs route to NetX via R3 with metric 7!</span>`;
        } else {
          this.updateHUD(0, false);
          btn.style.background = 'rgba(239,68,68,0.2)';
          btn.style.borderColor = 'var(--accent-rose)';
          feedback.innerHTML = `<span style="color:var(--accent-rose);">❌ Incorrect. Bellman-Ford equation: Cost = min(c(R1,R2) + d(R2,X), c(R1,R3) + d(R3,X)) = min(2+6, 5+2) = min(8, 7) = 7 via R3.</span>`;
        }
      });
    });
  }

  /* ==========================================================
   * GAME D: Knowledge Graph Connector
   * ========================================================== */
  renderGraphConnector(board) {
    board.innerHTML = `
      <div class="glass-card">
        <h3 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Game D: Knowledge Graph Relationship Linker</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">Identify which protocol relies directly upon another protocol for its foundational operation.</p>

        <p style="font-size:1.1rem; margin-bottom:1rem;">Which relationship edge is <strong>TECHNICALLY TRUE</strong>?</p>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <button class="btn btn-glass graph-edge-btn" data-correct="true">OSPF relies on raw IP datagrams (IP Protocol Number 89) without TCP or UDP.</button>
          <button class="btn btn-glass graph-edge-btn" data-correct="false">DNS exclusively runs on TCP and never transmits over UDP.</button>
          <button class="btn btn-glass graph-edge-btn" data-correct="false">ARP resides directly in the Transport Layer above TCP.</button>
          <button class="btn btn-glass graph-edge-btn" data-correct="false">BGP operates directly on Data Link Ethernet frames without TCP.</button>
        </div>
        <div id="graph-connector-feedback" style="margin-top:1.5rem;"></div>
      </div>
    `;

    board.querySelectorAll('.graph-edge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        const feedback = board.querySelector('#graph-connector-feedback');
        if (isCorrect) {
          this.updateHUD(100, true);
          btn.style.background = 'rgba(16,185,129,0.2)';
          btn.style.borderColor = 'var(--accent-emerald)';
          feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">✅ Correct! OSPF encapsulates its packets directly inside IP (Protocol 89), implementing its own reliability rather than using TCP or UDP.</span>`;
        } else {
          this.updateHUD(0, false);
          btn.style.background = 'rgba(239,68,68,0.2)';
          btn.style.borderColor = 'var(--accent-rose)';
          feedback.innerHTML = `<span style="color:var(--accent-rose);">❌ Incorrect. Review protocol layering dependencies in Module 4.</span>`;
        }
      });
    });
  }

  /* ==========================================================
   * GAME E: Real-World Scenario Architect
   * ========================================================== */
  renderScenarioChallenge(board) {
    board.innerHTML = `
      <div class="glass-card">
        <h3 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Game E: Enterprise Network Architect</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">
          <strong>Scenario:</strong> You are designing a campus network backbone connecting 4 separate college buildings across 8 kilometers in Kochi, subject to heavy electromagnetic interference from industrial machinery nearby.
        </p>

        <p><strong>Which transmission medium must you deploy?</strong></p>
        <div style="display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;">
          <button class="btn btn-glass scenario-opt-btn" data-correct="true">Single-Mode Optical Fiber Cable (Immune to EMI, attenuation < 0.3 dB/km)</button>
          <button class="btn btn-glass scenario-opt-btn" data-correct="false">Shielded Twisted Pair (STP Cat6 - Max distance 100 meters)</button>
          <button class="btn btn-glass scenario-opt-btn" data-correct="false">Multimode Optical Fiber (Suffers modal dispersion beyond 2 km)</button>
          <button class="btn btn-glass scenario-opt-btn" data-correct="false">Thick Coaxial Cable (10Base5 - High attenuation over 8 km)</button>
        </div>
        <div id="scenario-feedback" style="margin-top:1.5rem;"></div>
      </div>
    `;

    board.querySelectorAll('.scenario-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        const feedback = board.querySelector('#scenario-feedback');
        if (isCorrect) {
          this.updateHUD(120, true);
          btn.style.background = 'rgba(16,185,129,0.2)';
          btn.style.borderColor = 'var(--accent-emerald)';
          feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">✅ Excellent Engineering Decision! Single-mode fiber uses total internal reflection with laser light, completely eliminating EMI interference and spanning 8 km without repeaters.</span>`;
        } else {
          this.updateHUD(0, false);
          btn.style.background = 'rgba(239,68,68,0.2)';
          btn.style.borderColor = 'var(--accent-rose)';
          feedback.innerHTML = `<span style="color:var(--accent-rose);">❌ Incorrect. Twisted pair is limited to 100m, and Multimode fiber is limited to ~2km due to modal dispersion.</span>`;
        }
      });
    });
  }

  /* ==========================================================
   * GAME F: Rapid Timed Quiz
   * ========================================================== */
  renderRapidQuiz(board) {
    const questions = [
      {
        q: "In the Ethernet frame, what is the minimum payload size required to ensure collision detection?",
        options: ["46 Bytes", "64 Bytes", "1500 Bytes", "512 Bytes"],
        correct: 0,
        explanation: "Minimum Ethernet frame is 64 bytes. Subtracting 14 bytes header and 4 bytes FCS leaves 46 bytes minimum payload."
      },
      {
        q: "What is the maximum number of usable hosts on a subnet with mask /26 (255.255.255.192)?",
        options: ["64", "62", "30", "126"],
        correct: 1,
        explanation: "Host bits = 32 - 26 = 6 bits. Usable hosts = 2^6 - 2 = 64 - 2 = 62 hosts."
      },
      {
        q: "Which protocol is known as a path-vector routing protocol used between Autonomous Systems?",
        options: ["OSPF", "RIPv2", "BGP", "IS-IS"],
        correct: 2,
        explanation: "BGP (Border Gateway Protocol) is the standard inter-domain Path Vector protocol."
      },
      {
        q: "In TCP 3-way handshake, what flags are set in the second segment sent by the server?",
        options: ["SYN only", "SYN + ACK", "ACK only", "FIN + ACK"],
        correct: 1,
        explanation: "The server acknowledges the client's SYN and synchronizes its own sequence number with SYN + ACK."
      },
      {
        q: "Which technique prevents Count-to-Infinity in Distance Vector by advertising unreachable metric (16) back to the sender?",
        options: ["Split Horizon with Poison Reverse", "Dijkstra's Algorithm", "Token Bucket", "Choke Packets"],
        correct: 0,
        explanation: "Poison reverse explicitly advertises infinity (poison) back to the interface from which the route was learned."
      }
    ];

    let currentQ = 0;

    const renderCurrentQ = () => {
      const qData = questions[currentQ];
      board.innerHTML = `
        <div class="glass-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <span class="iridescent-badge">Question ${currentQ + 1} of ${questions.length}</span>
            <span style="font-size:0.85rem; color:var(--text-muted);">Timed Knowledge Check</span>
          </div>
          <h3 style="font-size:1.2rem; margin-bottom:1.5rem; color:var(--text-main);">${qData.q}</h3>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${qData.options.map((opt, idx) => `
              <button class="btn btn-glass quiz-opt-btn" data-idx="${idx}" style="text-align:left; justify-content:flex-start;">
                <strong>${String.fromCharCode(65 + idx)}.</strong>&nbsp; ${opt}
              </button>
            `).join('')}
          </div>
          <div id="quiz-feedback" style="margin-top:1.5rem;"></div>
        </div>
      `;

      board.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const selected = parseInt(btn.dataset.idx, 10);
          const feedback = board.querySelector('#quiz-feedback');
          board.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);

          if (selected === qData.correct) {
            this.updateHUD(100, true);
            btn.style.background = 'rgba(16,185,129,0.2)';
            btn.style.borderColor = 'var(--accent-emerald)';
            feedback.innerHTML = `
              <div style="color:var(--accent-emerald); font-weight:700; margin-bottom:0.5rem;">✅ Correct! +100 Points</div>
              <p style="font-size:0.85rem; color:var(--text-muted);">${qData.explanation}</p>
              <button class="btn btn-primary" id="next-q-btn" style="margin-top:1rem;">Next Question</button>
            `;
          } else {
            this.updateHUD(0, false);
            btn.style.background = 'rgba(239,68,68,0.2)';
            btn.style.borderColor = 'var(--accent-rose)';
            feedback.innerHTML = `
              <div style="color:var(--accent-rose); font-weight:700; margin-bottom:0.5rem;">❌ Incorrect. Correct answer was ${String.fromCharCode(65 + qData.correct)}.</div>
              <p style="font-size:0.85rem; color:var(--text-muted);">${qData.explanation}</p>
              <button class="btn btn-primary" id="next-q-btn" style="margin-top:1rem;">Next Question</button>
            `;
          }

          board.querySelector('#next-q-btn').addEventListener('click', () => {
            currentQ++;
            if (currentQ < questions.length) {
              renderCurrentQ();
            } else {
              board.innerHTML = `
                <div class="glass-card" style="text-align:center; padding:3rem;">
                  <h2 style="color:var(--accent-cyan); margin-bottom:1rem;">Quiz Completed!</h2>
                  <p style="font-size:1.3rem; margin-bottom:1.5rem;">Final Score: <strong>${this.score}</strong></p>
                  <button class="btn btn-primary" id="restart-quiz-btn">Play Again</button>
                </div>
              `;
              board.querySelector('#restart-quiz-btn').addEventListener('click', () => {
                currentQ = 0;
                renderCurrentQ();
              });
            }
          });
        });
      });
    };

    renderCurrentQ();
  }

  /* ==========================================================
   * GAME G: Network Debugger Challenge
   * ========================================================== */
  renderNetworkDebugger(board) {
    board.innerHTML = `
      <div class="glass-card">
        <h3 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Game G: Network Configuration Debugger</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">
          Inspect the router configuration below from a Cisco 2811 router (OSPF PCCSL507 Lab). A student cannot establish OSPF adjacency with neighboring router R2501A (172.16.10.2 /24).
        </p>

        <div style="background:rgba(0,0,0,0.4); padding:1.2rem; border-radius:8px; border:1px solid var(--glass-border); margin-bottom:1.5rem;">
          <pre class="font-mono" style="color:var(--accent-amber); font-size:0.85rem;">
Router R2621 Configuration:
interface FastEthernet0/0
 ip address 172.16.10.1 255.255.255.0
 no shutdown
exit
router ospf 1
 network 172.16.10.0 255.255.255.0 area 0   <-- Inspect this line
end</pre>
        </div>

        <p><strong>What is the root cause preventing OSPF adjacency?</strong></p>
        <div style="display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;">
          <button class="btn btn-glass debug-ans-btn" data-correct="true">
            OSPF requires a <strong>Wildcard Mask</strong> (0.0.0.255), not a subnet mask (255.255.255.0).
          </button>
          <button class="btn btn-glass debug-ans-btn" data-correct="false">
            FastEthernet interfaces do not support OSPF routing.
          </button>
          <button class="btn btn-glass debug-ans-btn" data-correct="false">
            Area 0 cannot be used with Process ID 1.
          </button>
          <button class="btn btn-glass debug-ans-btn" data-correct="false">
            Router R2621 IP address must end in .254.
          </button>
        </div>
        <div id="debug-feedback" style="margin-top:1.5rem;"></div>
      </div>
    `;

    board.querySelectorAll('.debug-ans-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        const feedback = board.querySelector('#debug-feedback');
        if (isCorrect) {
          this.updateHUD(150, true);
          btn.style.background = 'rgba(16,185,129,0.2)';
          btn.style.borderColor = 'var(--accent-emerald)';
          feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">✅ Excellent Bug Discovery! In Cisco IOS OSPF configuration, the network statement mandates an inverse wildcard mask: 'network 172.16.10.0 0.0.0.255 area 0'. Using 255.255.255.0 is rejected by the IOS parser!</span>`;
        } else {
          this.updateHUD(0, false);
          btn.style.background = 'rgba(239,68,68,0.2)';
          btn.style.borderColor = 'var(--accent-rose)';
          feedback.innerHTML = `<span style="color:var(--accent-rose);">❌ Incorrect bug hypothesis. Refer to Experiment 14 in PCCSL507 Networks Lab manual.</span>`;
        }
      });
    });
  }
}
