// APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY (KTU)
// CST303 COMPUTER NETWORKS - OFFICIAL MODEL EXAM SOLUTIONS & VALUATION SCHEMES
// Author: Jane Rose | Assistant Professor, Department of Computer Science and Engineering

export const examSolutionsData = [
  {
    paperId: "cst303-dec2022",
    paperCode: "1100CST303122106",
    examTitle: "KTU B.Tech S5 Regular & Supplementary Examination, December 2022 (2019 Scheme)",
    subject: "CST 303 COMPUTER NETWORKS",
    totalMarks: 100,
    duration: "3 Hours",
    schemeSource: "Official University Evaluation Scheme B2 CST303 CN QP SCHEME1-Dec 2022.pdf",
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
            schemeRubric: "Justification/Explanation: 2 marks, Diagram: 1 mark",
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
            schemeRubric: "Formula: 1 mark, Substitution & calculation: 1 mark, Final answer with units: 1 mark",
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
            schemeRubric: "Minimum and maximum data field length: 1.5 marks, Padding explanation: 1.5 marks",
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
            schemeRubric: "Any 3 correct differences: 1 mark each",
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
            schemeRubric: "Statement of principle: 2 marks, Sink tree diagram: 1 mark",
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
            schemeRubric: "Naming two methods: 1 mark each, Brief description: 1 mark",
            conciseAnswer: "Two primary methods are: (1) Reverse Path Forwarding (RPF) / Distance Vector Multicast Routing Protocol (DVMRP), and (2) Core-Based Trees (CBT) / Protocol Independent Multicast (PIM) Sparse Mode.",
            detailedAnswer: `**1. Reverse Path Forwarding (RPF) / Flood & Prune:**
- When a multicast packet arrives at a router on an incoming link, the router checks whether that link is the one it normally uses to send unicast packets back to the source.
- If YES: packet arrived along the shortest reverse path, so router duplicates and forwards it to all other interfaces.
- If NO: packet is discarded as a potential duplicate.
- Uninterested downstream subnets send **Prune messages** to stop unwanted traffic.

**2. Core-Based Trees (CBT) / Shared Trees:**
- A single designated router is chosen as the "Core" (or Rendezvous Point - RP) for each multicast group.
- Receivers send unicast join requests toward the Core, building a shared multicast delivery tree.`
          },
          {
            qNo: 7,
            module: 4,
            marks: 3,
            questionText: "In IP, the checksum covers only the header and not the data. Identify the reason for selecting this design.",
            syllabusRef: "Module 4 - IPv4 Header Design (Tanenbaum Ch 5.5.3)",
            schemeRubric: "Valid technical reasons: 3 marks",
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
            schemeRubric: "Difference: 2 marks, One example each: 1 mark",
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
            schemeRubric: "True end-to-end explanation: 1.5 marks, Need for dual flow/error control: 1.5 marks",
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
            schemeRubric: "Explanation of Port 21 (Control) & Port 20 (Data): 2 marks, Diagram: 1 mark",
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
            schemeRubric: "Justification: 2 marks, Diagram: 2 marks, Explanation of 4 layers: 1 mark each (4 marks)",
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
            qNo: "13b",
            module: 2,
            marks: 8,
            questionText: "Compare Go back N protocol with Selective Repeat protocol using required diagrams.",
            syllabusRef: "Module 2 - Sliding Window Protocols (Tanenbaum Ch 3.4)",
            schemeRubric: "Comparison points: 4 marks, GBN & SR operation diagrams: 4 marks",
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
            qNo: "16a",
            module: 3,
            marks: 6,
            questionText: "What is count to infinity problem? Describe two techniques to solve the count to infinity problem in distance vector routing algorithm.",
            syllabusRef: "Module 3 - Distance Vector Routing (Tanenbaum Ch 5.2.4)",
            schemeRubric: "Count to infinity explanation: 3 marks, Two solutions (Split Horizon, Poison Reverse): 3 marks",
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
            qNo: "17a",
            module: 4,
            marks: 8,
            questionText: "Illustrate the sub-netting concept. A company is granted the site address 181.56.0.0 (class B). The company needs 1000 subnets. Find the number of subnets possible and hosts which can be connected in each subnet.",
            syllabusRef: "Module 4 - IP Subnetting (Forouzan Ch 19, Peterson & Davie Ch 3.2)",
            schemeRubric: "Subnetting concept explanation: 3 marks, Subnet bits & possible subnets: 3 marks, Usable hosts calculation: 2 marks",
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
            qNo: "19a",
            module: 5,
            marks: 8,
            questionText: "Describe the TCP congestion control approaches with necessary diagrams.",
            syllabusRef: "Module 5 - TCP Congestion Control AIMD (Tanenbaum Ch 6.5.9)",
            schemeRubric: "Four phases (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery): 6 marks, Diagram: 2 marks",
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
    schemeSource: "Official University Evaluation Scheme CST303-DRAFT SCHEME1.pdf",
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
            schemeRubric: "Any three valid differences: 1 mark each (3 marks)",
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
            schemeRubric: "Definition: 2 marks, Example: 1 mark",
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
            schemeRubric: "Difference in sensing/transmission behavior: 2 marks, Comparison of collision probability: 1 mark",
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
            schemeRubric: "1 mark each for (i), (ii), and (iii): 3 marks",
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
            qNo: 14,
            module: 2,
            marks: 7,
            questionText: "b) A bit stream 10011101 is transmitted using the CRC method. The generator polynomial is x^3 + 1. Show the actual bit string transmitted.",
            syllabusRef: "Module 2 - CRC Generation (Peterson & Davie Ch 2.4, Tanenbaum Ch 3.2)",
            schemeRubric: "Generator bit representation: 1 mark, Appending zeros: 1 mark, Modulo-2 division steps: 3 marks, Final transmitted frame: 2 marks",
            conciseAnswer: "Generator polynomial x^3 + 1 corresponds to bit string 1001 (degree 3). Append 3 zeros to data 10011101 -> 10011101000. Perform Modulo-2 binary polynomial division: Remainder is 100. Transmitted frame = 10011101100.",
            detailedAnswer: `**1. Convert Generator Polynomial to Binary:**
$$G(x) = x^3 + 1 = 1 \\cdot x^3 + 0 \\cdot x^2 + 0 \\cdot x^1 + 1 \\cdot x^0 \\implies \\mathbf{1001}$$
Degree of polynomial ($k$) = **3 bits**.

**2. Prepare Dividend:**
- Given Data: $D = 10011101$
- Append $k = 3$ zeros to data:
  $$D' = 10011101\\mathbf{000}$$

**3. Modulo-2 Polynomial Division (XOR Division):**
\`\`\`
          10001101  (Quotient)
      -----------------
1001 | 10011101000
       1001
       ----
       00001101000 -> bring down
           1101
           1001
           ----
            1000
            1001
            ----
             00100  -> bring down 0
               100  (Remainder R = 100)
\`\`\`

Detailed step check:
- $1001 \\oplus 1001 = 0000$. Bring down next bits: \`1101\`.
- \`1101\` $\\oplus 1001 =$ \`0100\`. Bring down \`0\` $\\to$ \`1000\`.
- \`1000\` $\\oplus 1001 =$ \`0001\`. Bring down \`00\` $\\to$ remainder is **100** (3 bits).

**4. Final Transmitted Codeword:**
$$\\text{Transmitted Frame} = \\text{Data} + \\text{Remainder} = 10011101 + 100 = \\mathbf{10011101100}$$`
          }
        ]
      }
    ]
  }
];
