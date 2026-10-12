// INDUSTRY RESEARCH, REAL-WORLD APPLICATIONS & ADVANCEMENTS
// Verified Citations, DOIs, and Engineering Case Studies

export const realWorldAppsData = [
  {
    id: "app-sdn-google",
    title: "Google B4: Hyperscale Software-Defined WAN",
    industry: "Cloud & Global Infrastructure",
    problem: "Traditional distributed routing protocols (BGP/OSPF) achieved only 30-40% link utilization across expensive global private fiber links due to localized hop-by-hop decisions.",
    technicalApproach: "Decoupled the control plane from packet switches. Centralized OpenFlow SDN controllers calculate global multi-commodity flow optimizations and push forwarding rules down to custom merchant-silicon switches.",
    infrastructure: "Centralized SDN clusters, Paxos consensus, custom OpenFlow switches, 100Gbps+ transoceanic fiber backbones.",
    metrics: "Pushed WAN link utilization to nearly **100%** deterministically while prioritizing latency-critical RPCs over background bulk replication.",
    limitations: "Single point of control failure vulnerability; requires complex distributed state synchronization and high availability controller failover.",
    referenceUrl: "https://dl.acm.org/doi/10.1145/2486001.2486019"
  },
  {
    id: "app-cloudflare-anycast",
    title: "Cloudflare: BGP Anycast & DDoS Edge Shield",
    industry: "Content Delivery & Edge Cybersecurity",
    problem: "Global cyberattacks (DDoS) exceed 30+ Tbps, which would easily saturate any localized data center or centralized server farm.",
    technicalApproach: "Uses BGP Anycast to announce identical IP address prefixes from over 310+ cities worldwide. The global Internet routing system automatically routes traffic to the topologically closest edge data center, distributing volumetric attacks into manageable local streams.",
    infrastructure: "Anycast edge routers, Linux XDP / eBPF kernel packet filters, high-bandwidth Tier-1 transit peering.",
    metrics: "Absorbs multi-terabit attacks in sub-milliseconds without service disruption; reduces origin web server load by >80%.",
    limitations: "BGP route flap can cause TCP connection resets if route convergence directs consecutive packets of the same session to different data centers.",
    referenceUrl: "https://www.cloudflare.com/learning/cdn/glossary/anycast-network/"
  },
  {
    id: "app-quic-youtube",
    title: "Google YouTube: QUIC & HTTP/3 Transport Revolution",
    industry: "Video Streaming & Mobile Web",
    problem: "Head-of-line (HoL) blocking in TCP and high connection establishment latency (TCP 3-way handshake + TLS 1.3 handshake = 2-3 RTTs) severely degrades video playback on mobile networks with packet loss.",
    technicalApproach: "Replaces TCP with QUIC over UDP. Implements stream multiplexing within the transport layer, zero-RTT (0-RTT) connection resumption, and connection migration across IP changes (e.g., Wi-Fi to 5G handover).",
    infrastructure: "Chromium client engine, Google Edge PoPs, UDP socket buffers, TLS 1.3 cryptographic integration.",
    metrics: "Reduces YouTube video rebuffering by **15-18%** globally and mobile search latency by **8%** on high-loss cellular connections.",
    limitations: "Higher CPU overhead on web servers due to user-space UDP packet processing compared to OS kernel-optimized TCP.",
    referenceUrl: "https://datatracker.ietf.org/doc/html/rfc9000"
  },
  {
    id: "app-5g-slicing",
    title: "5G End-to-End Network Slicing in Telecommunications",
    industry: "Telecommunications & Autonomous Systems",
    problem: "Diverse services (autonomous vehicles requiring <1ms ultra-reliable low latency vs. 4K video streaming requiring 100Mbps vs. smart meters requiring low power) cannot be served by a single rigid physical network.",
    technicalApproach: "Network Function Virtualization (NFV) and SDN partition a single physical 5G infrastructure into isolated virtual end-to-end networks (slices) with dedicated QoS guarantees.",
    infrastructure: "5G Core (5GC), Service-Based Architecture (SBA), Kubernetes cloud-native microservices, gNodeB radio scheduling.",
    metrics: "Guarantees URLLC (<1 ms air-interface latency) with 99.999% reliability concurrently with massive IoT machine-type communication.",
    limitations: "Complex cross-domain orchestration between Radio Access Network (RAN), Transport Network, and Core Cloud.",
    referenceUrl: "https://www.3gpp.org/technologies/5g-network-slicing"
  }
];

