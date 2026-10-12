// KTU CST303 COMPUTER NETWORKS - COMPLETE SYLLABUS & LAB DATA
// Mapped to 2019 Scheme APJ Abdul Kalam Technological University

export const syllabusData = {
  courseCode: "CST303",
  courseName: "COMPUTER NETWORKS",
  credits: 4,
  semester: "S5 B.Tech CSE",
  hoursPerWeek: "3-1-0",
  courseOutcomes: [
    { code: "CO1", text: "Explain the visual building blocks and layering principles in computer networks (OSI & TCP/IP).", blooms: "Understand" },
    { code: "CO2", text: "Analyze framing, error control (CRC, Hamming) and flow control (Sliding Window) in Data Link Layer.", blooms: "Analyze" },
    { code: "CO3", text: "Compare and compute unicast and multicast routing algorithms and congestion control mechanisms.", blooms: "Apply" },
    { code: "CO4", text: "Design subnets (CIDR, VLSM), translate addresses (ARP/RARP), and formulate internetworking strategies.", blooms: "Create" },
    { code: "CO5", text: "Analyze transport layer flow & congestion control (TCP/UDP) and evaluate application layer protocols (DNS, SMTP, FTP).", blooms: "Analyze" }
  ],
  modules: [
    {
      id: "mod-1",
      number: 1,
      title: "Building a Network & Physical Layer",
      hours: 9,
      description: "Requirements, Connectivity, Cost-effective resource sharing, Network Architectures, Layering, Reference Models, Topologies, Transmission Media, Physical Layer Encoding.",
      topics: [
        {
          name: "Building a Network",
          details: "Requirements, Perspectives, Scalable connectivity, Cost-effective resource sharing, Support for common services.",
          textbookRef: "Peterson & Davie Ch 1.1 - 1.2"
        },
        {
          name: "Layering Principles & Reference Models",
          details: "Layering and protocols, OSI 7-Layer Reference Model, TCP/IP Protocol Stack Architecture, Comparison between OSI and TCP/IP.",
          textbookRef: "Tanenbaum Ch 1.3 - 1.4, Forouzan Ch 2"
        },
        {
          name: "Network Classification & Topologies",
          details: "Scale-based classification (PAN, LAN, MAN, WAN), Physical & Logical Topologies (Mesh, Star, Bus, Ring, Tree, Hybrid).",
          textbookRef: "Forouzan Ch 1.2, Tanenbaum Ch 1.2"
        },
        {
          name: "Transmission Media & Fiber Optics",
          details: "Guided Media: Twisted pair (UTP/STP), Coaxial cable, Fiber optic cable (Total internal reflection, step-index, graded-index, modal dispersion); Unguided media.",
          textbookRef: "Forouzan Ch 7, Tanenbaum Ch 2.2 - 2.3"
        },
        {
          name: "Physical Layer Encoding",
          details: "Digital signaling, NRZ, NRZI, Manchester encoding, Differential Manchester encoding, 4B/5B block coding.",
          textbookRef: "Peterson & Davie Ch 2.2, Forouzan Ch 4.1"
        }
      ]
    },
    {
      id: "mod-2",
      number: 2,
      title: "Direct Link Networks & Data Link Layer",
      hours: 10,
      description: "Framing, Error Detection & Correction, Flow & Error Control, Sliding Window Protocols, MAC Sublayer & CSMA.",
      topics: [
        {
          name: "Framing Mechanisms",
          details: "Character-oriented / Byte stuffing (BISYNC, PPP), Bit-oriented / Bit stuffing (HDLC frame structure), Clock-based framing (SONET STS-1).",
          textbookRef: "Peterson & Davie Ch 2.3, Tanenbaum Ch 3.1"
        },
        {
          name: "Error Detection & Correction",
          details: "Types of transmission errors, Parity checks (2D parity), Internet Checksum algorithm, Cyclic Redundancy Check (CRC polynomial division).",
          textbookRef: "Forouzan Ch 10, Peterson & Davie Ch 2.4"
        },
        {
          name: "Flow & Error Control (Sliding Window)",
          details: "Stop-and-Wait ARQ, Go-Back-N ARQ (Window size $2^m - 1$, cumulative ACK), Selective Repeat ARQ (Window size $2^{m-1}$, individual ACK).",
          textbookRef: "Tanenbaum Ch 3.3 - 3.4, Forouzan Ch 11"
        },
        {
          name: "Multiple Access Protocols (MAC)",
          details: "Random access: ALOHA (Pure vs Slotted), CSMA (1-persistent, non-persistent, p-persistent), CSMA/CD (Ethernet IEEE 802.3, binary exponential backoff), CSMA/CA.",
          textbookRef: "Tanenbaum Ch 4.2, Forouzan Ch 12"
        },
        {
          name: "LAN Technologies & IEEE 802.11",
          details: "Standard Ethernet, Fast Ethernet, Gigabit Ethernet, IEEE 802.11 Wireless LAN frame format, RTS/CTS virtual carrier sensing, Bridges vs Switches.",
          textbookRef: "Tanenbaum Ch 4.3 - 4.4, Peterson & Davie Ch 2.6 - 2.7"
        }
      ]
    },
    {
      id: "mod-3",
      number: 3,
      title: "Network Layer & Routing Protocols",
      hours: 9,
      description: "Datagram vs Virtual Circuit, Routing Algorithms (Distance Vector, Link State), Optimality Principle, Congestion Control, Quality of Service (QoS).",
      topics: [
        {
          name: "Subnet Service Models",
          details: "Connectionless service (Datagram subnets) vs Connection-oriented service (Virtual circuit subnets), routing table lookup, label switching.",
          textbookRef: "Tanenbaum Ch 5.1, Kurose & Ross Ch 4.1"
        },
        {
          name: "Routing Algorithms",
          details: "Optimality Principle & Sink Trees, Shortest Path Routing (Dijkstra's Algorithm), Distance Vector Routing (Bellman-Ford, Count-to-Infinity problem, Split Horizon, Poison Reverse), Link State Routing (OSPF principles, LSP generation & reliable flooding).",
          textbookRef: "Tanenbaum Ch 5.2, Peterson & Davie Ch 3.3"
        },
        {
          name: "Multicast Routing",
          details: "Unicast vs Broadcast vs Multicast, Spanning trees, Reverse Path Forwarding (RPF), Internet Group Management Protocol (IGMP).",
          textbookRef: "Tanenbaum Ch 5.2.8, Forouzan Ch 21"
        },
        {
          name: "Congestion Control Approaches",
          details: "Open loop vs Closed loop congestion control, Backpressure, Choke packets, Implicit/Explicit signaling (ECN), Hop-by-hop choke, Load shedding.",
          textbookRef: "Tanenbaum Ch 5.3, Forouzan Ch 24"
        },
        {
          name: "Traffic Shaping & QoS Techniques",
          details: "Leaky Bucket Algorithm (constant output rate), Token Bucket Algorithm (allows controlled bursts), Packet scheduling: FIFO, Priority Queuing, Weighted Fair Queuing (WFQ).",
          textbookRef: "Tanenbaum Ch 5.4, Kurose & Ross Ch 7"
        }
      ]
    },
    {
      id: "mod-4",
      number: 4,
      title: "Internetworking & IP Addressing",
      hours: 9,
      description: "Internetworking principles, IPv4 & IPv6 architectures, Subnetting & CIDR, Address Resolution (ARP, RARP, BOOTP, DHCP), Interdomain Routing (BGP, OSPF).",
      topics: [
        {
          name: "IPv4 Addressing & Subnetting",
          details: "Classful addressing (Class A, B, C, D, E), Classless Inter-Domain Routing (CIDR), Variable-Length Subnet Masking (VLSM), Slash notation, Subnet calculation equations.",
          textbookRef: "Forouzan Ch 19, Kurose & Ross Ch 4.3"
        },
        {
          name: "IPv4 Packet Header & Fragmentation",
          details: "IPv4 header fields (20-60 bytes), Checksum calculation rationale (header only), MTU, Identification, Flags (DF, MF), Fragment Offset.",
          textbookRef: "Tanenbaum Ch 5.5, Peterson & Davie Ch 3.2"
        },
        {
          name: "IPv6 Next-Generation Protocol",
          details: "Motivation for IPv6, 128-bit address space, Base Header (40 fixed bytes) vs Extension Headers, Header differences between IPv4 and IPv6.",
          textbookRef: "Tanenbaum Ch 5.6, Forouzan Ch 26"
        },
        {
          name: "Address Translation Protocols",
          details: "ARP (Address Resolution Protocol - broadcast query, unicast reply), RARP (Reverse ARP), BOOTP, DHCP (DORA process).",
          textbookRef: "Forouzan Ch 21, Kurose & Ross Ch 4.3"
        },
        {
          name: "Internet Routing Architectures",
          details: "Intra-AS vs Inter-AS routing, OSPF (Hierarchical areas: Backbone Area 0, ABR, ASBR, LSA types, Packet types), BGP (Border Gateway Protocol, Path Vector, Autonomous Systems, policy routing).",
          textbookRef: "Tanenbaum Ch 5.6.5 - 5.6.7, Kurose & Ross Ch 4.6"
        }
      ]
    },
    {
      id: "mod-5",
      number: 5,
      title: "Transport Layer & Application Layer",
      hours: 8,
      description: "Transport Service Primitives, UDP segment, TCP 3-Way Handshake, TCP Congestion Control, Application Layer (DNS, Email, FTP, SNMP).",
      topics: [
        {
          name: "Transport Layer Primitives & UDP",
          details: "Transport service primitives (LISTEN, CONNECT, SEND, RECEIVE, DISCONNECT), User Datagram Protocol (UDP 8-byte header, connectionless, checksum calculation).",
          textbookRef: "Tanenbaum Ch 6.1 - 6.4, Kurose & Ross Ch 3.3"
        },
        {
          name: "Transmission Control Protocol (TCP)",
          details: "TCP segment format, Connection establishment (3-Way Handshake SYN, SYN-ACK, ACK vs 2-Way vulnerability), Connection termination (FIN, ACK), TCP Timers.",
          textbookRef: "Tanenbaum Ch 6.5, Kurose & Ross Ch 3.5"
        },
        {
          name: "TCP Congestion Control (AIMD)",
          details: "Additive Increase Multiplicative Decrease (AIMD), Slow Start (exponential cwnd growth), Congestion Avoidance (linear growth), Fast Retransmit (3 duplicate ACKs), Fast Recovery (Tahoe vs Reno).",
          textbookRef: "Tanenbaum Ch 6.5.9, Peterson & Davie Ch 6.3"
        },
        {
          name: "Domain Name System (DNS)",
          details: "Hierarchical namespace (.root, TLD, authoritative), Recursive query resolution vs Iterative query resolution, DNS Resource Records (A, AAAA, CNAME, MX), DNS attacks (Cache Poisoning, Amplification).",
          textbookRef: "Tanenbaum Ch 7.1, Kurose & Ross Ch 2.5"
        },
        {
          name: "Application Protocols (Email, FTP, SNMP)",
          details: "Electronic Mail architecture (User Agent, MTA, MDA, SMTP Port 25, POP3 Port 110, IMAP Port 143, MIME); FTP dual-port architecture (Control Port 21, Data Port 20); SNMP architecture (Manager, Agent, MIB, Get/Set/Trap).",
          textbookRef: "Tanenbaum Ch 7.2 - 7.4, Forouzan Ch 27 - 28"
        }
      ]
    }
  ],
  labExperiments: [
    {
      id: "exp-14",
      expNo: 14,
      title: "Implementation of OSPF Routing",
      labCode: "PCCSL507",
      source: "Vidya Academy of Science & Technology Networks Lab Manual",
      aim: "To configure OSPF (Open Shortest Path First) routing on 4 Cisco 2811 routers and 1 PC in Cisco Packet Tracer and verify connectivity using routing tables and ping.",
      topology: "R2621 (Fa0/0: 172.16.10.1) <-> R2501A (Fa0/0: 172.16.10.2, Se0/0/0 DCE: 172.16.20.1) <-> R2501B (Se0/0/0 DTE: 172.16.20.2, Fa0/0: 172.16.30.1, Se0/0/1 DCE: 172.16.40.1) <-> R2501C (Se0/0/0 DTE: 172.16.40.2). PC connected to R2501B Fa0/0 with IP 172.16.30.10.",
      keyCommands: [
        "router ospf 1",
        "network 172.16.10.0 0.0.0.255 area 0",
        "network 172.16.20.0 0.0.0.255 area 0",
        "show ip ospf neighbor",
        "show ip ospf database",
        "show ip route"
      ]
    },
    {
      id: "exp-13",
      expNo: 13,
      title: "Implementation of RIPv2 Routing",
      labCode: "PCCSL507",
      source: "Vidya Academy of Science & Technology Networks Lab Manual",
      aim: "To configure RIPv2 dynamic routing with classless routing support and no auto-summary across 4 Cisco 2811 routers, verifying routing table learning and end-to-end ping.",
      topology: "Same 4-router chain with subnets 172.16.10.0/24, 172.16.20.0/24, 172.16.30.0/24, 172.16.40.0/24.",
      keyCommands: [
        "router rip",
        "version 2",
        "no auto-summary",
        "network 172.16.10.0",
        "show ip protocols",
        "show ip route"
      ]
    }
  ]
};
