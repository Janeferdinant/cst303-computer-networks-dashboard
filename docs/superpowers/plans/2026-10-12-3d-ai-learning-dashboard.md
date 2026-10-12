# CST303 Computer Networks: Interactive 3D AI-Powered Learning Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, responsive, 3D interactive learning dashboard and question paper solver for APJ Abdul Kalam Technological University (KTU) CST303 Computer Networks, featuring 15 comprehensive modules, Three.js 3D visualizations, interactive motion graphics, 7 educational games, a dynamic knowledge graph, exam solver with official schemes, and a working SDN/Network Analyzer portfolio MVP.

**Architecture:** Single-page rich web application built with modern HTML5, CSS3 Glassmorphism design system (Dark & Light themes), and modular JavaScript utilizing Three.js for interactive WebGL 3D concept scenes, Canvas/SVG for animated motion graphics, D3-style force simulation for the knowledge graph, and client-side reactive state management with localStorage persistence.

**Tech Stack:** HTML5, Vanilla Modern CSS with Glassmorphism / Iridescent tokens, JavaScript (ES6+), Three.js (r128+ WebGL), Lucide icons (SVG), KaTeX/Math formatting, and lightweight sound synthesis for micro-interactions.

**Spec:** User Master Prompt for Interactive 3D AI-Powered Learning Dashboard, KTU CST303 Computer Networks syllabus, university question papers (Dec 2022, Dec 2023), and PCCSL507 Networks Lab experiments (OSPF, RIPv2).

## Global Constraints

- Footer must strictly read: `Jane Rose | Assistant Professor, Department of Computer Science and Engineering`.
- Support both Dark Theme (Midnight slate `#0A0F1D` with iridescent glow) and Light Theme (Pearl mist `#F0F4F8` with frosted glass).
- Educational accuracy: All question solutions and formulas must map directly to KTU CST303 scheme of valuation and standard textbooks (Tanenbaum, Kurose & Ross, Forouzan).
- Mobile & desktop responsive design with touch navigation and keyboard accessibility.
- Zero broken buttons or empty placeholder sections; every control must execute functional logic.

## Review Focus

- WebGL context recovery and fallback on mobile devices with low GPU memory.
- Contrast ratio >= 4.5:1 for all text in both Dark and Light themes.
- Exact arithmetic and polynomial division verification for CRC and Subnetting calculators.
- Verification of official KTU valuation schemes for Question Paper solver.
- Complete execution and state reset across all 7 educational games.

---

