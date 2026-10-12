// INDUSTRY TECHNOLOGY STACKS, CAREERS & SALARY MARKET DATA
// Verified India & Kerala IT Corridors (Infopark Kochi, Technopark Trivandrum) + Global Ranges

export const industryToolsData = [
  {
    name: "Wireshark",
    category: "Packet Analysis & Observability",
    layer: "All Layers (Physical to App)",
    purpose: "Deep packet inspection (DPI), protocol decoding, network troubleshooting, and capturing live frame headers.",
    whyUsed: "De-facto industry standard for inspecting Ethernet frame headers, IP fragmentation, TCP handshakes, and TLS handshakes.",
    license: "Open Source (GPLv2)",
    officialUrl: "https://www.wireshark.org/"
  },
  {
    name: "Cisco Packet Tracer",
    category: "Simulation & Training",
    layer: "L1 - L7 Simulation",
    purpose: "Network topology visualization, router/switch configuration (Cisco IOS CLI), OSPF/RIP/VLAN simulation.",
    whyUsed: "Used in university labs (PCCSL507) and CCNA certification preparation for hands-on router command practice without physical hardware.",
    license: "Free Proprietary (Cisco Networking Academy)",
    officialUrl: "https://www.netacad.com/courses/packet-tracer"
  },
  {
    name: "Mininet",
    category: "SDN Network Emulation",
    layer: "L2 - L4",
    purpose: "Instant virtual OpenFlow network emulator creating Open vSwitch instances, virtual links, and Linux network namespaces on a single PC.",
    whyUsed: "Standard platform for research in Software-Defined Networking (SDN) and testing custom Python Ryu / ONOS controllers.",
    license: "Open Source (BSD)",
    officialUrl: "http://mininet.org/"
  },
  {
    name: "GNS3 (Graphical Network Simulator)",
    category: "Enterprise Network Emulation",
    layer: "L2 - L7",
    purpose: "Hardware emulation of real Cisco, Juniper, Arista, and MikroTik binary OS firmware (Dynamips/QEMU/Docker).",
    whyUsed: "Allows running authentic vendor operating systems and testing complex BGP/MPLS configurations in high-fidelity lab environments.",
    license: "Open Source (GPLv3)",
    officialUrl: "https://www.gns3.com/"
  },
  {
    name: "Nmap (Network Mapper)",
    category: "Security & Discovery",
    layer: "L3 - L7",
    purpose: "Host discovery, port scanning, OS fingerprinting, and vulnerability scanning using TCP SYN, ACK, and UDP probes.",
    whyUsed: "Essential for network security audits, discovering unauthorized devices, and verifying firewall ACL rules.",
    license: "Open Source (Nmap Public Source License)",
    officialUrl: "https://nmap.org/"
  },
  {
    name: "Cilium & eBPF",
    category: "Cloud-Native Container Networking",
    layer: "L3 - L7 Service Mesh",
    purpose: "High-performance container networking, microservice security policy enforcement, and observability in Kubernetes.",
    whyUsed: "Bypasses iptables inside the Linux kernel using eBPF programs, providing wire-speed packet processing and API-aware security.",
    license: "Open Source (Apache 2.0)",
    officialUrl: "https://cilium.io/"
  }
];

