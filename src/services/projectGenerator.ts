// Project Generator for JARVIS & ROSE Background Project Creation
// Generates standalone, interactive, production-ready 3D models, images, and web apps

export function createIronMan3DModelHtml(title = "Iron Man Mark 85 3D Model"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${title} | STARK INDUSTRIES</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at center, #101626 0%, #05070d 100%);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #fff;
      user-select: none;
      -webkit-user-select: none;
    }
    #canvas-container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    /* Stark HUD Overlay */
    .hud-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 10;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px;
    }
    .hud-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      pointer-events: auto;
    }
    .hud-brand {
      background: rgba(8, 12, 22, 0.85);
      border: 1px solid rgba(0, 242, 255, 0.4);
      border-radius: 12px;
      padding: 10px 16px;
      backdrop-filter: blur(12px);
      box-shadow: 0 0 25px rgba(0, 242, 255, 0.2);
    }
    .hud-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #00f2ff;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hud-subtitle {
      font-size: 10px;
      font-family: monospace;
      color: #94a3b8;
      letter-spacing: 1px;
      margin-top: 3px;
    }
    .hud-badge {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00f2ff;
      box-shadow: 0 0 8px #00f2ff;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
    /* Action Controls Bar */
    .hud-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      pointer-events: auto;
    }
    .btn {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(0, 242, 255, 0.4);
      color: #e2e8f0;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 9px 15px;
      border-radius: 10px;
      cursor: pointer;
      backdrop-filter: blur(8px);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }
    .btn:hover {
      background: rgba(0, 242, 255, 0.2);
      border-color: #00f2ff;
      color: #fff;
      transform: translateY(-1px);
      box-shadow: 0 0 15px rgba(0, 242, 255, 0.4);
    }
    .btn:active {
      transform: scale(0.96);
    }
    .btn-download {
      background: linear-gradient(135deg, #0284c7, #00f2ff);
      border: none;
      color: #000;
      font-weight: 800;
      box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
    }
    .btn-download:hover {
      background: linear-gradient(135deg, #38bdf8, #67e8f9);
      color: #000;
    }
    /* Footer Telemetry */
    .hud-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      pointer-events: auto;
    }
    .telemetry-box {
      background: rgba(8, 12, 22, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 8px 12px;
      font-family: monospace;
      font-size: 10px;
      color: #64748b;
      backdrop-filter: blur(8px);
    }
    .telemetry-val {
      color: #00f2ff;
      font-weight: bold;
    }
    .instructions-hint {
      background: rgba(0, 0, 0, 0.6);
      border: 1px dashed rgba(0, 242, 255, 0.3);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 10px;
      color: #94a3b8;
      letter-spacing: 0.5px;
    }
    /* Arc Reactor Blast Flash Effect */
    #blast-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, rgba(0, 242, 255, 0.8) 0%, transparent 80%);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
      z-index: 5;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div id="canvas-container"></div>
  <div id="blast-overlay"></div>

  <div class="hud-layer">
    <!-- Top Bar -->
    <div class="hud-header">
      <div class="hud-brand">
        <div class="hud-title">
          <span class="hud-badge"></span>
          STARK MARK 85 • 3D PROTOCOL
        </div>
        <div class="hud-subtitle">NEURAL CAD ENGINE // STANDALONE SUITE</div>
      </div>

      <div class="hud-actions">
        <button id="btn-blast" class="btn">⚡ REPULSOR BLAST</button>
        <button id="btn-wireframe" class="btn">🌐 WIREFRAME</button>
        <button id="btn-reset" class="btn">↺ RESET VIEW</button>
        <button id="btn-download" class="btn btn-download">📥 DOWNLOAD PROJECT</button>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="hud-footer">
      <div class="telemetry-box">
        <div>ARC CORE: <span class="telemetry-val">100% SYNCHRONIZED</span></div>
        <div>THRUST MATRIX: <span class="telemetry-val">ONLINE (60 FPS)</span></div>
        <div>NANOTECH SHIELD: <span class="telemetry-val">MARK 85 ACTIVE</span></div>
      </div>

      <div class="instructions-hint">
        TOUCH & DRAG TO ROTATE • PINCH / SCROLL TO ZOOM
      </div>
    </div>
  </div>

  <script>
    // --- 3D SCENE INITIALIZATION ---
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.025);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.8, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 1.3, 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Don't go underneath floor
    controls.minDistance = 1.2;
    controls.maxDistance = 8.5;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5ea, 2.0);
    dirLight1.position.set(3, 6, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f2ff, 1.5);
    dirLight2.position.set(-4, 3, -2);
    scene.add(dirLight2);

    // Glowing Arc Reactor Chest Light
    const arcPointLight = new THREE.PointLight(0x00f2ff, 4, 3.5);
    arcPointLight.position.set(0, 1.52, 0.38);
    scene.add(arcPointLight);

    // --- MATERIALS (Mark 85 Crimson Red & Gold Armor) ---
    const redArmorMaterial = new THREE.MeshStandardMaterial({
      color: 0x990012,
      metalness: 0.88,
      roughness: 0.22,
    });

    const goldArmorMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18,
    });

    const silverJointMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.35,
    });

    const arcGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x73f3ff,
    });

    const eyesGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // --- PROCEDURAL 3D IRON MAN MARK 85 MESH GROUP ---
    const ironMan = new THREE.Group();

    // 1. CHEST & TORSO
    const chestGeo = new THREE.CylinderGeometry(0.36, 0.26, 0.58, 8);
    const chest = new THREE.Mesh(chestGeo, redArmorMaterial);
    chest.position.y = 1.5;
    chest.scale.set(1.1, 1, 0.75);
    ironMan.add(chest);

    // Upper Chest Gold Plates
    const plateGeo = new THREE.BoxGeometry(0.28, 0.25, 0.12);
    const plateL = new THREE.Mesh(plateGeo, goldArmorMaterial);
    plateL.position.set(-0.16, 1.6, 0.2);
    plateL.rotation.z = -0.15;
    ironMan.add(plateL);

    const plateR = new THREE.Mesh(plateGeo, goldArmorMaterial);
    plateR.position.set(0.16, 1.6, 0.2);
    plateR.rotation.z = 0.15;
    ironMan.add(plateR);

    // ARC REACTOR (Chest Core)
    const arcRingGeo = new THREE.TorusGeometry(0.09, 0.02, 16, 32);
    const arcRing = new THREE.Mesh(arcRingGeo, goldArmorMaterial);
    arcRing.position.set(0, 1.54, 0.25);
    ironMan.add(arcRing);

    const arcCoreGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.03, 16);
    const arcCore = new THREE.Mesh(arcCoreGeo, arcGlowMaterial);
    arcCore.rotation.x = Math.PI / 2;
    arcCore.position.set(0, 1.54, 0.245);
    ironMan.add(arcCore);

    // 2. ABDOMEN & WAIST
    const absGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.35, 8);
    const abs = new THREE.Mesh(absGeo, goldArmorMaterial);
    abs.position.y = 1.15;
    abs.scale.set(1, 1, 0.7);
    ironMan.add(abs);

    const pelvisGeo = new THREE.BoxGeometry(0.44, 0.22, 0.32);
    const pelvis = new THREE.Mesh(pelvisGeo, redArmorMaterial);
    pelvis.position.y = 0.95;
    ironMan.add(pelvis);

    // 3. HEAD & HELMET
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.96, 0);

    // Cranium
    const helmetGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const helmet = new THREE.Mesh(helmetGeo, redArmorMaterial);
    helmet.scale.set(0.85, 1.05, 0.95);
    headGroup.add(helmet);

    // Gold Faceplate
    const faceplateGeo = new THREE.BoxGeometry(0.23, 0.22, 0.14);
    const faceplate = new THREE.Mesh(faceplateGeo, goldArmorMaterial);
    faceplate.position.set(0, -0.02, 0.11);
    headGroup.add(faceplate);

    // Glowing Eye Slits
    const eyeGeo = new THREE.BoxGeometry(0.065, 0.016, 0.03);
    const eyeL = new THREE.Mesh(eyeGeo, eyesGlowMaterial);
    eyeL.position.set(-0.06, 0.02, 0.185);
    eyeL.rotation.z = -0.1;
    headGroup.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeo, eyesGlowMaterial);
    eyeR.position.set(0.06, 0.02, 0.185);
    eyeR.rotation.z = 0.1;
    headGroup.add(eyeR);

    ironMan.add(headGroup);

    // 4. SHOULDERS & ARMS
    function createArm(isLeft) {
      const arm = new THREE.Group();
      const sign = isLeft ? -1 : 1;

      // Pauldron
      const shoulderGeo = new THREE.SphereGeometry(0.16, 12, 12);
      const shoulder = new THREE.Mesh(shoulderGeo, redArmorMaterial);
      shoulder.scale.set(1.1, 0.9, 1);
      arm.add(shoulder);

      // Bicep
      const bicepGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.3, 8);
      const bicep = new THREE.Mesh(bicepGeo, goldArmorMaterial);
      bicep.position.y = -0.22;
      arm.add(bicep);

      // Elbow Joint
      const elbowGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const elbow = new THREE.Mesh(elbowGeo, silverJointMaterial);
      elbow.position.y = -0.4;
      arm.add(elbow);

      // Forearm
      const forearmGeo = new THREE.CylinderGeometry(0.085, 0.07, 0.3, 8);
      const forearm = new THREE.Mesh(forearmGeo, redArmorMaterial);
      forearm.position.y = -0.58;
      arm.add(forearm);

      // Hand & Repulsor Palm
      const handGeo = new THREE.BoxGeometry(0.09, 0.11, 0.06);
      const hand = new THREE.Mesh(handGeo, goldArmorMaterial);
      hand.position.y = -0.76;
      arm.add(hand);

      const repulsorGeo = new THREE.CircleGeometry(0.025, 16);
      const repulsor = new THREE.Mesh(repulsorGeo, arcGlowMaterial);
      repulsor.rotation.x = Math.PI / 2;
      repulsor.position.y = -0.82;
      arm.add(repulsor);

      arm.position.set(sign * 0.44, 1.68, 0);
      arm.rotation.z = sign * -0.15;
      return arm;
    }

    const armLeft = createArm(true);
    const armRight = createArm(false);
    ironMan.add(armLeft);
    ironMan.add(armRight);

    // 5. LEGS
    function createLeg(isLeft) {
      const leg = new THREE.Group();
      const sign = isLeft ? -1 : 1;

      // Thigh
      const thighGeo = new THREE.CylinderGeometry(0.13, 0.1, 0.45, 8);
      const thigh = new THREE.Mesh(thighGeo, goldArmorMaterial);
      thigh.position.y = -0.25;
      leg.add(thigh);

      // Knee Joint
      const kneeGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const knee = new THREE.Mesh(kneeGeo, redArmorMaterial);
      knee.position.y = -0.5;
      leg.add(knee);

      // Shin / Greave
      const shinGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.48, 8);
      const shin = new THREE.Mesh(shinGeo, redArmorMaterial);
      shin.position.y = -0.76;
      leg.add(shin);

      // Boot
      const bootGeo = new THREE.BoxGeometry(0.14, 0.12, 0.26);
      const boot = new THREE.Mesh(bootGeo, goldArmorMaterial);
      boot.position.set(0, -1.02, 0.05);
      leg.add(boot);

      leg.position.set(sign * 0.18, 0.95, 0);
      return leg;
    }

    const legLeft = createLeg(true);
    const legRight = createLeg(false);
    ironMan.add(legLeft);
    ironMan.add(legRight);

    scene.add(ironMan);

    // --- HOLOGRAPHIC STARK LAB FLOOR ---
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x05070e,
      roughness: 0.15,
      metalness: 0.85
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.15;
    scene.add(floor);

    // Holographic Cybernetic Grid Ring
    const ringGeo = new THREE.RingGeometry(1.2, 1.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const holoRing = new THREE.Mesh(ringGeo, ringMat);
    holoRing.rotation.x = -Math.PI / 2;
    holoRing.position.y = -0.13;
    scene.add(holoRing);

    const ringOuterGeo = new THREE.RingGeometry(2.1, 2.12, 64);
    const ringOuter = new THREE.Mesh(ringOuterGeo, ringMat);
    ringOuter.rotation.x = -Math.PI / 2;
    ringOuter.position.y = -0.13;
    scene.add(ringOuter);

    // Floating Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = Math.random() * 3.5;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00f2ff, size: 0.035, transparent: true, opacity: 0.75 });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- INTERACTIVE ACTION BUTTONS ---
    let isWireframe = false;
    document.getElementById('btn-wireframe').addEventListener('click', () => {
      isWireframe = !isWireframe;
      redArmorMaterial.wireframe = isWireframe;
      goldArmorMaterial.wireframe = isWireframe;
      silverJointMaterial.wireframe = isWireframe;
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
      controls.reset();
      camera.position.set(0, 1.8, 4.2);
      controls.target.set(0, 1.3, 0);
    });

    const blastOverlay = document.getElementById('blast-overlay');
    document.getElementById('btn-blast').addEventListener('click', () => {
      blastOverlay.style.opacity = '1';
      arcPointLight.intensity = 15;
      setTimeout(() => {
        blastOverlay.style.opacity = '0';
        arcPointLight.intensity = 4;
      }, 400);
    });

    // Download Standalone Project & Notify Server
    document.getElementById('btn-download').addEventListener('click', () => {
      // Mark as downloaded on server
      const pathParts = window.location.pathname.split('/');
      const projId = pathParts[pathParts.length - 1];
      if (projId && projId.startsWith('proj_')) {
        fetch('/api/projects/' + projId + '/downloaded', { method: 'POST' }).catch(() => {});
      }

      // Trigger download of this standalone file
      const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'IronMan_Mark85_3D.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- RENDER & ANIMATION LOOP ---
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle breathing & idle float
      ironMan.position.y = Math.sin(elapsed * 2) * 0.04;
      ironMan.rotation.y = Math.sin(elapsed * 0.6) * 0.1;

      // Pulsing Arc Core Light
      arcPointLight.intensity = 3.8 + Math.sin(elapsed * 6) * 0.8;
      holoRing.rotation.z = elapsed * 0.2;
      ringOuter.rotation.z = -elapsed * 0.15;

      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
}

// Backwards compatibility alias
export const createCustom3DModelHtml = (subject = "3D Hologram", title?: string) => createProcedural3DModelHtml(subject, title);

// Intelligent Procedural 3D Model Generator for Any User Subject
export function createProcedural3DModelHtml(subject = "3D Hologram", title?: string): string {
  const displayTitle = title || `${subject.toUpperCase()} 3D Interactive Model`;
  const subLower = subject.toLowerCase();

  // 1. SOLAR SYSTEM / PLANETS / ASTRONOMY
  if (subLower.includes('solar') || subLower.includes('planet') || subLower.includes('earth') || subLower.includes('space') || subLower.includes('galaxy') || subLower.includes('moon')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${displayTitle}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body, html { width:100%; height:100%; overflow:hidden; background:#03050c; color:#fff; font-family:system-ui,sans-serif; }
    #canvas-container { width:100%; height:100%; position:absolute; inset:0; }
    .hud { position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center; z-index:10; pointer-events:none; }
    .brand { background:rgba(8,12,24,0.85); border:1px solid rgba(56,189,248,0.4); padding:10px 18px; border-radius:12px; backdrop-filter:blur(10px); pointer-events:auto; }
    .brand h1 { font-size:14px; font-weight:800; color:#38bdf8; letter-spacing:1.5px; text-transform:uppercase; }
    .brand p { font-size:10px; color:#94a3b8; font-family:monospace; }
    .btn { background:linear-gradient(135deg,#0284c7,#38bdf8); color:#000; border:none; font-weight:800; font-size:11px; padding:10px 18px; border-radius:10px; cursor:pointer; text-transform:uppercase; pointer-events:auto; box-shadow:0 0 15px rgba(56,189,248,0.4); }
    .hint { position:absolute; bottom:16px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.6); padding:6px 16px; border-radius:20px; font-size:11px; color:#94a3b8; border:1px solid rgba(255,255,255,0.1); pointer-events:none; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div id="canvas-container"></div>
  <div class="hud">
    <div class="brand">
      <h1>🪐 ${displayTitle}</h1>
      <p>INTERACTIVE CELESTIAL ORBITAL SIMULATION</p>
    </div>
    <button id="btn-download" class="btn">📥 DOWNLOAD 3D PROJECT</button>
  </div>
  <div class="hint">TOUCH & DRAG TO ROTATE • PINCH/SCROLL TO ZOOM</div>
  <script>
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 18, 32);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Ambient & Sun Light
    scene.add(new THREE.AmbientLight(0x222233, 1.2));
    const sunLight = new THREE.PointLight(0xfff5cc, 3, 100);
    scene.add(sunLight);

    // Glowing Sun Core
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(3.5, 32, 32), sunMat);
    scene.add(sun);

    // Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starCoords = [];
    for(let i=0; i<1500; i++){
      starCoords.push((Math.random()-0.5)*300, (Math.random()-0.5)*300, (Math.random()-0.5)*300);
    }
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color:0xffffff, size:0.6 })));

    // Planets
    const planets = [
      { name:'Mercury', r:0.6, dist:6.5, speed:0.04, color:0xaaaaaa },
      { name:'Venus', r:0.9, dist:9.5, speed:0.025, color:0xe3bb76 },
      { name:'Earth', r:1.0, dist:13.5, speed:0.018, color:0x2277ff, moon:true },
      { name:'Mars', r:0.7, dist:17.5, speed:0.014, color:0xcc4422 },
      { name:'Jupiter', r:2.0, dist:23.0, speed:0.008, color:0xd4a373 },
      { name:'Saturn', r:1.6, dist:29.0, speed:0.005, color:0xe0c878, ring:true }
    ];

    const planetMeshes = [];
    planets.forEach(p => {
      // Orbit Ring
      const orbitGeo = new THREE.RingGeometry(p.dist - 0.05, p.dist + 0.05, 64);
      const orbitMat = new THREE.MeshBasicMaterial({ color: 0x334155, side: THREE.DoubleSide, transparent:true, opacity:0.4 });
      const orbit = new THREE.Mesh(orbitGeo, orbitMat);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      const mesh = new THREE.Mesh(new THREE.SphereGeometry(p.r, 24, 24), new THREE.MeshStandardMaterial({ color: p.color, roughness:0.6 }));
      scene.add(mesh);

      let ringMesh = null;
      if (p.ring) {
        const ringGeo = new THREE.RingGeometry(p.r * 1.4, p.r * 2.3, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xc8b88a, side: THREE.DoubleSide, transparent:true, opacity:0.8 });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        scene.add(ringMesh);
      }

      planetMeshes.push({ ...p, mesh, ringMesh, angle: Math.random() * Math.PI * 2 });
    });

    document.getElementById('btn-download').addEventListener('click', () => {
      const projId = window.location.pathname.split('/').pop();
      if(projId) fetch('/api/projects/' + projId + '/downloaded', { method:'POST' }).catch(()=>{});
      const blob = new Blob([document.documentElement.outerHTML], { type:'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${subject.replace(/[^a-zA-Z0-9]/g, '_')}_SolarSystem_3D.html';
      a.click();
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.003;
      planetMeshes.forEach(p => {
        p.angle += p.speed;
        p.mesh.position.x = Math.cos(p.angle) * p.dist;
        p.mesh.position.z = Math.sin(p.angle) * p.dist;
        p.mesh.rotation.y += 0.02;
        if(p.ringMesh) {
          p.ringMesh.position.copy(p.mesh.position);
        }
      });
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
  }

  // 2. ROBOT / MECH / CYBORG / ANDROID
  if (subLower.includes('robot') || subLower.includes('mech') || subLower.includes('android') || subLower.includes('cyborg')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${displayTitle}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body, html { width:100%; height:100%; overflow:hidden; background:#070a14; color:#fff; font-family:system-ui,sans-serif; }
    #canvas-container { width:100%; height:100%; position:absolute; inset:0; }
    .hud { position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center; z-index:10; pointer-events:none; }
    .brand { background:rgba(8,12,24,0.85); border:1px solid rgba(239,68,68,0.4); padding:10px 18px; border-radius:12px; backdrop-filter:blur(10px); pointer-events:auto; }
    .brand h1 { font-size:14px; font-weight:800; color:#ef4444; letter-spacing:1.5px; text-transform:uppercase; }
    .brand p { font-size:10px; color:#94a3b8; font-family:monospace; }
    .btn { background:linear-gradient(135deg,#dc2626,#f87171); color:#fff; border:none; font-weight:800; font-size:11px; padding:10px 18px; border-radius:10px; cursor:pointer; text-transform:uppercase; pointer-events:auto; box-shadow:0 0 15px rgba(239,68,68,0.4); }
    .hint { position:absolute; bottom:16px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.6); padding:6px 16px; border-radius:20px; font-size:11px; color:#94a3b8; border:1px solid rgba(255,255,255,0.1); pointer-events:none; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div id="canvas-container"></div>
  <div class="hud">
    <div class="brand">
      <h1>🤖 ${displayTitle}</h1>
      <p>TACTICAL CYBERNETIC MECH UNIT</p>
    </div>
    <button id="btn-download" class="btn">📥 DOWNLOAD 3D MECH</button>
  </div>
  <div class="hint">TOUCH & DRAG TO ROTATE • PINCH/SCROLL TO ZOOM</div>
  <script>
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a14, 0.03);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2.2, 5.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.4, 0);

    scene.add(new THREE.AmbientLight(0x1e293b, 1.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const redGlow = new THREE.PointLight(0xef4444, 4, 6);
    redGlow.position.set(0, 1.8, 0.5);
    scene.add(redGlow);

    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.25 });
    const brightRed = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.8, roughness: 0.3 });
    const visorMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.95, roughness: 0.2 });

    const mech = new THREE.Group();

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.55), darkMetal);
    torso.position.y = 1.6;
    mech.add(torso);

    const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.2), brightRed);
    chestPlate.position.set(0, 1.75, 0.24);
    mech.add(chestPlate);

    const coreReactor = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16), visorMat);
    coreReactor.rotation.x = Math.PI/2;
    coreReactor.position.set(0, 1.75, 0.34);
    mech.add(coreReactor);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.34, 0.38), darkMetal);
    head.position.set(0, 2.25, 0.05);
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, 0.1), visorMat);
    visor.position.set(0, 2.25, 0.22);
    head.add(visor);
    mech.add(head);

    // Arms
    function makeArm(isLeft) {
      const g = new THREE.Group();
      const s = isLeft ? -1 : 1;
      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), brightRed);
      g.add(shoulder);
      const bicep = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.4, 8), darkMetal);
      bicep.position.y = -0.25;
      g.add(bicep);
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), jointMat);
      elbow.position.y = -0.45;
      g.add(elbow);
      const forearm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.45, 0.16), darkMetal);
      forearm.position.y = -0.7;
      g.add(forearm);
      // Arm Cannon
      const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.3, 8), brightRed);
      cannon.position.set(0, -0.9, 0.1);
      cannon.rotation.x = Math.PI/2;
      g.add(cannon);
      g.position.set(s * 0.58, 1.85, 0);
      return g;
    }
    mech.add(makeArm(true));
    mech.add(makeArm(false));

    // Legs
    function makeLeg(isLeft) {
      const g = new THREE.Group();
      const s = isLeft ? -1 : 1;
      const hip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), jointMat);
      g.add(hip);
      const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.55, 0.22), darkMetal);
      thigh.position.y = -0.32;
      g.add(thigh);
      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), brightRed);
      knee.position.y = -0.62;
      g.add(knee);
      const shin = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.22), darkMetal);
      shin.position.y = -0.95;
      g.add(shin);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.42), brightRed);
      foot.position.set(0, -1.3, 0.08);
      g.add(foot);
      g.position.set(s * 0.25, 1.15, 0);
      return g;
    }
    mech.add(makeLeg(true));
    mech.add(makeLeg(false));

    scene.add(mech);

    // Floor Grid
    const grid = new THREE.GridHelper(16, 32, 0xef4444, 0x1e293b);
    grid.position.y = -0.22;
    scene.add(grid);

    document.getElementById('btn-download').addEventListener('click', () => {
      const projId = window.location.pathname.split('/').pop();
      if(projId) fetch('/api/projects/' + projId + '/downloaded', { method:'POST' }).catch(()=>{});
      const blob = new Blob([document.documentElement.outerHTML], { type:'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${subject.replace(/[^a-zA-Z0-9]/g, '_')}_Mech_3D.html';
      a.click();
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mech.position.y = Math.sin(t * 1.5) * 0.04;
      redGlow.intensity = 3.5 + Math.sin(t * 4) * 1.2;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
  }

  // 3. AIRPLANE / JET / FLIGHT / AIRCRAFT / DRONE
  if (subLower.includes('airplane') || subLower.includes('plane') || subLower.includes('jet') || subLower.includes('aircraft') || subLower.includes('flight') || subLower.includes('drone')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${displayTitle}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body, html { width:100%; height:100%; overflow:hidden; background:#040914; color:#fff; font-family:system-ui,sans-serif; }
    #canvas-container { width:100%; height:100%; position:absolute; inset:0; }
    .hud { position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center; z-index:10; pointer-events:none; }
    .brand { background:rgba(8,12,24,0.85); border:1px solid rgba(14,165,233,0.4); padding:10px 18px; border-radius:12px; backdrop-filter:blur(10px); pointer-events:auto; }
    .brand h1 { font-size:14px; font-weight:800; color:#38bdf8; letter-spacing:1.5px; text-transform:uppercase; }
    .brand p { font-size:10px; color:#94a3b8; font-family:monospace; }
    .btn { background:linear-gradient(135deg,#0284c7,#38bdf8); color:#000; border:none; font-weight:800; font-size:11px; padding:10px 18px; border-radius:10px; cursor:pointer; text-transform:uppercase; pointer-events:auto; box-shadow:0 0 15px rgba(14,165,233,0.4); }
    .hint { position:absolute; bottom:16px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.6); padding:6px 16px; border-radius:20px; font-size:11px; color:#94a3b8; border:1px solid rgba(255,255,255,0.1); pointer-events:none; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div id="canvas-container"></div>
  <div class="hud">
    <div class="brand">
      <h1>✈️ ${displayTitle}</h1>
      <p>AERODYNAMIC SUPERSONIC AIRCRAFT</p>
    </div>
    <button id="btn-download" class="btn">📥 DOWNLOAD 3D AIRCRAFT</button>
  </div>
  <div class="hint">TOUCH & DRAG TO ROTATE • PINCH/SCROLL TO ZOOM</div>
  <script>
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(4, 3, 6);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0x334155, 1.8));
    const sun = new THREE.DirectionalLight(0xffffff, 2.5);
    sun.position.set(6, 10, 8);
    scene.add(sun);

    const jetMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.25 });
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.95, roughness: 0.1, transparent: true, opacity: 0.85 });
    const engineGlow = new THREE.MeshBasicMaterial({ color: 0x00f2ff });

    const jet = new THREE.Group();

    // Fuselage
    const fuse = new THREE.Mesh(new THREE.ConeGeometry(0.35, 3.2, 16), jetMat);
    fuse.rotation.x = Math.PI / 2;
    jet.add(fuse);

    // Cockpit Glass
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), canopyMat);
    canopy.scale.set(0.7, 0.6, 1.6);
    canopy.position.set(0, 0.22, 0.3);
    jet.add(canopy);

    // Delta Main Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(2.4, -1.2);
    wingShape.lineTo(2.2, -1.6);
    wingShape.lineTo(0, -1.0);
    wingShape.lineTo(-2.2, -1.6);
    wingShape.lineTo(-2.4, -1.2);
    wingShape.closePath();
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.rotation.x = Math.PI / 2;
    wings.position.set(0, 0.02, 0.5);
    jet.add(wings);

    // Twin Vertical Stabilizers
    const finGeo = new THREE.BoxGeometry(0.04, 0.7, 0.6);
    const finL = new THREE.Mesh(finGeo, jetMat);
    finL.position.set(-0.35, 0.4, -1.2);
    finL.rotation.z = -0.15;
    jet.add(finL);

    const finR = new THREE.Mesh(finGeo, jetMat);
    finR.position.set(0.35, 0.4, -1.2);
    finR.rotation.z = 0.15;
    jet.add(finR);

    // Jet Engine Exhausts
    const exhaustL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.4, 16), jetMat);
    exhaustL.rotation.x = Math.PI / 2;
    exhaustL.position.set(-0.24, -0.05, -1.5);
    jet.add(exhaustL);

    const exhaustR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.4, 16), jetMat);
    exhaustR.rotation.x = Math.PI / 2;
    exhaustR.position.set(0.24, -0.05, -1.5);
    jet.add(exhaustR);

    const glowL = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), engineGlow);
    glowL.position.set(-0.24, -0.05, -1.71);
    jet.add(glowL);

    const glowR = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), engineGlow);
    glowR.position.set(0.24, -0.05, -1.71);
    jet.add(glowR);

    scene.add(jet);

    // Cloud / Altitude Grid
    const grid = new THREE.GridHelper(20, 20, 0x0284c7, 0x0f172a);
    grid.position.y = -1.8;
    scene.add(grid);

    document.getElementById('btn-download').addEventListener('click', () => {
      const projId = window.location.pathname.split('/').pop();
      if(projId) fetch('/api/projects/' + projId + '/downloaded', { method:'POST' }).catch(()=>{});
      const blob = new Blob([document.documentElement.outerHTML], { type:'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${subject.replace(/[^a-zA-Z0-9]/g, '_')}_Aircraft_3D.html';
      a.click();
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      jet.position.y = Math.sin(t * 2) * 0.1;
      jet.rotation.z = Math.sin(t * 1.2) * 0.08;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
  }

  // 4. MULTI-LAYERED CYBERNETIC SCIFI 3D ARTIFACT (For all other custom user subjects)
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${displayTitle}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body, html { width:100%; height:100%; overflow:hidden; background:#070913; color:#fff; font-family:system-ui,sans-serif; }
    #canvas-container { width:100%; height:100%; position:absolute; inset:0; }
    .hud { position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center; z-index:10; pointer-events:none; }
    .brand { background:rgba(8,12,24,0.85); border:1px solid rgba(0,242,255,0.4); padding:10px 18px; border-radius:12px; backdrop-filter:blur(10px); pointer-events:auto; }
    .brand h1 { font-size:14px; font-weight:800; color:#00f2ff; letter-spacing:1.5px; text-transform:uppercase; }
    .brand p { font-size:10px; color:#94a3b8; font-family:monospace; }
    .actions { display:flex; gap:8px; pointer-events:auto; }
    .btn { background:linear-gradient(135deg,#0284c7,#00f2ff); color:#000; border:none; font-weight:800; font-size:11px; padding:10px 18px; border-radius:10px; cursor:pointer; text-transform:uppercase; box-shadow:0 0 15px rgba(0,242,255,0.4); }
    .btn-sec { background:rgba(15,23,42,0.85); color:#e2e8f0; border:1px solid rgba(0,242,255,0.4); }
    .hint { position:absolute; bottom:16px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.6); padding:6px 16px; border-radius:20px; font-size:11px; color:#94a3b8; border:1px solid rgba(255,255,255,0.1); pointer-events:none; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div id="canvas-container"></div>
  <div class="hud">
    <div class="brand">
      <h1>✨ ${displayTitle}</h1>
      <p>AUTONOMOUS PROCEDURAL 3D CAD MATRIX</p>
    </div>
    <div class="actions">
      <button id="btn-wireframe" class="btn btn-sec">🌐 WIREFRAME</button>
      <button id="btn-download" class="btn">📥 DOWNLOAD 3D FILE</button>
    </div>
  </div>
  <div class="hint">TOUCH & DRAG TO ROTATE • PINCH/SCROLL TO ZOOM</div>
  <script>
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070913, 0.035);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.8, 4.5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0x1e293b, 2));
    const pLight1 = new THREE.PointLight(0x00f2ff, 4, 8);
    pLight1.position.set(2, 3, 2);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0xa855f7, 3, 8);
    pLight2.position.set(-2, -1, -2);
    scene.add(pLight2);

    const group = new THREE.Group();

    // Central Core Polyhedron
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x00f2ff, metalness: 0.9, roughness: 0.15 });
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Glowing Inner Plasma
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true });
    const inner = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), innerMat);
    group.add(inner);

    // Orbital Gyro Ring 1
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.95 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    group.add(ring1);

    // Orbital Gyro Ring 2
    const ring2Geo = new THREE.TorusGeometry(1.8, 0.035, 16, 64);
    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.95 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    group.add(ring2);

    // Orbiting Satellite Nodes
    const satGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const sat = new THREE.Mesh(new THREE.OctahedronGeometry(0.16), new THREE.MeshStandardMaterial({ color: 0x00f2ff, metalness: 0.9 }));
      sat.position.set(Math.cos(angle) * 1.8, 0, Math.sin(angle) * 1.8);
      satGroup.add(sat);
    }
    group.add(satGroup);

    scene.add(group);

    // Particle Dust
    const pGeo = new THREE.BufferGeometry();
    const pCoords = [];
    for (let i = 0; i < 200; i++) {
      pCoords.push((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 8);
    }
    pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pCoords, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00f2ff, size: 0.03 })));

    let isWire = false;
    document.getElementById('btn-wireframe').addEventListener('click', () => {
      isWire = !isWire;
      coreMat.wireframe = isWire;
      ring1Mat.wireframe = isWire;
      ring2Mat.wireframe = isWire;
    });

    document.getElementById('btn-download').addEventListener('click', () => {
      const projId = window.location.pathname.split('/').pop();
      if(projId) fetch('/api/projects/' + projId + '/downloaded', { method:'POST' }).catch(()=>{});
      const blob = new Blob([document.documentElement.outerHTML], { type:'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${subject.replace(/[^a-zA-Z0-9]/g, '_')}_3D.html';
      a.click();
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      core.rotation.y = t * 0.4;
      core.rotation.x = t * 0.2;
      inner.rotation.y = -t * 0.6;
      ring1.rotation.x = t * 0.5;
      ring1.rotation.y = t * 0.3;
      ring2.rotation.y = -t * 0.4;
      satGroup.rotation.y = t * 0.8;
      group.position.y = Math.sin(t * 1.5) * 0.08;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
}

// Procedural Interactive HTML5 Game Generator
export function createProceduralGameHtml(gameType = "arcade game", title?: string): string {
  const displayTitle = title || `${gameType.toUpperCase()} - Interactive Game`;
  const typeLower = gameType.toLowerCase();

  // 1. NEON SNAKE GAME
  if (typeLower.includes('snake') || typeLower.includes('saanp')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${displayTitle}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#070b14; color:#fff; font-family:system-ui,sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; touch-action:none; }
    .header { width:100%; max-width:440px; padding:12px; display:flex; justify-content:space-between; align-items:center; }
    .title { font-size:16px; font-weight:800; color:#10b981; letter-spacing:1px; text-transform:uppercase; }
    .score-box { font-size:14px; font-family:monospace; background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:4px 12px; border-radius:8px; color:#10b981; }
    #canvas { background:#03060c; border:2px solid rgba(16,185,129,0.4); border-radius:12px; box-shadow:0 0 25px rgba(16,185,129,0.2); max-width:92vw; max-height:60vh; }
    .dpad { display:grid; grid-template-columns:repeat(3, 56px); grid-template-rows:repeat(2, 48px); gap:6px; margin-top:14px; }
    .btn-dpad { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); color:#fff; font-size:20px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
    .btn-dpad:active { background:#10b981; color:#000; }
    .btn-dl { margin-top:14px; background:#10b981; color:#000; border:none; padding:10px 24px; font-weight:800; font-size:12px; border-radius:999px; cursor:pointer; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">🐍 ${displayTitle}</div>
    <div class="score-box">SCORE: <span id="score">0</span></div>
  </div>
  <canvas id="canvas" width="400" height="400"></canvas>
  <div class="dpad">
    <div></div><button class="btn-dpad" onclick="setDir(0,-1)">⬆️</button><div></div>
    <button class="btn-dpad" onclick="setDir(-1,0)">⬅️</button><button class="btn-dpad" onclick="setDir(0,1)">⬇️</button><button class="btn-dpad" onclick="setDir(1,0)">➡️</button>
  </div>
  <button id="btn-dl" class="btn-dl">📥 DOWNLOAD GAME PROJECT</button>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const grid = 20;
    let snake = [{x: 160, y: 160}, {x: 140, y: 160}, {x: 120, y: 160}];
    let dx = grid, dy = 0;
    let food = {x: 240, y: 240};
    let score = 0;
    let gameOver = false;

    function randomFood() {
      food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
      food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
    }

    function setDir(x, y) {
      if ((x === 1 && dx === -grid) || (x === -1 && dx === grid)) return;
      if ((y === 1 && dy === -grid) || (y === -1 && dy === grid)) return;
      dx = x * grid;
      dy = y * grid;
    }

    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') setDir(0, -1);
      if (e.key === 'ArrowDown') setDir(0, 1);
      if (e.key === 'ArrowLeft') setDir(-1, 0);
      if (e.key === 'ArrowRight') setDir(1, 0);
    });

    function gameLoop() {
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 24px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 10);
        ctx.fillStyle = '#fff';
        ctx.font = '14px system-ui';
        ctx.fillText('Tap screen or Press Arrow to restart', canvas.width/2, canvas.height/2 + 20);
        return;
      }

      setTimeout(() => {
        requestAnimationFrame(gameLoop);
      }, 100);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Move snake
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};

      // Wrap borders
      if (head.x < 0) head.x = canvas.width - grid;
      if (head.x >= canvas.width) head.x = 0;
      if (head.y < 0) head.y = canvas.height - grid;
      if (head.y >= canvas.height) head.y = 0;

      // Self collision
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          gameOver = true;
          return;
        }
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').innerText = score;
        randomFood();
      } else {
        snake.pop();
      }

      // Draw food
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(food.x + grid/2, food.y + grid/2, grid/2.4, 0, Math.PI*2);
      ctx.fill();

      // Draw snake
      snake.forEach((part, idx) => {
        ctx.fillStyle = idx === 0 ? '#34d399' : '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = idx === 0 ? 12 : 4;
        ctx.fillRect(part.x + 1, part.y + 1, grid - 2, grid - 2);
      });
      ctx.shadowBlur = 0;
    }

    canvas.addEventListener('click', () => {
      if (gameOver) {
        snake = [{x: 160, y: 160}, {x: 140, y: 160}, {x: 120, y: 160}];
        dx = grid; dy = 0; score = 0; gameOver = false;
        document.getElementById('score').innerText = 0;
        randomFood();
        gameLoop();
      }
    });

    document.getElementById('btn-dl').addEventListener('click', () => {
      const projId = window.location.pathname.split('/').pop();
      if(projId) fetch('/api/projects/' + projId + '/downloaded', { method:'POST' }).catch(()=>{});
      const blob = new Blob([document.documentElement.outerHTML], { type:'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${gameType.replace(/[^a-zA-Z0-9]/g, '_')}.html';
      a.click();
    });

    randomFood();
    gameLoop();
  </script>
</body>
</html>`;
  }

  // 2. SPACE DEFENSE SHOOTER (Default game)
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${displayTitle}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#030712; color:#fff; font-family:system-ui,sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; overflow:hidden; touch-action:none; }
    .header { width:100%; max-width:440px; padding:12px; display:flex; justify-content:space-between; align-items:center; }
    .title { font-size:15px; font-weight:800; color:#38bdf8; letter-spacing:1px; text-transform:uppercase; }
    .stats { font-size:13px; font-family:monospace; color:#38bdf8; }
    #canvas { background:#02050e; border:1px solid rgba(56,189,248,0.4); border-radius:12px; box-shadow:0 0 25px rgba(56,189,248,0.25); max-width:94vw; }
    .ctrls { display:flex; gap:12px; margin-top:12px; }
    .btn-ctrl { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; font-size:22px; width:64px; height:48px; border-radius:10px; display:flex; align-items:center; justify-content:center; }
    .btn-ctrl:active { background:#38bdf8; color:#000; }
    .btn-fire { background:#ef4444; border:none; width:80px; font-weight:bold; font-size:15px; }
    .btn-dl { margin-top:12px; background:#38bdf8; color:#000; border:none; padding:10px 24px; font-weight:800; font-size:11px; border-radius:999px; cursor:pointer; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">🚀 ${displayTitle}</div>
    <div class="stats">SCORE: <span id="score">0</span> • HP: <span id="hp">100</span>%</div>
  </div>
  <canvas id="canvas" width="400" height="500"></canvas>
  <div class="ctrls">
    <button class="btn-ctrl" onpointerdown="move(-1)" onpointerup="stopMove()">⬅️</button>
    <button class="btn-ctrl btn-fire" onpointerdown="shoot()">🔥 FIRE</button>
    <button class="btn-ctrl" onpointerdown="move(1)" onpointerup="stopMove()">➡️</button>
  </div>
  <button id="btn-dl" class="btn-dl">📥 DOWNLOAD GAME PROJECT</button>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let shipX = canvas.width / 2;
    let shipDir = 0;
    let bullets = [];
    let enemies = [];
    let score = 0;
    let hp = 100;
    let gameOver = false;

    function move(dir) { shipDir = dir; }
    function stopMove() { shipDir = 0; }
    function shoot() {
      if (!gameOver) bullets.push({x: shipX, y: canvas.height - 45});
    }

    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === ' ' || e.key === 'ArrowUp') shoot();
    });
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') stopMove();
    });

    function spawnEnemy() {
      if (!gameOver && Math.random() < 0.04) {
        enemies.push({x: Math.random() * (canvas.width - 40) + 20, y: -20, r: 14 + Math.random()*8, speed: 2 + Math.random()*2});
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 26px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('MISSION FAILED', canvas.width/2, canvas.height/2 - 10);
        ctx.fillStyle = '#fff';
        ctx.font = '14px system-ui';
        ctx.fillText('Click to restart', canvas.width/2, canvas.height/2 + 25);
        requestAnimationFrame(loop);
        return;
      }

      spawnEnemy();

      // Move ship
      shipX += shipDir * 6;
      if (shipX < 20) shipX = 20;
      if (shipX > canvas.width - 20) shipX = canvas.width - 20;

      // Draw Ship
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(shipX, canvas.height - 50);
      ctx.lineTo(shipX - 18, canvas.height - 20);
      ctx.lineTo(shipX + 18, canvas.height - 20);
      ctx.closePath();
      ctx.fill();

      // Bullets
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15';
      bullets.forEach((b, i) => {
        b.y -= 9;
        ctx.fillRect(b.x - 2, b.y, 4, 12);
        if (b.y < -10) bullets.splice(i, 1);
      });

      // Enemies
      enemies.forEach((e, ei) => {
        e.y += e.speed;
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();

        // Check bullet hit
        bullets.forEach((b, bi) => {
          const dist = Math.hypot(b.x - e.x, b.y - e.y);
          if (dist < e.r + 6) {
            enemies.splice(ei, 1);
            bullets.splice(bi, 1);
            score += 20;
            document.getElementById('score').innerText = score;
          }
        });

        // Hit ship bottom
        if (e.y > canvas.height - 30) {
          enemies.splice(ei, 1);
          hp -= 20;
          document.getElementById('hp').innerText = Math.max(0, hp);
          if (hp <= 0) gameOver = true;
        }
      });
      ctx.shadowBlur = 0;

      requestAnimationFrame(loop);
    }

    canvas.addEventListener('click', () => {
      if (gameOver) {
        hp = 100; score = 0; enemies = []; bullets = []; gameOver = false;
        document.getElementById('score').innerText = 0;
        document.getElementById('hp').innerText = 100;
      }
    });

    document.getElementById('btn-dl').addEventListener('click', () => {
      const projId = window.location.pathname.split('/').pop();
      if(projId) fetch('/api/projects/' + projId + '/downloaded', { method:'POST' }).catch(()=>{});
      const blob = new Blob([document.documentElement.outerHTML], { type:'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${gameType.replace(/[^a-zA-Z0-9]/g, '_')}_Game.html';
      a.click();
    });

    requestAnimationFrame(loop);
  </script>
</body>
</html>`;
}

// Procedural Interactive Web Application / Website Generator
export function createProceduralWebHtml(subject = "Web Application", title?: string): string {
  const displayTitle = title || `${subject.toUpperCase()} - Interactive Application`;
  const subLower = subject.toLowerCase();

  // 1. SCIENTIFIC / FUTURISTIC CALCULATOR
  if (subLower.includes('calculator') || subLower.includes('calc')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: radial-gradient(circle at top, #0f172a 0%, #030712 100%); min-height: 100vh; font-family: system-ui, sans-serif; }
  </style>
</head>
<body class="flex flex-col items-center justify-center p-4 text-white">
  <div class="w-full max-w-sm bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
    <div class="flex justify-between items-center mb-4">
      <div class="text-xs font-mono text-cyan-400 font-semibold tracking-wider">JARVIS • NEURAL CALC</div>
      <button id="btn-dl" class="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full font-bold hover:bg-cyan-500 hover:text-black transition">📥 EXPORT</button>
    </div>
    
    <div class="bg-black/60 border border-slate-800 rounded-2xl p-4 mb-5 text-right">
      <div id="prev" class="text-xs text-slate-500 font-mono h-4 overflow-hidden"></div>
      <div id="display" class="text-3xl font-mono text-cyan-300 font-bold tracking-tight">0</div>
    </div>

    <div class="grid grid-cols-4 gap-2.5">
      <button onclick="clearCalc()" class="p-3 bg-red-500/20 text-red-400 font-bold rounded-xl active:scale-95 transition">AC</button>
      <button onclick="appendOp('(')" class="p-3 bg-slate-800 text-slate-300 font-bold rounded-xl active:scale-95 transition">(</button>
      <button onclick="appendOp(')')" class="p-3 bg-slate-800 text-slate-300 font-bold rounded-xl active:scale-95 transition">)</button>
      <button onclick="appendOp('/')" class="p-3 bg-cyan-500/20 text-cyan-400 font-bold rounded-xl active:scale-95 transition">÷</button>

      <button onclick="appendNum('7')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">7</button>
      <button onclick="appendNum('8')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">8</button>
      <button onclick="appendNum('9')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">9</button>
      <button onclick="appendOp('*')" class="p-3 bg-cyan-500/20 text-cyan-400 font-bold rounded-xl active:scale-95 transition">×</button>

      <button onclick="appendNum('4')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">4</button>
      <button onclick="appendNum('5')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">5</button>
      <button onclick="appendNum('6')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">6</button>
      <button onclick="appendOp('-')" class="p-3 bg-cyan-500/20 text-cyan-400 font-bold rounded-xl active:scale-95 transition">−</button>

      <button onclick="appendNum('1')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">1</button>
      <button onclick="appendNum('2')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">2</button>
      <button onclick="appendNum('3')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">3</button>
      <button onclick="appendOp('+')" class="p-3 bg-cyan-500/20 text-cyan-400 font-bold rounded-xl active:scale-95 transition">+</button>

      <button onclick="appendNum('0')" class="p-3.5 col-span-2 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">0</button>
      <button onclick="appendNum('.')" class="p-3.5 bg-slate-800/80 font-bold rounded-xl active:scale-95 transition">.</button>
      <button onclick="calculate()" class="p-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-extrabold rounded-xl shadow-lg active:scale-95 transition">=</button>
    </div>
  </div>

  <script>
    let expr = '';
    const disp = document.getElementById('display');
    const prev = document.getElementById('prev');

    function appendNum(n) {
      if (expr === '0' && n !== '.') expr = '';
      expr += n;
      disp.innerText = expr;
    }
    function appendOp(op) {
      expr += ' ' + op + ' ';
      disp.innerText = expr;
    }
    function clearCalc() {
      expr = '';
      disp.innerText = '0';
      prev.innerText = '';
    }
    function calculate() {
      try {
        prev.innerText = expr;
        const res = Function('"use strict";return (' + expr + ')')();
        disp.innerText = res;
        expr = String(res);
      } catch(e) {
        disp.innerText = 'Error';
        expr = '';
      }
    }

    document.getElementById('btn-dl').addEventListener('click', () => {
      const projId = window.location.pathname.split('/').pop();
      if(projId) fetch('/api/projects/' + projId + '/downloaded', { method:'POST' }).catch(()=>{});
      const blob = new Blob([document.documentElement.outerHTML], { type:'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${subject.replace(/[^a-zA-Z0-9]/g, '_')}_App.html';
      a.click();
    });
  </script>
</body>
</html>`;
  }

  // 2. MODERN RESPONSIVE WEB APPLICATION / LANDING PAGE
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #070913; color: #f8fafc; font-family: system-ui, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col">
  <!-- Nav -->
  <nav class="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
        <span class="font-extrabold text-sm tracking-widest text-cyan-400 uppercase">${displayTitle}</span>
      </div>
      <button id="btn-dl" class="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-lg shadow-cyan-500/20">📥 DOWNLOAD PROJECT</button>
    </div>
  </nav>

  <!-- Hero -->
  <main class="flex-1 max-w-6xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-mono mb-6">
      <span>●</span> PRODUCTION BUILD // AUTONOMOUS ENGINE
    </div>
    <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 max-w-3xl">
      ${subject.toUpperCase()}
    </h1>
    <p class="text-slate-400 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
      High performance, standalone web application architected with cutting-edge UI components, persistent interactions, and responsive design.
    </p>

    <!-- Bento Grid Features -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl text-left">
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition">
        <div class="text-cyan-400 text-2xl mb-3">⚡</div>
        <h3 class="font-bold text-white mb-2">Ultra Fast Speed</h3>
        <p class="text-sm text-slate-400">Zero latency client-side execution optimized for modern desktop & mobile browsers.</p>
      </div>
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition">
        <div class="text-cyan-400 text-2xl mb-3">🛡️</div>
        <h3 class="font-bold text-white mb-2">Standalone Portability</h3>
        <p class="text-sm text-slate-400">Single self-contained HTML file that runs anywhere without node_modules or build steps.</p>
      </div>
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition">
        <div class="text-cyan-400 text-2xl mb-3">📱</div>
        <h3 class="font-bold text-white mb-2">Responsive Matrix</h3>
        <p class="text-sm text-slate-400">Adaptive fluid layout styled with modern Tailwind CSS utility framework.</p>
      </div>
    </div>
  </main>

  <footer class="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 font-mono">
    GENERATED VIA JARVIS & ROSE AUTONOMOUS PROTOCOL
  </footer>

  <script>
    document.getElementById('btn-dl').addEventListener('click', () => {
      const projId = window.location.pathname.split('/').pop();
      if(projId) fetch('/api/projects/' + projId + '/downloaded', { method:'POST' }).catch(()=>{});
      const blob = new Blob([document.documentElement.outerHTML], { type:'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${subject.replace(/[^a-zA-Z0-9]/g, '_')}.html';
      a.click();
    });
  </script>
</body>
</html>`;
}