### Task 1: Foundation & Design System (Glassmorphism Core, Tokens, Navigation)

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/app.js`

**Interfaces:**
- Consumes: System color tokens and responsive grid layout.
- Produces: Global shell with navigation sidebar, header, theme toggle, search filter, breadcrumb, section containers, and footer.

- [ ] **Step 1: Write structure and CSS tokens in `css/style.css`**
  Define CSS variables for `--bg-primary`, `--glass-bg`, `--glass-border`, `--glass-blur`, `--text-main`, `--text-muted`, `--color-primary`, `--color-accent`, and iridescent gradients for both dark (`[data-theme="dark"]`) and light (`[data-theme="light"]`) modes.
- [ ] **Step 2: Implement responsive layout and navigation in `index.html`**
  Build the sidebar with 15 module links, top bar with live search, theme switch, quick stats, and main viewport.
- [ ] **Step 3: Add core app logic in `js/app.js`**
  Handle tab switching, active route highlighting, theme persistence in `localStorage`, and mobile drawer toggle.
- [ ] **Step 4: Verify navigation and theme toggle**
  Ensure theme switches cleanly between dark and light modes with proper contrast.

---

### Task 2: Syllabus & Course Curriculum Explorer (KTU CST303)

**Files:**
- Create: `js/data/syllabusData.js`
- Create: `js/modules/syllabusExplorer.js`

**Interfaces:**
- Consumes: CST303 syllabus modules and PCCSL507 lab experiments.
- Produces: Interactive module viewer with course outcomes (COs), Bloom's taxonomy mapping, lecture hour allocation, textbook references, and search filtering.

- [ ] **Step 1: Create `js/data/syllabusData.js`**
  Structure Modules 1 to 5 with detailed subtopics (Physical, Data Link, Network, Transport, Application) and Lab Experiments (OSPF Exp 14, RIPv2 Exp 13).
- [ ] **Step 2: Implement `js/modules/syllabusExplorer.js`**
  Render expandable cards, search filters, prerequisite badges, and direct links to corresponding 3D labs.
- [ ] **Step 3: Verify syllabus topic filtering and detail modals**
  Test keyword filtering (e.g., "OSPF", "Sliding Window", "Subnetting").

---

### Task 3: Interactive 3D Concept Laboratory (Three.js WebGL)

**Files:**
- Create: `js/modules/threeVisualizer.js`

**Interfaces:**
- Consumes: Three.js WebGL renderer and canvas elements.
- Produces: 5 interactive 3D concept scenes:
  1. 3D Optical Fiber Total Internal Reflection (Core/Cladding refractive index slider, incident angle control).
  2. 3D Network Topologies (Mesh, Star, Bus, Ring with node packet transmission).
  3. 3D OSI/TCP-IP 7-Layer Encapsulation (Interactive packet moving through layers with PDU headers).
  4. 3D OSPF Hierarchical Autonomous System (Backbone Area 0, Area 1, ABRs, ASBRs with LSA packet animation).
  5. 3D Datagram vs Virtual Circuit Routing (Dynamic packet flow vs pre-established path).

- [ ] **Step 1: Build Three.js wrapper with camera controls and resize handlers**
  Implement orbit rotation, touch support, play/pause controls, and WebGL fallback notice.
- [ ] **Step 2: Build the 5 3D interactive models with parameter sliders**
  Add interactive parameter controls (angle of incidence, node count, packet speed, topology switcher).
- [ ] **Step 3: Test 3D rendering and cleanup on tab switch**
  Ensure animation loops pause and GPU resources are managed gracefully.

---

### Task 4: Interactive Concept Laboratory (Simulation Tools)

**Files:**
- Create: `js/modules/conceptLab.js`

**Interfaces:**
- Consumes: Mathematical and algorithmic models.
- Produces: Live interactive calculators and visualizers:
  1. CRC Generation & Verification Tool (custom bit generator, polynomial division step-by-step).
  2. Sliding Window Protocol Simulator (Stop-and-Wait, Go-Back-N, Selective Repeat with timeout and ACK loss).
  3. IPv4 Subnet Calculator (CIDR calculator, subnet masks, usable host ranges, binary breakdown).
  4. Shortest Path Router (Dijkstra algorithm step-by-step node cost table calculation).

- [ ] **Step 1: Implement CRC binary polynomial division with step-by-step visual steps**
- [ ] **Step 2: Implement Sliding Window animation with packet ACK/NAK simulation**
- [ ] **Step 3: Implement CIDR Subnet Calculator with network/broadcast calculations**
- [ ] **Step 4: Implement Dijkstra graph step-by-step solver**

---

### Task 5: Motion Graphics & Educational Animations

**Files:**
- Create: `js/modules/motionGraphics.js`

**Interfaces:**
- Consumes: Canvas and SVG animation controllers.
- Produces: Step-by-step educational motion graphics:
  1. Token Bucket vs Leaky Bucket Traffic Shaping.
  2. TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery AIMD graph).
  3. ARP Resolution (Broadcast request, unicast reply, cache table update).
  4. Recursive vs Iterative DNS Resolution.

- [ ] **Step 1: Implement Canvas/SVG animation engine with play, pause, step, and speed controls**
- [ ] **Step 2: Render animated data flows and annotations for all 4 mechanisms**
- [ ] **Step 3: Verify animation responsiveness and reduced-motion mode**

---

### Task 6: University Question-Paper Solver (Dec 2022 & Dec 2023 with Schemes)

**Files:**
- Create: `js/data/examSolutionsData.js`
- Create: `js/modules/examSolver.js`

**Interfaces:**
- Consumes: Official KTU valuation schemes (`B2 CST303 CN QP SCHEME1-Dec 2022.pdf`, `CST303-DRAFT SCHEME1.pdf`).
- Produces: Complete question-by-question solver for:
  - December 2022 (Part A Q1-Q10, Part B Q11-Q20 all modules)
  - December 2023 (Part A Q1-Q10, Part B Q11-Q20 all modules)
  - Features: Mark allocation breakdown, concise revision toggle, detailed model answer, diagram schematics, code/calculations, printable view, self-assessment checklist.

- [ ] **Step 1: Create `js/data/examSolutionsData.js` with comprehensive verified model answers**
- [ ] **Step 2: Build `js/modules/examSolver.js` with interactive question navigator, module filters, and search**
- [ ] **Step 3: Add print stylesheet and student self-assessment tracker**
- [ ] **Step 4: Verify technical accuracy against official scheme keys**

---

### Task 7: 7 Educational Games

**Files:**
- Create: `js/modules/educationalGames.js`

**Interfaces:**
- Consumes: CST303 concept database and game mechanics.
- Produces: 7 playable, scored educational games:
  - Game A: Concept Matching (Drag or click matching concepts to definitions)
  - Game B: Frame & Architecture Builder (Assemble Ethernet/HDLC/TCP frames in correct byte order)
  - Game C: Routing Algorithm Challenge (Predict next routing table hop & distance)
  - Game D: Knowledge Graph Connector (Link related protocols like ARP -> IP -> ICMP)
  - Game E: Scenario Architect (Choose optimal protocol/media for corporate scenarios)
  - Game F: Rapid Quiz (Timed 10-question challenge with streak multipliers and explanations)
  - Game G: Network Debugger (Identify misconfigurations in IP subnets, routing loops, or MTU mismatches)

- [ ] **Step 1: Implement shared game state manager (score, streak, localStorage high scores)**
- [ ] **Step 2: Build individual game views and interactive boards**
- [ ] **Step 3: Add audio/visual feedback for correct/incorrect answers and retry mechanisms**
- [ ] **Step 4: Verify all 7 games work with zero errors**

---

### Task 8: Interactive Knowledge Graph

**Files:**
- Create: `js/modules/knowledgeGraph.js`

**Interfaces:**
- Consumes: Network of CST303 concepts, prerequisite relationships, and layers.
- Produces: Interactive force-directed knowledge graph with pan, zoom, cluster grouping, node search, and detail inspector linking to labs and exam questions.

- [ ] **Step 1: Define node and edge topology representing all 5 layers and protocols**
- [ ] **Step 2: Implement canvas force-directed graph renderer with drag, zoom, and highlight**
- [ ] **Step 3: Add sidebar inspector displaying node details, prerequisites, and learning links**

---

### Task 9: Real-World Applications, Advancements & Research Explorer

**Files:**
- Create: `js/data/industryResearchData.js`
- Create: `js/modules/industryResearchExplorer.js`

**Interfaces:**
- Consumes: Real-world engineering case studies, research papers, and emerging standards.
- Produces:
  - Real-World Applications (SDN at Google B4, BGP at Cloudflare, QUIC at YouTube, 5G Slicing).
  - Latest Advancements (Wi-Fi 7, Post-Quantum TLS 1.3, SRv6, eBPF in Cilium).
  - Research Paper Explorer (Foundational papers: Cerf & Kahn 1974, Dijkstra 1959 + IEEE/ACM papers with DOIs, methodology, research gaps).

- [ ] **Step 1: Compile verified technical data and research papers in `industryResearchData.js`**
- [ ] **Step 2: Implement tabbed explorer with search, category filters, and comparative matrix**
- [ ] **Step 3: Verify all DOIs, external links, and technical explanations**

---

### Task 10: Industry Stacks, Jobs, and Salary Explorer (India & Kerala Focus)

**Files:**
- Create: `js/data/careerData.js`
- Create: `js/modules/careerSalaryExplorer.js`

**Interfaces:**
- Consumes: Industry job market data, tools, certifications, and compensation surveys.
- Produces:
  - Industry Tool Stacks (Wireshark, Packet Tracer, Mininet, GNS3, Nmap, Docker, Cilium).
  - Career Explorer (Network Engineer, Cloud Network Architect, SRE, Network Automation Engineer).
  - Salary Explorer with India (Kochi Infopark, TVM Technopark, Bengaluru) and global compensation ranges.

- [ ] **Step 1: Create structured salary ranges and job profiles with required vs optional skills**
- [ ] **Step 2: Render interactive salary comparison cards, role roadmap, and tool stack guide**
- [ ] **Step 3: Verify accurate labels, ranges, and verified citation sources**

---

### Task 11: Market-Ready Portfolio Project: "NetPulse - SDN & Topology Traffic Analyzer"

**Files:**
- Create: `js/modules/portfolioProject.js`

**Interfaces:**
- Consumes: Interactive topology network graph and traffic simulation engine.
- Produces: Fully functional MVP where students can:
  - Design network topology (add routers, switches, hosts).
  - Simulate packet flow, link failures, and dynamic failover rerouting.
  - Inspect latency, throughput, packet loss, and queue depths in real time.
  - Export Cisco IOS / Packet Tracer compatible configuration scripts.
  - Complete project documentation, architecture diagram, interview talking points, and GitHub repo template.

- [ ] **Step 1: Implement topology designer and live packet simulator in `portfolioProject.js`**
- [ ] **Step 2: Add dynamic routing convergence and link break simulation**
- [ ] **Step 3: Add Cisco IOS config script generator (interface IP, OSPF/RIPv2 commands)**
- [ ] **Step 4: Include recruiter interview talking points and complete project blueprint**

---

### Task 12: Verification, Polishing, README & Final Deliverable

**Files:**
- Create: `README.md`
- Test: Local testing via browser subagent and automated checks.

**Interfaces:**
- Consumes: Complete project codebase.
- Produces: Production-ready application, documentation, and verification report.

- [ ] **Step 1: Verify all 15 dashboard sections across both themes (Dark & Light)**
- [ ] **Step 2: Ensure correct footer text: `Jane Rose | Assistant Professor, Department of Computer Science and Engineering`**
- [ ] **Step 3: Write comprehensive `README.md` with architecture, features, and setup guide**
- [ ] **Step 4: Test in browser to verify 3D scenes, games, solvers, and responsive design**
