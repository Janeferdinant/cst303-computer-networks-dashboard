// THREE.JS 3D INTERACTIVE CONCEPT LABORATORY
// Production WebGL visualizer for Computer Networks concepts

export class ThreeVisualizer {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    this.currentSceneType = 'topologies';
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationFrameId = null;
    this.objects = [];
    this.isPaused = false;
    this.mouse = { x: 0, y: 0, isDown: false, prevX: 0, prevY: 0 };
    this.rotation = { x: 0.3, y: 0.5 };
    this.zoom = 22;

    if (this.container && window.THREE) {
      this.init();
    }
  }

  init() {
    // Scene setup
    this.scene = new window.THREE.Scene();

    // Camera setup
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new window.THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 8, this.zoom);
    this.camera.lookAt(0, 0, 0);

    // Renderer setup
    this.renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.domElement.setAttribute('role', 'img');
    this.renderer.domElement.setAttribute('aria-label', 'Interactive 3D Computer Networks Visualizer. Drag to rotate.');
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight1 = new window.THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(15, 25, 20);
    this.scene.add(dirLight1);

    const dirLight2 = new window.THREE.DirectionalLight(0xa855f7, 0.8);
    dirLight2.position.set(-15, -10, -15);
    this.scene.add(dirLight2);

    // Event Listeners for Interaction (Orbit rotate & zoom)
    this.setupInteraction();

    // Load initial scene
    this.loadScene('topologies');

    // Start render loop
    this.animate();
  }

  setupInteraction() {
    const el = this.renderer.domElement;

    el.addEventListener('mousedown', (e) => {
      this.mouse.isDown = true;
      this.mouse.prevX = e.clientX;
      this.mouse.prevY = e.clientY;
      el.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
      if (el) el.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.mouse.isDown) return;
      const deltaX = e.clientX - this.mouse.prevX;
      const deltaY = e.clientY - this.mouse.prevY;
      this.rotation.y += deltaX * 0.007;
      this.rotation.x += deltaY * 0.007;
      this.rotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, this.rotation.x));
      this.mouse.prevX = e.clientX;
      this.mouse.prevY = e.clientY;
    });

    // Touch support for mobile devices
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.mouse.isDown = true;
        this.mouse.prevX = e.touches[0].clientX;
        this.mouse.prevY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.isDown = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.mouse.isDown || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.mouse.prevX;
      const deltaY = e.touches[0].clientY - this.mouse.prevY;
      this.rotation.y += deltaX * 0.009;
      this.rotation.x += deltaY * 0.009;
      this.mouse.prevX = e.touches[0].clientX;
      this.mouse.prevY = e.touches[0].clientY;
    }, { passive: true });

    // Wheel Zoom
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom += e.deltaY * 0.02;
      this.zoom = Math.max(8, Math.min(45, this.zoom));
    }, { passive: false });

    // Window Resize
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!width || !height) return; // section hidden: keep the last good size
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    // false: keep the CSS 100% sizing so the canvas never forces its card wider
    this.renderer.setSize(width, height, false);
  }

  clearScene() {
    while (this.scene.children.length > 0) {
      const obj = this.scene.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
      this.scene.remove(obj);
    }
    // Re-add lights
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
    const dirLight1 = new window.THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(15, 25, 20);
    this.scene.add(dirLight1);
    const dirLight2 = new window.THREE.DirectionalLight(0xa855f7, 0.8);
    dirLight2.position.set(-15, -10, -15);
    this.scene.add(dirLight2);
    this.objects = [];
  }

  loadScene(type, params = {}) {
    this.currentSceneType = type;
    this.clearScene();

    switch (type) {
      case 'topologies':
        this.buildTopologiesScene(params.topologyType || 'star');
        break;
      case 'fiber_optic':
        this.buildFiberOpticScene(params.n1 || 1.48, params.n2 || 1.45, params.angle || 78);
        break;
      case 'osi_encapsulation':
        this.buildOSIEncapsulationScene();
        break;
      case 'ospf_hierarchy':
        this.buildOSPFHierarchyScene();
        break;
      case 'datagram_vs_vc':
        this.buildDatagramVsVCScene(params.mode || 'datagram');
        break;
      default:
        this.buildTopologiesScene('star');
    }
  }

  /* 1. SCENE: Network Topologies (Star, Mesh, Ring, Bus) */
  buildTopologiesScene(subType = 'star') {
    const THREE = window.THREE;
    const nodeCount = subType === 'mesh' ? 6 : (subType === 'star' ? 7 : (subType === 'ring' ? 6 : 5));
    const radius = 7;
    const nodes = [];

    // Create Hub for Star
    let hub = null;
    if (subType === 'star') {
      const hubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.6, 24);
      const hubMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4
      });
      hub = new THREE.Mesh(hubGeo, hubMat);
      hub.position.set(0, 0, 0);
      this.scene.add(hub);
      this.objects.push({ mesh: hub, type: 'hub' });
    }

    // Create Nodes
    const nodeGeo = new THREE.SphereGeometry(0.75, 24, 24);
    for (let i = 0; i < nodeCount; i++) {
      let x, y, z;
      if (subType === 'bus') {
        x = (i - (nodeCount - 1) / 2) * 3.5;
        y = (i % 2 === 0 ? 2 : -2);
        z = 0;
      } else {
        const angle = (i / nodeCount) * Math.PI * 2;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        y = 0;
      }

      const nodeMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0x10b981 : 0xa855f7,
        roughness: 0.3,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      this.scene.add(nodeMesh);
      nodes.push(nodeMesh);
      this.objects.push({ mesh: nodeMesh, type: 'node', id: i });
    }

    // Create Links
    const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
    if (subType === 'star') {
      nodes.forEach((n) => {
        const points = [new THREE.Vector3(0, 0, 0), n.position];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeo, lineMat);
        this.scene.add(line);
      });
    } else if (subType === 'mesh') {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const points = [nodes[i].position, nodes[j].position];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeo, lineMat);
          this.scene.add(line);
        }
      }
    } else if (subType === 'ring') {
      for (let i = 0; i < nodes.length; i++) {
        const next = (i + 1) % nodes.length;
        const points = [nodes[i].position, nodes[next].position];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeo, lineMat);
        this.scene.add(line);
      }
    } else if (subType === 'bus') {
      // Main Bus Cable
      const busPoints = [new THREE.Vector3(-8.5, 0, 0), new THREE.Vector3(8.5, 0, 0)];
      const busGeo = new THREE.BufferGeometry().setFromPoints(busPoints);
      const thickLineMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 3 });
      this.scene.add(new THREE.Line(busGeo, thickLineMat));
      // Drop Cables
      nodes.forEach(n => {
        const dropPoints = [new THREE.Vector3(n.position.x, 0, 0), n.position];
        const dropGeo = new THREE.BufferGeometry().setFromPoints(dropPoints);
        this.scene.add(new THREE.Line(dropGeo, lineMat));
      });
    }

    // Animated Packet Sphere
    const packetGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    this.scene.add(packet);
    this.objects.push({ mesh: packet, type: 'packet', pathIndex: 0, t: 0, nodes, subType });
  }

  /* 2. SCENE: Optical Fiber Total Internal Reflection */
  buildFiberOpticScene(n1 = 1.48, n2 = 1.45, incidentAngleDeg = 78) {
    const THREE = window.THREE;
    const length = 20;
    const coreRadius = 2.2;
    const cladRadius = 3.8;

    // Cladding (Outer Translucent Tube)
    const cladGeo = new THREE.CylinderGeometry(cladRadius, cladRadius, length, 32, 1, true);
    const cladMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.18,
      roughness: 0.1,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const cladding = new THREE.Mesh(cladGeo, cladMat);
    cladding.rotation.z = Math.PI / 2;
    this.scene.add(cladding);

    // Core (Inner Glass Cylinder)
    const coreGeo = new THREE.CylinderGeometry(coreRadius, coreRadius, length, 32, 1, true);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      transmission: 0.8,
      side: THREE.DoubleSide
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.rotation.z = Math.PI / 2;
    this.scene.add(core);

    // Light Ray Calculation (Snell's Law & Critical Angle)
    // Critical angle: theta_c = arcsin(n2 / n1)
    const criticalAngleRad = Math.asin(n2 / n1);
    const criticalAngleDeg = (criticalAngleRad * 180) / Math.PI;
    const isTIR = incidentAngleDeg >= criticalAngleDeg;

    // Build Zigzag Ray Points
    const points = [];
    const stepX = 3.2;
    let y = 0;
    let sign = 1;
    for (let x = -length / 2; x <= length / 2; x += stepX) {
      points.push(new THREE.Vector3(x, sign * (coreRadius - 0.2), 0));
      sign = -sign;
    }

    const rayGeo = new THREE.BufferGeometry().setFromPoints(points);
    const rayMat = new THREE.LineBasicMaterial({
      color: isTIR ? 0x10b981 : 0xef4444,
      linewidth: 3
    });
    const ray = new THREE.Line(rayGeo, rayMat);
    this.scene.add(ray);

    // Glowing Pulse along the Ray
    const pulseGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: isTIR ? 0x34d399 : 0xf87171 });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    this.scene.add(pulse);

    this.objects.push({
      mesh: pulse,
      type: 'fiberPulse',
      points,
      t: 0,
      isTIR,
      criticalAngleDeg
    });
  }

  /* 3. SCENE: OSI 7-Layer Protocol Encapsulation */
  buildOSIEncapsulationScene() {
    const THREE = window.THREE;
    const layers = [
      { name: "7. Application", color: 0xec4899, pdu: "Data (HTTP/DNS)" },
      { name: "6. Presentation", color: 0xd946ef, pdu: "Formatted Data" },
      { name: "5. Session", color: 0xa855f7, pdu: "Session Token" },
      { name: "4. Transport", color: 0x6366f1, pdu: "TCP Segment" },
      { name: "3. Network", color: 0x0ea5e9, pdu: "IP Packet" },
      { name: "2. Data Link", color: 0x10b981, pdu: "Ethernet Frame" },
      { name: "1. Physical", color: 0xf59e0b, pdu: "Raw Bits (01010)" }
    ];

    layers.forEach((l, index) => {
      const y = (3 - index) * 2.2;
      const boxGeo = new THREE.BoxGeometry(9, 1.2, 2.5);
      const boxMat = new THREE.MeshPhysicalMaterial({
        color: l.color,
        transparent: true,
        opacity: 0.65,
        roughness: 0.3,
        metalness: 0.4
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.position.set(0, y, 0);
      this.scene.add(box);
      this.objects.push({ mesh: box, layerInfo: l, type: 'osiLayer', index });
    });

    // Encapsulating Packet moving downward
    const packetGeo = new THREE.BoxGeometry(2, 0.8, 1.2);
    const packetMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8
    });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    packet.position.set(0, 6.6, 1.5);
    this.scene.add(packet);
    this.objects.push({ mesh: packet, type: 'osiPacket', t: 0 });
  }

  /* 4. SCENE: OSPF Hierarchical Multi-Area Autonomous System */
  buildOSPFHierarchyScene() {
    const THREE = window.THREE;

    // Backbone Area 0 (Center Cylinder Ring)
    const area0Geo = new THREE.RingGeometry(2.5, 4.5, 32);
    const area0Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    const area0 = new THREE.Mesh(area0Geo, area0Mat);
    area0.rotation.x = Math.PI / 2;
    this.scene.add(area0);

    // Non-backbone Area 1 (Left Ring)
    const area1Geo = new THREE.RingGeometry(2, 3.5, 32);
    const area1Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const area1 = new THREE.Mesh(area1Geo, area1Mat);
    area1.rotation.x = Math.PI / 2;
    area1.position.set(-8, 0, 0);
    this.scene.add(area1);

    // Non-backbone Area 2 (Right Ring)
    const area2 = area1.clone();
    area2.position.set(8, 0, 0);
    this.scene.add(area2);

    // Routers (Internal, ABRs, ASBR)
    const routerGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.4, 16);

    const routers = [
      { name: "ABR 1", pos: [-4.2, 0.2, 0], color: 0xf59e0b, role: "Area Border Router" },
      { name: "ABR 2", pos: [4.2, 0.2, 0], color: 0xf59e0b, role: "Area Border Router" },
      { name: "Backbone R1", pos: [0, 0.2, 2], color: 0x38bdf8, role: "Internal Backbone" },
      { name: "ASBR", pos: [0, 0.2, -3.2], color: 0xef4444, role: "AS Boundary Router" },
      { name: "Area 1 R1", pos: [-8, 0.2, 1.5], color: 0xa855f7, role: "Internal Router" },
      { name: "Area 2 R1", pos: [8, 0.2, -1.5], color: 0xa855f7, role: "Internal Router" }
    ];

    routers.forEach(r => {
      const mat = new THREE.MeshStandardMaterial({ color: r.color, metalness: 0.7, roughness: 0.2 });
      const mesh = new THREE.Mesh(routerGeo, mat);
      mesh.position.set(...r.pos);
      this.scene.add(mesh);
      this.objects.push({ mesh, type: 'ospfRouter', info: r });
    });

    // LSA Floating Packet
    const lsaGeo = new THREE.OctahedronGeometry(0.35);
    const lsaMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const lsa = new THREE.Mesh(lsaGeo, lsaMat);
    this.scene.add(lsa);
    this.objects.push({ mesh: lsa, type: 'lsaPacket', t: 0 });
  }

  /* 5. SCENE: Datagram vs Virtual Circuit Routing */
  buildDatagramVsVCScene(mode = 'datagram') {
    const THREE = window.THREE;
    const nodes = [
      { pos: [-8, 0, 0], label: "Source A" },
      { pos: [-3, 3, 0], label: "Router 1" },
      { pos: [-3, -3, 0], label: "Router 2" },
      { pos: [3, 2, 0], label: "Router 3" },
      { pos: [3, -2, 0], label: "Router 4" },
      { pos: [8, 0, 0], label: "Dest B" }
    ];

    const nodeGeo = new THREE.SphereGeometry(0.85, 24, 24);
    nodes.forEach(n => {
      const nodeMat = new THREE.MeshStandardMaterial({
        color: (n.label.includes("Source") || n.label.includes("Dest")) ? 0x10b981 : 0x38bdf8,
        metalness: 0.6,
        roughness: 0.3
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(...n.pos);
      this.scene.add(mesh);
    });

    // Links
    const links = [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 5], [4, 5]
    ];
    const lineMat = new THREE.LineBasicMaterial({
      color: mode === 'vc' ? 0x64748b : 0x38bdf8,
      transparent: true,
      opacity: 0.4
    });
    links.forEach(([i, j]) => {
      const p1 = new THREE.Vector3(...nodes[i].pos);
      const p2 = new THREE.Vector3(...nodes[j].pos);
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      this.scene.add(new THREE.Line(geo, lineMat));
    });

    // In Virtual Circuit: highlight established path (0 -> 1 -> 3 -> 5)
    if (mode === 'vc') {
      const vcPoints = [
        new THREE.Vector3(...nodes[0].pos),
        new THREE.Vector3(...nodes[1].pos),
        new THREE.Vector3(...nodes[3].pos),
        new THREE.Vector3(...nodes[5].pos)
      ];
      const vcGeo = new THREE.BufferGeometry().setFromPoints(vcPoints);
      const vcMat = new THREE.LineBasicMaterial({ color: 0xec4899, linewidth: 4 });
      this.scene.add(new THREE.Line(vcGeo, vcMat));
    }

    // Packet Simulation
    const packetGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({ color: mode === 'vc' ? 0xec4899 : 0x38bdf8 });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    this.scene.add(packet);

    this.objects.push({ mesh: packet, type: 'routingPacket', mode, nodes, t: 0 });
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    if (this.isPaused) return;

    // Apply Orbit rotation smoothly
    const radius = this.zoom;
    this.camera.position.x = radius * Math.sin(this.rotation.y) * Math.cos(this.rotation.x);
    this.camera.position.y = radius * Math.sin(this.rotation.x);
    this.camera.position.z = radius * Math.cos(this.rotation.y) * Math.cos(this.rotation.x);
    this.camera.lookAt(0, 0, 0);

    // Update scene animations
    this.objects.forEach(obj => {
      if (obj.type === 'packet') {
        obj.t += 0.015;
        if (obj.subType === 'star') {
          // Travel from Hub to Node and back
          const nodeIdx = Math.floor(obj.t) % obj.nodes.length;
          const localT = (obj.t % 1);
          const target = obj.nodes[nodeIdx].position;
          obj.mesh.position.lerpVectors(new window.THREE.Vector3(0, 0, 0), target, Math.sin(localT * Math.PI));
        } else if (obj.subType === 'ring') {
          const totalNodes = obj.nodes.length;
          const currIdx = Math.floor(obj.t) % totalNodes;
          const nextIdx = (currIdx + 1) % totalNodes;
          const localT = (obj.t % 1);
          obj.mesh.position.lerpVectors(obj.nodes[currIdx].position, obj.nodes[nextIdx].position, localT);
        }
      } else if (obj.type === 'fiberPulse') {
        obj.t = (obj.t + 0.008) % 1;
        const pts = obj.points;
        const totalSegments = pts.length - 1;
        const segIndex = Math.min(Math.floor(obj.t * totalSegments), totalSegments - 1);
        const segT = (obj.t * totalSegments) - segIndex;
        obj.mesh.position.lerpVectors(pts[segIndex], pts[segIndex + 1], segT);
      } else if (obj.type === 'osiPacket') {
        obj.t = (obj.t + 0.005) % 1;
        // Travel down 7 layers: y from 6.6 to -6.6
        obj.mesh.position.y = 6.6 - (obj.t * 13.2);
        obj.mesh.rotation.y += 0.02;
      } else if (obj.type === 'lsaPacket') {
        obj.t = (obj.t + 0.007) % 1;
        // Float between ABR1 (-4.2) and ABR2 (4.2)
        obj.mesh.position.x = -4.2 + (obj.t * 8.4);
        obj.mesh.position.z = Math.sin(obj.t * Math.PI * 4) * 1.5;
        obj.mesh.rotation.x += 0.04;
        obj.mesh.rotation.y += 0.04;
      } else if (obj.type === 'routingPacket') {
        obj.t = (obj.t + 0.008) % 1;
        const nodes = obj.nodes;
        if (obj.mode === 'vc') {
          // Strictly follow VC path 0 -> 1 -> 3 -> 5
          const path = [nodes[0].pos, nodes[1].pos, nodes[3].pos, nodes[5].pos];
          const seg = Math.min(Math.floor(obj.t * 3), 2);
          const segT = (obj.t * 3) - seg;
          obj.mesh.position.lerpVectors(
            new window.THREE.Vector3(...path[seg]),
            new window.THREE.Vector3(...path[seg + 1]),
            segT
          );
        } else {
          // Datagram switches between upper path (0->1->3->5) and lower path (0->2->4->5)
          const isUpper = Math.sin(Date.now() * 0.001) > 0;
          const path = isUpper ?
            [nodes[0].pos, nodes[1].pos, nodes[3].pos, nodes[5].pos] :
            [nodes[0].pos, nodes[2].pos, nodes[4].pos, nodes[5].pos];
          const seg = Math.min(Math.floor(obj.t * 3), 2);
          const segT = (obj.t * 3) - seg;
          obj.mesh.position.lerpVectors(
            new window.THREE.Vector3(...path[seg]),
            new window.THREE.Vector3(...path[seg + 1]),
            segT
          );
        }
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  resetCamera() {
    this.rotation = { x: 0.3, y: 0.5 };
    this.zoom = 22;
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
