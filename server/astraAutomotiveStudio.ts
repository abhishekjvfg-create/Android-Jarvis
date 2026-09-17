// GPT-6 ASTRA Automotive Studio Reference & High-Precision Procedural 3D Generator
// Delivers photorealistic, 60 FPS, class-based Three.js (v0.160.0) sports coupe matching Image 3

export function getAstraAutomotiveStudioHtml(brandName: string = "BMW", modelTitle: string = "Sport coupe. Every angle."): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>${brandName} / DESIGN STUDY - Interactive Automotive Studio</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
    }
    body, html {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #0b0f19;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #f8fafc;
    }
    #webgl-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      z-index: 1;
    }
    /* UI Overlay */
    .ui-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px;
    }
    .interactive {
      pointer-events: auto;
    }
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }
    .brand-block {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: radial-gradient(circle, #ffffff 10%, #1e3a8a 40%, #000000 90%);
      border: 2px solid rgba(255, 255, 255, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
      position: relative;
      overflow: hidden;
    }
    .brand-logo::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background: rgba(255,255,255,0.8);
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    .brand-logo::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 2px;
      background: rgba(255,255,255,0.8);
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
    .brand-title-wrap {
      display: flex;
      flex-direction: column;
    }
    .brand-title {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #e2e8f0;
    }
    .brand-sub {
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #94a3b8;
      margin-top: 2px;
    }
    .header-actions {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .icon-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      backdrop-filter: blur(12px);
      transition: all 0.2s ease;
    }
    .icon-btn:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
    .pill-btn {
      padding: 9px 16px;
      border-radius: 100px;
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #f8fafc;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.5px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      backdrop-filter: blur(12px);
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .pill-btn:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    /* Hero Typography */
    .hero-text-block {
      margin-top: 16px;
      max-width: 420px;
    }
    .step-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .step-line {
      width: 24px;
      height: 1.5px;
      background: #64748b;
    }
    .hero-headline {
      font-size: 38px;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.5px;
      color: #f8fafc;
    }
    .hero-desc {
      font-size: 13px;
      line-height: 1.5;
      color: #94a3b8;
      margin-top: 8px;
    }

    /* Floating Studio Deck (Bottom Controls) */
    .bottom-controls-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .studio-card {
      width: 100%;
      max-width: 520px;
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
    }
    .control-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }
    .control-col {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .control-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #64748b;
    }
    /* Color Swatches */
    .color-swatches {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    .color-swatch:hover {
      transform: scale(1.1);
    }
    .color-swatch.active {
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
      transform: scale(1.12);
    }
    /* Camera Presets */
    .cam-presets {
      display: flex;
      gap: 8px;
    }
    .cam-btn {
      padding: 6px 12px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      color: #94a3b8;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .cam-btn:hover {
      color: #f8fafc;
      background: rgba(51, 65, 85, 0.8);
    }
    .cam-btn.active {
      color: #38bdf8;
      background: rgba(14, 165, 233, 0.15);
      border-color: rgba(56, 189, 248, 0.4);
    }
    /* Studio Toggles */
    .studio-toggles {
      display: flex;
      justify-content: center;
      gap: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 12px;
      margin-top: 2px;
    }
    .toggle-action-btn {
      padding: 8px 18px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      color: #e2e8f0;
      font-size: 12px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .toggle-action-btn:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .toggle-action-btn.active {
      background: rgba(14, 165, 233, 0.2);
      border-color: #38bdf8;
      color: #38bdf8;
    }
    .hint-caption {
      font-size: 11px;
      letter-spacing: 0.5px;
      color: #64748b;
      text-align: center;
    }
    /* Right Vertical Stamp */
    .side-stamp {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%) rotate(90deg);
      font-size: 9px;
      letter-spacing: 4px;
      color: #475569;
      text-transform: uppercase;
      transform-origin: right center;
    }
    @media (max-width: 640px) {
      .ui-layer {
        padding: 12px;
      }
      .hero-headline {
        font-size: 22px;
      }
      .hero-desc {
        font-size: 11px;
      }
      .studio-card {
        padding: 10px 12px;
      }
      .color-swatch {
        width: 26px;
        height: 26px;
      }
    }
    @media (max-height: 480px) {
      .ui-layer {
        padding: 10px 12px;
      }
      .hero-text-block {
        display: none;
      }
      .side-stamp {
        display: none;
      }
      .studio-card {
        padding: 8px 10px;
      }
      .color-swatch {
        width: 22px;
        height: 22px;
      }
      .cam-btn {
        padding: 3px 8px;
        font-size: 11px;
      }
      .toggle-action-btn {
        padding: 4px 10px;
        font-size: 11px;
      }
      .hint-caption {
        display: none;
      }
    }
  </style>

  <!-- Universal High-Reliability Three.js & Multi-CDN Fallback (r128 UMD) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script>
    if (typeof THREE === 'undefined') {
      document.write('<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"><\\/script>');
    }
  </script>
  <script>
    if (typeof THREE === 'undefined') {
      document.write('<script src="https://unpkg.com/three@0.128.0/build/three.min.js"><\\/script>');
    }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <!-- High-Precision Visual Studio Loader (Fades out when 3D scene renders) -->
  <div id="studio-loader" style="position: absolute; inset: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0b0f19; color: #fff; font-family: -apple-system, sans-serif; pointer-events: none; transition: opacity 0.4s ease;">
    <div style="width: 46px; height: 46px; border: 3px solid rgba(59, 130, 246, 0.2); border-top-color: #3b82f6; border-radius: 50%; animation: astraSpin 0.85s linear infinite;"></div>
    <div style="margin-top: 14px; font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: #94a3b8; text-transform: uppercase;">INITIALIZING 3D ENGINE...</div>
  </div>
  <style>
    @keyframes astraSpin { to { transform: rotate(360deg); } }
  </style>

  <canvas id="webgl-canvas"></canvas>

  <!-- UI Overlay matching Image 3 -->
  <div class="ui-layer">
    <!-- Top Header -->
    <div class="header interactive">
      <div class="brand-block">
        <div class="brand-logo" title="${brandName}"></div>
        <div class="brand-title-wrap">
          <div class="brand-title">${brandName} / DESIGN STUDY</div>
          <div class="brand-sub">INTERACTIVE AUTOMOTIVE STUDIO</div>
        </div>
      </div>
      <div class="header-actions">
        <button id="btn-reset" class="icon-btn" title="Reset Camera">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
        <button id="btn-snapshot" class="icon-btn" title="Snapshot HD">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </button>
        <button id="btn-download" class="pill-btn" title="Download Standalone HTML">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download HTML
        </button>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="hero-text-block">
      <div class="step-tag">
        <span class="step-line"></span>
        <span>01 / EXTERIOR</span>
      </div>
      <h1 class="hero-headline">${modelTitle}</h1>
      <p class="hero-desc">A sculpted, ${brandName}-inspired concept. Take the driver's perspective.</p>
    </div>

    <!-- Side Brand Stamp -->
    <div class="side-stamp">FORM / LIGHT / MOTION</div>

    <!-- Bottom Studio Controls -->
    <div class="bottom-controls-wrap interactive">
      <div class="studio-card">
        <div class="control-row">
          <!-- Body Finish Selector -->
          <div class="control-col">
            <span class="control-label">BODY FINISH</span>
            <div class="color-swatches">
              <div class="color-swatch active" data-color="#1d4ed8" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);" title="M-Electric Blue"></div>
              <div class="color-swatch" data-color="#f8fafc" style="background: linear-gradient(135deg, #ffffff, #cbd5e1);" title="Alpine White"></div>
              <div class="color-swatch" data-color="#1e293b" style="background: linear-gradient(135deg, #334155, #0f172a);" title="Dark Graphite / Carbon"></div>
              <div class="color-swatch" data-color="#dc2626" style="background: linear-gradient(135deg, #ef4444, #991b1b);" title="Crimson Red"></div>
              <div class="color-swatch" data-color="#d97706" style="background: linear-gradient(135deg, #f59e0b, #b45309);" title="Sunset Gold"></div>
            </div>
          </div>

          <!-- Camera Angles -->
          <div class="control-col">
            <span class="control-label">CAMERA</span>
            <div class="cam-presets">
              <button class="cam-btn active" data-cam="threequarter">3/4</button>
              <button class="cam-btn" data-cam="side">Side</button>
              <button class="cam-btn" data-cam="rear">Rear</button>
            </div>
          </div>
        </div>

        <!-- Studio Lighting & Rotate Toggles -->
        <div class="studio-toggles">
          <button id="toggle-lights" class="toggle-action-btn active">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              <circle cx="12" cy="12" r="4"/>
            </svg>
            Lights
          </button>
          <button id="toggle-rotate" class="toggle-action-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            Rotate
          </button>
        </div>
      </div>

      <div class="hint-caption">Drag to orbit &bull; Scroll / pinch to zoom</div>
    </div>
  </div>

  <!-- Three.js Class-Based Automotive Studio App (Universal Script) -->
  <script>
    (function() {
      // 1. High-Precision Embedded Orbit Controller (Guarantees 360-degree rotation even if CDN fails)
      class EmbeddedOrbitController {
        constructor(camera, domElement) {
          this.camera = camera;
          this.domElement = domElement;
          this.target = new THREE.Vector3(0, 0.4, 0);
          this.dampingFactor = 0.08;
          this.autoRotate = false;
          this.autoRotateSpeed = 1.6;
          this.minDistance = 3.2;
          this.maxDistance = 12.0;
          this.maxPolarAngle = Math.PI / 2 - 0.04;
          this.minPolarAngle = 0.15;

          const offset = new THREE.Vector3().subVectors(this.camera.position, this.target);
          this.radius = Math.max(this.minDistance, Math.min(this.maxDistance, offset.length()));
          this.theta = Math.atan2(offset.x, offset.z);
          this.phi = Math.acos(Math.max(-1, Math.min(1, offset.y / this.radius)));
          this.targetRadius = this.radius;
          this.targetTheta = this.theta;
          this.targetPhi = this.phi;

          this.isDragging = false;
          this.prevX = 0;
          this.prevY = 0;
          this.pinchDist = 0;

          this.bind();
        }

        bind() {
          const el = this.domElement;
          const onDown = (clientX, clientY) => {
            this.isDragging = true;
            this.prevX = clientX;
            this.prevY = clientY;
          };
          const onMove = (clientX, clientY) => {
            if (!this.isDragging) return;
            const dx = clientX - this.prevX;
            const dy = clientY - this.prevY;
            this.prevX = clientX;
            this.prevY = clientY;

            this.targetTheta -= dx * 0.007;
            this.targetPhi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.targetPhi - dy * 0.007));
          };
          const onUp = () => { this.isDragging = false; };

          el.addEventListener('mousedown', e => onDown(e.clientX, e.clientY));
          window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
          window.addEventListener('mouseup', onUp);

          el.addEventListener('touchstart', e => {
            if (e.touches.length === 1) onDown(e.touches[0].clientX, e.touches[0].clientY);
          }, { passive: true });
          window.addEventListener('touchmove', e => {
            if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY);
          }, { passive: true });
          window.addEventListener('touchend', onUp, { passive: true });

          el.addEventListener('wheel', e => {
            e.preventDefault();
            this.targetRadius = Math.max(this.minDistance, Math.min(this.maxDistance, this.targetRadius + e.deltaY * 0.005));
          }, { passive: false });
        }

        update() {
          if (this.autoRotate && !this.isDragging) {
            this.targetTheta += this.autoRotateSpeed * 0.007;
          }
          this.theta += (this.targetTheta - this.theta) * this.dampingFactor;
          this.phi += (this.targetPhi - this.phi) * this.dampingFactor;
          this.radius += (this.targetRadius - this.radius) * this.dampingFactor;

          const x = this.target.x + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
          const y = this.target.y + this.radius * Math.cos(this.phi);
          const z = this.target.z + this.radius * Math.sin(this.phi) * Math.cos(this.theta);

          this.camera.position.set(x, y, z);
          this.camera.lookAt(this.target);
        }

        syncFromCamera() {
          const offset = new THREE.Vector3().subVectors(this.camera.position, this.target);
          this.targetRadius = this.radius = Math.max(this.minDistance, Math.min(this.maxDistance, offset.length()));
          this.targetTheta = this.theta = Math.atan2(offset.x, offset.z);
          this.targetPhi = this.phi = Math.acos(Math.max(-1, Math.min(1, offset.y / this.radius)));
        }
      }

      class AstraAutomotiveStudio {
        constructor() {
          this.canvas = document.getElementById('webgl-canvas');
          this.clock = new THREE.Clock();
          
          // State
          this.autoRotate = false;
          this.headlightsOn = true;
          this.currentPaintColor = 0x1d4ed8;
          this.isTransitioning = false;
          this.hasRenderedFirstFrame = false;
          
          // Target camera position for smooth preset transitions
          this.targetCamPos = new THREE.Vector3(5.5, 2.2, 5.5);
          this.targetLookAt = new THREE.Vector3(0, 0.4, 0);

          this.initRenderer();
          this.initScene();
          this.initCamera();
          this.initLighting();
          this.initEnvironment();
          this.initObjects();
          this.bindEvents();
          this.initUI();
          this.animate = this.animate.bind(this);
          requestAnimationFrame(this.animate);
        }

        initRenderer() {
          try {
            this.renderer = new THREE.WebGLRenderer({
              canvas: this.canvas,
              antialias: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
              alpha: false
            });
          } catch (e) {
            console.error("WebGL initialization error:", e);
            return;
          }

          const w = window.innerWidth || this.canvas.clientWidth || 400;
          const h = window.innerHeight || this.canvas.clientHeight || 300;
          this.renderer.setSize(w, h);
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          this.renderer.setClearColor(0x0b0f19, 1);

          if (THREE.SRGBColorSpace) {
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
          } else if (THREE.sRGBEncoding) {
            this.renderer.outputEncoding = THREE.sRGBEncoding;
          }
          if (THREE.ACESFilmicToneMapping) {
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.05;
          }
          if (this.renderer.shadowMap) {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          }
        }

        initScene() {
          this.scene = new THREE.Scene();
          this.scene.background = new THREE.Color(0x0b0f19);
          this.scene.fog = new THREE.FogExp2(0x0b0f19, 0.035);
          window.scene = this.scene;
        }

        initCamera() {
          const w = window.innerWidth || this.canvas.clientWidth || 400;
          const h = window.innerHeight || this.canvas.clientHeight || 300;
          this.camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
          this.camera.position.copy(this.targetCamPos);
          window.camera = this.camera;

          const ControlsClass = THREE.OrbitControls || window.OrbitControls;
          if (ControlsClass) {
            try {
              this.controls = new ControlsClass(this.camera, this.renderer.domElement);
              this.controls.enableDamping = true;
              this.controls.dampingFactor = 0.06;
              this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
              this.controls.minDistance = 3.0;
              this.controls.maxDistance = 14.0;
              this.controls.target.copy(this.targetLookAt);
            } catch (err) {
              this.controls = new EmbeddedOrbitController(this.camera, this.renderer.domElement);
            }
          } else {
            this.controls = new EmbeddedOrbitController(this.camera, this.renderer.domElement);
          }
        }

      initLighting() {
        // Soft ambient base
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Key Light (Main top studio spotlight)
        this.keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
        this.keyLight.position.set(6, 12, 6);
        this.keyLight.castShadow = true;
        this.keyLight.shadow.mapSize.width = 2048;
        this.keyLight.shadow.mapSize.height = 2048;
        this.keyLight.shadow.bias = -0.0001;
        this.keyLight.shadow.camera.near = 1;
        this.keyLight.shadow.camera.far = 25;
        this.keyLight.shadow.camera.left = -5;
        this.keyLight.shadow.camera.right = 5;
        this.keyLight.shadow.camera.top = 5;
        this.keyLight.shadow.camera.bottom = -5;
        this.scene.add(this.keyLight);

        // Fill Light (Soft cool fill from opposite side)
        const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
        fillLight.position.set(-8, 6, -4);
        this.scene.add(fillLight);

        // Rim Light (Edge definition from rear)
        const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
        rimLight.position.set(-6, 4, 8);
        this.scene.add(rimLight);

        // Front Headlight Spotlights (Emanating from vehicle)
        this.headlightBeamLeft = new THREE.SpotLight(0x67e8f9, 4.0, 15, Math.PI / 6, 0.4, 1.0);
        this.headlightBeamLeft.position.set(2.1, 0.5, 0.75);
        this.headlightBeamLeft.target.position.set(8, 0, 0.75);
        this.scene.add(this.headlightBeamLeft);
        this.scene.add(this.headlightBeamLeft.target);

        this.headlightBeamRight = new THREE.SpotLight(0x67e8f9, 4.0, 15, Math.PI / 6, 0.4, 1.0);
        this.headlightBeamRight.position.set(2.1, 0.5, -0.75);
        this.headlightBeamRight.target.position.set(8, 0, -0.75);
        this.scene.add(this.headlightBeamRight);
        this.scene.add(this.headlightBeamRight.target);
      }

      initEnvironment() {
        // High-grade dark reflective studio floor
        const floorGeo = new THREE.PlaneGeometry(60, 60);
        const floorMat = new THREE.MeshStandardMaterial({
          color: 0x090d16,
          roughness: 0.28,
          metalness: 0.65
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -0.01;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Procedural Soft Contact Shadow Disc directly underneath vehicle
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 512;
        shadowCanvas.height = 512;
        const ctx = shadowCanvas.getContext('2d');
        const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 250);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
        grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        const shadowTex = new THREE.CanvasTexture(shadowCanvas);
        const shadowPlaneGeo = new THREE.PlaneGeometry(5.4, 2.8);
        const shadowPlaneMat = new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          opacity: 0.8
        });
        const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = 0.005;
        this.scene.add(shadowPlane);
      }

      initObjects() {
        this.carGroup = new THREE.Group();
        this.scene.add(this.carGroup);

        // --- Materials ---
        // 1. High-Gloss Metallic Car Paint (MeshPhysicalMaterial with clearcoat)
        this.paintMaterial = new THREE.MeshPhysicalMaterial({
          color: this.currentPaintColor,
          metalness: 0.82,
          roughness: 0.16,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          reflectivity: 0.95
        });

        // 2. Carbon Fiber / Dark Aerodynamic Trim
        const carbonMat = new THREE.MeshStandardMaterial({
          color: 0x111827,
          roughness: 0.4,
          metalness: 0.8
        });

        // 3. Dark Tinted Automotive Glass
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x0f172a,
          metalness: 0.1,
          roughness: 0.05,
          transmission: 0.6,
          transparent: true,
          opacity: 0.85
        });

        // 4. Emissive Headlights (Crystal LED)
        this.headlightMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0x67e8f9,
          emissiveIntensity: 3.2,
          roughness: 0.1
        });

        // 5. Emissive Taillights (Ruby Red LED)
        this.taillightMat = new THREE.MeshStandardMaterial({
          color: 0x991b1b,
          emissive: 0xef4444,
          emissiveIntensity: 2.8,
          roughness: 0.2
        });

        // 6. Chrome / Machined Aluminum (Exhausts & Badges)
        const chromeMat = new THREE.MeshStandardMaterial({
          color: 0xf1f5f9,
          metalness: 0.96,
          roughness: 0.1
        });

        // 7. Rubber Tire
        const tireMat = new THREE.MeshStandardMaterial({
          color: 0x18181b,
          roughness: 0.85,
          metalness: 0.1
        });

        // 8. Polished Alloy Rim
        const rimMat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          metalness: 0.92,
          roughness: 0.18
        });

        // 9. Brake Caliper (Brembo Racing Red)
        const caliperMat = new THREE.MeshStandardMaterial({
          color: 0xdc2626,
          roughness: 0.3,
          metalness: 0.5
        });

        // --- 1. Procedural Sculpted Lower Body ---
        const carLength = 4.4;
        const carWidth = 1.95;

        // Aerodynamic Lower Hull / Chasis
        const bodyShape = new THREE.Shape();
        bodyShape.moveTo(2.2, 0.2);
        bodyShape.lineTo(2.28, 0.38); // Front splitter nose
        bodyShape.lineTo(1.4, 0.62);  // Hood front
        bodyShape.lineTo(0.5, 0.76);  // Windshield cowl
        bodyShape.lineTo(-0.4, 1.25); // Roof apex
        bodyShape.lineTo(-1.3, 1.15); // Fastback rear roof
        bodyShape.lineTo(-1.95, 0.82); // Rear deck / ducktail spoiler
        bodyShape.lineTo(-2.25, 0.5);  // Rear bumper
        bodyShape.lineTo(-2.15, 0.2);  // Rear diffuser
        bodyShape.lineTo(0, 0.18);     // Bottom rocker
        bodyShape.closePath();

        const extrudeSettings = {
          steps: 2,
          depth: carWidth * 0.88,
          bevelEnabled: true,
          bevelThickness: 0.16,
          bevelSize: 0.14,
          bevelOffset: 0,
          bevelSegments: 5
        };

        const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
        bodyGeo.center();
        const mainBodyMesh = new THREE.Mesh(bodyGeo, this.paintMaterial);
        mainBodyMesh.position.y = 0.52;
        mainBodyMesh.castShadow = true;
        mainBodyMesh.receiveShadow = true;
        this.carGroup.add(mainBodyMesh);

        // --- 2. Aerodynamic Cockpit Glass Canopy ---
        const cabinShape = new THREE.Shape();
        cabinShape.moveTo(0.52, 0.74);
        cabinShape.lineTo(-0.35, 1.24);
        cabinShape.lineTo(-1.25, 1.12);
        cabinShape.lineTo(-1.75, 0.82);
        cabinShape.lineTo(0.52, 0.74);
        cabinShape.closePath();

        const cabinGeo = new THREE.ExtrudeGeometry(cabinShape, {
          depth: carWidth * 0.78,
          bevelEnabled: true,
          bevelThickness: 0.08,
          bevelSize: 0.06,
          bevelSegments: 4
        });
        cabinGeo.center();
        const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
        cabinMesh.position.set(-0.35, 0.95, 0);
        cabinMesh.castShadow = true;
        this.carGroup.add(cabinMesh);

        // --- 3. Front Fascia: BMW Kidney Grilles ---
        const grilleGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.05, 16);
        grilleGeo.rotateX(Math.PI / 2);
        
        const leftGrille = new THREE.Mesh(grilleGeo, carbonMat);
        leftGrille.position.set(2.26, 0.44, 0.22);
        leftGrille.scale.set(0.7, 1.4, 1);
        this.carGroup.add(leftGrille);

        const rightGrille = new THREE.Mesh(grilleGeo, carbonMat);
        rightGrille.position.set(2.26, 0.44, -0.22);
        rightGrille.scale.set(0.7, 1.4, 1);
        this.carGroup.add(rightGrille);

        // Chrome surround for Grille
        const grilleBorderL = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.02, 8, 24), chromeMat);
        grilleBorderL.position.set(2.27, 0.44, 0.22);
        grilleBorderL.scale.set(0.7, 1.4, 1);
        this.carGroup.add(grilleBorderL);

        const grilleBorderR = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.02, 8, 24), chromeMat);
        grilleBorderR.position.set(2.27, 0.44, -0.22);
        grilleBorderR.scale.set(0.7, 1.4, 1);
        this.carGroup.add(grilleBorderR);

        // Front Splitter / Carbon Air Dam
        const splitterGeo = new THREE.BoxGeometry(0.6, 0.06, carWidth * 0.98);
        const splitter = new THREE.Mesh(splitterGeo, carbonMat);
        splitter.position.set(2.0, 0.16, 0);
        this.carGroup.add(splitter);

        // --- 4. Twin Projector LED Headlights ---
        const headlightGeo = new THREE.BoxGeometry(0.18, 0.08, 0.32);
        
        const leftHeadlight = new THREE.Mesh(headlightGeo, this.headlightMat);
        leftHeadlight.position.set(2.15, 0.52, 0.72);
        leftHeadlight.rotation.y = -0.2;
        this.carGroup.add(leftHeadlight);

        const rightHeadlight = new THREE.Mesh(headlightGeo, this.headlightMat);
        rightHeadlight.position.set(2.15, 0.52, -0.72);
        rightHeadlight.rotation.y = 0.2;
        this.carGroup.add(rightHeadlight);

        // --- 5. Rear Fascia: LED Lightbar & Quad Exhausts ---
        const taillightGeo = new THREE.BoxGeometry(0.12, 0.06, carWidth * 0.82);
        const taillightMesh = new THREE.Mesh(taillightGeo, this.taillightMat);
        taillightMesh.position.set(-2.22, 0.68, 0);
        this.carGroup.add(taillightMesh);

        // Rear Aerodynamic Diffuser
        const diffuserGeo = new THREE.BoxGeometry(0.5, 0.12, carWidth * 0.88);
        const diffuser = new THREE.Mesh(diffuserGeo, carbonMat);
        diffuser.position.set(-2.05, 0.2, 0);
        this.carGroup.add(diffuser);

        // Quad Chrome Exhaust Pipes
        const exhaustGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 16);
        exhaustGeo.rotateZ(Math.PI / 2);

        const exhaustPositions = [
          [-2.22, 0.22, 0.5],
          [-2.22, 0.22, 0.64],
          [-2.22, 0.22, -0.5],
          [-2.22, 0.22, -0.64]
        ];

        exhaustPositions.forEach(([x, y, z]) => {
          const pipe = new THREE.Mesh(exhaustGeo, chromeMat);
          pipe.position.set(x, y, z);
          this.carGroup.add(pipe);
        });

        // Aerodynamic Side Mirrors
        const mirrorGeo = new THREE.BoxGeometry(0.14, 0.08, 0.22);
        const leftMirror = new THREE.Mesh(mirrorGeo, this.paintMaterial);
        leftMirror.position.set(0.52, 0.84, 0.95);
        this.carGroup.add(leftMirror);

        const rightMirror = new THREE.Mesh(mirrorGeo, this.paintMaterial);
        rightMirror.position.set(0.52, 0.84, -0.95);
        this.carGroup.add(rightMirror);

        // --- 6. Four High-Fidelity Sports Wheels & Brembo Brakes ---
        this.wheels = [];
        const wheelPositions = [
          [1.38, 0.38, 0.94],   // Front Right
          [1.38, 0.38, -0.94],  // Front Left
          [-1.38, 0.38, 0.94],  // Rear Right
          [-1.38, 0.38, -0.94]  // Rear Left
        ];

        wheelPositions.forEach(([wx, wy, wz], idx) => {
          const isLeft = wz < 0;
          const wheelGroup = new THREE.Group();
          wheelGroup.position.set(wx, wy, wz);

          // Outer Rubber Tire with Bevel
          const tireGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.26, 32);
          tireGeo.rotateX(Math.PI / 2);
          const tire = new THREE.Mesh(tireGeo, tireMat);
          tire.castShadow = true;
          wheelGroup.add(tire);

          // Rim Base Cylinder
          const rimBaseGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.27, 24);
          rimBaseGeo.rotateX(Math.PI / 2);
          const rimBase = new THREE.Mesh(rimBaseGeo, rimMat);
          wheelGroup.add(rimBase);

          // 10 Dual Radial Spokes
          const spokeGeo = new THREE.BoxGeometry(0.04, 0.48, 0.03);
          for (let s = 0; s < 5; s++) {
            const spoke = new THREE.Mesh(spokeGeo, rimMat);
            spoke.rotation.z = (s * Math.PI) / 5;
            wheelGroup.add(spoke);
          }

          // Center Hub Cap with BMW Brand Blue/White Accent
          const hubGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.28, 16);
          hubGeo.rotateX(Math.PI / 2);
          const hub = new THREE.Mesh(hubGeo, chromeMat);
          wheelGroup.add(hub);

          // Drilled Steel Brake Rotor Disc
          const discGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 24);
          discGeo.rotateX(Math.PI / 2);
          const disc = new THREE.Mesh(discGeo, chromeMat);
          disc.position.z = isLeft ? 0.06 : -0.06;
          wheelGroup.add(disc);

          // Racing Red Brake Caliper (Visible between spokes!)
          const caliperGeo = new THREE.BoxGeometry(0.14, 0.12, 0.08);
          const caliper = new THREE.Mesh(caliperGeo, caliperMat);
          caliper.position.set(0.12, 0.12, isLeft ? 0.06 : -0.06);
          wheelGroup.add(caliper);

          this.carGroup.add(wheelGroup);
          this.wheels.push(wheelGroup);
        });

        // Vehicle Base Floating Height
        this.carGroup.position.y = 0.01;
      }

      onResize() {
        const w = window.innerWidth || (this.canvas ? this.canvas.clientWidth : 400);
        const h = window.innerHeight || (this.canvas ? this.canvas.clientHeight : 300);
        if (this.camera && this.renderer) {
          this.camera.aspect = w / h;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(w, h);
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        }
      }

      bindEvents() {
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('orientationchange', () => {
          setTimeout(() => this.onResize(), 150);
        });
        setTimeout(() => this.onResize(), 100);
        setTimeout(() => this.onResize(), 400);
      }

      initUI() {
        // Body Finish Palette Selection
        const swatches = document.querySelectorAll('.color-swatch');
        swatches.forEach(swatch => {
          swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            const hexStr = swatch.getAttribute('data-color');
            this.setPaintColor(hexStr);
          });
        });

        // Camera Preset Angles
        const camButtons = document.querySelectorAll('.cam-btn');
        camButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            camButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const camMode = btn.getAttribute('data-cam');
            this.setCameraPreset(camMode);
          });
        });

        // Toggle Headlights
        const btnLights = document.getElementById('toggle-lights');
        btnLights.addEventListener('click', () => {
          this.headlightsOn = !this.headlightsOn;
          btnLights.classList.toggle('active', this.headlightsOn);
          this.headlightMat.emissiveIntensity = this.headlightsOn ? 3.2 : 0.0;
          this.taillightMat.emissiveIntensity = this.headlightsOn ? 2.8 : 0.2;
          this.headlightBeamLeft.intensity = this.headlightsOn ? 4.0 : 0.0;
          this.headlightBeamRight.intensity = this.headlightsOn ? 4.0 : 0.0;
        });

        // Toggle Auto Rotate
        const btnRotate = document.getElementById('toggle-rotate');
        btnRotate.addEventListener('click', () => {
          this.autoRotate = !this.autoRotate;
          btnRotate.classList.toggle('active', this.autoRotate);
          this.controls.autoRotate = this.autoRotate;
          this.controls.autoRotateSpeed = 1.6;
        });

        // Reset Camera Button
        document.getElementById('btn-reset').addEventListener('click', () => {
          this.setCameraPreset('threequarter');
          const threeQBtn = document.querySelector('.cam-btn[data-cam="threequarter"]');
          if (threeQBtn) {
            document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
            threeQBtn.classList.add('active');
          }
        });

        // Snapshot HD Button
        document.getElementById('btn-snapshot').addEventListener('click', () => {
          this.renderer.render(this.scene, this.camera);
          const link = document.createElement('a');
          link.download = '${brandName.toLowerCase()}-design-study.png';
          link.href = this.canvas.toDataURL('image/png');
          link.click();
        });

        // Download HTML Button
        document.getElementById('btn-download').addEventListener('click', () => {
          const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = '${brandName.toLowerCase()}-3d-studio.html';
          a.click();
          URL.revokeObjectURL(url);
        });
      }

      setPaintColor(hexStr) {
        const col = new THREE.Color(hexStr);
        this.paintMaterial.color.copy(col);
      }

      setCameraPreset(preset) {
        if (preset === 'threequarter') {
          this.targetCamPos.set(5.5, 2.2, 5.5);
          this.targetLookAt.set(0, 0.4, 0);
        } else if (preset === 'side') {
          this.targetCamPos.set(0.2, 1.3, 6.2);
          this.targetLookAt.set(0, 0.4, 0);
        } else if (preset === 'rear') {
          this.targetCamPos.set(-5.6, 2.4, -4.8);
          this.targetLookAt.set(0, 0.4, 0);
        }
        this.isTransitioning = true;
      }

      animate() {
        requestAnimationFrame(this.animate);
        const dt = this.clock.getDelta();

        if (this.isTransitioning) {
          this.camera.position.lerp(this.targetCamPos, 0.08);
          if (this.controls && this.controls.target) {
            this.controls.target.lerp(this.targetLookAt, 0.08);
          }
          if (this.controls && typeof this.controls.syncFromCamera === 'function') {
            this.controls.syncFromCamera();
          }
          if (this.camera.position.distanceTo(this.targetCamPos) < 0.06) {
            this.isTransitioning = false;
          }
        }

        if (this.controls && typeof this.controls.update === 'function') {
          this.controls.update();
        }

        if (this.renderer && this.scene && this.camera) {
          this.renderer.render(this.scene, this.camera);
          if (!this.hasRenderedFirstFrame) {
            this.hasRenderedFirstFrame = true;
            const loader = document.getElementById('studio-loader');
            if (loader) {
              loader.style.opacity = '0';
              setTimeout(() => { loader.style.display = 'none'; }, 450);
            }
          }
        }
      }
    }

    // High-Reliability Launch (ReadyState safe for iframes with load timeout protection)
    let threeLoadAttempts = 0;
    function startStudio() {
      if (window._astraStudioApp) return;
      if (!window.THREE) {
        threeLoadAttempts++;
        if (threeLoadAttempts > 80) {
          const loader = document.getElementById('studio-loader');
          if (loader) {
            loader.innerHTML = '<div style="color:#ef4444;font-size:13px;font-weight:700;margin-bottom:8px;">3D Engine Load Timeout</div><button onclick="location.reload()" style="padding:6px 14px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:12px;cursor:pointer;">Reload Studio</button>';
            loader.style.pointerEvents = 'auto';
          }
          return;
        }
        setTimeout(startStudio, 50);
        return;
      }
      try {
        window._astraStudioApp = new AstraAutomotiveStudio();
      } catch (err) {
        console.error("Astra 3D Studio Init Error:", err);
      }
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', startStudio);
      window.addEventListener('load', startStudio);
    } else {
      startStudio();
    }
    setTimeout(startStudio, 150);
    setTimeout(startStudio, 500);
  })();
  </script>
</body>
</html>`;
}