export const techAdvancementsData = [
  {
    id: "tech-wifi7",
    name: "Wi-Fi 7 (IEEE 802.11be Extremely High Throughput)",
    releaseDate: "2024 (Official IEEE Certification)",
    keyInnovation: "320 MHz ultra-wide channels, 4096-QAM (4K-QAM) modulation, and Multi-Link Operation (MLO) allowing devices to transmit simultaneously across 2.4 GHz, 5 GHz, and 6 GHz bands.",
    comparisonToEarlier: "Compared to Wi-Fi 6 (802.11ax), peak physical data rate jumps from 9.6 Gbps to **46.1 Gbps** (4.8x increase), with latency cut by up to 100x through deterministic channel access.",
    useCases: "Wireless 8K VR/AR, cloud gaming, industrial robotic automation.",
    sourceUrl: "https://www.wi-fi.org/discover-wi-fi/wi-fi-certified-7"
  },
  {
    id: "tech-pqc-tls",
    name: "Post-Quantum Cryptography in TLS 1.3 (ML-KEM / Kyber)",
    releaseDate: "August 2024 (NIST FIPS 203 Standardization)",
    keyInnovation: "Replacement of classical Diffie-Hellman and RSA key exchanges with lattice-based cryptography (Module-Lattice-Based Key-Encapsulation Mechanism - ML-KEM).",
    comparisonToEarlier: "Protects against 'Harvest Now, Decrypt Later' quantum attacks. Quantum computers running Shor's algorithm will break RSA/ECC, whereas lattice problems remain computationally hard for quantum systems.",
    useCases: "Banking, defense communications, global HTTPS web traffic (already deployed experimentally in Chrome and Cloudflare).",
    sourceUrl: "https://csrc.nist.gov/pubs/fips/203/final"
  },
  {
    id: "tech-srv6",
    name: "Segment Routing over IPv6 (SRv6)",
    releaseDate: "IETF RFC 8986 (Recent Production Adoption)",
    keyInnovation: "Encodes source routing instructions directly inside the standard IPv6 Segment Routing Header (SRH). Eliminates the need for complex MPLS label distribution protocols (LDP/RSVP-TE).",
    comparisonToEarlier: "Unifies the data plane purely on IPv6. Allows network operators to specify the exact path, latency constraints, and NFV service functions packet by packet.",
    useCases: "5G transport backbones, cloud multi-tenant interconnects.",
    sourceUrl: "https://datatracker.ietf.org/doc/html/rfc8986"
  },
  {
    id: "tech-ebpf-cilium",
    name: "eBPF-Powered Kernel Networking (Cilium)",
    releaseDate: "Linux Kernel 6.x & Cilium v1.15+",
    keyInnovation: "Executes sandboxed bytecode directly inside the Linux OS kernel at the socket (sockops) and network interface (XDP) layers without modifying kernel source code.",
    comparisonToEarlier: "Bypasses traditional iptables packet inspection overhead (which slows down with $O(N)$ rules in large Kubernetes clusters), achieving $O(1)$ lookup and wire-speed routing.",
    useCases: "Microservice service mesh, real-time security observability, container networking.",
    sourceUrl: "https://cilium.io/"
  }
];

export const researchPapersData = [
  {
    id: "paper-cerf-kahn-1974",
    title: "A Protocol for Packet Network Intercommunication",
    authors: "Vinton G. Cerf, Robert E. Kahn",
    year: 1974,
    venue: "IEEE Transactions on Communications, Vol. COM-22, No. 5",
    doi: "10.1109/TCOM.1974.1092259",
    url: "https://doi.org/10.1109/TCOM.1974.1092259",
    isOpenAccess: true,
    problem: "How to interconnect heterogeneous packet-switching networks (ARPANET, PRNET, SATNET) without requiring changes to their internal transmission mechanisms.",
    methodology: "Invented the Transmission Control Program (which later split into TCP and IP). Introduced gateway routers, end-to-end byte-stream sequencing, process addressing (ports), and window-based flow control.",
    mainFindings: "Proved that internetworking could be achieved purely through host-to-host protocols and edge gateways, creating the fundamental blueprint for the modern Internet.",
    limitations: "Original design did not separate routing (IP) from transport reliability (TCP), which was resolved in 1978 with TCP/IP v4.",
    futureWorkRelevance: "Forms the core foundation of Module 1 & Module 5 in the CST303 syllabus."
  },
  {
    id: "paper-dijkstra-1959",
    title: "A Note on Two Problems in Connexion with Graphs",
    authors: "Edsger W. Dijkstra",
    year: 1959,
    venue: "Numerische Mathematik, Vol. 1, pp. 269–271",
    doi: "10.1007/BF01386390",
    url: "https://doi.org/10.1007/BF01386390",
    isOpenAccess: true,
    problem: "Computing the minimum total branch weight spanning tree and shortest path between two nodes in a weighted graph.",
    methodology: "Greedy algorithm with tentative distance labeling, incrementally moving closest unvisited vertices to the permanent set.",
    mainFindings: "Achieved optimal $O(V^2)$ time complexity (improved to $O(E + V \\log V)$ using Fibonacci heaps).",
    limitations: "Fails when edge weights are negative (solved by Bellman-Ford).",
    futureWorkRelevance: "Underpins OSPF (Open Shortest Path First) and IS-IS link-state routing algorithms (CST303 Module 3)."
  },
  {
    id: "paper-bosshart-p4-2014",
    title: "P4: Programming Protocol-Independent Packet Processors",
    authors: "Pat Bosshart, Dan Daly, Glen Gibb, Martin Izzard, Nick McKeown, Jennifer Rexford, et al.",
    year: 2014,
    venue: "ACM SIGCOMM Computer Communication Review, Vol. 44, No. 3",
    doi: "10.1145/2656877.2656890",
    url: "https://doi.org/10.1145/2656877.2656890",
    isOpenAccess: true,
    problem: "Early OpenFlow SDN was tied to fixed header fields, preventing programmers from defining custom protocols or telemetry in switch silicon.",
    methodology: "Defined a domain-specific language (P4) allowing high-level programming of reconfigurable Match-Action Pipelines (RMT) in hardware.",
    mainFindings: "Demonstrated line-rate packet parsing and header manipulation at terabits per second without hardware redesign.",
    limitations: "Requires specialized programmable switch ASICs (e.g., Intel Tofino).",
    futureWorkRelevance: "Forms the basis of modern programmable networks, in-band telemetry, and our portfolio project."
  }
];
