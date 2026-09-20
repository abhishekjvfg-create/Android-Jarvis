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

export function createCustom3DModelHtml(subject = "3D Hologram", title?: string): string {
  const displayTitle = title || `${subject.toUpperCase()} 3D Interactive Model`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { width: 100%; height: 100%; overflow: hidden; background: #070913; color: #fff; font-family: -apple-system, sans-serif; }
    #canvas-container { width: 100%; height: 100%; position: absolute; inset: 0; }
    .hud { position: absolute; top: 16px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 10; pointer-events: none; }
    .title-box { background: rgba(8,12,22,0.85); border: 1px solid rgba(0,242,255,0.4); padding: 10px 16px; border-radius: 12px; pointer-events: auto; }
    .title { font-size: 14px; font-weight: bold; color: #00f2ff; letter-spacing: 1px; text-transform: uppercase; }
    .btn { background: #00f2ff; color: #000; border: none; font-weight: bold; font-size: 12px; padding: 10px 18px; border-radius: 10px; cursor: pointer; text-transform: uppercase; pointer-events: auto; }
    .btn:hover { background: #38bdf8; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div id="canvas-container"></div>
  <div class="hud">
    <div class="title-box">
      <div class="title">${displayTitle}</div>
      <div style="font-size: 10px; color: #94a3b8; font-family: monospace;">Procedural 3D Neural Mesh</div>
    </div>
    <button id="btn-download" class="btn">📥 DOWNLOAD 3D FILE</button>
  </div>
  <script>
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0x334155, 2));
    const dir = new THREE.DirectionalLight(0x00f2ff, 2);
    dir.position.set(3, 4, 3);
    scene.add(dir);

    // Torus knot core hologram
    const geo = new THREE.TorusKnotGeometry(0.8, 0.28, 100, 16);
    const mat = new THREE.MeshStandardMaterial({ color: 0x00f2ff, metalness: 0.9, roughness: 0.2 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    document.getElementById('btn-download').addEventListener('click', () => {
      const pathParts = window.location.pathname.split('/');
      const projId = pathParts[pathParts.length - 1];
      if (projId) fetch('/api/projects/' + projId + '/downloaded', { method: 'POST' }).catch(() => {});

      const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
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

    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.015;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
}
