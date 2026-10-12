# NetVerse 3D — CST303 Computer Networks Interactive Learning Platform

> **APJ Abdul Kalam Technological University (KTU) • B.Tech CSE (2019 Scheme)**  
> **Course Code:** CST303 COMPUTER NETWORKS & PCCSL507 NETWORKS LABORATORY  
> **Author & Educator:** Jane Rose | Assistant Professor, Department of Computer Science and Engineering  

---

## 🌟 Executive Overview

**NetVerse 3D** is a production-grade, responsive, 3D interactive learning platform and examination solver built to transform abstract computer networking theorems into immersive, tactile WebGL visualizations, real-time algorithmic simulators, educational games, and recruiter-ready portfolio projects.

Unlike static course websites or markdown notes, NetVerse 3D provides a **futuristic liquid-glass and iridescent glassmorphic interface** with full dark and light mode support, scientifically accurate 3D physics (Snell's Law, OSPF hierarchical flooding, CSMA/CD collision boundaries), and verified model answers mapped directly to official university evaluation keys.

---

## 🚀 Key Platform Features & Modules

### 1. Overview & Quick Access Dashboard
- Real-time statistics tracking 5 theory modules, exam coverage, 7 interactive games, and 3D scenes.
- Quick launchers for concept simulations, university question papers, and the SDN portfolio MVP.

### 2. Syllabus Explorer (Modules 1–5 & Lab Practicals)
- **Module 1:** Building a Network, Layering principles, OSI vs. TCP/IP, Topologies, Optical Fiber (Step-index/Graded-index), Physical encoding (NRZ, Manchester, Differential Manchester).
- **Module 2:** Framing (Byte stuffing, HDLC bit stuffing), Error Detection (CRC polynomial division, 2D Parity, Checksum), Sliding Window (Stop-and-Wait, GBN, Selective Repeat), CSMA/CD, CSMA/CA, IEEE 802.11 frame format.
- **Module 3:** Datagram vs. Virtual Circuit Subnets, Routing Algorithms (Dijkstra SPF, Distance Vector Bellman-Ford, Count-to-Infinity solutions), Multicast (RPF, IGMP), Congestion Control (Leaky/Token Bucket, Choke packets, Load shedding), QoS Scheduling (FIFO, Priority, WFQ).
- **Module 4:** Subnetting (CIDR, VLSM numericals), IPv4 vs. IPv6 base header, Address Resolution (ARP, RARP, DHCP DORA), Inter-AS Routing (OSPF hierarchical areas, BGP path vector).
- **Module 5:** Transport primitives, UDP segment, TCP 3-Way Handshake, TCP AIMD (Slow Start, Reno fast retransmit/recovery), Application Protocols (DNS iterative/recursive, SMTP/POP3/IMAP, FTP Port 20/21, SNMP MIB).
- **PCCSL507 Networks Lab:** Experiment 14 (OSPF Routing) and Experiment 13 (RIPv2 Routing) on Cisco 2811 routers.

### 3. Interactive Concept Laboratory
- **CRC Generator & Verifier:** Step-by-step Modulo-2 binary polynomial division showing quotients, intermediate remainders, and frame validation (solves CST303 Dec 2023 Q14b).
- **Sliding Window Protocol Simulator:** Live visual execution of Go-Back-N ($W_s = 4, W_r = 1$), Selective Repeat ($W_s = W_r = 4$), and Stop-and-Wait ($W=1$), with simulated frame drops and timeout rewind logs.
- **IPv4 Subnetting & CIDR Calculator:** Instant calculation of custom subnet masks, network IDs, directed broadcasts, and usable host counts ($2^h - 2$).
- **Dijkstra Shortest Path Router:** Computes optimal forwarding tables and path costs for a 6-node network graph.

### 4. 3D WebGL Visualization Gallery (Three.js)
- **Optical Fiber Total Internal Reflection:** Real-time 3D ray refraction and reflection with core/cladding refractive index controls ($n_1 > n_2$) and critical angle verification.
- **3D Network Topologies:** Orbitable 3D scenes of Star, Mesh, Ring, and Bus topologies with packet pulse animations.
- **OSI 7-Layer Encapsulation:** Vertical physical 3D stack demonstrating packet header encapsulation (Data ➔ Segment ➔ Packet ➔ Frame ➔ Bits).
- **OSPF Hierarchical Area 0:** Multi-area autonomous system visualizing Backbone Area 0, Area 1, ABRs, and ASBRs with Link-State Advertisements (LSAs).
- **Datagram vs. Virtual Circuit:** Visualizing independent packet forwarding vs. pre-established connection paths.

### 5. Motion Graphics Engine (HTML5 Canvas & 60fps Animation)
- **Token Bucket Traffic Shaping:** Visualizes constant token arrival rate $\rho$ regulating bursty incoming traffic into smooth transmission streams.
- **TCP AIMD Congestion Control:** Real-time dynamic graph of `cwnd` vs. RTT illustrating exponential Slow Start, linear Congestion Avoidance, and Fast Recovery.
- **ARP Resolution Flow:** Broadcast request (FF:FF:FF:FF:FF:FF) and unicast reply sequence.
- **DNS Recursive Resolution:** Hierarchical query resolution across Client, Local Resolver, Root DNS, TLD, and Authoritative servers.

### 6. Official Question-Paper Solver
- **December 2022 (`B1 CST303`):** Complete solutions for Part A (Q1–Q10) and Part B (Q11–Q20) mapped to official evaluation scheme `B2 CST303 CN QP SCHEME1-Dec 2022.pdf`.
- **December 2023 (`CST303-QP`):** Complete solutions for Part A and Part B mapped to `CST303-DRAFT SCHEME1.pdf`.
- **Features:** Concise revision toggle vs. detailed model answers, marking rubrics, ASCII diagrams, printable examination view (`Ctrl+P`), and student mastery checklist persisted in `localStorage`.

### 7. Educational Games (Games A through G)
- **Game A: Concept Matching:** Match protocols to their formal definitions and IEEE standards.
- **Game B: Frame Builder:** Arrange IEEE 802.3 Ethernet frame fields in exact byte sequence.
- **Game C: Routing Algorithm Challenge:** Predict next-hop and cost in Distance Vector Bellman-Ford tables.
- **Game D: Knowledge Graph Connector:** Link protocol dependencies across OSI layers.
- **Game E: Scenario Architect:** Select optimal physical media and topologies for industrial campus scenarios.
- **Game F: Rapid Quiz:** 10-question timed challenge with streak multipliers and detailed explanations.
- **Game G: Network Debugger:** Identify configuration bugs in Cisco IOS OSPF wildcard masks and CIDR subnets.

### 8. Interactive Knowledge Graph
- Force-directed physics canvas connecting 20+ protocols, layers, and algorithms.
- Node inspection panel displaying descriptions, prerequisites, and connected relationships.

### 9. Industry Research & Advancements
- **Production Systems:** Google B4 SDN WAN, Cloudflare BGP Anycast DDoS mitigation, Google YouTube QUIC (HTTP/3), and 5G End-to-End Network Slicing.
- **Advancements:** Wi-Fi 7 (802.11be), Post-Quantum Cryptography in TLS 1.3 (NIST FIPS 203 ML-KEM), SRv6 Segment Routing, and eBPF Cilium kernel networking.
- **Peer-Reviewed Papers:** Foundational papers by Cerf & Kahn (1974), Dijkstra (1959), and Bosshart et al. (P4, SIGCOMM 2014) with verified DOIs and research gaps.

### 10. Industry Tools & Kerala/India Salary Market
- **Tool Stacks:** Wireshark, Cisco Packet Tracer, Mininet, GNS3, Nmap, and Cilium eBPF.
- **Job Profiles:** Network Engineer, Cloud Network Architect, Cybersecurity Analyst, and SRE / Automation Engineer.
- **Salary Data:** Verified compensation ranges for India (Infopark Kochi, Technopark Trivandrum, Bengaluru) and global comparisons.

### 11. Portfolio Project MVP: NetPulse SDN & Topology Analyzer
- Working interactive topology canvas supporting node additions, live packet injections, and link breaking.
- Real-time performance telemetry: Sent, Delivered, Dropped, and round-trip latency.
- Auto-generated Cisco IOS configuration scripts compatible with Cisco Packet Tracer (PCCSL507 Lab 14).
- Complete recruiter talking points and GitHub repository blueprint.

---

## 🛠️ Technology Stack

- **Frontend Core:** HTML5, Modern Vanilla CSS3 (Custom Glassmorphism Design System)
- **3D Graphics:** Three.js (r128 WebGL Renderer with custom Orbit interaction)
- **2D Canvas Engines:** HTML5 2D Canvas with requestAnimationFrame loops
- **Typography:** Google Fonts (Exo 2 for futuristic headings, Roboto Mono for technical data)
- **State Persistence:** LocalStorage for dark/light theme and exam question checklists
- **Deployment:** Fully static, zero-build-required, zero-dependency bundle

---

## 💻 Setup & Local Development Instructions

NetVerse 3D is designed to run seamlessly in any modern web browser without requiring complex build chains.

### 1. Prerequisites
- A modern browser supporting WebGL (Google Chrome, Microsoft Edge, Firefox, or Safari).
- Python 3 or Node.js to serve files locally (recommended to enable ES module imports).

### 2. Running Locally

**Using Python:**
```bash
# Navigate to the workspace directory
cd c:\Users\Asus\Downloads\ds

# Start a local HTTP server
py -m http.server 3000
```

**Using Node.js:**
```bash
npx serve -l 3000 .
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📄 Mandatory Academic Attribution & Footer

**Jane Rose | Assistant Professor, Department of Computer Science and Engineering**  
*APJ Abdul Kalam Technological University (KTU) • CST303 Computer Networks*