export const careerRolesData = [
  {
    id: "role-network-engineer",
    title: "Network Engineer / Network Administrator",
    overview: "Designs, deploys, and maintains enterprise network infrastructures including routers, switches, firewalls, and Wi-Fi networks.",
    coreSkills: ["Cisco IOS CLI", "VLANs & Trunking (802.1Q)", "OSPF & BGP Routing", "Subnetting (VLSM/CIDR)", "Wireshark packet capture"],
    optionalSkills: ["Python scripting (Netmiko/Paramiko)", "Linux networking", "Ansible automation", "VoIP protocols"],
    certifications: ["Cisco CCNA (200-301)", "CompTIA Network+", "Juniper JNCIA-Junos"],
    topEmployersInKerala: ["Tata Consultancy Services (Kochi/TVM)", "UST Global (Technopark TVM)", "Wipro (Infopark Kochi)", "BSNL Kerala Circle", "Allianz Technology"],
    salaryData: {
      location: "India (Kerala: Kochi Infopark / TVM Technopark)",
      currency: "INR (Per Annum)",
      entryLevel: "₹3.5 LPA - ₹5.5 LPA",
      midLevel: "₹6.5 LPA - ₹12.0 LPA",
      seniorLevel: "₹14.0 LPA - ₹24.0 LPA",
      globalComparison: "$75,000 - $125,000 USD (USA) / £45,000 - £75,000 GBP (UK)",
      sources: "AmbitionBox 2024 Tech Salary Survey, Glassdoor Kerala IT Reports, Payscale India"
    }
  },
  {
    id: "role-cloud-network-architect",
    title: "Cloud Network Architect / Cloud Infrastructure Engineer",
    overview: "Architects highly resilient, multi-region cloud networks (AWS VPC, Azure VNet, Google Cloud VPC), hybrid interconnects, and Direct Connect links.",
    coreSkills: ["AWS VPC / Azure VNet peering", "Transit Gateways & Direct Connect", "BGP Peering with Cloud Routers", "Terraform / Infrastructure as Code", "Load Balancers (ALB/NLB)"],
    optionalSkills: ["Kubernetes CNI (Calico/Cilium)", "SD-WAN integrations", "PostgreSQL/Redis connectivity optimization"],
    certifications: ["AWS Certified Advanced Networking - Specialty", "Microsoft Azure Network Engineer (AZ-700)", "GCP Professional Cloud Network Engineer"],
    topEmployersInKerala: ["Cognizant (Kochi)", "Infosys (Technopark TVM)", "Quest Global (Technopark TVM)", "IBS Software (Kochi/TVM)", "Accenture"],
    salaryData: {
      location: "India (Bangalore, Kochi, Hyderabad, TVM)",
      currency: "INR (Per Annum)",
      entryLevel: "₹6.0 LPA - ₹9.5 LPA",
      midLevel: "₹12.0 LPA - ₹22.0 LPA",
      seniorLevel: "₹25.0 LPA - ₹48.0 LPA",
      globalComparison: "$130,000 - $195,000 USD (USA) / €80,000 - €125,000 EUR (Germany)",
      sources: "Michael Page India Technology Salary Guide 2024, LinkedIn Salary Insights"
    }
  },
  {
    id: "role-network-security-analyst",
    title: "Cybersecurity & Network Security Analyst",
    overview: "Monitors enterprise traffic, configures next-generation firewalls (Palo Alto, Fortinet), detects intrusions via SIEM, and prevents DDoS and packet sniffing attacks.",
    coreSkills: ["Firewall ACLs & NAT rules", "IDS/IPS (Snort, Suricata)", "TLS/SSL Cryptography & PKI", "Wireshark forensic analysis", "SIEM (Splunk, Elastic)"],
    optionalSkills: ["Penetration Testing (Metasploit)", "Malware reverse engineering", "Zero Trust Network Access (ZTNA)"],
    certifications: ["CompTIA Security+", "Certified Ethical Hacker (CEH)", "Cisco Certified CyberOps Associate"],
    topEmployersInKerala: ["QBurst (Infopark Kochi / TVM)", "Tata Elxsi (Technopark TVM)", "Guidehouse (Trivandrum)", "Ernst & Young (EY GDS Kochi)"],
    salaryData: {
      location: "India (Kerala & Pan-India Metros)",
      currency: "INR (Per Annum)",
      entryLevel: "₹4.5 LPA - ₹7.0 LPA",
      midLevel: "₹8.0 LPA - ₹15.0 LPA",
      seniorLevel: "₹16.0 LPA - ₹32.0 LPA",
      globalComparison: "$85,000 - $145,000 USD (USA)",
      sources: "NASSCOM Cyber Security Workforce Report 2024, AmbitionBox"
    }
  },
  {
    id: "role-sre-network-devops",
    title: "Network Automation Engineer / SRE",
    overview: "Automates network device provisioning, config management, and telemetry pipelines using Python, Ansible, and CI/CD workflows.",
    coreSkills: ["Python (Netmiko, NAPALM, Scapy)", "Ansible Network Automation", "REST APIs & NETCONF/YANG", "Git version control for configs", "Prometheus & Grafana telemetry"],
    optionalSkills: ["Go programming", "eBPF tracepoints", "Kafka streaming metrics", "BGP EVPN / VXLAN"],
    certifications: ["Cisco DevNet Associate (200-901)", "Red Hat Certified Specialist in Ansible Automation"],
    topEmployersInKerala: ["CISCO Systems (Bangalore/Remote)", "Arista Networks (Bangalore)", "Envestnet (Trivandrum)", "EY Technology", "UST"],
    salaryData: {
      location: "India (Kerala / Bangalore / Remote)",
      currency: "INR (Per Annum)",
      entryLevel: "₹5.5 LPA - ₹8.5 LPA",
      midLevel: "₹11.0 LPA - ₹19.0 LPA",
      seniorLevel: "₹22.0 LPA - ₹40.0 LPA",
      globalComparison: "$110,000 - $175,000 USD (USA)",
      sources: "Payscale India, Levels.fyi 2024 Remote Tech Compensation"
    }
  }
];
