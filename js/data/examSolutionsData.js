// APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY (KTU)
// CST303 COMPUTER NETWORKS - WORKED SOLUTIONS TO THE DECEMBER 2022 AND DECEMBER 2023 PAPERS
// Every question of both papers (10 Part A questions plus 20 Part B sub-questions each) has a worked
// solution. Numerical and algorithmic results are re-computed by scripts/verify_solutions.js
// (npm run verify), and docs/review-checklist.md lists each new solution with a confidence level.
// Author: Jane Rose | Assistant Professor, Department of Computer Science and Engineering
//
// Text format (rendered by js/lib/richText.js): Markdown subset (tables, lists, fenced diagrams,
// **bold**, *italic*, `code`) with TeX in $...$ and $$...$$ (KaTeX).
// questionsInPaper = number of questions printed on the paper (10 + 2 x 10 sub-questions).

export const examSolutionsData = [
  {
    paperId: "cst303-dec2022",
    paperCode: "1100CST303122106",
    examTitle: "KTU B.Tech S5 Regular & Supplementary Examination, December 2022 (2019 Scheme)",
    subject: "CST 303 COMPUTER NETWORKS",
    totalMarks: 100,
    duration: "3 Hours",
    schemeSource: "KTU valuation scheme (file: B2 CST303 CN QP SCHEME1-Dec 2022.pdf)",
    questionsInPaper: 30,
    sections: [
      {
        sectionName: "PART A (Answer all questions - 3 Marks each)",
        questions: [
          {
            qNo: 1,
            module: 1,
            marks: 3,
            questionText: "Illustrate layering principle with necessary diagrams.",
            syllabusRef: "Module 1 - Layering & Protocols (Tanenbaum Ch 1.3)",
            schemeRubric: "Layering principle: 2 marks; diagram: 1 mark",
            conciseAnswer: "Layering decomposes complex network communication into hierarchical functional abstractions where each layer offers defined services to the layer above through an interface and communicates with its peer layer using a protocol.",
            detailedAnswer: `**1. Principle of Layering:**
Computer networks are organized into a stack of layers. The fundamental philosophy of layering is **modular abstraction** and **information hiding**:
- Each layer $N$ performs a specific, cohesive subset of functions required for communication.
- Layer $N$ provides services to the layer above ($N+1$) through a **Service Access Point (SAP)** / Service Interface.
- Layer $N$ relies on the services provided by the layer immediately below ($N-1$).
- Peer layers at the same hierarchical level communicate logically according to a set of rules termed a **Protocol**.

**2. Architecture Diagram:**
\`\`\`
+---------------------+                      +---------------------+
| Layer N+1 (Host A)  |                      | Layer N+1 (Host B)  |
+---------------------+                      +---------------------+
          | Service Interface (SAP)                    ^ Service Interface
          v                                            |
+---------------------+   Peer Protocol (N)  +---------------------+
|  Layer N (Host A)   |<====================>|  Layer N (Host B)   |
+---------------------+                      +---------------------+
          | Service Interface                          ^ Service Interface
          v                                            |
+---------------------+                      +---------------------+
| Layer N-1 (Host A)  |                      | Layer N-1 (Host B)  |
+---------------------+                      +---------------------+
\`\`\`

**3. Key Advantages:**
- **Modularity:** Modifying or upgrading one layer (e.g., swapping Wi-Fi for Ethernet) does not require changes to upper layers.
- **Simplicity:** Breaks massive software development into manageable units.`
          },
          {
            qNo: 2,
            module: 1,
            marks: 3,
            questionText: "What is the propagation delay if distance between two points is 12,000 km? Assume propagation speed to be 2.4 x 10^8 m/s in cable.",
            syllabusRef: "Module 1 - Transmission Delay vs Propagation Delay (Peterson & Davie Ch 1.2)",
            schemeRubric: "Propagation delay = distance / propagation speed: 1 mark; answer 12000 x 1000 / 2.4 x 10^8 = 50 ms: 2 marks",
            conciseAnswer: "Propagation Delay = Distance / Propagation Speed = (12,000 x 10^3 m) / (2.4 x 10^8 m/s) = 0.05 seconds = 50 milliseconds.",
            detailedAnswer: `**1. Given Data:**
- Distance ($d$) = $12,000\\text{ km} = 12,000 \\times 10^3\\text{ m} = 1.2 \\times 10^7\\text{ m}$
- Propagation Speed ($v$) = $2.4 \\times 10^8\\text{ m/s}$

**2. Formula:**
$$\\text{Propagation Delay } (T_{\\text{prop}}) = \\frac{\\text{Distance } (d)}{\\text{Propagation Speed } (v)}$$

**3. Step-by-Step Calculation:**
$$T_{\\text{prop}} = \\frac{1.2 \\times 10^7\\text{ m}}{2.4 \\times 10^8\\text{ m/s}} = \\frac{1.2}{24} = \\frac{1}{20}\\text{ s} = 0.05\\text{ seconds}$$

Converting to milliseconds:
$$T_{\\text{prop}} = 0.05 \\times 1000\\text{ ms} = 50\\text{ ms}$$

**Final Answer:**
The propagation delay is **50 ms** (or **0.05 seconds**).`
          },
          {
            qNo: 3,
            module: 2,
            marks: 3,
            questionText: "Show how the data field is managed in the Ethernet frame format.",
            syllabusRef: "Module 2 - IEEE 802.3 Ethernet Frame (Tanenbaum Ch 4.3)",
            schemeRubric: "Explanation of the data field size and padding bits: 3 marks",
            conciseAnswer: "Ethernet payload size is strictly between 46 bytes (minimum) and 1500 bytes (maximum MTU). If upper layer payload is less than 46 bytes, padding bytes (PAD) are appended to guarantee minimum collision detection time (512 bit times).",
            detailedAnswer: `**1. Payload Boundaries:**
In standard IEEE 802.3 / DIX Ethernet:
- **Maximum Data Payload:** 1500 Bytes (Maximum Transmission Unit - MTU).
- **Minimum Data Payload:** 46 Bytes.

\`\`\`
+-----------+---------+---------+------+-----------+---------+-----+
| Preamble  | SFD     | Dest MAC| Src  | Type/Len  | DATA    | FCS |
| (7 bytes) | (1 byte)| (6 byte)| (6)  | (2 bytes) | (46-1500)| (4) |
+-----------+---------+---------+------+-----------+---------+-----+
\`\`\`

**2. Management of Small Payloads (Padding):**
- To ensure reliable collision detection in CSMA/CD at 10 Mbps over a 2.5 km network diameter, the minimum frame size must be **64 bytes** (slot time = 512 bits = 51.2 $\\mu$s).
- Header (14 bytes) + FCS (4 bytes) = 18 bytes.
- Therefore, Data must be at least $64 - 18 = 46\\text{ bytes}$.
- If payload $P < 46\\text{ bytes}$, the MAC sublayer appends **padding (PAD) bytes** of zeros to reach 46 bytes.`
          },
          {
            qNo: 4,
            module: 2,
            marks: 3,
            questionText: "Differentiate between bridges and switches.",
            syllabusRef: "Module 2 - LAN Devices (Forouzan Ch 15, Peterson & Davie Ch 3.1)",
            schemeRubric: "Bridges: 1.5 marks; switches: 1.5 marks",
            conciseAnswer: "Bridges operate primarily in software with few ports (2-4), while Switches operate in hardware using ASIC chips with high port density (24-48+), supporting simultaneous full-duplex wire-speed forwarding.",
            detailedAnswer: `| Parameter | Bridge | Switch |
|---|---|---|
| **Hardware Architecture** | Software-based packet processing and forwarding table lookup. | Hardware-based using dedicated ASICs (Application-Specific Integrated Circuits). |
| **Port Density** | Low port density (typically 2 to 4 ports connecting LAN segments). | High port density (typically 24, 48, or 96 ports connecting individual stations). |
| **Transmission Mode** | Typically operates in half-duplex with shared collision domain per port. | Operates in dedicated full-duplex; each port is an isolated collision domain. |
| **Forwarding Throughput** | Lower throughput, introduces store-and-forward latency. | Wire-speed throughput; supports cut-through and fragment-free forwarding.`
          },
          {
            qNo: 5,
            module: 3,
            marks: 3,
            questionText: "Illustrate the optimality principle in routing.",
            syllabusRef: "Module 3 - Routing Principles (Tanenbaum Ch 5.2.1)",
            schemeRubric: "Optimality principle: 1.5 marks; diagram and explanation: 1.5 marks",
            conciseAnswer: "The Optimality Principle states that if router J is on the optimal path from router I to router K, then the optimal path from J to K also falls along the same route. Consequently, the set of optimal paths from all sources to a destination forms a tree rooted at the destination, known as a Sink Tree.",
            detailedAnswer: `**1. Statement of the Optimality Principle:**
*"If router $J$ is on the optimal path from router $I$ to router $K$, then the optimal path from $J$ to $K$ also falls along the same route."*

**Proof by Contradiction:**
Suppose there existed a shorter path from $J$ to $K$ (say $P_{JK}'$) than the subpath in $P_{IK}$. Then one could concatenate the path from $I$ to $J$ with $P_{JK}'$ to form an even shorter path from $I$ to $K$, which contradicts the assumption that $P_{IK}$ was already optimal.

**2. Consequence - Sink Tree:**
Since paths cannot contain loops, taking all optimal routes to a given destination node $K$ from all other network nodes yields a rooted tree called the **Sink Tree** (or Shortest Path Tree).`
          },
          {
            qNo: 6,
            module: 3,
            marks: 3,
            questionText: "Identify two methods by which multicast routing is handled by network layer.",
            syllabusRef: "Module 3 - Multicast Routing (Tanenbaum Ch 5.2.8)",
            schemeRubric: "Source-based routing: 1.5 marks; core-based routing: 1.5 marks",
            conciseAnswer: "Two methods are: (1) source-based routing, where a separate shortest-path tree rooted at each source is built with Reverse Path Forwarding / flood-and-prune (DVMRP); and (2) core-based (group-shared tree) routing, where one tree rooted at a core or rendezvous point serves the whole group (CBT, PIM Sparse Mode).",
            detailedAnswer: `**1. Source-based routing (Reverse Path Forwarding / flood and prune, as in DVMRP):**
- When a multicast packet arrives at a router on an incoming link, the router checks whether that link is the one it normally uses to send unicast packets back to the source.
- If YES: packet arrived along the shortest reverse path, so router duplicates and forwards it to all other interfaces.
- If NO: packet is discarded as a potential duplicate.
- Uninterested downstream subnets send **Prune messages** to stop unwanted traffic.

**2. Core-based routing (Core-Based Trees / shared trees, as in CBT and PIM Sparse Mode):**
- A single designated router is chosen as the "Core" (or Rendezvous Point - RP) for each multicast group.
- Receivers send unicast join requests toward the Core, building a shared multicast delivery tree.`
          },
          {
            qNo: 7,
            module: 4,
            marks: 3,
            questionText: "In IP, the checksum covers only the header and not the data. Identify the reason for selecting this design.",
            syllabusRef: "Module 4 - IPv4 Header Design (Tanenbaum Ch 5.5.3)",
            schemeRubric: "IP checksum and its explanation: 2 marks; reason: 1 mark",
            conciseAnswer: "1) At every router hop, header fields (like TTL and Hop Count) change, requiring recomputation of the checksum; computing it over data would cause huge processing delays. 2) Upper layers (TCP/UDP) already compute end-to-end data checksums, avoiding redundant work.",
            detailedAnswer: `**Key Architectural Reasons:**
1. **Router Processing Performance (Fast-Path Forwarding):**
   At every router hop, header fields such as **TTL (Time to Live)** are decremented by at least 1, and checksum must be recomputed. If the checksum covered the entire packet payload (up to 65,535 bytes), routers would suffer enormous CPU overhead and queuing delays.
2. **End-to-End Argument (Saltzer et al.):**
   Higher-layer protocols (TCP and UDP) already incorporate comprehensive end-to-end checksums over both their header and payload. Redundant data integrity checking at the network layer violates the end-to-end design principle.
3. **Payload Agnosticism:**
   IP is a connectionless network layer protocol responsible for routing; payload data verification is the responsibility of transport or application layers.`
          },
          {
            qNo: 8,
            module: 3,
            marks: 3,
            questionText: "Differentiate between Open loop and Closed loop approaches for congestion control. Give one example for each.",
            syllabusRef: "Module 3 - Congestion Control (Tanenbaum Ch 5.3)",
            schemeRubric: "Open loop: 1 mark; closed loop: 1 mark; one example each: 0.5 mark each",
            conciseAnswer: "Open-loop approaches prevent congestion before it occurs through good engineering design without dynamic runtime feedback (e.g., Leaky Bucket / Token Bucket). Closed-loop approaches detect congestion at runtime and feed back corrective signals (e.g., Choke Packets / TCP AIMD).",
            detailedAnswer: `| Feature | Open Loop Congestion Control | Closed Loop Congestion Control |
|---|---|---|
| **Core Concept** | **Proactive / Preventive:** Acts to prevent congestion before it occurs. | **Reactive:** Monitors network, detects congestion, and takes corrective action. |
| **Feedback Mechanism** | No dynamic runtime feedback loop from congested nodes. | Relies on dynamic feedback signals (explicit or implicit). |
| **Decision Point** | Implemented at source/sender during admission control or scheduling. | Executed dynamically between intermediate routers and sender. |
| **Standard Example** | **Leaky Bucket** / **Token Bucket** traffic shaping algorithms. | **Choke Packets**, **ECN (Explicit Congestion Notification)**, or **TCP AIMD**.`
          },
          {
            qNo: 9,
            module: 5,
            marks: 3,
            questionText: "Why is Transport layer called true End to End layer? Why is flow control and error control used in Transport layer in addition to data link layer?",
            syllabusRef: "Module 5 - Transport Service (Tanenbaum Ch 6.1)",
            schemeRubric: "End-to-end layer because it performs process-to-process delivery: 1 mark; reason (the data link layer gives only node-to-node flow and error control, so end-to-end control must come from the transport layer): 2 marks",
            conciseAnswer: "Transport layer entities execute only on end-user terminal hosts (processes), never on intermediate routers, making it true end-to-end. While DLL provides hop-by-hop control between adjacent nodes, intermediate routers can drop packets due to buffer exhaustion; thus transport layer guarantees end-to-end process reliability.",
            detailedAnswer: `**1. Why 'True End-to-End' Layer:**
Unlike the physical, data link, and network layers (which are implemented across intermediate subnet switches and routers), the Transport Layer protocols (TCP/UDP) run **strictly on the source and destination endpoint hosts**. Intermediate routers merely forward IP packets without inspecting transport headers.

**2. Why Flow & Error Control is Needed at Both Layers:**
- **Data Link Layer (Hop-by-Hop):** Regulates flow and recovers bit errors across a single physical wire between adjacent nodes (e.g., Host to Router, or Router to Router).
- **Transport Layer (End-to-End):**
  - Even if every individual link is error-free, packets can be dropped inside intermediate routers due to **buffer overflow** or **route flapping**.
  - Flow control at DLL prevents a node from overwhelming the immediate switch, whereas Transport flow control prevents the fast sending host process from overflowing the slow receiving application's socket buffer.`
          },
          {
            qNo: 10,
            module: 5,
            marks: 3,
            questionText: "Describe the ports used by the FTP with suitable diagram.",
            syllabusRef: "Module 5 - Application Protocols FTP (Forouzan Ch 27.2)",
            schemeRubric: "Port identification (port 20 data, port 21 control): 2 marks; diagram: 1 mark",
            conciseAnswer: "FTP uses two separate TCP connections: Port 21 for Control Connection (commands, authentication, status codes - persists throughout session) and Port 20 for Data Connection (file transfer, directory listings - opened and closed on demand).",
            detailedAnswer: `**1. Port Roles:**
FTP (File Transfer Protocol) uses an **out-of-band control architecture**:
- **Port 21 (Control Connection):** The client connects to server port 21. Used to send administrative commands (USER, PASS, RETR, STOR) and receive numeric status responses (e.g., 220, 331, 226). Stays open during the entire user session.
- **Port 20 (Data Connection):** Used strictly for bulk data transfer (files and directory listings). In Active FTP, the server initiates connection from port 20 to a client negotiated port. A new data connection is created per file transfer and closed upon completion.

**2. Architecture Diagram:**
\`\`\`
   +--------------------+                       +--------------------+
   |     FTP Client     |                       |     FTP Server     |
   |                    |   TCP Port 21 (Control)|                    |
   |  User Interface    |<=====================>|   Control Process  |
   |                    |  (Commands / Responses)|                    |
   |                    |                       |                    |
   |  Data Transfer     |   TCP Port 20 (Data)  |   Data Transfer    |
   |  Process           |<--------------------->|   Process          |
   |                    |     (File Transfer)   |                    |
   +--------------------+                       +--------------------+
\`\`\``
          }
        ]
      },
      {
        sectionName: "PART B (Module by Module Questions - 14 Marks each)",
        questions: [
          {
            qNo: "11a",
            module: 1,
            marks: 8,
            questionText: "Justify why TCP/IP reference model is called as a protocol stack model. Describe TCP/IP model with suitable diagrams.",
            syllabusRef: "Module 1 - TCP/IP Architecture (Tanenbaum Ch 1.4)",
            schemeRubric: "Justification: 2 marks; diagram: 2 marks; explanation of the 4 layers: 1 mark each",
            conciseAnswer: "TCP/IP is called a protocol stack model because protocols are arranged in a vertical hierarchy where data moves downward during transmission (encapsulation) and upward upon receipt (decapsulation), with each layer wrapping data with its specific header.",
            detailedAnswer: `**1. Justification:**
The TCP/IP model is known as a **Protocol Stack Model** because:
- Its protocols are stacked vertically in independent layers: Host-to-Network (Link), Internet, Transport, and Application.
- Data flows sequentially through the stack: transmitting data descends the stack, where each layer prepends a protocol header (**encapsulation**). Receiving data ascends the stack, where each layer strips its header (**decapsulation**).
- It follows the hourglass architecture: IP is the focal bottleneck layer over multiple link types below and diverse application services above.

**2. Architectural Diagram & Layers:**
\`\`\`
+-----------------------+------------------------------------------+
| Layer Name            | Key Protocols                            |
+-----------------------+------------------------------------------+
| 4. Application Layer  | HTTP, DNS, SMTP, FTP, SSH, Telnet, SNMP  |
+-----------------------+------------------------------------------+
| 3. Transport Layer    | TCP (Transmission Control), UDP          |
+-----------------------+------------------------------------------+
| 2. Internet Layer     | IP (IPv4/IPv6), ICMP, ARP, IGMP          |
+-----------------------+------------------------------------------+
| 1. Link / Host-to-Net | Ethernet, Wi-Fi (802.11), PPP, Fiber     |
+-----------------------+------------------------------------------+
\`\`\`

**3. Layer Functions:**
1. **Application Layer:** Handles user-facing network processes and high-level representation (HTTP, DNS, SMTP).
2. **Transport Layer:** Provides end-to-end communication, flow control, reliability, and port multiplexing (TCP, UDP).
3. **Internet Layer:** Responsible for packet routing, host addressing, and datagram forwarding across network boundaries (IP, ICMP).
4. **Host-to-Network (Link) Layer:** Defines how packets interface with physical network media (Ethernet, Wi-Fi frames).`
          },
          {
            qNo: "11b",
            module: 1,
            marks: 6,
            questionText: "Compare LAN, MAN, WAN.",
            syllabusRef: "Module 1 - Network Scale (Tanenbaum Ch 1.2)",
            schemeRubric: "LAN comparison: 2 marks, MAN comparison: 2 marks, WAN comparison: 2 marks",
            conciseAnswer: "LAN spans a single room/building (<1-2 km) with high data rates (1-10 Gbps) and low cost. MAN spans a city (5-50 km) like cable TV. WAN spans countries or continents (100-10,000 km) with lower data rates and higher propagation latency.",
            detailedAnswer: `| Parameter | LAN (Local Area Network) | MAN (Metropolitan Area Network) | WAN (Wide Area Network) |
|---|---|---|---|
| **Geographic Span** | Single room, building, or university campus (up to 1–2 km). | Entire city or town (typically 5 to 50 km). | Country, continent, or entire globe (>100 km). |
| **Data Transmission Rate** | Very high: 1 Gbps to 100 Gbps. | Moderate to High: 100 Mbps to 1 Gbps. | Variable/Lower: 10 Mbps to 10 Gbps across backbone. |
| **Propagation Delay** | Negligible (microseconds). | Moderate (milliseconds). | Significant (tens to hundreds of milliseconds). |
| **Ownership** | Privately owned by a single enterprise or individual. | Owned by consortium, municipal body, or telecom provider. | Owned by multiple public telecom carriers / ISPs. |
| **Typical Media** | UTP Cat6, local multimode fiber optic, Wi-Fi. | Single-mode fiber ring (CWDM/DWDM), metropolitan Ethernet. | Subsea fiber cables, satellite links, microwave towers. |
| **Standard Example** | College CSE department computer lab. | Cable TV network or smart city surveillance grid. | The Global Internet.`
          },
          {
            qNo: "12a",
            module: 1,
            marks: 8,
            questionText: "Compare the types of networks formed based on topology. Discuss the advantages and disadvantages of each type.",
            syllabusRef: "Module 1 - Network Classification & Topologies (Forouzan Ch 1.2, Tanenbaum Ch 1.2)",
            schemeRubric: "Any 4 topologies (star, mesh, bus, ring), figure + explanation: 1 mark each (4 marks); advantage and disadvantage of each: 1 mark each (4 marks)",
            conciseAnswer: "The four basic topologies are bus (one shared backbone: cheap but a single break stops the network), star (every node on a central hub or switch: easy to manage but the centre is a single point of failure), ring (each node joined to two neighbours with token access: orderly but one break stops a single ring) and mesh (a dedicated link between every pair: robust but needs $n(n-1)/2$ links).",
            detailedAnswer: `The **topology** of a network is the geometric arrangement of its devices and links. The four basic types are compared below.

**1. Bus topology**
\`\`\`
  [A]      [B]      [C]      [D]
   |        |        |        |
===+========+========+========+===   (shared backbone cable, terminator at each end)
\`\`\`
All stations tap into one shared backbone cable. Only one station can transmit at a time, so a medium access method (CSMA/CD) is needed.
- **Advantages:** very little cable; cheap and simple; easy to add a station.
- **Disadvantages:** a break or fault in the backbone stops the whole network; performance falls as load grows because the medium is shared; faults are hard to locate; cable length is limited.

**2. Star topology**
\`\`\`
        [A]
         |
[D] ---[ HUB / SWITCH ]--- [B]
         |
        [C]
\`\`\`
Every station has its own point-to-point link to a central hub or switch. The central device forwards traffic.
- **Advantages:** easy to install, extend and reconfigure; a failed cable affects only one station; easy fault detection.
- **Disadvantages:** if the central hub or switch fails the whole network fails; needs more cable than a bus; cost of the central device.

**3. Ring topology**
\`\`\`
     [A] ------- [B]
      |           |
      |           |
     [D] ------- [C]
  (data circulates in one direction, token passing)
\`\`\`
Each station is connected to exactly two neighbours, forming a closed loop. A token or a repeater at each station regenerates and passes the signal on.
- **Advantages:** orderly, collision-free access by token passing; every station gets equal access; performs well under heavy load.
- **Disadvantages:** a break in a single ring stops all traffic (a dual ring fixes this); adding or removing a station disturbs the ring; delay grows with the number of stations.

**4. Mesh topology**
\`\`\`
   [A] ---------- [B]
    |  \\        /  |
    |    \\    /    |
    |      \\/      |        full mesh of 4 nodes, 6 links:
    |      /\\      |        A-B, A-C, A-D, B-C, B-D, C-D
    |    /    \\    |
    |  /        \\  |
   [D] ---------- [C]
\`\`\`
In a full mesh every device has a dedicated point-to-point link to every other device. For $n$ devices:
$$\\text{links} = \\frac{n(n-1)}{2}, \\qquad \\text{ports per device} = n-1$$
For example $n = 5$ needs 10 links ($5 \\times 4 / 2$) and 4 ports on each device.
- **Advantages:** dedicated links carry no traffic problems; very robust (alternate paths exist); good privacy and security; faults are easy to isolate.
- **Disadvantages:** large amount of cabling and many ports, so it is expensive; installation and reconfiguration are difficult; practical only for a few nodes (for example a backbone).

**5. Summary**
| Topology | Cabling | Failure impact | Typical use |
|---|---|---|---|
| Bus | Least | Backbone fault stops all | Early Ethernet (10BASE2) |
| Star | One link per node | Only that node, unless the centre fails | Modern switched LANs |
| Ring | One link per node | One break stops a single ring | Token Ring, FDDI |
| Mesh | $n(n-1)/2$ links | Alternate paths exist | WAN or backbone cores |`
          },
          {
            qNo: "12b",
            module: 1,
            marks: 6,
            questionText: "Illustrate the construction of optical fiber and justify how this reduces the interference. Draw the structure of optical fiber.",
            syllabusRef: "Module 1 - Transmission Media & Fiber Optics (Forouzan Ch 7, Tanenbaum Ch 2.2 - 2.3)",
            schemeRubric: "Structure of fibre optic cable: 2 marks; explanation: 2 marks; justification: 2 marks",
            conciseAnswer: "An optical fibre has a glass or plastic core surrounded by cladding of lower refractive index, then a buffer coating, strength members and an outer jacket. Light is guided by total internal reflection at the core-cladding boundary. Because the signal is light and not an electric current, the fibre neither radiates nor picks up electromagnetic fields, so it is immune to EMI, RFI and crosstalk.",
            detailedAnswer: `**1. Construction (layers from the centre outwards):**
1. **Core:** very thin strand of glass or plastic that carries the light (about 8-10 $\\mu$m for single-mode, 50 or 62.5 $\\mu$m for multimode). Refractive index $n_1$.
2. **Cladding:** glass or plastic layer around the core (about 125 $\\mu$m in total) with a slightly **lower** refractive index $n_2 < n_1$.
3. **Buffer coating:** plastic (acrylate) layer that protects the glass from moisture and bending damage.
4. **Strength members:** Kevlar or aramid yarn that takes the pulling load.
5. **Outer jacket:** tough opaque plastic sheath (PVC or polyethylene).

**2. Structure of the optical fibre:**
\`\`\`
Cross-section (not to scale)

      +-----------------------------------+
      |            Outer jacket           |
      |   +---------------------------+   |
      |   |  Strength members (Kevlar)|   |
      |   |   +-------------------+   |   |
      |   |   |  Buffer coating   |   |   |
      |   |   |   +-----------+   |   |   |
      |   |   |   | Cladding  |   |   |   |
      |   |   |   |  ( Core ) |   |   |   |
      |   |   |   +-----------+   |   |   |
      |   |   +-------------------+   |   |
      |   +---------------------------+   |
      +-----------------------------------+

Longitudinal view: light guided by total internal reflection

   cladding (n2)  ---------------------------------------------
                       \\        /\\        /\\        /
   core (n1)   ---------\\------/--\\------/--\\------/-------->  light
                         \\    /    \\    /    \\    /
   cladding (n2)  ---------------------------------------------
\`\`\`

**3. Principle of operation:**
A ray that meets the core-cladding boundary at an angle of incidence greater than the **critical angle** is totally reflected and stays inside the core:
$$\\theta_c = \\sin^{-1}\\left(\\frac{n_2}{n_1}\\right)$$
Example: for $n_1 = 1.48$ and $n_2 = 1.46$, $\\theta_c = \\sin^{-1}(1.46/1.48) = 80.6^\\circ$. Rays hitting the boundary at more than $80.6^\\circ$ (measured from the normal) are guided along the fibre.

**4. Why interference is reduced:**
- The signal is **light (photons)**, not an electric current, so the fibre carries no current that could radiate and produces no magnetic field.
- Glass or plastic is a **dielectric**; it does not pick up electromagnetic interference (EMI) from motors, power lines, radio transmitters or lightning, so it is also free from **crosstalk** between neighbouring fibres.
- The cladding and the opaque coating and jacket keep light inside and stop outside light from entering, so adjacent fibres do not leak into each other.
- Result: very low error rate, high bandwidth, secure against tapping and safe in electrically noisy environments.`
          },
          {
            qNo: "13a",
            module: 2,
            marks: 6,
            questionText: "Summarize about the high-speed LANs specified in IEEE standard.",
            syllabusRef: "Module 2 - LAN Technologies & IEEE 802.11 (Tanenbaum Ch 4.3 - 4.4, Peterson & Davie Ch 2.6 - 2.7)",
            schemeRubric: "Fast Ethernet explanation with types: 3 marks; Gigabit Ethernet explanation with types: 3 marks",
            conciseAnswer: "The high-speed IEEE 802.3 LANs are Fast Ethernet (802.3u, 100 Mbps: 100BASE-TX, 100BASE-FX, 100BASE-T4) and Gigabit Ethernet (802.3z for fibre and short copper, 802.3ab for 1000BASE-T, 1 Gbps). Both keep the Ethernet frame format and CSMA/CD (for half-duplex operation) so they stay compatible with 10 Mbps Ethernet; 10 Gigabit Ethernet (802.3ae) is full-duplex only.",
            detailedAnswer: `Ethernet was originally 10 Mbps (IEEE 802.3). Higher-speed versions keep the **same frame format, minimum and maximum frame size and MAC method**, so equipment of different speeds can be mixed through switches.

**1. Fast Ethernet (IEEE 802.3u, 100 Mbps)**
- Bit time is 10 ns (ten times shorter than 10 Mbps Ethernet). The maximum collision-domain diameter shrinks accordingly, because the 64-byte minimum frame is now only 5.12 $\\mu$s long.
- Works in half duplex (CSMA/CD, using hubs) or full duplex (switches, no collisions). **Auto-negotiation** selects 10 or 100 Mbps and duplex mode.
- Physical layer variants:

| Type | Medium | Typical segment length | Encoding |
|---|---|---|---|
| 100BASE-TX | 2 pairs Cat 5 UTP | 100 m | 4B/5B with MLT-3 |
| 100BASE-FX | 2 multimode fibres | 2 km (full duplex) | 4B/5B with NRZI |
| 100BASE-T4 | 4 pairs Cat 3 UTP | 100 m | 8B/6T |

**2. Gigabit Ethernet (1 Gbps)**
- Standardised as **802.3z** (1998, fibre and short shielded copper) and **802.3ab** (1999, 1000BASE-T over Cat 5 UTP).
- Mostly used in **full duplex** with switches. In half duplex mode CSMA/CD is retained, using **carrier extension** (slot time extended to 512 bytes) and **frame bursting** so that short frames still allow collision detection.
- Physical layer variants:

| Type | Medium | Typical segment length | Encoding |
|---|---|---|---|
| 1000BASE-SX | Multimode fibre, 850 nm laser | 220 - 550 m | 8B/10B |
| 1000BASE-LX | Single-mode (or multimode) fibre, 1310 nm | 5 km single-mode, 550 m multimode | 8B/10B |
| 1000BASE-CX | Shielded twisted pair | 25 m | 8B/10B |
| 1000BASE-T | 4 pairs Cat 5 or better UTP | 100 m | 4D-PAM5 |

**3. Beyond Gigabit:** 10 Gigabit Ethernet (**802.3ae**, 2002) works only in full duplex over fibre, so no CSMA/CD is used, and later standards (40/100 Gigabit, 802.3ba) continue the trend.

**Summary:** the high-speed LAN standards raise the speed by factors of ten while preserving the Ethernet frame, which makes upgrading simple and cheap.`
          },
          {
            qNo: "13b",
            module: 2,
            marks: 8,
            questionText: "Compare Go back N protocol with Selective Repeat protocol using required diagrams.",
            syllabusRef: "Module 2 - Sliding Window Protocols (Tanenbaum Ch 3.4)",
            schemeRubric: "Go-Back-N explanation with diagram: 4 marks; Selective Repeat explanation with diagram: 4 marks",
            conciseAnswer: "Go-Back-N uses sender window size 2^m - 1 and receiver window size 1, discarding out-of-order packets and retransmitting all N packets from lost frame. Selective Repeat uses sender and receiver window sizes 2^(m-1), buffers out-of-order frames, and retransmits only the single lost frame.",
            detailedAnswer: `**1. Comparative Analysis:**
| Feature | Go-Back-N (GBN) | Selective Repeat (SR) |
|---|---|---|
| **Sender Window Size ($W_s$)** | $2^m - 1$ (for $m$-bit sequence numbers). | $2^{m-1}$. |
| **Receiver Window Size ($W_r$)** | Strictly **1** (only accepts next expected frame). | **$2^{m-1}$** (matches sender window). |
| **Out-of-order Frames** | Discarded immediately by receiver. | Buffered in receiver memory until missing frame arrives. |
| **Retransmission Scope** | Retransmits **all frames** in window starting from lost frame. | Retransmits **only the specific lost frame** (Selective ACK). |
| **Complexity & Memory** | Low receiver buffer requirements. | High memory buffer required at both sender and receiver. |

**2. Operation Timing Diagrams:**
\`\`\`
Go-Back-N (Frame 2 Lost):
Sender                   Receiver
  |--- Frame 0 ---------->| (Accepts, ACKs 0)
  |--- Frame 1 ---------->| (Accepts, ACKs 1)
  |--- Frame 2 (LOST) --->X
  |--- Frame 3 ---------->| (Discarded: out of order)
  |--- Frame 4 ---------->| (Discarded: out of order)
  [Timer 2 expires]
  |=== Retransmits 2, 3, 4 ===> (Goes back N frames)

Selective Repeat (Frame 2 Lost):
Sender                   Receiver
  |--- Frame 0 ---------->| (Accepts, ACKs 0)
  |--- Frame 1 ---------->| (Accepts, ACKs 1)
  |--- Frame 2 (LOST) --->X
  |--- Frame 3 ---------->| (Buffers 3, NAKs 2)
  |--- Frame 4 ---------->| (Buffers 4)
  [Timer 2 expires]
  |=== Retransmits ONLY 2 ===>| (Delivers 2, 3, 4 in order to layer 3)
\`\`\``
          },
          {
            qNo: "14a",
            module: 2,
            marks: 8,
            questionText: "Discuss about the frame formats of HDLC protocol.",
            syllabusRef: "Module 2 - Framing Mechanisms (Peterson & Davie Ch 2.3, Tanenbaum Ch 3.1; Forouzan Ch 11)",
            schemeRubric: "HDLC frame format diagram: 2 marks; explanation: 3 marks; I-frame: 1 mark; S-frame: 1 mark; U-frame: 1 mark",
            conciseAnswer: "An HDLC frame is Flag (01111110), Address (8 bits), Control (8 or 16 bits), Information (variable, optional), FCS (16 or 32 bits) and a closing Flag, with bit stuffing for transparency. The control field has three formats: I-frames (start with 0) carry data with send and receive sequence numbers, S-frames (start with 10) carry acknowledgements and flow control, and U-frames (start with 11) manage the link.",
            detailedAnswer: `**HDLC** (High-level Data Link Control) is a bit-oriented, synchronous data link protocol.

**1. General frame format:**
\`\`\`
+----------+----------+-----------+-------------------+-----------+----------+
|   Flag   | Address  |  Control  |   Information     |    FCS    |   Flag   |
| 01111110 |  8 bits  | 8/16 bits |  variable (data)  | 16/32 bit | 01111110 |
+----------+----------+-----------+-------------------+-----------+----------+
\`\`\`
- **Flag (8 bits):** the pattern 01111110 marks the start and end of every frame (one flag can serve as the end of one frame and the start of the next).
- **Address (8 bits):** identifies the secondary station that sends or receives the frame (on a point-to-point link it is just a constant).
- **Control (8 bits, or 16 in the extended format):** identifies the frame type and carries sequence numbers and the poll/final bit.
- **Information:** the user data (network layer packet). Present only in I-frames and some U-frames; its length is not fixed.
- **FCS (Frame Check Sequence, 16 or 32 bits):** CRC over address, control and information fields for error detection.

**2. Transparency by bit stuffing:** the sender inserts a 0 after every five consecutive 1s in the data, so 01111110 never appears inside a frame; the receiver deletes a 0 that follows five 1s. Example: data 0111110111111011111 is sent as 0111110011111010111110.

**3. Control field formats (bits in transmission order):**
\`\`\`
              1     2   3   4    5     6   7   8
I-frame:    | 0 |    N(S)      | P/F |    N(R)      |
S-frame:    | 1 | 0 |  Code    | P/F |    N(R)      |
U-frame:    | 1 | 1 |  Type    | P/F |  Type (3)    |
\`\`\`
**(a) Information frame (I-frame):** first bit is 0. Carries user data. N(S) is the 3-bit send sequence number of this frame and N(R) the 3-bit receive sequence number, that is the next frame expected, which **piggybacks** an acknowledgement of frames received. The P/F bit is Poll when sent by a primary station and Final when sent by a secondary station.

**(b) Supervisory frame (S-frame):** first two bits are 10. Used for flow and error control when there is no data to piggyback on; it has no information field. The 2-bit code gives the type:
- **RR** (Receive Ready, 00): acknowledges frames up to N(R) - 1.
- **RNR** (Receive Not Ready, 10): acknowledges and asks the sender to stop (flow control).
- **REJ** (Reject, 01): negative acknowledgement, go back to N(R) (Go-Back-N).
- **SREJ** (Selective Reject, 11): asks for retransmission of only frame N(R).

**(c) Unnumbered frame (U-frame):** first two bits are 11. Used for link management (set mode, connect, disconnect, report errors). The five type bits give commands and responses such as SNRM/SABM (set mode), DISC (disconnect), UA (unnumbered acknowledgement), FRMR (frame reject). Some U-frames (for example UI) carry an information field; most do not.`
          },
          {
            qNo: "14b",
            module: 2,
            marks: 6,
            questionText: "Write short notes on any two carrier sense multiple access protocols used in IEEE standards.",
            syllabusRef: "Module 2 - Multiple Access Protocols (MAC) (Tanenbaum Ch 4.2, Forouzan Ch 12)",
            schemeRubric: "CSMA/CD with explanation and diagram: 3 marks; CSMA/CA with explanation and diagram: 3 marks",
            conciseAnswer: "CSMA/CD (IEEE 802.3 Ethernet) listens before and while transmitting, stops and sends a jam signal on collision, then backs off for a random time using binary exponential back-off. CSMA/CA (IEEE 802.11 Wi-Fi) cannot detect collisions on radio, so it waits until the channel has been idle for DIFS, counts down a random back-off, and relies on acknowledgements (with optional RTS/CTS) to know a frame arrived.",
            detailedAnswer: `Two carrier sense protocols used in IEEE standards are **CSMA/CD** (IEEE 802.3, wired Ethernet) and **CSMA/CA** (IEEE 802.11, wireless LAN).

**1. CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**
- A station first **senses** the channel. If it is idle it transmits; if busy it waits (1-persistent).
- While transmitting it keeps **listening**. If it detects a collision it stops, sends a short **jam signal** so that all stations notice, and then waits a random time before retrying.
- **Binary exponential back-off:** after the $n$-th successive collision the station picks $K$ at random from $0, 1, \\ldots, 2^{n}-1$ (the exponent stops growing at 10, so $K \\le 1023$) and waits $K \\times 51.2\\ \\mu\\text{s}$ (one slot = 512 bit times at 10 Mbps). After 16 failed attempts it gives up and reports an error.
- To be sure a collision is noticed before the frame ends, the frame must last at least twice the end-to-end propagation delay; this is why the minimum Ethernet frame is 64 bytes.
\`\`\`
 Frame ready
     |
 Channel idle? --no--> wait
     | yes
 Transmit and listen
     |
 Collision? --no--> done (success)
     | yes
 Send jam, stop
     |
 Attempts = 16? --yes--> abort
     | no
 Wait K x 51.2 us (K random in 0..2^n - 1) --> sense again
\`\`\`

**2. CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)**
- Radio stations cannot listen while sending, and the **hidden terminal problem** means a station may not hear every other sender, so collisions cannot be detected reliably. CSMA/CA therefore **avoids** collisions and uses acknowledgements.
- Procedure (the IEEE 802.11 DCF):
  1. Sense the channel. If it stays idle for a **DIFS** interval, the frame may be sent.
  2. If the channel is busy, wait until it is idle and then choose a random **back-off** counter (in slots) from the contention window. The counter counts down only while the channel is idle and is frozen when it is busy. At zero the station transmits.
  3. The receiver returns an **ACK** after a short **SIFS** gap. If no ACK arrives the sender doubles the contention window and retries.
  4. **Optional RTS/CTS:** the sender sends a short RTS, the receiver answers CTS, and all stations that hear either set their **NAV** (virtual carrier sense) so they stay silent for the whole exchange. This protects against hidden terminals.
\`\`\`
 Sender              Receiver             Others
   |---- RTS ----------->|                  (hear RTS: set NAV)
   |<--- CTS ------------|                  (hear CTS: set NAV)
   |---- DATA ---------->|
   |<--- ACK ------------|                  NAV ends, back-off resumes
\`\`\`

| Feature | CSMA/CD | CSMA/CA |
|---|---|---|
| Standard | IEEE 802.3 | IEEE 802.11 |
| Medium | Wired | Wireless |
| Collisions | Detected, then recovered | Avoided; loss known by missing ACK |
| Acknowledgement | None at MAC level | Required (ACK) |`
          },
          {
            qNo: "15a",
            module: 3,
            marks: 8,
            questionText: "Compare the features of link state routing with distance vector routing.",
            syllabusRef: "Module 3 - Routing Algorithms (Tanenbaum Ch 5.2, Peterson & Davie Ch 3.3)",
            schemeRubric: "Link state routing, any 4 points with explanation: 4 marks; distance vector routing, any 4 points with explanation: 4 marks",
            conciseAnswer: "In link state routing every router learns the whole topology by flooding link state packets and runs Dijkstra itself, so it converges quickly and does not suffer count-to-infinity, but needs more memory and processing (OSPF, IS-IS). In distance vector routing a router knows only its neighbours' distance vectors and runs Bellman-Ford, which is simple and light but converges slowly and can count to infinity (RIP).",
            detailedAnswer: `| Feature | Link State Routing | Distance Vector Routing |
|---|---|---|
| **Knowledge of network** | Each router has a complete map (link state database) of the whole area. | Each router knows only distances to destinations as reported by its neighbours ("routing by rumour"). |
| **Information exchanged** | A router sends information about **its own links** (neighbours and costs). | A router sends its **entire routing table** (vector of distances). |
| **Sent to whom** | Flooded to **all** routers in the area. | Sent only to **directly connected neighbours**. |
| **When sent** | When a link changes, plus occasional refresh. | Periodically (for example every 30 s in RIP) and on change. |
| **Algorithm** | Dijkstra's shortest path first, run locally on the map. | Distributed Bellman-Ford: $D_x(y)=\\min_v\\{c(x,v)+D_v(y)\\}$. |
| **Convergence** | Fast, because every router has the same information. | Slow ("good news travels fast, bad news travels slowly"). |
| **Routing loops** | Transient loops only; no count-to-infinity. | Count-to-infinity problem; needs split horizon, poison reverse or hold-down. |
| **Resources** | More memory (database) and more CPU. | Little memory and CPU; simple to configure. |
| **Scalability** | Scales to large networks with areas (hierarchy). | Poor for large networks (RIP limit of 15 hops). |
| **Examples** | OSPF, IS-IS. | RIP, early ARPANET routing, IGRP. |

**Conclusion:** link state routing is preferred in large, fast-changing networks, and distance vector in small, simple networks.`
          },
          {
            qNo: "15b",
            module: 3,
            marks: 6,
            questionText: "Differentiate between the implementation of datagram subnet and virtual circuit subnet.",
            syllabusRef: "Module 3 - Subnet Service Models (Tanenbaum Ch 5.1, Kurose & Ross Ch 4.1)",
            schemeRubric: "Datagram subnet: 3 marks; virtual circuit subnet: 3 marks",
            conciseAnswer: "In a datagram subnet (connectionless, for example IP) every packet carries the full destination address and is routed independently, so no set-up is needed and routers keep no per-connection state. In a virtual circuit subnet (connection-oriented, for example ATM, MPLS) a route is fixed at connection set-up, each packet carries only a short VC number, and routers hold state for every circuit.",
            detailedAnswer: `**1. Datagram subnet (connectionless)**
- Each packet is treated as an independent unit. Routers look at the **destination address** of each packet and forward it using the routing table; successive packets of one message may take different paths and arrive out of order.
- No set-up phase, no state about conversations. Used by the Internet (IP).

**2. Virtual circuit subnet (connection-oriented)**
- A path (**virtual circuit**) is chosen during a **connection set-up** phase and every packet of that connection follows it. Each router stores an entry (incoming VC number to outgoing line and VC number); packets carry only a short VC identifier. The circuit is released at the end. Used by X.25, Frame Relay, ATM, MPLS.
\`\`\`
 Datagram:                         Virtual circuit:
 packets 1,2,3 of A -> B           set-up request fixes path once
   1 --> R1 --> R2 --> B             A --> R1 --> R3 --> B   (VC 7)
   2 --> R1 --> R3 --> B             1, 2, 3 all follow R1-R3
   3 --> R1 --> R2 --> B             (arrive in order)
\`\`\`

**3. Comparison**
| Issue | Datagram subnet | Virtual circuit subnet |
|---|---|---|
| Circuit set-up | Not needed | Required |
| Addressing | Every packet carries full source and destination address | Every packet carries a short VC number |
| State information | Routers hold no state about connections | Each VC needs a table entry in every router on the path |
| Routing | Each packet routed independently | Route chosen when the VC is set up; all packets follow it |
| Effect of router failure | Only packets queued in the router are lost; later packets use other routes | All virtual circuits through the failed router are terminated |
| Quality of service | Difficult | Easy if resources are reserved at set-up |
| Congestion control | Difficult | Easy if enough resources can be allocated in advance |
| Ordering | May arrive out of order | Delivered in order |`
          },
          {
            qNo: "16a",
            module: 3,
            marks: 6,
            questionText: "What is count to infinity problem? Describe two techniques to solve the count to infinity problem in distance vector routing algorithm.",
            syllabusRef: "Module 3 - Distance Vector Routing (Tanenbaum Ch 5.2.4)",
            schemeRubric: "Count-to-infinity problem: 3 marks. The scheme says the solutions are not in the syllabus, so the other 3 marks may be awarded if the question is attempted",
            conciseAnswer: "Count-to-infinity is a convergence failure in Distance Vector routing caused by routing loops where two routers advertise mutually dependent paths to a disconnected destination, slowly incrementing hop count to infinity (typically 16 in RIP). Solutions: Split Horizon and Poison Reverse.",
            detailedAnswer: `**1. The Count-to-Infinity Problem:**
Distance Vector routing algorithms (e.g., Bellman-Ford / RIP) react slowly to bad news (link failures).
- Consider a linear topology: $A - B - C$.
- If link between $B$ and $C$ goes down, $B$ knows cost to $C$ is $\\infty$.
- However, $A$ still advertises that it can reach $C$ with metric 2 (via $B$).
- $B$ mistakenly thinks: *"Ah, $A$ has a path to $C$ with cost 2! I can reach $C$ via $A$ with cost $2+1 = 3$."*
- $B$ updates its table to cost 3 and informs $A$. $A$ then updates its cost to $3+1 = 4$.
- They continue incrementing the metric back and forth until reaching infinity (defined as **16 hops** in RIP), consuming bandwidth and CPU.

**2. Two Solutions:**
1. **Split Horizon:**
   - A router never advertises a route back out the same physical interface from which it learned that route.
   - Example: Since $A$ learned its route to $C$ via $B$, $A$ will never advertise a route to $C$ back to $B$.
2. **Poison Reverse (Split Horizon with Poisoned Reverse):**
   - Instead of suppressing the advertisement, the router advertises the route back out that interface with metric set to **$\\infty$ (poisoned)**.
   - This explicitly breaks loops immediately: $A$ tells $B$ that its distance to $C$ is $\\infty$, preventing $B$ from ever routing through $A$.`
          },
          {
            qNo: "16b",
            module: 3,
            marks: 8,
            questionText: "Identify and describe the scheduling techniques to improve the Quality of Services (QoS).",
            syllabusRef: "Module 3 - Traffic Shaping & QoS Techniques (Tanenbaum Ch 5.4, Kurose & Ross Ch 7)",
            schemeRubric: "Identifying the techniques (FIFO queuing, priority queuing, weighted fair queuing): 2 marks; describing each technique: 2 marks each",
            conciseAnswer: "Packet scheduling decides the order in which queued packets are sent. FIFO sends in arrival order and gives no differentiation. Priority queuing always serves the highest non-empty class first, which favours urgent traffic but can starve low priorities. Weighted fair queuing serves classes round-robin in proportion to their weights, so each class gets a guaranteed share of the bandwidth.",
            detailedAnswer: `A router has an output queue. **Scheduling** is the policy that chooses which waiting packet is sent next. Good scheduling gives low delay and a fair or guaranteed share of bandwidth to the traffic that needs it.

**1. FIFO queuing (first-in first-out)**
- Packets wait in a single queue and leave in the order they arrived. If the queue is full, arriving packets are dropped (tail drop).
- Simple and cheap, but it makes no distinction between flows: a heavy sender or bulk transfer can delay real-time packets, so there is no QoS guarantee.
\`\`\`
 arrivals --> [ p5 p4 p3 p2 p1 ] --> link      (p1 leaves first)
\`\`\`

**2. Priority queuing**
- Packets are classified into priority classes, each with its own queue. The scheduler always serves the **highest-priority non-empty queue**, and a lower class is served only when all higher queues are empty.
- Good for delay-sensitive traffic (voice, control). Disadvantage: **starvation**; a continuous high-priority flow can block lower classes completely.
\`\`\`
 High   --> [ h2 h1 ] ---+
 Medium --> [ m1    ] ---+--> scheduler (high first) --> link
 Low    --> [ l3 l2 l1] --+
\`\`\`

**3. Weighted fair queuing (WFQ)**
- Each class or flow has its own queue and a **weight**. The scheduler serves the queues in rotation (round-robin, bit-by-bit in the ideal form) and each queue receives a share of the link proportional to its weight. Unused share is given to the other queues.
- It prevents starvation and gives each class a guaranteed minimum rate. Example: three classes with weights 3, 2 and 1 on a 6 Mbps link are guaranteed $6 \\times 3/6 = 3$, $6 \\times 2/6 = 2$ and $6 \\times 1/6 = 1$ Mbps. The cost is higher complexity, because the router keeps per-class queues and computes finishing times.

**Comparison**
| Technique | Differentiates traffic | Starvation | Complexity |
|---|---|---|---|
| FIFO | No | No (but unfair) | Lowest |
| Priority queuing | Yes, strictly | Possible | Low |
| Weighted fair queuing | Yes, by weight | No | Highest |

Plain round-robin (fair queuing) is the special case of WFQ with equal weights.`
          },
          {
            qNo: "17a",
            module: 4,
            marks: 8,
            questionText: "Illustrate the sub-netting concept. A company is granted the site address 181.56.0.0 (class B). The company needs 1000 subnets. Find the number of subnets possible and hosts which can be connected in each subnet.",
            syllabusRef: "Module 4 - IP Subnetting (Forouzan Ch 19, Peterson & Davie Ch 3.2)",
            schemeRubric: "Subnetting concept illustration: 4 marks; subnet mask 255.255.255.192: 2 marks; number of subnets 1024: 1 mark; addresses per subnet 64: 1 mark",
            conciseAnswer: "Address 181.56.0.0 is Class B (default mask /16). To obtain 1000 subnets, we need 2^10 = 1024 subnets (10 subnet bits borrowed from host part). Custom mask is /26 (255.255.255.192). Remaining host bits = 16 - 10 = 6 bits. Usable hosts per subnet = 2^6 - 2 = 62 hosts.",
            detailedAnswer: `**1. Concept of Subnetting:**
Subnetting divides a large physical network into multiple smaller, independent logical subnetworks. It borrows bits from the host identifier field and reallocates them as a **Subnet Identifier**. This reduces broadcast domain size, improves security, and prevents IP address exhaustion.

**2. Problem Formulation:**
- Given Address: **181.56.0.0**
- First Octet $181 \\in [128, 191] \\implies$ **Class B Network**.
- Default Network ID bits ($N$) = **16 bits** (Mask: \`255.255.0.0\` or \`/16\`).
- Default Host ID bits ($H$) = **16 bits** ($32 - 16 = 16$).

**3. Subnet Bit Allocation:**
- Required subnets: **1000 subnets**.
- Let $s$ be the number of bits borrowed from the host field:
  $$2^s \\ge 1000$$
  - $2^9 = 512$ (Insufficient)
  - $2^{10} = 1024 \\ge 1000$ (Satisfies requirement)
- Therefore, borrow **$s = 10$ bits**.

**4. Calculations:**
1. **Total Subnets Possible:**
   $$\\text{Number of Subnets} = 2^{10} = \\mathbf{1024\\text{ subnets}}$$
2. **Subnet Mask:**
   - Network bits: $16 + 10 = 26\\text{ bits}$ (\`/26\`).
   - Binary: \`11111111.11111111.11111111.11000000\`
   - Dotted Decimal: **255.255.255.192**
3. **Host Bits Remaining ($h$):**
   $$h = 16 - 10 = 6\\text{ bits}$$
4. **Total Addresses per Subnet:**
   $$2^6 = 64\\text{ addresses}$$
5. **Usable Hosts per Subnet:**
   $$\\text{Usable Hosts} = 2^6 - 2 = 64 - 2 = \\mathbf{62\\text{ hosts per subnet}}$$
   *(Subtracting 2: one for Subnet Network Address and one for Subnet Directed Broadcast Address).*`
          },
          {
            qNo: "17b",
            module: 4,
            marks: 6,
            questionText: "Identify the characteristics of BGP.",
            syllabusRef: "Module 4 - Internet Routing Architectures (Tanenbaum Ch 5.6.5 - 5.6.7, Kurose & Ross Ch 4.6)",
            schemeRubric: "Any 6 characteristics: 1 mark each",
            conciseAnswer: "BGP (Border Gateway Protocol, version 4) is the exterior gateway protocol that exchanges reachability between autonomous systems. It is a path vector protocol that runs over TCP port 179, is policy-based and not purely shortest-path, supports CIDR, sends incremental updates, uses OPEN, UPDATE, KEEPALIVE and NOTIFICATION messages, and avoids loops by examining the AS path.",
            detailedAnswer: `**BGP-4** (Border Gateway Protocol) is the inter-domain routing protocol that glues the autonomous systems (ASes) of the Internet together.

1. **Inter-AS (exterior) protocol:** it exchanges routing information **between** autonomous systems, while OSPF or RIP work inside one AS. It runs as **eBGP** between ASes and **iBGP** between BGP routers inside an AS.
2. **Path vector protocol:** a route advertisement carries the complete list of ASes to be crossed (the **AS_PATH**), not just a distance.
3. **Loop prevention:** a router rejects any route whose AS_PATH already contains its own AS number, so loops and count-to-infinity are avoided.
4. **Policy-based routing:** a route is chosen by administrative policy (business agreements, preference, security) as well as path length. Route attributes include AS_PATH, NEXT_HOP, LOCAL_PREF, MED and ORIGIN.
5. **Reliable transport:** BGP sessions use **TCP port 179**, so BGP needs no retransmission logic of its own.
6. **Incremental updates:** after the first full exchange of the routing table, only changes are sent (announcements and withdrawals), not periodic full tables.
7. **Four message types:** OPEN (set up the session), UPDATE (announce or withdraw routes), KEEPALIVE (confirm the peer is alive) and NOTIFICATION (report an error and close the session).
8. **Supports CIDR:** routes are advertised as prefixes with lengths (route aggregation), so the global routing table stays smaller.
9. **Scalable:** it carries the routing table of the whole Internet and is designed for stability rather than fast convergence.`
          },
          {
            qNo: "18a",
            module: 4,
            marks: 7,
            questionText: "Describe how does OSPF perform routing in larger networks? Also explain the different types of OSPF messages.",
            syllabusRef: "Module 4 - Internet Routing Architectures (Tanenbaum Ch 5.6.5 - 5.6.7, Forouzan Ch 21)",
            schemeRubric: "OSPF working with areas and router types: 3 marks; five message types with explanation: 4 marks",
            conciseAnswer: "OSPF is a link state protocol that scales by splitting an autonomous system into areas joined through the backbone area 0. Routers keep a link state database only for their own area; area border routers summarise routes between areas. Each router runs Dijkstra on its database. The five OSPF message types are Hello, Database Description, Link State Request, Link State Update and Link State Acknowledgement.",
            detailedAnswer: `**1. OSPF (Open Shortest Path First)** is an interior gateway protocol based on link state routing. Each router floods link state advertisements (LSAs), builds a **link state database** of the area, and runs **Dijkstra's algorithm** to compute shortest paths, using a cost (for example based on link bandwidth).

**2. Routing in larger networks: hierarchy of areas**
A single flat database would be too large and floods too frequent, so OSPF divides the AS into **areas**:
- Every area has its own link state database and floods LSAs only inside that area, which limits flooding and shortens the Dijkstra computation.
- One special **backbone area (area 0)** connects all other areas; all inter-area traffic passes through it.
- Router roles:
  - **Internal router:** all its interfaces are in one area.
  - **Area border router (ABR):** connects an area to the backbone, keeps one database per area and sends **summary** routes (not full topology) from one area to another.
  - **Backbone router:** has an interface in area 0.
  - **AS boundary router (ASBR):** exchanges routes with other autonomous systems (for example through BGP).
- On a broadcast LAN a **designated router (DR)** and **backup DR** are elected so that routers form adjacencies with the DR instead of with every other router.
\`\`\`
              +------------ Backbone Area 0 ------------+
              |   R1 ------ ABR1 ------ ABR2 ------ R2  |
              +----------------|-----------|------------+
                          Area 1|           |Area 2
                       R3 - R4 ... R5       R6 - R7
\`\`\`

**3. Types of OSPF messages** (carried directly in IP datagrams, protocol number 89):
1. **Hello (type 1):** discovers neighbours, checks they are alive, elects the DR and BDR. Sent periodically to the multicast address 224.0.0.5.
2. **Database Description (type 2):** a router that is forming an adjacency sends a summary (headers) of the LSAs in its database so the neighbour can find what it lacks.
3. **Link State Request (type 3):** asks a neighbour for the full details of specific LSAs that are missing or out of date.
4. **Link State Update (type 4):** carries the requested LSAs, and also floods new LSAs after any change in the topology.
5. **Link State Acknowledgement (type 5):** confirms receipt of LSAs, which makes the flooding reliable.

**4. Working in sequence:** Hello (find neighbours) then Database Description (compare databases) then Link State Request and Update (synchronise) then Acknowledgement; afterwards, a topology change triggers a Link State Update flooded through the area and every router re-runs Dijkstra.`
          },
          {
            qNo: "18b",
            module: 4,
            marks: 7,
            questionText: "Explain the purposes of using ARP and RARP in the network layer. Also describe the working of each.",
            syllabusRef: "Module 4 - Address Translation Protocols (Tanenbaum Ch 5.6, Forouzan Ch 21)",
            schemeRubric: "Purpose (address translation): 2 marks; working of ARP: 2.5 marks; working of RARP: 2.5 marks",
            conciseAnswer: "A frame can only be delivered on a LAN using the destination MAC address, but the network layer works with IP addresses. ARP translates a known IP address into a MAC address by broadcasting a request that the owner answers by unicast. RARP does the opposite: a host that knows only its MAC address (for example a diskless workstation) broadcasts a request and a RARP server replies with its IP address.",
            detailedAnswer: `**1. Purpose.** The network layer addresses hosts by **IP address** (logical, 32-bit), but the data link layer delivers frames using the **MAC address** (physical, 48-bit). A host therefore needs a mapping between the two:
- **ARP (Address Resolution Protocol):** IP address to MAC address.
- **RARP (Reverse Address Resolution Protocol):** MAC address to IP address.

**2. Working of ARP**
1. A host that wants to send a packet to an IP address on its own network first looks in its **ARP cache**. If an entry exists, it is used.
2. Otherwise it **broadcasts** an **ARP request** (destination MAC FF:FF:FF:FF:FF:FF) containing its own IP and MAC address and the target IP address: "Who has 192.168.1.20?"
3. Every host on the LAN receives the request, but only the host that owns that IP address replies. It sends an **ARP reply** by **unicast** to the requester, giving its MAC address.
4. The requester stores the pair in its ARP cache (entries expire after a short time) and sends the frame.
5. For a destination on another network, the host ARPs for the **default router's** IP address and sends the frame to the router's MAC address.
\`\`\`
 Host A (IP-A, MAC-A)                          Host B (IP-B, MAC-B)
   |--- ARP request (broadcast): who has IP-B? tell IP-A/MAC-A --->|   all hosts hear it
   |<-- ARP reply (unicast): IP-B is at MAC-B -------------------- |   only B answers
   |--- data frame to MAC-B ------------------------------------->|
\`\`\`
An ARP message for IPv4 over Ethernet is 28 bytes (hardware type 2, protocol type 2, hardware length 1, protocol length 1, operation 2, sender MAC 6, sender IP 4, target MAC 6, target IP 4) and is carried directly in an Ethernet frame with EtherType 0x0806.

**3. Working of RARP**
1. A machine that has no stored IP address (for example a **diskless workstation**) knows only its own MAC address from the network card.
2. It **broadcasts a RARP request** on the LAN containing its MAC address, asking "What is my IP address?".
3. A **RARP server** on the same LAN, which holds a table of MAC to IP mappings, replies by unicast with the IP address.
4. The host configures itself with that IP address.
RARP requests are broadcast and are not forwarded by routers, so a RARP server is needed on every network; RARP gives only the IP address (no mask or gateway) and so has been replaced by **BOOTP** and **DHCP**.`
          },
          {
            qNo: "19a",
            module: 5,
            marks: 8,
            questionText: "Describe the TCP congestion control approaches with necessary diagrams.",
            syllabusRef: "Module 5 - TCP Congestion Control AIMD (Tanenbaum Ch 6.5.9)",
            schemeRubric: "TCP congestion control approaches (additive increase and multiplicative decrease, slow start): explanation 3 marks each; diagram 1 mark each",
            conciseAnswer: "TCP uses dynamic congestion window (cwnd) management: 1) Slow Start (exponential cwnd increase until ssthresh), 2) Congestion Avoidance (additive linear increase by 1 MSS per RTT), 3) Fast Retransmit (retransmit upon 3 duplicate ACKs), and 4) Fast Recovery (halve ssthresh and cwnd instead of dropping to 1).",
            detailedAnswer: `**1. Four Core Mechanisms:**
TCP maintains two variables: **Congestion Window (cwnd)** and **Slow-Start Threshold (ssthresh)**.

1. **Slow Start:**
   - Starts with $cwnd = 1\\text{ MSS}$.
   - For every incoming ACK, $cwnd$ increases by 1 MSS $\\implies$ **exponential growth** (doubles every RTT): $1 \\to 2 \\to 4 \\to 8 \\dots$
   - Continues until $cwnd \\ge ssthresh$.

2. **Congestion Avoidance (Additive Increase):**
   - Once $cwnd \\ge ssthresh$, TCP switches to conservative linear growth.
   - $cwnd = cwnd + 1\\text{ MSS}$ per RTT (Additive Increase).

3. **Fast Retransmit:**
   - When a receiver receives an out-of-order segment, it generates a duplicate ACK.
   - If the sender receives **3 duplicate ACKs** for the same segment, it immediately retransmits the missing segment without waiting for the retransmission timer to expire.

4. **Fast Recovery (TCP Reno):**
   - On 3 duplicate ACKs, instead of dropping $cwnd = 1$ (like old TCP Tahoe):
     $$ssthresh = \\frac{cwnd}{2}, \\quad cwnd = ssthresh + 3\\text{ MSS}$$
   - Performs AIMD (Additive Increase Multiplicative Decrease).

**2. Congestion Window vs Time Graph:**
\`\`\`
cwnd (MSS)
 ^
 |             /\\ (Timeout: cwnd drops to 1 in Tahoe)
 |            /  \\
 |           /    \\  /\\ (3 Dup ACKs: Reno halves cwnd)
 |          /      \\/  \\
 |         / (Linear Growth: Congestion Avoidance)
 |        /
 |   _---' (ssthresh)
 |  / (Exponential Growth: Slow Start)
 | /
 +----------------------------------------> Time (RTTs)
\`\`\``
          },
          {
            qNo: "19b",
            module: 5,
            marks: 6,
            questionText: "Demonstrate the UDP segment structure.",
            syllabusRef: "Module 5 - Transport Layer Primitives & UDP (Tanenbaum Ch 6.1 - 6.4, Kurose & Ross Ch 3.3)",
            schemeRubric: "UDP segment structure (diagram): 3 marks; explanation of the fields: 3 marks",
            conciseAnswer: "A UDP segment has an 8-byte header made of four 16-bit fields (source port, destination port, length, checksum) followed by the application data. UDP is connectionless and unreliable; the checksum covers a pseudo-header, the UDP header and the data.",
            detailedAnswer: `**1. UDP segment (user datagram) structure:**
\`\`\`
 0                              15 16                             31
+--------------------------------+---------------------------------+
|        Source Port (16)        |     Destination Port (16)       |
+--------------------------------+---------------------------------+
|           Length (16)          |         Checksum (16)           |
+--------------------------------+---------------------------------+
|                         Data (application message)               |
|                              ...                                 |
+------------------------------------------------------------------+
\`\`\`
The header is only **8 bytes** (4 fields of 2 bytes each).

**2. Fields:**
- **Source port (16 bits):** port number of the sending process; optional (zero if no reply is expected).
- **Destination port (16 bits):** identifies the receiving process or service (for example 53 for DNS, 67 and 68 for DHCP and BOOTP, 161 for SNMP).
- **Length (16 bits):** length of the whole datagram, header plus data, in bytes. The minimum is 8. The maximum is 65,535, which over IPv4 (20-byte IP header) leaves $65535 - 20 - 8 = 65507$ bytes, that is 65,507 bytes, of data.
- **Checksum (16 bits):** 16-bit one's complement checksum over a **pseudo-header** (source IP, destination IP, protocol, UDP length), the UDP header and the data. It is optional in IPv4 (all zeros means "not computed") and mandatory in IPv6. A segment that fails the check is silently discarded.

**3. Characteristics:** connectionless (no handshake), unreliable (no acknowledgement, retransmission, ordering or flow control), low overhead and low delay. It is used by DNS, DHCP, SNMP, streaming media and VoIP, where speed matters more than guaranteed delivery. A stack on the receiving host uses the destination port to **demultiplex** the segment to the right process.`
          },
          {
            qNo: "20a",
            module: 5,
            marks: 9,
            questionText: "Summarize the architecture of electronic mail system with neat diagram.",
            syllabusRef: "Module 5 - Application Protocols (Email, FTP, SNMP) (Tanenbaum Ch 7.2 - 7.4, Forouzan Ch 27 - 28)",
            schemeRubric: "Diagram: 2 marks; components (user agent, message transfer agent): 2 marks; functions (composition, transfer, reporting, displaying, disposition): 5 marks",
            conciseAnswer: "The e-mail architecture has two kinds of components: user agents (UA), the programs people use to compose, read and manage messages, and message transfer agents (MTA), the mail servers that move messages between mail systems with SMTP. Mail waits in the recipient's mailbox until it is read by a UA over POP3, IMAP or HTTP. The system provides composition, transfer, reporting, displaying and disposition.",
            detailedAnswer: `**1. Architecture diagram:**
\`\`\`
  Sender side                                     Receiver side
 +-----------+   SMTP    +---------+   SMTP    +---------+   POP3/IMAP    +-----------+
 |   User    |---------->|  Sender |---------->| Receiver|<---------------|   User    |
 |  Agent    |  (submit) |   MTA   | (transfer)|   MTA   |  (retrieve)    |  Agent    |
 +-----------+           +----+----+           +----+----+                +-----------+
                              |                     |
                         [outgoing queue]      [recipient mailbox]
\`\`\`

**2. Components**
- **User agent (UA):** the mail client (for example Outlook, Thunderbird, a web mail page). It lets the user **compose** messages, **read**, reply, forward, and **manage mailboxes** (folders).
- **Message transfer agent (MTA):** the mail server software that **transfers** the message across the Internet using **SMTP** (TCP port 25, or 587 for submission). The sender's MTA finds the receiver's mail server through the **MX record** in DNS and delivers the mail over a TCP connection.
- **Mailbox and spool:** the recipient's mailbox is a file or directory on the receiving mail server that stores arrived mail; the spool is the queue of outgoing mail.
- **Message access protocols:** POP3 (download and delete) or IMAP (manage mail on the server) let the recipient's UA fetch mail from the mailbox, because SMTP only pushes mail.
- **Message format:** a message has a header (To, From, Subject, Date) and a body; MIME extends the body to carry non-ASCII text and attachments.

**3. Functions of an e-mail system**
1. **Composition:** creating messages and replies, with editing support, address books and attachments.
2. **Transfer:** moving the message from sender to receiver, opening the connection, sending the message and closing the connection (done by the MTAs, not by the user).
3. **Reporting:** telling the sender what happened to the message: delivered, rejected or lost (delivery receipts and bounce messages).
4. **Displaying:** presenting incoming messages to the user, converting formats where needed (for example attachments in MIME).
5. **Disposition:** deciding what the recipient does after reading: discard, save in a folder, reply, forward, or filter and sort.`
          },
          {
            qNo: "20b",
            module: 5,
            marks: 5,
            questionText: "Identify and describe the DNS attacks.",
            syllabusRef: "Module 5 - Domain Name System (DNS) (Tanenbaum Ch 7.1, Kurose & Ross Ch 2.5)",
            schemeRubric: "Not in the syllabus: the valuation scheme awards the 5 marks if the question is attempted. Suggested split: five attacks with description, 1 mark each",
            conciseAnswer: "Common DNS attacks are cache poisoning (forged replies planted in a resolver's cache), DNS hijacking (changing the resolver or registration so users reach a malicious server), DNS amplification (spoofed small queries produce large replies that flood a victim), DNS tunnelling (hiding other traffic or stolen data inside DNS queries) and denial of service against DNS servers, including random sub-domain floods.",
            detailedAnswer: `DNS was designed without authentication: queries and replies are normally unauthenticated UDP, which is the root of most attacks.

1. **DNS spoofing / cache poisoning:** the attacker sends forged DNS replies to a resolver, guessing the 16-bit transaction ID (and source port) of a pending query. If the forged reply arrives first, the resolver **caches the false record** and sends all its users to the attacker's IP address (phishing, malware). *Defence:* random transaction IDs and source ports, DNSSEC (digitally signed records), and short validation of answers.
2. **DNS hijacking:** the attacker changes the DNS settings that a victim uses: malware or a compromised router changes the configured resolver, or the domain's registrar account or name-server records are altered. *Defence:* secure registrar accounts (multi-factor authentication, registry lock), secure router firmware and DNSSEC.
3. **DNS amplification (reflection) DDoS:** the attacker sends many small DNS queries with the **victim's IP forged as the source** to open resolvers, asking for large records (for example ANY). The much larger replies all go to the victim, which is flooded. *Defence:* do not run open resolvers, response rate limiting, and ingress filtering of spoofed addresses (BCP 38).
4. **DNS tunnelling:** data of another protocol is encoded in the names and records of DNS queries to a server the attacker controls, bypassing firewalls, to leak data or run command-and-control. *Defence:* monitor query length, rate and entropy and restrict outgoing DNS to approved resolvers.
5. **Denial of service on DNS servers (including random sub-domain or "water torture" attack):** floods of queries for non-existent random names such as xk3j9.example.com defeat caching and overload the authoritative servers, so the domain becomes unreachable. *Defence:* rate limiting, anycast and over-provisioned servers, filtering.

Other related attacks are domain shadowing and typosquatting. Encrypted transports (DNS over TLS or HTTPS) protect privacy between the user and the resolver but do not replace DNSSEC.`
          }
        ]
      }
    ]
  },
  {
    paperId: "cst303-dec2023",
    paperCode: "1100CST303122101",
    examTitle: "KTU B.Tech S5 Regular & Supplementary Examination, December 2023 (2019 Scheme)",
    subject: "CST 303 COMPUTER NETWORKS",
    totalMarks: 100,
    duration: "3 Hours",
    schemeSource: "KTU draft valuation scheme (file: CST303-DRAFT SCHEME1.pdf)",
    questionsInPaper: 30,
    sections: [
      {
        sectionName: "PART A (Answer all questions - 3 Marks each)",
        questions: [
          {
            qNo: 1,
            module: 1,
            marks: 3,
            questionText: "Differentiate between connection-oriented and connection-less services.",
            syllabusRef: "Module 1 - Service Types (Tanenbaum Ch 1.3.2)",
            schemeRubric: "Any 3 differences: 1 mark each",
            conciseAnswer: "Connection-oriented service establishes a dedicated logical connection via handshake before data transmission (e.g., TCP), guaranteeing ordered delivery. Connection-less service sends independent datagrams without prior setup or state (e.g., UDP/IP).",
            detailedAnswer: `| Parameter | Connection-Oriented Service | Connection-Less Service |
|---|---|---|
| **Connection Setup** | Requires explicit 3-phase lifecycle: Connection Setup, Data Transfer, Connection Teardown. | No prior setup required; packets are dispatched immediately. |
| **Packet Routing** | All packets follow the same pre-negotiated logical path (Virtual Circuit). | Packets (datagrams) are routed independently and may take different paths. |
| **Ordering & Reliability** | Guaranteed in-order packet arrival with sequencing and error recovery. | No ordering guarantee; packets may arrive out of order, delayed, or duplicated. |
| **State Information** | Endpoints and routers maintain per-connection state variables. | Stateless; routers do not maintain per-packet state. |
| **Examples** | TCP, ATM, X.25, telephone call. | UDP, IP, postal mail, SMS.`
          },
          {
            qNo: 2,
            module: 1,
            marks: 3,
            questionText: "Define bandwidth-delay product with example.",
            syllabusRef: "Module 1 - Network Performance (Peterson & Davie Ch 1.2)",
            schemeRubric: "Definition: 1 mark; example with explanation: 2 marks",
            conciseAnswer: "Bandwidth-Delay Product (BDP) measures the maximum volume of bits that can be in flight across a transmission pipe at any instant. BDP = Bandwidth (bps) x Round Trip Time (RTT seconds). Example: 1 Gbps link with 100 ms RTT has BDP = 100 Megabits (12.5 MB).",
            detailedAnswer: `**1. Definition:**
The **Bandwidth-Delay Product (BDP)** represents the capacity of a network link, quantifying the volume of data that can fill the transmission pipe before an acknowledgment returns from the receiver:
$$\\text{BDP} = \\text{Bandwidth } (\\text{bits/sec}) \\times \\text{Round Trip Time (RTT) } (\\text{seconds})$$

It dictates the minimum buffer size or sliding window size needed to achieve 100% link utilization.

**2. Concrete Example:**
- Consider a transcontinental fiber link with:
  - Bandwidth = **1 Gbps** ($10^9\\text{ bits/s}$)
  - One-way delay = $50\\text{ ms} \\implies \\text{RTT} = 100\\text{ ms} = 0.1\\text{ s}$
- Calculate BDP:
  $$\\text{BDP} = 10^9\\text{ bps} \\times 0.1\\text{ s} = 10^8\\text{ bits} = 100\\text{ Megabits} \\approx 12.5\\text{ Megabytes}$$
- **Implication:** The sender must have a window of at least **12.5 MB** to keep the 1 Gbps pipe continuously saturated.`
          },
          {
            qNo: 3,
            module: 2,
            marks: 3,
            questionText: "Differentiate between 1-persistent and p-persistent CSMA.",
            syllabusRef: "Module 2 - MAC Protocols (Tanenbaum Ch 4.2.2)",
            schemeRubric: "1-persistent CSMA: 1.5 marks; p-persistent CSMA: 1.5 marks",
            conciseAnswer: "In 1-persistent CSMA, a station senses the channel and transmits immediately with probability 1 as soon as it becomes idle. In p-persistent CSMA, when channel becomes idle, the station transmits with probability p and defers to the next time slot with probability (1 - p).",
            detailedAnswer: `| Parameter | 1-Persistent CSMA | p-Persistent CSMA |
|---|---|---|
| **Transmission Probability** | If idle, station transmits immediately with **probability $p = 1$**. | If idle, station transmits with **probability $p$** ($0 < p < 1$). |
| **Behavior if Busy** | Continuously senses channel; transmits the instant it becomes free. | Continuously senses channel; upon idle, runs probabilistic slot test. |
| **Action if Deferred** | N/A (never defers when idle). | With probability $1 - p$, waits for the next time slot and re-evaluates. |
| **Collision Likelihood** | **High collision risk:** If 2 or more stations are waiting during a transmission, both will transmit simultaneously the moment the channel frees. | **Low collision risk:** Tuned parameter $p$ spreads out transmissions across multiple slots, drastically cutting collisions.`
          },
          {
            qNo: 4,
            module: 2,
            marks: 3,
            questionText: "Assuming even parity, find the parity bit for each of the following data: i. 1011010  ii. 000000  iii. 10010001",
            syllabusRef: "Module 2 - Error Detection Parity (Forouzan Ch 10)",
            schemeRubric: "Parity bit: 1 mark for each of the three data words",
            conciseAnswer: "i. 1011010 has 4 ones (even) -> Parity bit = 0; ii. 000000 has 0 ones (even) -> Parity bit = 0; iii. 10010001 has 3 ones (odd) -> Parity bit = 1.",
            detailedAnswer: `**Principle of Even Parity:**
In Even Parity, the parity bit is chosen so that the total number of 1s in the code word (data bits + parity bit) is **even**.

1. **Case i: \`1011010\`**
   - Number of 1s in data = $1 + 0 + 1 + 1 + 0 + 1 + 0 = 4$ (already even).
   - **Parity Bit = 0**
   - Resulting frame: \`10110100\` (Total 1s = 4).

2. **Case ii: \`000000\`**
   - Number of 1s in data = 0 (0 is an even integer).
   - **Parity Bit = 0**
   - Resulting frame: \`0000000\` (Total 1s = 0).

3. **Case iii: \`10010001\`**
   - Number of 1s in data = $1 + 0 + 0 + 1 + 0 + 0 + 0 + 1 = 3$ (odd).
   - To make total count even, append 1.
   - **Parity Bit = 1**
   - Resulting frame: \`100100011\` (Total 1s = 4).`
          },
          {
            qNo: 5,
            module: 3,
            marks: 3,
            questionText: "Distinguish between routing and forwarding.",
            syllabusRef: "Module 3 - Routing Algorithms (Tanenbaum Ch 5.2, Peterson & Davie Ch 3.3)",
            schemeRubric: "Explanation of routing: 1.5 marks; explanation of forwarding: 1.5 marks",
            conciseAnswer: "Routing is the network-wide process of choosing paths and building the routing table (done by routing algorithms and protocols, relatively slow). Forwarding is the per-packet action of looking up the destination in that table and sending the packet out of the chosen interface (done in hardware, very fast).",
            detailedAnswer: `| Parameter | Routing | Forwarding |
|---|---|---|
| **Meaning** | The process of **deciding which path** packets should take; it fills and updates the routing table. | The action of **moving each packet** from an input interface to the correct output interface. |
| **Work done** | Running routing algorithms and protocols (RIP, OSPF, BGP) and exchanging route information with other routers. | Looking up the destination address in the forwarding table (longest prefix match) and switching the packet. |
| **Time scale** | Slow: seconds or minutes, whenever the topology changes. | Very fast: nanoseconds to microseconds per packet. |
| **Where it happens** | Control plane (usually software). | Data plane (usually hardware). |
| **Scope** | Involves the whole network or area. | Local decision inside one router. |

**Example:** a router learns through OSPF that network 10.2.0.0/16 is reachable through interface 2 (routing). When a packet for 10.2.5.9 arrives, it is looked up in the table and sent out of interface 2 (forwarding).`
          },
          {
            qNo: 6,
            module: 3,
            marks: 3,
            questionText: "Describe any two techniques for achieving good Quality of Service.",
            syllabusRef: "Module 3 - Traffic Shaping & QoS Techniques (Tanenbaum Ch 5.4, Kurose & Ross Ch 7)",
            schemeRubric: "Explanation of any two techniques: 1.5 marks each",
            conciseAnswer: "Two QoS techniques are traffic shaping, which smooths the rate at which a flow enters the network using a leaky bucket (constant output rate) or token bucket (allows bounded bursts), and admission control, where a router accepts a new flow only if it has enough resources to keep its promises to the flows already admitted. Others are over-provisioning, buffering and packet scheduling.",
            detailedAnswer: `QoS means giving a flow the **bandwidth, delay, jitter and loss** it needs. Two techniques are:

**1. Traffic shaping**
- Regulates the average rate and burstiness at which a flow enters the network, so the network can predict and reserve for it.
- **Leaky bucket:** packets arriving in bursts are put in a bucket (queue) with a hole; they leave at a constant rate $\\rho$. If the bucket is full, excess packets are discarded.
- **Token bucket:** tokens are generated at rate $r$ and stored up to a capacity $b$. A packet may be sent only by consuming a token, so an idle flow can save tokens and later send a burst of up to $b$ packets at once, but the long-term rate stays $r$.
\`\`\`
 bursty input --> [ bucket ] --> steady output       leaky bucket
 tokens (rate r) --> [ token bucket, capacity b ] --> burst allowed     token bucket
\`\`\`

**2. Admission control**
- A flow first describes its traffic and needs (flow specification). Each router on the path checks whether it can carry the flow **without harming** flows already accepted; if not, the new flow is refused or renegotiated. It is used with resource reservation (RSVP in Integrated Services).
- This avoids overload, so accepted flows meet their guarantees.

**Other techniques:** over-provisioning (more capacity than needed), buffering at the receiver to remove jitter, and packet scheduling (FIFO, priority, weighted fair queuing).`
          },
          {
            qNo: 7,
            module: 4,
            marks: 3,
            questionText: "Write notes on internet multicasting.",
            syllabusRef: "Module 3/4 - Multicast Routing (Tanenbaum Ch 5.2.8, Forouzan Ch 21)",
            schemeRubric: "Definition: 1 mark; explanation: 2 marks",
            conciseAnswer: "Internet multicasting delivers one copy of a packet to every member of a group instead of sending separate unicast copies. Groups use class D addresses (224.0.0.0 to 239.255.255.255). Hosts join a group by telling their local router through IGMP, and multicast routing protocols (DVMRP, PIM) build delivery trees so that each link carries one copy.",
            detailedAnswer: `**Definition:** multicasting is **one-to-many** (or many-to-many) delivery: a source sends a single packet addressed to a **group**, and the network delivers a copy to every host that has joined that group. It saves bandwidth compared with sending a separate unicast packet to each receiver.

**Explanation:**
- **Group addresses:** IPv4 class D, **224.0.0.0 to 239.255.255.255** (first four bits 1110). Examples: 224.0.0.1 is all hosts and 224.0.0.2 is all routers on the local network.
- **Group membership (IGMP):** a host that wants to receive group traffic sends an IGMP membership report to its local router; the router periodically sends queries to learn whether any member remains on that network.
- **Multicast routing:** routers build a **multicast tree** with a protocol such as **DVMRP**, MOSPF or **PIM** (dense or sparse mode), usually with **reverse path forwarding** and pruning, so each link carries only one copy of a packet.
- **On a LAN:** the group address is mapped to an Ethernet multicast address 01:00:5e followed by the low-order 23 bits of the group address. Example: 224.1.2.3 maps to 01:00:5e:01:02:03. Five address bits are lost in the mapping, so 32 groups share one MAC address.
- **Uses:** video conferencing, IPTV, software updates, stock quotes, online games.
\`\`\`
 Source --> R1 --+--> R2 --> member A
                 |
                 +--> R3 --> member B        one copy per link, copied at branch points
\`\`\``
          },
          {
            qNo: 8,
            module: 4,
            marks: 3,
            questionText: "List the IP address ranges and subnet masks of class A, class B and class C.",
            syllabusRef: "Module 4 - IPv4 Addressing & Subnetting (Forouzan Ch 19, Kurose & Ross Ch 4.3)",
            schemeRubric: "IP address ranges of class A, B and C: 0.5 mark each; default subnet masks of class A, B and C: 0.5 mark each",
            conciseAnswer: "Class A: 0.0.0.0 to 127.255.255.255, mask 255.0.0.0. Class B: 128.0.0.0 to 191.255.255.255, mask 255.255.0.0. Class C: 192.0.0.0 to 223.255.255.255, mask 255.255.255.0.",
            detailedAnswer: `| Class | Leading bits | First octet | Address range | Default mask | Prefix | Network bits / host bits |
|---|---|---|---|---|---|---|
| **A** | 0 | 0 - 127 | 0.0.0.0 to 127.255.255.255 | 255.0.0.0 | /8 | 8 / 24 |
| **B** | 10 | 128 - 191 | 128.0.0.0 to 191.255.255.255 | 255.255.0.0 | /16 | 16 / 16 |
| **C** | 110 | 192 - 223 | 192.0.0.0 to 223.255.255.255 | 255.255.255.0 | /24 | 24 / 8 |

For completeness: class D (leading bits 1110, 224.0.0.0 to 239.255.255.255) is for multicast and class E (leading bits 1111, 240.0.0.0 to 255.255.255.255) is reserved; neither has a default mask.

**Notes:**
- Within these ranges 0.0.0.0/8 and 127.0.0.0/8 (loopback) are reserved, so usable class A networks are numbered 1 to 126.
- Number of hosts per network: class A $2^{24}-2$, class B $2^{16}-2 = 65534$, class C $2^{8}-2 = 254$.`
          },
          {
            qNo: 9,
            module: 5,
            marks: 3,
            questionText: "List the transport service primitives.",
            syllabusRef: "Module 5 - Transport Layer Primitives & UDP (Tanenbaum Ch 6.1 - 6.4)",
            schemeRubric: "Explanation of any three transport service primitives: 1 mark each",
            conciseAnswer: "The five basic transport service primitives are LISTEN, CONNECT, SEND, RECEIVE and DISCONNECT. In the Berkeley socket interface used with TCP they appear as SOCKET, BIND, LISTEN, ACCEPT, CONNECT, SEND, RECEIVE and CLOSE.",
            detailedAnswer: `The transport service lets an application use the network through a small set of **primitives**. For a simple connection-oriented service they are:

| Primitive | Packet (TPDU) sent | Meaning |
|---|---|---|
| **LISTEN** | None | The server blocks (waits) until some client tries to connect. |
| **CONNECT** | CONNECTION REQUEST | A client actively tries to establish a connection; it blocks until the server accepts. |
| **SEND** | DATA | Transmit data on the established connection. |
| **RECEIVE** | None | Block until a DATA packet arrives. |
| **DISCONNECT** | DISCONNECTION REQUEST | This side wants to release the connection. |

**Berkeley socket primitives (used with TCP):**
| Primitive | Meaning |
|---|---|
| SOCKET | Create a new communication end point. |
| BIND | Attach a local address (IP and port) to a socket. |
| LISTEN | Announce willingness to accept connections and give the queue size. |
| ACCEPT | Passively wait for and accept an incoming connection. |
| CONNECT | Actively attempt to establish a connection. |
| SEND | Send data over the connection. |
| RECEIVE | Receive data from the connection. |
| CLOSE | Release the connection. |`
          },
          {
            qNo: 10,
            module: 5,
            marks: 3,
            questionText: "How recursive query resolution is performed in DNS?",
            syllabusRef: "Module 5 - Domain Name System (DNS) (Tanenbaum Ch 7.1, Kurose & Ross Ch 2.5)",
            schemeRubric: "Diagram: 1 mark; explanation: 2 marks",
            conciseAnswer: "In recursive resolution the client asks its local name server and that server takes over the whole job: if it does not know the answer, it queries the next server on the client's behalf (root, then top-level domain, then authoritative server), and the final answer is passed back along the same chain to the client.",
            detailedAnswer: `In a **recursive query** the contacted name server must either return the final answer or an error; it is responsible for finding the answer by querying other servers itself.

**Diagram (resolving www.example.com):**
\`\`\`
 Client --1--> Local DNS --2--> Root --3--> .com TLD --4--> example.com (authoritative)
 Client <--8-- Local DNS <--7-- Root <--6-- .com TLD <--5-- example.com (authoritative)
\`\`\`

**Steps:**
1. The client (stub resolver) sends a recursive query for www.example.com to its **local name server**.
2. If the local server has no cached answer, it asks a **root server**; the query passes (recursively) to the **.com top-level domain server** and then to the **authoritative server** for example.com.
3. The authoritative server returns the IP address; the answer travels back along the same path.
4. The local server **caches** the answer (for its TTL) and returns it to the client.

**Note:** in practice the local server often asks root, TLD and authoritative servers iteratively (each reply is a referral), but the client still sees one recursive query: the client is relieved of all the work.`
          }
        ]
      },
      {
        sectionName: "PART B (Module by Module Questions - 14 Marks each)",
        questions: [
          {
            qNo: "11a",
            module: 1,
            marks: 4,
            questionText: "a) Write the functions of data link and network layer of OSI reference model.",
            syllabusRef: "Module 1 - Layering Principles & Reference Models (Tanenbaum Ch 1.3 - 1.4, Forouzan Ch 2)",
            schemeRubric: "Functions of the data link layer: 2 marks; functions of the network layer: 2 marks",
            conciseAnswer: "The data link layer moves frames over one link: framing, physical (MAC) addressing, error control, flow control and medium access control. The network layer moves packets from source host to destination host across networks: logical (IP) addressing, routing, packet forwarding, fragmentation and congestion control.",
            detailedAnswer: `**1. Data link layer (layer 2) - node-to-node delivery over one link**
- **Framing:** divides the bit stream from the network layer into frames and marks their boundaries.
- **Physical addressing:** adds the sender's and receiver's MAC addresses in the frame header.
- **Error control:** detects (and where needed corrects or retransmits) damaged, lost or duplicated frames using a trailer such as CRC.
- **Flow control:** stops a fast sender from overwhelming a slow receiver (sliding window).
- **Access control:** decides which device may use a shared link (MAC sublayer, for example CSMA/CD).

**2. Network layer (layer 3) - host-to-host delivery across networks**
- **Logical addressing:** gives every host a unique global address (IP address) so packets can be identified across networks.
- **Routing:** chooses the best path from the source to the destination through intermediate routers.
- **Packet forwarding:** moves each packet from a router's input to the correct output.
- **Fragmentation and reassembly:** splits packets that are larger than the next link's MTU.
- **Congestion control:** limits the number of packets in the subnet, and connects different networks (internetworking).`
          },
          {
            qNo: "11b",
            module: 1,
            marks: 10,
            questionText: "b) Explain the various physical topologies with neat sketches.",
            syllabusRef: "Module 1 - Network Classification & Topologies (Forouzan Ch 1.2, Tanenbaum Ch 1.2)",
            schemeRubric: "Five physical topologies: diagram 1 mark each (5 marks) and explanation 1 mark each (5 marks)",
            conciseAnswer: "The five physical topologies are mesh (every pair of devices linked), star (all devices on a central hub or switch), bus (one shared backbone cable), ring (closed loop of devices, each linked to two neighbours) and tree/hybrid (a hierarchy of stars). A full mesh of n devices needs n(n-1)/2 links.",
            detailedAnswer: `The **physical topology** is the geometric layout of the devices and links of a network.

**1. Mesh**
\`\`\`
   [A] ---------- [B]
    |  \\        /  |
    |    \\    /    |
    |      \\/      |
    |      /\\      |
    |    /    \\    |
    |  /        \\  |
   [D] ---------- [C]
\`\`\`
Every device has a dedicated point-to-point link to every other device. A full mesh of n devices needs n(n-1)/2 links and n - 1 ports per device (5 devices: 10 links, 4 ports each). It is robust and private but costly, so it is used in small backbones.

**2. Star**
\`\`\`
        [A]
         |
[D] ---[ HUB / SWITCH ]--- [B]
         |
        [C]
\`\`\`
Each device is joined to a central hub or switch. It is easy to install and troubleshoot, and one failed cable affects only that device, but the centre is a single point of failure. Most modern LANs are stars.

**3. Bus**
\`\`\`
  [A]      [B]      [C]      [D]
   |        |        |        |
===+========+========+========+===    backbone with terminators at both ends
\`\`\`
All devices share a single backbone cable through drop lines and taps. It needs little cable and is cheap, but a backbone fault stops everything, there is a limit on length and number of stations, and performance falls under load.

**4. Ring**
\`\`\`
     [A] ------- [B]
      |           |
     [D] ------- [C]      signals travel in one direction around the ring
\`\`\`
Each device has a dedicated link to only two neighbours and signals pass around the loop, with every device acting as a repeater. It is simple to extend and fault isolation is easy, but a break in a single ring disables the network (a dual ring fixes it).

**5. Tree (hybrid)**
\`\`\`
            [Root hub]
            /    |    \\
       [Hub1]  [Hub2]  [Hub3]
        /  \\     |      /  \\
      [A]  [B]  [C]   [D]  [E]
\`\`\`
A hierarchy of stars: secondary hubs connect to a central hub. A hybrid topology combines two or more basic topologies (for example stars connected by a bus backbone). It allows the network to grow and to isolate faults by branch, but the root device and the cabling make it dependent on the top of the hierarchy.`
          },
          {
            qNo: "12a",
            module: 1,
            marks: 8,
            questionText: "a) How computer networks are categorized based on scale? Explain the features of each network.",
            syllabusRef: "Module 1 - Network Classification & Topologies (Forouzan Ch 1.2, Tanenbaum Ch 1.2)",
            schemeRubric: "Listing the categories based on scale: 2 marks; explanation of each: 6 marks",
            conciseAnswer: "By scale (physical size) networks are Personal Area Network (about 1 m, Bluetooth), Local Area Network (a room, building or campus up to about 1 km, Ethernet and Wi-Fi), Metropolitan Area Network (a city, about 10 km), Wide Area Network (a country or continent, 100 km and more) and the Internet, an interconnection of many networks.",
            detailedAnswer: `Networks are classified by the **distance** over which the machines are spread.

| Interprocessor distance | Processors located in the same | Category |
|---|---|---|
| 1 m | Square metre (around a person) | **PAN** |
| 10 m, 100 m, 1 km | Room, building, campus | **LAN** |
| 10 km | City | **MAN** |
| 100 km, 1000 km | Country, continent | **WAN** |
| 10,000 km | Planet | **Internet** (interconnected networks) |

**1. Personal Area Network (PAN):** connects a person's own devices (phone, headset, laptop, watch) within about 1 to 10 m. Wireless, for example Bluetooth or USB; low power; owned by one person.

**2. Local Area Network (LAN):** a privately owned network in a room, building or campus, up to a few km. Features: high data rate (100 Mbps to 10 Gbps and beyond), very low delay and error rate, simple topology (a star of switches in Ethernet, or a Wi-Fi access point), inexpensive. The medium is shared (broadcast) or switched. Example: a college computer laboratory.

**3. Metropolitan Area Network (MAN):** covers a city or a large campus, about 5 to 50 km. It may be owned by a single organisation or by a service provider. Typical technologies: metropolitan Ethernet, fibre rings, cable television networks and WiMAX. Moderate to high speed; example: a city-wide cable TV and internet network.

**4. Wide Area Network (WAN):** spans countries or continents. Made of **hosts** connected by a **communication subnet** of routers and transmission lines (leased lines, fibre, satellite) that is often owned by a telecom company. Features: lower speed per customer and higher delay than a LAN (propagation delay of tens of milliseconds), more errors, higher cost, uses packet or circuit switching, routing is essential. Example: a bank's network connecting its branches, or the backbone of an ISP.

**5. Internetwork (Internet):** a collection of interconnected networks (LANs, MANs, WANs) joined by **routers or gateways** using a common protocol (TCP/IP). The worldwide Internet is the best-known example.

**Comparison of features:** as the distance grows from LAN to WAN, the data rate usually falls, the delay and cost rise, and management shifts from private ownership to carriers.`
          },
          {
            qNo: "12b",
            module: 1,
            marks: 6,
            questionText: "b) Differentiate between Manchester encoding and Differential Manchester encoding with suitable example.",
            syllabusRef: "Module 1 - Physical Layer Encoding (Peterson & Davie Ch 2.2, Forouzan Ch 4.1)",
            schemeRubric: "Manchester and differential Manchester explanation: 1.5 marks each; example for each: 1.5 marks each",
            conciseAnswer: "Both are self-clocking line codes with a transition in the middle of every bit. In Manchester the direction of the mid-bit transition carries the data (here low-to-high is 1 and high-to-low is 0). In Differential Manchester the mid-bit transition is only for clocking, and the data is carried by the presence (bit 0) or absence (bit 1) of a transition at the start of the bit, which makes it independent of wire polarity.",
            detailedAnswer: `Both codes are **biphasic**: every bit period is split into two halves and there is always a transition in the middle of the bit, so the receiver can recover the clock from the signal itself (self-synchronising). Both use twice the bandwidth of NRZ.

**1. Manchester encoding**
- Data is carried by the **direction of the mid-bit transition**. Convention used here: **1 = low-to-high** transition, **0 = high-to-low** transition. (Some textbooks use the opposite convention; the method is the same.)
- The signal depends on polarity: if the two wires are swapped, all bits are inverted.

**2. Differential Manchester encoding**
- The mid-bit transition is **always present and is used only for clocking**. Data is carried by what happens at the **start** of the bit: **bit 0 = a transition at the start of the bit, bit 1 = no transition at the start** (the level continues from the end of the previous bit).
- It does not depend on polarity (only on whether a change occurs), so it is more reliable on noisy or swappable cable. It is used in Token Ring (IEEE 802.5), while Manchester is used in 10 Mbps Ethernet (IEEE 802.3).

**3. Example:** data = 10110010 (line assumed to be low before the first bit; L = low, H = high, two half-bit levels per bit).

Manchester half-bit levels: LH HL LH LH HL HL LH HL
\`\`\`
bit     1       0       1       1       0       0       1       0
     +.......+.......+.......+.......+.......+.......+.......+.......
  H      |-------|       |---|   |-------|   |---|       |-------|
  L  ----|       |-------|   |---|       |---|   |-------|       |---
\`\`\`
Differential Manchester half-bit levels: LH LH HL LH LH LH HL HL
\`\`\`
bit     1       0       1       1       0       0       1       0
     +.......+.......+.......+.......+.......+.......+.......+.......
  H      |---|   |-------|       |---|   |---|   |-------|   |---|
  L  ----|   |---|       |-------|   |---|   |---|       |---|   |---
\`\`\`

**4. Comparison**
| Feature | Manchester | Differential Manchester |
|---|---|---|
| Mid-bit transition | Always; its direction is the data | Always; clock only |
| Data carried by | Direction of the mid-bit transition | Presence (0) or absence (1) of a transition at the bit start |
| Polarity sensitivity | Yes (swapped wires invert the data) | No |
| Complexity | Simpler | More complex receiver |
| Used in | IEEE 802.3 Ethernet (10 Mbps) | IEEE 802.5 Token Ring |`
          },
          {
            qNo: "13a",
            module: 2,
            marks: 10,
            questionText: "a) Explain the various framing methods used in data link layer.",
            syllabusRef: "Module 2 - Framing Mechanisms (Peterson & Davie Ch 2.3, Tanenbaum Ch 3.1)",
            schemeRubric: "Four framing methods: explanation 1.5 marks each and example 1 mark each",
            conciseAnswer: "The four framing methods are: character (byte) count, where a header field gives the frame length; flag bytes with byte stuffing, where an ESC byte is inserted before any FLAG or ESC in the data; flag bits with bit stuffing, where a 0 is inserted after five consecutive 1s so that 01111110 only marks frame boundaries; and physical layer coding violations, which use signal patterns that are not valid data.",
            detailedAnswer: `The data link layer must break the bit stream into **frames** and let the receiver find where each frame starts and ends. Four methods are used.

**1. Character (byte) count**
- A field at the start of the frame gives the number of characters in the frame (count included).
- Example: three frames of 5, 6 and 4 characters:
\`\`\`
 5 A B C D | 6 E F G H I | 4 J K L
\`\`\`
- Weakness: if the count is corrupted the receiver loses synchronisation and cannot find the next frame even with a checksum, so this method is rarely used alone.

**2. Flag bytes with byte stuffing**
- Each frame starts and ends with a special **FLAG** byte. If the FLAG pattern occurs in the data, the sender inserts an **ESC** byte before it; if an ESC occurs in the data it is also preceded by ESC. The receiver removes one ESC before every byte that follows an ESC.
- Example: data A FLAG B ESC C is sent as
\`\`\`
 FLAG  A  ESC FLAG  B  ESC ESC  C  FLAG
\`\`\`
- Weakness: bound to 8-bit characters.

**3. Flag bits with bit stuffing (used in HDLC)**
- Frames start and end with the bit pattern 01111110. The sender inserts a **0 after every five consecutive 1s** in the data, so the flag pattern never occurs in the data. The receiver deletes any 0 that follows five consecutive 1s.
- Example: data 01101111110111110 becomes 0110111110101111100 on the line (a 0 is stuffed after each run of five 1s). The receiver unstuffs it and recovers 01101111110111110.
- Works for any number of bits per frame.

**4. Physical layer coding violations**
- Uses signal patterns that never occur in normal data to mark frame boundaries.
- Example: in Manchester coding every bit has a mid-bit transition, so a pair of high-high or low-low half-bits is not a valid data bit and can serve as the frame delimiter. 4B/5B coding also has special start and end symbols that cannot be data.
- No extra bits are stuffed, but it applies only to certain line codes.

**Comparison:**
| Method | Boundary marker | Overhead | Weakness |
|---|---|---|---|
| Character count | Count field | One count field | One error loses synchronisation |
| Byte stuffing | FLAG byte | ESC bytes | Byte-oriented only |
| Bit stuffing | 01111110 | Extra 0 bits | Variable frame length in bits |
| Coding violations | Invalid signal | None | Depends on the line code |`
          },
          {
            qNo: "13b",
            module: 2,
            marks: 4,
            questionText: "b) Which are the different types of errors? Explain with examples.",
            syllabusRef: "Module 2 - Error Detection & Correction (Forouzan Ch 10, Peterson & Davie Ch 2.4)",
            schemeRubric: "Single bit error and burst error: definition 1 mark each, example 1 mark each",
            conciseAnswer: "The two types of transmission errors are single-bit errors, where exactly one bit of the data unit changes (for example 10110100 received as 10100100), and burst errors, where two or more bits change within a burst whose length is counted from the first to the last corrupted bit (for example 10110100 received as 10011000, a burst of length 4).",
            detailedAnswer: `Noise, attenuation and distortion can change bits during transmission. Two types of error are distinguished.

**1. Single-bit error**
- **Definition:** only **one bit** of a given data unit (byte, character or packet) is changed from 1 to 0 or from 0 to 1.
- **Example:**
\`\`\`
 Sent     : 1 0 1 1 0 1 0 0
 Received : 1 0 1 0 0 1 0 0      the 4th bit changed (1 became 0)
\`\`\`
- It is relatively rare in serial transmission, because noise usually lasts longer than one bit time; it is more likely in parallel transmission.

**2. Burst error**
- **Definition:** **two or more bits** of the data unit are changed. The **burst length** is measured from the first corrupted bit to the last corrupted bit; bits in between may or may not be changed.
- **Example:**
\`\`\`
 Sent     : 1 0 1 1 0 1 0 0
 Received : 1 0 0 1 1 0 0 0      bits 3, 5 and 6 changed
                ^-----^          burst length = 4 (bit 3 to bit 6)
\`\`\`
- Bursts are the common case, because noise (such as a 1 ms impulse) lasts for many bit times. At 10 Mbps a 1 ms burst of noise can damage up to 10,000 bits ($10 \\times 10^6 \\times 10^{-3}$).
- Burst errors are more likely at higher data rates.

**Detection:** single-bit errors are detected by a parity bit; burst errors need stronger codes such as CRC, which detects every burst up to the length of the check sequence.`
          },
          {
            qNo: "14a",
            module: 2,
            marks: 7,
            questionText: "a) Draw and explain the frame format of IEEE 802.11.",
            syllabusRef: "Module 2 - LAN Technologies & IEEE 802.11 (Tanenbaum Ch 4.4, Peterson & Davie Ch 2.7)",
            schemeRubric: "Diagram: 3 marks; explanation: 4 marks",
            conciseAnswer: "The IEEE 802.11 data frame has a 2-byte Frame Control, 2-byte Duration/ID, three 6-byte addresses, a 2-byte Sequence Control, an optional fourth 6-byte address, a frame body of 0 to 2312 bytes and a 4-byte FCS (CRC-32), so the maximum frame is 2346 bytes. The To DS and From DS bits in Frame Control decide the meaning of the addresses.",
            detailedAnswer: `**1. Frame format (sizes in bytes):**
\`\`\`
+---------+----------+---------+---------+---------+----------+---------+--------------+-----+
| Frame   | Duration | Address | Address | Address | Sequence | Address |  Frame body  | FCS |
| Control |   / ID   |    1    |    2    |    3    | Control  |    4    |  0 - 2312    |     |
|    2    |    2     |    6    |    6    |    6    |    2     |    6    |              |  4  |
+---------+----------+---------+---------+---------+----------+---------+--------------+-----+
\`\`\`
The MAC header is 30 bytes (with all four addresses), so the maximum frame is $30 + 2312 + 4 = 2346$ bytes.

**2. Frame Control (16 bits)** has these subfields: protocol version (2 bits), type (2 bits: management, control, data), subtype (4 bits), To DS (1), From DS (1), More Fragments (1), Retry (1), Power Management (1), More Data (1), Protected Frame/WEP (1) and Order (1).

**3. Other fields**
- **Duration/ID (2 bytes):** how long the frame and its acknowledgement will occupy the channel (microseconds); other stations use it to set their **NAV** (virtual carrier sensing). In power-save poll frames it carries the station ID.
- **Address 1 to 4 (6 bytes each):** MAC addresses (source, destination, transmitter, receiver, BSSID). Their meaning depends on To DS and From DS (below). Address 4 is used only when frames are relayed between access points (wireless distribution system).
- **Sequence Control (2 bytes):** 12-bit sequence number and 4-bit fragment number, used to remove duplicates and to reassemble fragments.
- **Frame body (0 to 2312 bytes):** the payload (the network layer packet), absent in many control and management frames.
- **FCS (4 bytes):** CRC-32 over the header and body for error detection.

**4. Address usage**
| To DS | From DS | Address 1 | Address 2 | Address 3 | Address 4 |
|---|---|---|---|---|---|
| 0 | 0 | Destination | Source | BSSID | not used (ad hoc) |
| 0 | 1 | Destination | BSSID (AP) | Source | not used (AP to station) |
| 1 | 0 | BSSID (AP) | Source | Destination | not used (station to AP) |
| 1 | 1 | Receiver AP | Transmitter AP | Destination | Source (AP to AP) |

**5. Other frame types:** control frames such as RTS, CTS and ACK are much shorter (for example an ACK has only Frame Control, Duration, a receiver address and the FCS), and management frames (beacon, association, authentication) use the same header with a management body.`
          },
          {
            qNo: "14b",
            module: 2,
            marks: 7,
            questionText: "b) A bit stream 10011101 is transmitted using the CRC method. The generator polynomial is x^3 + 1. Show the actual bit string transmitted.",
            syllabusRef: "Module 2 - CRC Generation (Peterson & Davie Ch 2.4, Tanenbaum Ch 3.2)",
            schemeRubric: "Generator bit representation: 1 mark; appending zeros: 1 mark; modulo-2 division steps: 3 marks; final transmitted frame: 2 marks. Scheme answer: generator 1001, transmitted frame 10011101100",
            conciseAnswer: "Generator polynomial x^3 + 1 corresponds to the bit string 1001 (degree 3). Append 3 zeros to the data to get 10011101000. Modulo-2 division by 1001 leaves the remainder 100. The transmitted frame is the data followed by the remainder: 10011101100.",
            detailedAnswer: `**1. Convert the generator polynomial to binary:**
$$G(x) = x^3 + 1 = 1\\cdot x^3 + 0\\cdot x^2 + 0\\cdot x^1 + 1\\cdot x^0 \\implies \\mathbf{1001}$$
The degree is $r = 3$, so the CRC (remainder) has **3 bits** and $r = 3$ zeros are appended.

**2. Prepare the dividend:** data $D = 10011101$; append $r = 3$ zeros:
$$D' = 10011101\\mathbf{000} = 10011101000$$

**3. Modulo-2 (XOR) division of 10011101000 by 1001:**
At each step take 4 bits. If the leading bit is 1, XOR with the generator 1001 (quotient bit 1); if it is 0, XOR with 0000 (quotient bit 0). Drop the leading bit and bring down the next bit of the dividend.

| Step | 4-bit window | Quotient bit | XOR with | Result |
|---|---|---|---|---|
| 1 | 1001 | 1 | 1001 | 0000 |
| 2 | 0001 | 0 | 0000 | 0001 |
| 3 | 0011 | 0 | 0000 | 0011 |
| 4 | 0110 | 0 | 0000 | 0110 |
| 5 | 1101 | 1 | 1001 | 0100 |
| 6 | 1000 | 1 | 1001 | 0001 |
| 7 | 0010 | 0 | 0000 | 0010 |
| 8 | 0100 | 0 | 0000 | 0100 |

The quotient (not needed for the answer) is 10001100. After the last step the 3 low-order bits of the result are the **remainder**:
$$R = \\mathbf{100}$$

**4. Transmitted codeword** = data followed by the remainder:
$$\\text{Transmitted frame} = 10011101 \\;\\Vert\\; 100 = \\mathbf{10011101100}$$

**5. Check at the receiver:** dividing 10011101100 by 1001 gives remainder 000, so the frame is accepted as error free. Any non-zero remainder means an error has been detected.`
          },
          {
            qNo: "15a",
            module: 3,
            marks: 8,
            questionText: "a) Explain distance vector routing algorithm with an example.",
            syllabusRef: "Module 3 - Routing Algorithms (Tanenbaum Ch 5.2, Peterson & Davie Ch 3.3)",
            schemeRubric: "Explanation: 5 marks; example: 3 marks",
            conciseAnswer: "In distance vector routing each router keeps a table of the best known distance and next hop to every destination, periodically sends it to its direct neighbours, and updates its own table with the Bellman-Ford rule D(x,y) = min over neighbours v of [c(x,v) + D(v,y)]. Repeated exchanges make all tables converge; in the 4-router example below the tables settle after 2 exchange rounds.",
            detailedAnswer: `**1. Principle**
Distance vector (Bellman-Ford) routing is a **distributed** algorithm. Each router:
1. Keeps a **routing table** with an entry for every destination: the best known **cost (distance)** and the **next hop**.
2. Knows the cost of the link to each directly connected neighbour.
3. **Periodically sends its whole distance vector** only to its **neighbours**.
4. On receiving a neighbour $v$'s vector, recomputes its cost to every destination $y$:
$$D_x(y) = \\min_{v}\\{\\, c(x,v) + D_v(y) \\,\\}$$
where $c(x,v)$ is the cost of the link from $x$ to $v$ and $D_v(y)$ is the cost to $y$ advertised by $v$. The neighbour giving the minimum becomes the next hop.
5. Repeats until no table changes (convergence). Costs can be hop count, delay or bandwidth-based.

**2. Example network (link costs):**
\`\`\`
         1            6
    A ------- B ------------ D
     \\        |            /
      \\4      |2          /3
       \\      |          /
        +---- C --------+
\`\`\`
Links: A-B = 1, A-C = 4, B-C = 2, B-D = 6, C-D = 3. Each entry is written as cost (next hop).

\`\`\`
Round 0 (each router knows only its directly connected neighbours)
  A: B=1(B)  C=4(C)  D=inf
  B: A=1(A)  C=2(C)  D=6(D)
  C: A=4(A)  B=2(B)  D=3(D)
  D: A=inf   B=6(B)  C=3(C)

Round 1 (after the first exchange of vectors)
  A: B=1(B)  C=3(B)  D=7(B)      A to C: 1 + 2 = 3 via B is better than 4
  B: A=1(A)  C=2(C)  D=5(C)      B to D: 2 + 3 = 5 via C is better than 6
  C: A=3(B)  B=2(B)  D=3(D)
  D: A=7(B)  B=5(C)  C=3(C)

Round 2 (after the second exchange) - final
  A: B=1(B)  C=3(B)  D=6(B)      A to D: 1 + 5 = 6 via B
  B: A=1(A)  C=2(C)  D=5(C)
  C: A=3(B)  B=2(B)  D=3(D)
  D: A=6(C)  B=5(C)  C=3(C)      D to A: 3 + 3 = 6 via C
\`\`\`
A third exchange changes nothing, so the algorithm has **converged** after 2 rounds. For example, router A reaches D with cost 6 through B (path A-B-C-D). The tie for A to D in round 1 (7 via B or 7 via C) is broken arbitrarily.

**3. Remarks:** only neighbours talk to each other, which keeps the algorithm simple (RIP uses it), but it converges slowly after failures and suffers from the count-to-infinity problem.`
          },
          {
            qNo: "15b",
            module: 3,
            marks: 6,
            questionText: "b) Explain any three closed loop congestion control techniques.",
            syllabusRef: "Module 3 - Congestion Control Approaches (Tanenbaum Ch 5.3, Forouzan Ch 24)",
            schemeRubric: "Explanation of any three techniques: 2 marks each",
            conciseAnswer: "Closed loop techniques detect congestion and feed back a signal to the source: (1) choke packets, sent directly from the congested router to the source; (2) hop-by-hop backpressure, where a congested node tells its upstream neighbour to slow down and the effect propagates back to the source; and (3) explicit congestion notification, where routers mark packets in transit and the receiver returns the mark to the sender.",
            detailedAnswer: `A **closed loop** scheme works in three steps: **monitor** the system to detect congestion (for example queue length or packet loss), **pass** this information to places where action can be taken, and **adjust** the sources' behaviour.

**1. Choke packets**
- When a router finds an output line becoming congested (its utilisation exceeds a threshold), it sends a **choke packet** straight to the **source host** of the packet it just received. The original packet is tagged so that it is not choked again further on.
- On receiving a choke packet the source **reduces its sending rate** to that destination by a fixed percentage, and ignores further choke packets for a while. Delay: the choke packet takes a full trip back to the source.
\`\`\`
 Source ---> R1 ---> R2 (congested) ---> Destination
   ^                  |
   +---- choke packet-+
\`\`\`

**2. Hop-by-hop backpressure**
- Over long distances a choke packet reacts too slowly, so the signal is made to take effect **at every hop** on its way back: a congested router tells its upstream neighbour to slow down; that neighbour's own buffers then fill, so it tells its upstream neighbour to slow down, and so on until the source is reached. The congestion pressure moves backwards through the network hop by hop.
\`\`\`
 Source <--slow-- R1 <--slow-- R2 <--slow-- R3 (congested)
\`\`\`

**3. Explicit congestion notification (ECN) / warning bit**
- A router that is congested **marks** the packets passing through it by setting a bit in the header (the ECN bits in IP, or the warning bit in frame relay), instead of sending a separate packet.
- The destination copies the mark into its **acknowledgement** and returns it to the sender, which slows down (for TCP, it reduces its congestion window). This costs no extra packets and avoids drops.

**Related:** in **implicit signalling** the source infers congestion from observations such as timeouts or lost acknowledgements (TCP uses this); explicit signalling uses a notice from the network as above.

**Open loop versus closed loop:** open loop schemes prevent congestion by design (admission and traffic shaping), whereas closed loop schemes react after congestion starts.`
          },
          {
            qNo: "16a",
            module: 3,
            marks: 10,
            questionText: "a) Explain how routing is performed using link state algorithm. Illustrate with an example.",
            syllabusRef: "Module 3 - Routing Algorithms (Tanenbaum Ch 5.2, Peterson & Davie Ch 3.3)",
            schemeRubric: "Explanation: 6 marks; example: 4 marks",
            conciseAnswer: "In link state routing every router (1) discovers its neighbours, (2) measures the cost to each, (3) builds a link state packet, (4) floods it to all routers, and (5) runs Dijkstra's algorithm on the resulting map. In the 6-router example below, router A gets shortest paths A-B (7), A-C (9), A-C-F (11), A-C-D (20) and A-C-F-E (20).",
            detailedAnswer: `**1. Link state routing works in five steps**
1. **Discover neighbours:** each router sends a HELLO packet on every point-to-point link; the router at the other end replies with its identity (name).
2. **Measure the cost** of each link, for example delay by sending an ECHO packet and timing the reply (or use hop count or bandwidth).
3. **Build a link state packet (LSP):** contains the sender's identity, a sequence number, an age, and a list of its neighbours with the cost to each.
4. **Distribute the LSPs by flooding** to all routers. Each router forwards a new LSP on all lines except the one it came in on; the **sequence number** (and age) lets routers discard duplicates and old packets. LSPs are sent periodically or when a link changes.
5. **Compute the new routes:** after collecting LSPs from all routers, each router has the **complete map (graph)** of the network and runs **Dijkstra's shortest path algorithm** with itself as the source to build its routing table (next hop for every destination).

Dijkstra's algorithm: keep for every node a tentative distance (infinity at the start, 0 for the source); repeatedly **settle the unsettled node with the least distance** and relax the distances of its neighbours: $d(v) = \\min\\{d(v),\\ d(u) + c(u,v)\\}$.

**2. Example.** A network of six routers A to F with link costs:
A-B = 7, A-C = 9, A-F = 14, B-C = 10, B-D = 15, C-D = 11, C-F = 2, D-E = 6, E-F = 9.

Dijkstra from router A (each cell shows the tentative distance):
\`\`\`
Step  Settled   B    C    D    E    F     (A = 0)
 1    A         7    9    inf  inf  14
 2    B         7    9    22   inf  14    (D via B = 7 + 15 = 22)
 3    C         7    9    20   inf  11    (D via C = 9 + 11 = 20, F via C = 9 + 2 = 11)
 4    F         7    9    20   20   11    (E via F = 11 + 9 = 20)
 5    D         7    9    20   20   11
 6    E         7    9    20   20   11
\`\`\`
**Routing table of router A:**
| Destination | Cost | Shortest path | Next hop |
|---|---|---|---|
| B | 7 | A-B | B |
| C | 9 | A-C | C |
| F | 11 | A-C-F | C |
| D | 20 | A-C-D | C |
| E | 20 | A-C-F-E | C |

**3. Properties:** because every router has the same map, convergence is fast and there is no count-to-infinity; the price is memory for the database and CPU for Dijkstra. OSPF and IS-IS use this method.`
          },
          {
            qNo: "16b",
            module: 3,
            marks: 4,
            questionText: "b) Write notes on load shedding.",
            syllabusRef: "Module 3 - Congestion Control Approaches (Tanenbaum Ch 5.3, Forouzan Ch 24)",
            schemeRubric: "Definition: 1 mark; explanation: 3 marks",
            conciseAnswer: "Load shedding means that when a router is flooded with more packets than it can handle, it deliberately discards some of them. Which packets to drop depends on the application: for file transfer old packets are worth more (\"wine\"), for real-time media new packets are worth more (\"milk\"). Random early detection (RED) starts dropping packets at random before the queue is full so that senders slow down early.",
            detailedAnswer: `**Definition:** **load shedding** is a congestion control method in which routers that are being inundated with packets they cannot handle simply **throw packets away**. It is the last resort when the other methods are not enough.

**Explanation:**
- A router has finite buffers. When they are full, packets must be dropped; load shedding says to choose **which** packets to drop intelligently, not just the last to arrive.
- **Which packets to drop depends on the application:**
  - **Wine policy (drop new packets):** for file transfer, an old packet is worth more than a new one, because dropping packet 6 and keeping packets 7 to 10 forces the receiver to hold packets it cannot yet use. Dropping the newest packets is better.
  - **Milk policy (drop old packets):** for real-time multimedia, a new packet is worth more than an old one, because old data is already too late.
- **Priority marking:** senders can mark packets with priority classes so that low-priority packets are dropped first (for example the less important frames of a compressed video).
- **Random Early Detection (RED):** the router monitors its average queue length and, when it exceeds a threshold, drops (or marks) a random arriving packet **before the buffer is full**. Senders see the loss, for example through TCP, and reduce their rates, so congestion is controlled early and fairly.
- Load shedding in combination with an end-to-end protocol that reacts to loss (such as TCP) keeps the network stable.`
          },
          {
            qNo: "17a",
            module: 4,
            marks: 7,
            questionText: "a) Illustrate subnetting with an example.",
            syllabusRef: "Module 4 - IPv4 Addressing & Subnetting (Forouzan Ch 19, Peterson & Davie Ch 3.2)",
            schemeRubric: "Explanation of subnetting with example: 7 marks",
            conciseAnswer: "Subnetting divides one IP network into smaller subnets by borrowing bits from the host part and using them as a subnet number. Example: 192.168.1.0/24 split into 4 subnets borrows 2 bits, giving mask 255.255.255.192 (/26), 4 subnets of 64 addresses each (62 usable hosts), starting at 192.168.1.0, 192.168.1.64, 192.168.1.128 and 192.168.1.192.",
            detailedAnswer: `**1. Concept:** **subnetting** divides a single network address (class A, B or C) into several smaller **subnetworks**. Bits are borrowed from the **host** field and used as a **subnet** field; the **subnet mask** (1s for network and subnet bits, 0s for host bits) tells a router which part is the network.
\`\`\`
 Before:  | Network (24 bits)          | Host (8 bits)             |
 After :  | Network (24) | Subnet (2) | Host (6)                  |    mask /26
\`\`\`
Benefits: smaller broadcast domains, better security and management, efficient use of addresses, and the outside world still sees one network.
For $s$ subnet bits and $h$ host bits: number of subnets $= 2^s$, usable hosts per subnet $= 2^h - 2$ (all-0s host is the subnet address, all-1s host is the subnet broadcast address).

**2. Example:** the network 192.168.1.0/24 (class C, default mask 255.255.255.0) is to be split into **4 subnets**.
- Subnets needed: 4 $= 2^2$, so borrow $s = 2$ bits.
- New prefix: $24 + 2 = 26$, subnet mask **255.255.255.192** (last octet 11000000).
- Host bits remaining: $h = 8 - 2 = 6$, so each subnet has $2^6 = 64$ addresses and $2^6 - 2 = 62$ usable hosts.

| Subnet | Network address | Usable host range | Broadcast address |
|---|---|---|---|
| 0 | 192.168.1.0/26 | 192.168.1.1 to 192.168.1.62 | 192.168.1.63 |
| 1 | 192.168.1.64/26 | 192.168.1.65 to 192.168.1.126 | 192.168.1.127 |
| 2 | 192.168.1.128/26 | 192.168.1.129 to 192.168.1.190 | 192.168.1.191 |
| 3 | 192.168.1.192/26 | 192.168.1.193 to 192.168.1.254 | 192.168.1.255 |

**3. How a router finds the subnet:** it ANDs the destination address with the subnet mask. For the host 192.168.1.100:
\`\`\`
 192.168.1.100 = 11000000.10101000.00000001.01100100
 255.255.255.192 = 11111111.11111111.11111111.11000000
 AND             = 11000000.10101000.00000001.01000000 = 192.168.1.64
\`\`\`
so the host is on subnet 1 (192.168.1.64/26) and is delivered locally if the sender is on that subnet; otherwise the packet goes through a router.`
          },
          {
            qNo: "17b",
            module: 4,
            marks: 7,
            questionText: "b) Draw the IPv6 header. Explain the significance of each field.",
            syllabusRef: "Module 4 - IPv6 Next-Generation Protocol (Tanenbaum Ch 5.6, Forouzan Ch 26)",
            schemeRubric: "Diagram: 3 marks; explanation: 4 marks",
            conciseAnswer: "The IPv6 base header is a fixed 40 bytes: Version (4 bits), Traffic Class (8), Flow Label (20), Payload Length (16), Next Header (8), Hop Limit (8), Source Address (128) and Destination Address (128). It has no header checksum, no header length and no fragmentation fields; options are moved to extension headers.",
            detailedAnswer: `**1. IPv6 header (32 bits per row):**
\`\`\`
 0       4              12                                  31
+-------+---------------+-----------------------------------+
|Version| Traffic Class |            Flow Label             |
|  (4)  |      (8)      |               (20)                |
+-------+---------------+---------------+---------+---------+
|        Payload Length (16)            |Next Hdr | Hop Lim |
|                                       |   (8)   |   (8)   |
+---------------------------------------+---------+---------+
|                                                           |
|                 Source Address (128 bits)                 |
|                                                           |
+-----------------------------------------------------------+
|                                                           |
|              Destination Address (128 bits)               |
|                                                           |
+-----------------------------------------------------------+
\`\`\`
The size is $4 + 8 + 20 + 16 + 8 + 8 + 128 + 128 = 320$ bits = **40 bytes**, fixed.

**2. Significance of each field**
- **Version (4 bits):** the IP version number, 6.
- **Traffic Class (8 bits):** priority or class of service of the packet (differentiated services and ECN), so routers can give preferential treatment.
- **Flow Label (20 bits):** identifies a **flow** (a sequence of packets from a source to a destination needing the same handling), allowing routers to treat them alike for QoS, for example real-time traffic, without examining the transport header.
- **Payload Length (16 bits):** the number of bytes following the 40-byte base header, including extension headers (up to 65,535; larger with the jumbo payload option).
- **Next Header (8 bits):** tells which header follows the base header: an extension header (hop-by-hop options, routing, fragment, authentication, ESP) or the transport protocol (6 = TCP, 17 = UDP, 58 = ICMPv6). It replaces the IPv4 Protocol field.
- **Hop Limit (8 bits):** decremented by every router; the packet is discarded when it reaches zero (the IPv4 TTL).
- **Source address (128 bits)** and **Destination address (128 bits):** IPv6 addresses of the sender and the intended receiver; the 128-bit space ($3.4 \\times 10^{38}$ addresses) solves address exhaustion.

**3. Differences from IPv4:** IPv6 removes the header length (fixed size), the **header checksum** (saves router work since the link and transport layers check), and the fragmentation fields (routers do not fragment; only the source does, using an extension header), and moves options to **extension headers**, so routers process packets faster.`
          },
          {
            qNo: "18a",
            module: 4,
            marks: 9,
            questionText: "a) Describe the features of BGP. How does BGP avoid count to infinity problem?",
            syllabusRef: "Module 4 - Internet Routing Architectures (Tanenbaum Ch 5.6.5 - 5.6.7, Kurose & Ross Ch 4.6)",
            schemeRubric: "Features of BGP: 3 marks; explanation of the count to infinity problem: 3 marks; how BGP avoids it: 3 marks",
            conciseAnswer: "BGP is the inter-domain, path vector, policy-based routing protocol of the Internet; it runs over TCP port 179, supports CIDR and sends incremental updates. Count-to-infinity is a distance vector problem where routers keep raising a route's metric by bouncing stale information. BGP avoids it because every advertisement carries the full AS path, and a router rejects any route whose AS path already contains its own AS number.",
            detailedAnswer: `**1. Features of BGP (Border Gateway Protocol, BGP-4)**
- **Inter-domain (exterior) protocol:** exchanges reachability between autonomous systems (eBGP between ASes, iBGP inside an AS).
- **Path vector protocol:** each route carries the **list of ASes** it passes through (AS_PATH) and other attributes (NEXT_HOP, LOCAL_PREF, MED).
- **Policy-based:** routes are selected and advertised according to administrative and business policies, not only shortest distance.
- **Uses TCP (port 179)** for reliable delivery of its messages (OPEN, UPDATE, KEEPALIVE, NOTIFICATION).
- **Incremental updates:** after the initial exchange of the table only changes (announcements and withdrawals) are sent.
- **CIDR support** with route aggregation, so the global table is smaller.

**2. The count-to-infinity problem**
It affects **distance vector** protocols. Suppose $A - B - C$ with $A$ reaching $C$ through $B$. If the link $B - C$ fails, $B$ may hear $A$'s old advertisement ("I reach $C$ at cost 2") and conclude "I can reach $C$ through $A$ at cost 3"; then $A$ concludes cost 4 through $B$, $B$ cost 5, and so on. The cost counts upwards until it reaches the "infinity" value (16 in RIP), slowly, with packets looping meanwhile.

**3. How BGP avoids it**
- BGP advertises **the complete path** (sequence of AS numbers) with each route, not just a distance, so a router knows exactly which ASes the route passes through.
- **Loop detection:** when a router receives an UPDATE, it checks the AS_PATH. If its **own AS number is already in the path**, the route has come back to it and is **rejected**.
- Example: AS1 - AS2 - AS3, where AS3 is the origin. AS2 advertises the route to AS1 with path (AS2, AS3). If the link AS2 - AS3 fails, AS2 withdraws the route. AS1 cannot send it back to AS2 as a "new" route, because the path would be (AS1, AS2, AS3), which contains AS2, so AS2 rejects it. The false route cannot circulate, so no counting up occurs.
- Explicit **withdrawal** of a route in an UPDATE removes it quickly.`
          },
          {
            qNo: "18b",
            module: 4,
            marks: 5,
            questionText: "b) Draw and explain BOOTP message format.",
            syllabusRef: "Module 4 - Address Translation Protocols (Tanenbaum Ch 5.6, Forouzan Ch 21)",
            schemeRubric: "Diagram: 2.5 marks; explanation: 2.5 marks",
            conciseAnswer: "BOOTP lets a diskless host learn its IP address and boot file from a server. A BOOTP message carried in UDP (client port 68, server port 67) is 300 bytes: op, hardware type, hardware length, hops, transaction ID, seconds, client IP, your IP, server IP, gateway IP, client hardware address (16 bytes), server name (64), boot file name (128) and vendor-specific options (64).",
            detailedAnswer: `**BOOTP** (Bootstrap Protocol) is a client-server protocol that configures a host at start-up: it gives the host its IP address, the server's address, the router's address and the name of a boot file. It runs over UDP (server port 67, client port 68).

**1. Message format (the fixed message is 300 bytes):**
\`\`\`
  8 bits      8 bits       8 bits      8 bits
+----------+-----------+-----------+-----------+
|  Opcode  | Hard.type | Hard.len  | Hop count |   1 byte each
+----------+-----------+-----------+-----------+
|             Transaction ID (4 bytes)          |
+-----------------------+-----------------------+
|   Seconds (2 bytes)   |    Unused (2 bytes)   |
+-----------------------+-----------------------+
|       Client IP address (ciaddr, 4 bytes)     |
+-----------------------------------------------+
|        Your IP address (yiaddr, 4 bytes)      |
+-----------------------------------------------+
|       Server IP address (siaddr, 4 bytes)     |
+-----------------------------------------------+
|      Gateway IP address (giaddr, 4 bytes)     |
+-----------------------------------------------+
|    Client hardware address (chaddr, 16 bytes) |
+-----------------------------------------------+
|        Server name (sname, 64 bytes)          |
+-----------------------------------------------+
|        Boot file name (file, 128 bytes)       |
+-----------------------------------------------+
|        Options / vendor specific (64 bytes)   |
+-----------------------------------------------+
\`\`\`
Total: $1+1+1+1+4+2+2+4+4+4+4+16+64+128+64 = 300$ bytes.

**2. Fields**
- **Opcode (1 byte):** 1 = boot request, 2 = boot reply.
- **Hardware type (1 byte):** type of network hardware (1 = Ethernet). **Hardware length (1 byte):** length of the hardware address in bytes (6 for Ethernet).
- **Hop count (1 byte):** set to 0 by the client and incremented by a relay agent that forwards the request.
- **Transaction ID (4 bytes):** random number chosen by the client to match replies to requests.
- **Seconds (2 bytes):** seconds since the client began booting. The next 2 bytes are unused (later redefined as flags).
- **Client IP address:** filled by the client if it already knows its address, otherwise 0.
- **Your IP address:** the address the server assigns to the client (filled in the reply).
- **Server IP address:** address of the server, filled in the reply. **Gateway IP address:** filled by a relay agent so that the server can reply across routers.
- **Client hardware address (16 bytes):** the client's MAC address, used by the server to look up the right entry.
- **Server name (64 bytes)** and **Boot file name (128 bytes):** optional; the name of the boot server and the path of the file the client should fetch (by TFTP) to boot.
- **Options (64 bytes):** vendor-specific information such as subnet mask, router and DNS server addresses (extended in DHCP).

**3. Operation:** the client broadcasts a BOOTREQUEST with its hardware address (source IP 0.0.0.0, destination 255.255.255.255); the server looks up the table and sends a BOOTREPLY with the IP address and boot information.`
          },
          {
            qNo: "19a",
            module: 5,
            marks: 6,
            questionText: "a) How does FTP handle file transfer operation?",
            syllabusRef: "Module 5 - Application Protocols (Email, FTP, SNMP) (Forouzan Ch 27 - 28, Tanenbaum Ch 7)",
            schemeRubric: "Working of FTP: 4 marks; diagram: 2 marks",
            conciseAnswer: "FTP uses two TCP connections. The client opens a persistent control connection to server port 21 for commands and replies (USER, PASS, RETR, STOR and numeric codes), and for each file or directory listing a separate data connection is opened (server port 20 in active mode, or a server-chosen port in passive mode), used for the transfer and then closed.",
            detailedAnswer: `**FTP** (File Transfer Protocol) transfers files between a client and a server over **TCP**. It separates control information from data using **two connections**.

**1. Diagram:**
\`\`\`
 +----------------+   Control connection (TCP port 21)    +----------------+
 |   FTP client   |<------------------------------------->|   FTP server   |
 |  control proc. |   commands and replies (persistent)   | control proc.  |
 |                |                                       |                |
 |  data transfer |   Data connection (TCP port 20)       | data transfer  |
 |   process      |<=====================================>|   process      |
 +----------------+   files / listings (per transfer)     +----------------+
\`\`\`

**2. Working**
1. The client opens a **control connection** to the server's port 21. It stays open for the whole session and carries ASCII commands and numeric replies.
2. The user is **authenticated**: USER name (reply 331), PASS password (reply 230).
3. The client chooses file type (ASCII or image/binary), data structure (file, record or page) and transmission mode (stream, block or compressed) with commands such as TYPE.
4. For each transfer a **data connection** is created: in **active mode** the client sends PORT with its address and port and the server connects from port 20; in **passive mode** the client sends PASV, the server answers with a port it listens on, and the client connects (this works through firewalls).
5. The client sends **RETR file** (download), **STOR file** (upload) or **LIST** (directory). The server replies 150 (opening data connection), sends the data, and then 226 (transfer complete).
6. The **data connection is closed** after the file ends; the control connection stays up for more commands. QUIT ends the session (reply 221).

**3. Example session:**
\`\`\`
 C: USER jane            S: 331 Password required
 C: PASS ****            S: 230 Logged in
 C: PASV                 S: 227 Entering passive mode (h1,h2,h3,h4,p1,p2)
 C: RETR notes.txt       S: 150 Opening data connection ... 226 Transfer complete
 C: QUIT                 S: 221 Goodbye
\`\`\`
FTP uses **out-of-band control**: commands never travel on the data connection, so a transfer can be aborted or monitored independently.`
          },
          {
            qNo: "19b",
            module: 5,
            marks: 8,
            questionText: "b) What is the significance of SNMP? Describe its components.",
            syllabusRef: "Module 5 - Application Protocols (Email, FTP, SNMP) (Forouzan Ch 27 - 28, Tanenbaum Ch 7)",
            schemeRubric: "Significance of SNMP: 3 marks; explanation of the SNMP components: 5 marks",
            conciseAnswer: "SNMP (Simple Network Management Protocol) lets an administrator monitor, configure and troubleshoot network devices from one place. Its components are the SNMP manager (management station), the SNMP agent (software in each managed device), the Management Information Base (MIB) holding the managed objects, and the Structure of Management Information (SMI) that defines how they are named. Messages such as GetRequest, SetRequest and Trap run over UDP ports 161 and 162.",
            detailedAnswer: `**1. Significance of SNMP**
- Large networks have hundreds of routers, switches and servers. **SNMP** is the standard application layer protocol of the TCP/IP suite for **managing and monitoring** them from a central station.
- It allows an administrator to **monitor** performance (traffic, errors, CPU load), **detect faults** (a link or device down, through traps), **configure** devices remotely (set values) and **plan** capacity, **without** physical access.
- It is simple, vendor-independent and widely supported, and it uses UDP, so it adds little load.

**2. Components of SNMP**
\`\`\`
 +----------------+   Get / Set requests (UDP 161)    +--------------------+
 |  SNMP manager  |---------------------------------->|   SNMP agent       |
 | (management    |<----------------------------------|   (in the device)  |
 |  station)      |   responses and traps (UDP 162)   |   +-------------+  |
 +----------------+                                   |   |     MIB     |  |
                                                      |   +-------------+  |
                                                      +--------------------+
\`\`\`
1. **SNMP manager (network management station, NMS):** a host running management software. It **polls** agents, collects the data, sets parameters and receives **traps**. It controls the managed devices.
2. **SNMP agent:** a program inside each **managed device** (router, switch, server, printer). It keeps the device's information in a database, answers the manager's requests and sends **trap** messages when an important event occurs (for example a link going down).
3. **Management Information Base (MIB):** a collection of **managed objects** (counters, status values, settings) of a device, arranged in a tree and identified by an **object identifier (OID)**. Examples: interface traffic counters, system uptime.
4. **Structure of Management Information (SMI):** the rules for **defining and naming** the managed objects and their data types, so that manager and agent interpret them in the same way.
5. **SNMP protocol messages:** GetRequest (read a value), GetNextRequest (read the next object, for walking a table), SetRequest (change a value), Response (reply to a request) and Trap (unsolicited alert from an agent). Requests go to UDP port 161 and traps to UDP port 162.

**3. Operation:** the manager and agent exchange messages in a request and response manner; SNMPv3 adds authentication and encryption to the earlier versions v1 and v2c.`
          },
          {
            qNo: "20a",
            module: 5,
            marks: 7,
            questionText: "a) Three-way handshake procedure is used to establish a connection in TCP rather than two-way handshake. Justify.",
            syllabusRef: "Module 5 - Transmission Control Protocol (TCP) (Tanenbaum Ch 6.5, Kurose & Ross Ch 3.5)",
            schemeRubric: "Limitations of the two-way handshake: 3 marks; three-way handshake diagram and explanation: 4 marks",
            conciseAnswer: "With a two-way handshake the server cannot tell whether a connection request is new or a delayed duplicate, and the client never confirms the server's initial sequence number, so the server may open half-open connections for requests nobody made. In the three-way handshake (SYN, SYN+ACK, ACK) each side chooses an initial sequence number and has it acknowledged, which lets a host reject old duplicates and synchronise both directions reliably.",
            detailedAnswer: `**1. Limitations of a two-way handshake** (client sends CONNECTION REQUEST, server replies CONNECTION ACCEPTED, and the connection is considered open):
- **Delayed duplicates:** the network can delay and duplicate packets. If an old duplicate request from a finished connection arrives at the server, it cannot tell it from a new one: it accepts, allocates buffers and starts waiting for data, while the client (which never asked) ignores it. The server then holds a **half-open connection** and wastes resources (and may even accept old duplicate data).
- **No synchronisation of the server's sequence numbers:** the client never confirms the initial sequence number the server chose, so the server does not know whether the client received it.
- A host cannot verify that the other side is alive and willing, as only one side has confirmed anything.

**2. Three-way handshake (SYN, SYN+ACK, ACK)**
\`\`\`
     Client                               Server
       |                                     |   (server in LISTEN state)
       |--- SYN, seq = x ------------------->|   1. client's initial sequence number x
       |                                     |
       |<-- SYN+ACK, seq = y, ack = x + 1 ---|   2. server's number y, confirms x
       |                                     |
       |--- ACK, seq = x + 1, ack = y + 1 -->|   3. client confirms y; data may follow
       |                                     |
     ESTABLISHED                         ESTABLISHED
\`\`\`
Example with $x = 1000$ and $y = 5000$: step 1: SYN with seq = 1000; step 2: SYN+ACK with seq = 5000 and ack = 1001; step 3: ACK with ack = 5001.

**3. Why the third message solves the problem**
- Each side picks its own **initial sequence number** and the other side **acknowledges** it, so both sequence number spaces are synchronised and each host knows the other has received it.
- **Delayed duplicate SYN:** the server answers an old SYN with a SYN+ACK. The client did not initiate this connection, so it sends a **RST (reject)** and the server abandons the half-open connection. Nothing is delivered:
\`\`\`
 Client                                Server
   |        (old duplicate SYN, seq = x)--->|
   |<-- SYN+ACK, seq = y, ack = x + 1 ------|
   |--- RST (not requested) --------------->|   server drops the connection
\`\`\`
Therefore, three messages are the minimum to establish a reliable full-duplex connection.`
          },
          {
            qNo: "20b",
            module: 5,
            marks: 7,
            questionText: "b) Describe the working of electronic mail system.",
            syllabusRef: "Module 5 - Application Protocols (Email, FTP, SNMP) (Tanenbaum Ch 7.2 - 7.4, Forouzan Ch 27 - 28)",
            schemeRubric: "Diagram: 3 marks; explanation: 4 marks",
            conciseAnswer: "The sender composes the message in a user agent, which submits it to the sender's mail server (MTA) with SMTP. That server finds the recipient's mail server through the DNS MX record and delivers the message with SMTP over TCP port 25. The message waits in the recipient's mailbox until the recipient's user agent retrieves it with POP3, IMAP or HTTP.",
            detailedAnswer: `**1. Diagram:**
\`\`\`
 Alice                                                                Bob
+--------+  1 SMTP   +----------+  3 SMTP over TCP  +----------+  5 POP3 /  +--------+
|  User  |---------->| Alice's  |------------------>|  Bob's   |<-----------|  User  |
| Agent  |           | mail     |     ^             |  mail    |    IMAP    | Agent  |
+--------+           | server   |     | 2 DNS (MX)  |  server  |            +--------+
                     | (MTA)    |-----+             | mailbox  |
                     +----------+                   +----------+  4 stored in Bob's mailbox
\`\`\`

**2. Working (Alice sends a message to Bob)**
1. **Composition:** Alice writes the message in her **user agent** (UA) and gives Bob's address, bob@example.com. The UA formats it (header: From, To, Subject, Date; body; MIME for attachments).
2. **Submission:** the UA sends the message to Alice's **mail server (message transfer agent, MTA)** using **SMTP**. The message is placed in the outgoing queue.
3. **Finding the destination:** Alice's MTA asks **DNS** for the **MX record** of example.com to find Bob's mail server.
4. **Transfer:** Alice's MTA, acting as an SMTP client, opens a TCP connection to port 25 of Bob's MTA and runs the SMTP dialogue:
\`\`\`
 S: 220 mail.example.com ready
 C: HELO alice-host                S: 250 OK
 C: MAIL FROM:<alice@school.edu>   S: 250 OK
 C: RCPT TO:<bob@example.com>      S: 250 OK
 C: DATA                           S: 354 Start mail input
 C: (header and body) .            S: 250 Message accepted
 C: QUIT                           S: 221 Bye
\`\`\`
5. **Delivery:** Bob's MTA stores the message in Bob's **mailbox**. If it cannot be delivered, a failure notice is returned to Alice (a bounce).
6. **Retrieval:** SMTP only pushes mail, so Bob's UA **fetches** it from the mailbox with **POP3** (downloads and usually deletes) or **IMAP** (manages mail on the server), or with HTTP if Bob uses web mail. Bob then reads, replies, forwards, files or deletes it.

**3. Key points:** SMTP uses TCP and plain-text commands; the **MTA** moves the mail, the **UA** is the user interface, and **access protocols** are separate from SMTP.`
          }
        ]
      }
    ]
  }
];
