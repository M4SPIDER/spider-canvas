import React, { useState, useEffect, useRef } from 'react';

const PLANETS_DB = {
  Sun: {
    name: "Sol",
    subtitle: "STATIONARY STELLAR ANCHOR",
    description: "At the heart of our system lies Sol, a monumental thermonuclear reactor converting 600 million tons of hydrogen into helium every second. It holds 99.86% of the system's mass, generating the massive gravitational field that anchors our reality in the deep dark.",
    type: "G-Type Main Sequence Yellow Dwarf",
    color: "#ff6200",
    glowColor: "rgba(255, 120, 20, 0.4)",
    size: 10,
    distance: 0,
    speed: 0,
    orbitalPeriod: "N/A",
    temperature: "15,000,000 °C (Core)"
  },
  Mercury: {
    name: "Mercury",
    subtitle: "THE SCORCHED INNER HORIZON",
    description: "A battered, iron-rich sphere sweeping close to the Sun, Mercury endures the ultimate extremes. Lacking any protective atmosphere, its landscape is heavily scarred by primordial impacts, undergoing fierce thermal fluctuations that melt metals by day and freeze gases by night.",
    type: "Rocky Terrestrial Core",
    color: "#8a95a5",
    glowColor: "rgba(138, 149, 165, 0.2)",
    size: 0.9,
    distance: 18,
    speed: 0.03,
    rotationSpeed: 0.004,
    orbitalPeriod: "88 Earth Days",
    temperature: "-173 °C to 427 °C"
  },
  Venus: {
    name: "Venus",
    subtitle: "THE GREENHOUSE PYRE",
    description: "Shrouded in dense, swirling clouds of toxic sulfuric acid, Venus is a portrait of planetary greenhouse feedback. Under an atmospheric pressure 92 times that of Earth, its scorched surface is hot enough to melt lead, trapped under a permanent blanket of carbon dioxide.",
    type: "Hyper-Pressurized Greenhouse World",
    color: "#e39f4d",
    glowColor: "rgba(227, 159, 77, 0.35)",
    size: 1.5,
    distance: 25,
    speed: 0.02,
    rotationSpeed: -0.002,
    orbitalPeriod: "225 Earth Days",
    temperature: "462 °C (Permanent Surface Average)"
  },
  Earth: {
    name: "Earth",
    subtitle: "THE SAPPHIRE BIOSPHERE",
    description: "A fragile sapphire drifting in a colossal cosmic ocean. Shielded by a dynamic magnetosphere and cradled in a nitrogen-oxygen atmosphere, Earth remains the only known oasis where water flows in liquid rivers and life has bloomed into conscious observers.",
    type: "Active Nitrogen-Oxygen Biosphere",
    color: "#2482ff",
    glowColor: "rgba(36, 130, 255, 0.35)",
    size: 1.6,
    distance: 33,
    speed: 0.015,
    rotationSpeed: 0.02,
    orbitalPeriod: "365.25 Days",
    temperature: "-88 °C to 58 °C",
    hasMoon: true
  },
  Mars: {
    name: "Mars",
    subtitle: "THE IRON OXIDE DESERT",
    description: "The oxidized rust planet. Once a world of deep rushing rivers, active volcanoes, and thick skies, Mars is now an icy, hyper-arid desert preserving the silent geomorphological blueprints of its long-lost oceans under a whisper of carbon dioxide.",
    type: "Arid Iron-Rich Terrestrial",
    color: "#d1532e",
    glowColor: "rgba(209, 83, 46, 0.25)",
    size: 1.1,
    distance: 42,
    speed: 0.011,
    rotationSpeed: 0.018,
    orbitalPeriod: "687 Earth Days",
    temperature: "-153 °C to 20 °C"
  },
  Jupiter: {
    name: "Jupiter",
    subtitle: "THE COLOSSAL GUARDIAN",
    description: "The planetary shielding giant. Jupiter's massive gravitational presence acts as a solar system cosmic vacuum, sweeping up dangerous cometary debris. Its gaseous interior orbits at breakneck speeds, producing towering belts of colorful molecular storms.",
    type: "Metallic Hydrogen Gas Giant",
    color: "#dfaf81",
    glowColor: "rgba(223, 175, 129, 0.3)",
    size: 3.8,
    distance: 56,
    speed: 0.007,
    rotationSpeed: 0.04,
    orbitalPeriod: "12 Earth Years",
    temperature: "-108 °C (Cloud Tops)"
  },
  Saturn: {
    name: "Saturn",
    subtitle: "THE CROWN JEWEL OF THE OUTERS",
    description: "A gaseous titan enveloped in a breathtaking ring system. Composed of billions of ice particles, dust, and rocky debris, Saturn's rings span hundreds of thousands of kilometers yet are only a few meters thick, creating a stunning cosmic sculpture.",
    type: "Ringed Gas Giant",
    color: "#f0dfa8",
    glowColor: "rgba(240, 223, 168, 0.3)",
    size: 3.1,
    distance: 72,
    speed: 0.005,
    rotationSpeed: 0.035,
    orbitalPeriod: "29 Earth Years",
    temperature: "-139 °C (Upper Clouds)",
    hasRings: true
  },
  Uranus: {
    name: "Uranus",
    subtitle: "THE REVOLVING CRYOSPHERE",
    description: "Plunged on its side, Uranus literally rolls around the Sun along its orbital path. Its unique tilt causes extreme seasonal sweeps, while its pale, turquoise atmosphere of hydrogen and helium traps a dense, crushing core of deep silicate ice.",
    type: "Ice Giant / Retrograde Roll",
    color: "#a0ecef",
    glowColor: "rgba(160, 236, 239, 0.25)",
    size: 2.2,
    distance: 87,
    speed: 0.003,
    rotationSpeed: -0.025,
    orbitalPeriod: "84 Earth Years",
    temperature: "-224 °C (Atmospheric Base)"
  },
  Neptune: {
    name: "Neptune",
    subtitle: "THE WINDS OF CHRYSE",
    description: "At the freezing frontier of our stellar system, Neptune is whipped by supersonic storm systems reaching speeds of up to 2,100 kilometers per hour. A massive, frozen deep-blue sphere where crushing depths melt silicate rocks into crystalline diamond rain.",
    type: "Active Cryospheric Ice Giant",
    color: "#3069e2",
    glowColor: "rgba(48, 105, 226, 0.3)",
    size: 2.1,
    distance: 101,
    speed: 0.002,
    rotationSpeed: 0.03,
    orbitalPeriod: "165 Earth Years",
    temperature: "-201 °C (Cloud Layers)"
  }
};

const CINEMATIC_CHAPTERS = [
  { id: 'sun_rise', label: "Chapter I: Sol and Fire", target: "Sun", camPreset: 'flare' },
  { id: 'inner_waste', label: "Chapter II: Inner Horizons", target: "Mercury", camPreset: 'orbit' },
  { id: 'green_fire', label: "Chapter III: Acidic Veil", target: "Venus", camPreset: 'flyby' },
  { id: 'pale_dot', label: "Chapter IV: Cradled Sapphire", target: "Earth", camPreset: 'earthrise' },
  { id: 'rusty_dunes', label: "Chapter V: Rust Plains", target: "Mars", camPreset: 'orbit' },
  { id: 'giant_guard', label: "Chapter VI: Gaseous Shield", target: "Jupiter", camPreset: 'flyby' },
  { id: 'ring_world', label: "Chapter VII: Ice Sculpture", target: "Saturn", camPreset: 'ringSweep' },
  { id: 'tilted_ice', label: "Chapter VIII: Frozen Axis", target: "Uranus", camPreset: 'orbit' },
  { id: 'outer_limit', label: "Chapter IX: Dark Cobalt Edge", target: "Neptune", camPreset: 'flyby' }
];

export default function App() {
  const mountRef = useRef(null);
  
  // Script and player controls states
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [focusedBody, setFocusedBody] = useState('Sun');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showHUD, setShowHUD] = useState(true);
  const [audioActive, setAudioActive] = useState(false);
  const [directorCut, setDirectorCut] = useState(true); // Auto-cycles through solar system documentary style

  // Simulation parameters referenced in Three.js render loops
  const simState = useRef({
    isPlaying: true,
    playbackSpeed: 1.0,
    focusedBody: 'Sun',
    cameraPreset: 'system',
    directorCut: true,
    showOrbits: true,
    showAsteroids: true
  });

  // Soundtrack Audio Synthesizer references
  const audioCtxRef = useRef(null);
  const chordOsc1 = useRef(null);
  const chordOsc2 = useRef(null);
  const melodyOsc = useRef(null);
  const filterNode = useRef(null);
  const nextMelodyTime = useRef(0);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadAll = async () => {
      try {
        if (!window.THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        }
        if (!window.THREE.OrbitControls) {
          await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js');
        }
        setScriptsLoaded(true);
      } catch (err) {
        console.error("ThreeJS Library Loading Failed", err);
      }
    };
    loadAll();
  }, []);

  // Synchronize component states to the performance render reference loop
  useEffect(() => {
    simState.current.isPlaying = isPlaying;
    simState.current.playbackSpeed = playbackSpeed;
    simState.current.focusedBody = focusedBody;
    simState.current.directorCut = directorCut;
  }, [isPlaying, playbackSpeed, focusedBody, directorCut]);

  const initSoundtrack = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Warm cinematic lowpass filter sweep
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      filter.connect(ctx.destination);
      filterNode.current = filter;

      // Generative Chord Pad 1
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // Deep A1 drone
      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      osc1.connect(gain1);
      gain1.connect(filter);
      osc1.start();
      chordOsc1.current = osc1;

      // Generative Chord Pad 2
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(110, ctx.currentTime); // Rich A2 drone
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.03, ctx.currentTime);
      osc2.connect(gain2);
      gain2.connect(filter);
      osc2.start();
      chordOsc2.current = osc2;

      // Slow moving filter LFO to simulate breathing/space atmosphere
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.06, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(45, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      // Generative solo melody generator
      const melOsc = ctx.createOscillator();
      melOsc.type = 'sine';
      const melGain = ctx.createGain();
      melGain.gain.setValueAtTime(0, ctx.currentTime);
      melOsc.connect(melGain);
      melGain.connect(filter);
      melOsc.start();
      melodyOsc.current = melOsc;

      setAudioActive(true);
      triggerNextGenerativeNote();
    } catch (e) {
      console.warn("Audio Context init failed:", e);
    }
  };

  const triggerNextGenerativeNote = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
    
    const ctx = audioCtxRef.current;
    // Pentatonic scale corresponding to deep interstellar space feel
    const scale = [220, 246.94, 277.18, 329.63, 369.99, 440]; 
    const randomFreq = scale[Math.floor(Math.random() * scale.length)];
    const duration = 2.5 + Math.random() * 2.0;

    const melOsc = melodyOsc.current;
    if (melOsc) {
      melOsc.frequency.setValueAtTime(randomFreq, ctx.currentTime);
      
      // Dynamic sweep/gain mapping
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      melOsc.disconnect();
      melOsc.connect(gainNode);
      gainNode.connect(filterNode.current);
    }

    // Schedule next note
    setTimeout(triggerNextGenerativeNote, (duration - 0.5) * 1000);
  };

  const handleToggleSound = () => {
    if (!audioCtxRef.current) {
      initSoundtrack();
      return;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
      setAudioActive(true);
    } else if (audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
      setAudioActive(false);
    }
  };

  useEffect(() => {
    if (!scriptsLoaded || !mountRef.current) return;

    const THREE = window.THREE;
    const OrbitControls = window.THREE.OrbitControls;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010208, 0.001);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.set(0, 90, 180);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.zoomSpeed = 1.5;
    controls.minDistance = 2;
    controls.maxDistance = 600;

    // Auto-focus canvas for zoom in iframe
    setTimeout(() => {
      renderer.domElement.tabIndex = 1;
      renderer.domElement.focus();
      renderer.domElement.style.outline = 'none';
    }, 100);

    // Ambient Outer System light
    const ambientLight = new THREE.AmbientLight(0x0a1024, 0.9);
    scene.add(ambientLight);

    // Warm Sun flare light source
    const sunLight = new THREE.PointLight(0xfff5ea, 3.2, 550, 1.1);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const generateProceduralTexture = (type) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

      if (type === 'sun') {
        ctx.fillStyle = '#ff4d00';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 400; i++) {
          ctx.fillStyle = Math.random() > 0.5 ? '#ff9900' : '#e62e00';
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 20, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 'mercury') {
        ctx.fillStyle = '#646870';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 200; i++) {
          ctx.fillStyle = '#42454a';
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 'venus') {
        gradient.addColorStop(0, '#c7924c');
        gradient.addColorStop(0.5, '#ab722c');
        gradient.addColorStop(1, '#694212');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(255, 230, 180, 0.15)';
        ctx.lineWidth = 4;
        for (let i = 0; i < 15; i++) {
          ctx.beginPath();
          ctx.moveTo(0, Math.random() * canvas.height);
          ctx.bezierCurveTo(150, Math.random() * canvas.height, 350, Math.random() * canvas.height, 512, Math.random() * canvas.height);
          ctx.stroke();
        }
      } else if (type === 'earth') {
        ctx.fillStyle = '#0a2342';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1b3c15';
        const continents = [
          { x: 120, y: 110, r: 42 },
          { x: 170, y: 90, r: 35 },
          { x: 280, y: 130, r: 52 },
          { x: 330, y: 80, r: 42 },
          { x: 400, y: 160, r: 32 }
        ];
        continents.forEach(c => {
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.ellipse(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 45 + 10, Math.random() * 8 + 3, Math.random(), 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 'mars') {
        ctx.fillStyle = '#ab4226';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#6e2211';
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 22, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, 10);
        ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
      } else if (type === 'jupiter') {
        ctx.fillStyle = '#cda177';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const beltColors = ['#875630', '#f5eae0', '#b88158', '#4d2a13'];
        for (let y = 0; y < canvas.height; y += 12) {
          ctx.fillStyle = beltColors[Math.floor(Math.random() * beltColors.length)];
          ctx.globalAlpha = 0.5;
          ctx.fillRect(0, y, canvas.width, 10 + Math.random() * 5);
        }
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#9e2b1b';
        ctx.beginPath();
        ctx.ellipse(360, 150, 24, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 'saturn') {
        gradient.addColorStop(0, '#ebd5a6');
        gradient.addColorStop(0.5, '#c5ab6d');
        gradient.addColorStop(1, '#ebd5a6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (type === 'uranus') {
        gradient.addColorStop(0, '#a0ecef');
        gradient.addColorStop(0.5, '#c1f3f5');
        gradient.addColorStop(1, '#a0ecef');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (type === 'neptune') {
        gradient.addColorStop(0, '#1c499c');
        gradient.addColorStop(0.5, '#356bc9');
        gradient.addColorStop(1, '#1c499c');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    // Starfield Layer
    const starCount = 3500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 350 + Math.random() * 250;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);

      const typeRoll = Math.random();
      if (typeRoll > 0.8) {
        starColors[i] = 0.6; starColors[i + 1] = 0.85; starColors[i + 2] = 1.0;
      } else if (typeRoll > 0.65) {
        starColors[i] = 1.0; starColors[i + 1] = 0.9; starColors[i + 2] = 0.6;
      } else {
        starColors[i] = 1.0; starColors[i + 1] = 1.0; starColors[i + 2] = 1.0;
      }
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true
    });
    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // Glowing Space Nebulae Dust Sprites
    const createNebulaCloud = (color, scale, position) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const cx = canvas.getContext('2d');
      const radG = cx.createRadialGradient(64, 64, 0, 64, 64, 64);
      radG.addColorStop(0, color);
      radG.addColorStop(0.5, color.replace('1.0', '0.25'));
      radG.addColorStop(1, 'rgba(0,0,0,0)');
      cx.fillStyle = radG;
      cx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.28 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(scale, scale, 1);
      sprite.position.copy(position);
      scene.add(sprite);
    };

    createNebulaCloud('rgba(15, 118, 110, 1.0)', 280, new THREE.Vector3(-120, -20, -180));
    createNebulaCloud('rgba(109, 40, 217, 1.0)', 340, new THREE.Vector3(150, 30, -100));

    const planetsList = [];
    const planetMeshes = {};
    const orbitLines = [];

    // The Sun (Sol Anchor)
    const sunGeom = new THREE.SphereGeometry(10, 48, 48);
    const sunTexture = generateProceduralTexture('sun');
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeom, sunMat);
    scene.add(sunMesh);

    // Volumetric Corona Flare Glow
    const flareCanvas = document.createElement('canvas');
    flareCanvas.width = 128;
    flareCanvas.height = 128;
    const fctx = flareCanvas.getContext('2d');
    const radG = fctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    radG.addColorStop(0, 'rgba(255, 235, 200, 1.0)');
    radG.addColorStop(0.2, 'rgba(255, 130, 20, 0.7)');
    radG.addColorStop(0.5, 'rgba(255, 40, 0, 0.25)');
    radG.addColorStop(1, 'rgba(0,0,0,0)');
    fctx.fillStyle = radG;
    fctx.fillRect(0, 0, 128, 128);

    const flareTex = new THREE.CanvasTexture(flareCanvas);
    const flareMat = new THREE.SpriteMaterial({ map: flareTex, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.95 });
    const sunFlareSprite = new THREE.Sprite(flareMat);
    sunFlareSprite.scale.set(38, 38, 1);
    scene.add(sunFlareSprite);

    // Dynamic Atmosphere Glow Generator
    const createPlanetAtmosphere = (color, scaleSize) => {
      const glowCanv = document.createElement('canvas');
      glowCanv.width = 64;
      glowCanv.height = 64;
      const gctx = glowCanv.getContext('2d');
      const gGrad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gGrad.addColorStop(0, color);
      gGrad.addColorStop(0.6, color.replace('0.35', '0.1').replace('0.3', '0.08').replace('0.25', '0.05'));
      gGrad.addColorStop(1, 'rgba(0,0,0,0)');
      gctx.fillStyle = gGrad;
      gctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(glowCanv);
      const mat = new THREE.SpriteMaterial({ map: texture, blending: THREE.AdditiveBlending, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(scaleSize * 2.8, scaleSize * 2.8, 1);
      return sprite;
    };

    Object.keys(PLANETS_DB).forEach((key) => {
      if (key === 'Sun') return;
      const p = PLANETS_DB[key];

      // Planet Mesh
      const geom = new THREE.SphereGeometry(p.size, 32, 32);
      const texture = generateProceduralTexture(key.toLowerCase());
      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geom, mat);
      scene.add(mesh);
      planetMeshes[key] = mesh;

      // Volumetric Atmosphere Scatter Overlay
      const atmosphere = createPlanetAtmosphere(p.glowColor, p.size);
      scene.add(atmosphere);

      // Elegant Orbital Paths
      const orbitPoints = [];
      for (let i = 0; i <= 128; i++) {
        const theta = (i / 128) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(Math.cos(theta) * p.distance, 0, Math.sin(theta) * p.distance));
      }
      const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: p.color,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
      });
      const orbitLine = new THREE.LineLoop(orbitGeom, orbitMat);
      scene.add(orbitLine);
      orbitLines.push(orbitLine);

      // Special Objects (Saturn Rings, Moon)
      let ringsMesh = null;
      if (p.hasRings) {
        const rGeom = new THREE.RingGeometry(p.size * 1.35, p.size * 2.25, 64);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xcdba9c,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
          roughness: 0.6
        });
        ringsMesh = new THREE.Mesh(rGeom, ringMat);
        ringsMesh.rotation.x = Math.PI / 2.3;
        scene.add(ringsMesh);
      }

      let moonMesh = null;
      if (p.hasMoon) {
        const moonGeom = new THREE.SphereGeometry(0.35, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 });
        moonMesh = new THREE.Mesh(moonGeom, moonMat);
        scene.add(moonMesh);
      }

      planetsList.push({
        key,
        mesh,
        atmosphere,
        distance: p.distance,
        orbitalSpeed: p.speed,
        rotationSpeed: p.rotationSpeed || 0.01,
        angle: Math.random() * Math.PI * 2,
        rings: ringsMesh,
        moon: moonMesh,
        moonAngle: 0
      });
    });

    // Dynamic Asteroid Belt
    const asteroidCount = 600;
    const astGeom = new THREE.DodecahedronGeometry(0.18, 1);
    const astMat = new THREE.MeshStandardMaterial({ color: 0x5a544f, roughness: 0.95 });
    const asteroidMesh = new THREE.InstancedMesh(astGeom, astMat, asteroidCount);
    const asteroidData = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < asteroidCount; i++) {
      const radius = 48 + Math.random() * 6.0;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.001 + Math.random() * 0.002;
      const height = (Math.random() - 0.5) * 1.2;
      const scale = 0.5 + Math.random() * 1.0;

      dummy.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      asteroidMesh.setMatrixAt(i, dummy.matrix);

      asteroidData.push({ radius, angle, speed, height, scale });
    }
    asteroidMesh.instanceMatrix.needsUpdate = true;
    scene.add(asteroidMesh);

    const targetLookAt = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3();

    // Loop logic running at high FPS
    const animate = (timestamp) => {
      const delta = simState.current.isPlaying ? (0.45 * simState.current.playbackSpeed) : 0;

      // Rotate Sun Core
      sunMesh.rotation.y += 0.001 * (simState.current.isPlaying ? simState.current.playbackSpeed : 0.05);
      sunFlareSprite.rotation.z -= 0.0002 * (simState.current.isPlaying ? simState.current.playbackSpeed : 0.05);

      // Animate planets
      planetsList.forEach((p) => {
        if (simState.current.isPlaying) {
          p.angle += p.orbitalSpeed * simState.current.playbackSpeed * 0.5;
          p.mesh.rotation.y += p.rotationSpeed * simState.current.playbackSpeed * 0.5;
        }

        const posX = Math.cos(p.angle) * p.distance;
        const posZ = Math.sin(p.angle) * p.distance;
        p.mesh.position.set(posX, 0, posZ);

        // Position Atmosphere glow directly overlayed on the planet
        p.atmosphere.position.copy(p.mesh.position);
        p.atmosphere.quaternion.copy(camera.quaternion);

        // Saturn Rings track
        if (p.rings) {
          p.rings.position.copy(p.mesh.position);
        }

        // Moon Orbit Earth
        if (p.moon) {
          if (simState.current.isPlaying) {
            p.moonAngle += 0.03 * simState.current.playbackSpeed;
          }
          const moonDist = PLANETS_DB[p.key].size + 1.1;
          p.moon.position.set(
            p.mesh.position.x + Math.cos(p.moonAngle) * moonDist,
            0.1,
            p.mesh.position.z + Math.sin(p.moonAngle) * moonDist
          );
        }
      });

      // Asteroid belt dynamics
      if (simState.current.isPlaying) {
        for (let i = 0; i < asteroidCount; i++) {
          const ast = asteroidData[i];
          ast.angle += ast.speed * simState.current.playbackSpeed * 0.4;
          dummy.position.set(Math.cos(ast.angle) * ast.radius, ast.height, Math.sin(ast.angle) * ast.radius);
          dummy.scale.set(ast.scale, ast.scale, ast.scale);
          dummy.updateMatrix();
          asteroidMesh.setMatrixAt(i, dummy.matrix);
        }
        asteroidMesh.instanceMatrix.needsUpdate = true;
      }

      // Dynamic Camera Presets Interp
      let lookTarget = new THREE.Vector3(0, 0, 0);
      let focusedBodyKey = simState.current.focusedBody;

      if (focusedBodyKey !== 'Sun') {
        const targetedMesh = planetMeshes[focusedBodyKey];
        if (targetedMesh) {
          lookTarget.copy(targetedMesh.position);
        }
      }

      // Smooth interpolation for look target
      targetLookAt.copy(lookTarget);
      currentLookAt.lerp(targetLookAt, 0.06);
      controls.target.copy(currentLookAt);

      // Automated Cinematic Sweeps
      if (simState.current.directorCut) {
        // Automatically determine camera preset path relative to target
        const timeFactor = timestamp * 0.00012;
        let pSize = PLANETS_DB[focusedBodyKey].size;
        let distanceMultiplier = focusedBodyKey === 'Sun' ? 3.5 : 2.8;

        let desiredCamPos = new THREE.Vector3();
        
        if (focusedBodyKey === 'Sun') {
          // Sol flare overview sweep
          desiredCamPos.set(
            Math.cos(timeFactor) * 45,
            15 + Math.sin(timeFactor * 0.5) * 10,
            Math.sin(timeFactor) * 45
          );
        } else if (focusedBodyKey === 'Earth') {
          // Cinematic Earthrise over moon
          desiredCamPos.set(
            lookTarget.x + Math.cos(timeFactor) * (pSize * distanceMultiplier),
            lookTarget.y + 1.5,
            lookTarget.z + Math.sin(timeFactor) * (pSize * distanceMultiplier)
          );
        } else if (focusedBodyKey === 'Saturn') {
          // Ring Sweep glide passing close to the ring plane
          desiredCamPos.set(
            lookTarget.x + Math.cos(timeFactor * 0.8) * (pSize * 2.4),
            lookTarget.y + Math.sin(timeFactor * 0.5) * 0.8,
            lookTarget.z + Math.sin(timeFactor * 0.8) * (pSize * 2.4)
          );
        } else {
          // Standard dynamic orbital pan
          desiredCamPos.set(
            lookTarget.x + Math.cos(timeFactor) * (pSize * distanceMultiplier),
            lookTarget.y + pSize * 0.6,
            lookTarget.z + Math.sin(timeFactor) * (pSize * distanceMultiplier)
          );
        }

        camera.position.lerp(desiredCamPos, 0.035);
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const handleResize = () => {
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
    };
  }, [scriptsLoaded]);

  // Auto-advance documentary script
  useEffect(() => {
    if (!directorCut) return;

    const interval = setInterval(() => {
      setCurrentChapterIndex((prev) => {
        const nextIndex = (prev + 1) % CINEMATIC_CHAPTERS.length;
        const nextCh = CINEMATIC_CHAPTERS[nextIndex];
        setFocusedBody(nextCh.target);
        
        // Soft audio tone on cut
        if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          osc.frequency.setValueAtTime(196, audioCtxRef.current.currentTime); // G3
          gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(filterNode.current);
          osc.start();
          osc.stop(audioCtxRef.current.currentTime + 1.2);
        }

        return nextIndex;
      });
    }, 14000); // 14 seconds per cinematic target chapter/narrative

    return () => clearInterval(interval);
  }, [directorCut]);

  const handleSelectChapter = (index) => {
    setCurrentChapterIndex(index);
    const ch = CINEMATIC_CHAPTERS[index];
    setFocusedBody(ch.target);
    // User triggered cut suspends automated sequence temporarily or locks onto selected
    setDirectorCut(true); 
    
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.frequency.setValueAtTime(293.66, audioCtxRef.current.currentTime); // D4
      gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(filterNode.current);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.6);
    }
  };

  const getFocusedMetrics = () => PLANETS_DB[focusedBody];

  return (
    <div className="relative w-screen h-screen bg-[#020206] text-slate-100 overflow-hidden font-sans select-none antialiased">
      
      {/* GLOBAL SCROLLBAR REMOVALS & LETTERBOX GLOWS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        
        /* High-end cinematic documentary aspect ratio panels */
        .cinematic-letterbox-top {
          background: linear-gradient(to bottom, rgba(2, 2, 6, 0.95) 0%, rgba(2, 2, 6, 0.6) 60%, rgba(2, 2, 6, 0) 100%);
          height: 12%;
        }
        .cinematic-letterbox-bottom {
          background: linear-gradient(to top, rgba(2, 2, 6, 0.95) 0%, rgba(2, 2, 6, 0.65) 60%, rgba(2, 2, 6, 0) 100%);
          height: 24%;
        }

        /* Subtitle formatting for documentary aesthetic */
        .doc-subtitle-fade {
          animation: textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>

      {/* WebGL Canvas viewport */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

      {/* FLOATING HIDE/SHOW BUTTON - Always visible at top */}
      <button
        onClick={() => setShowHUD(!showHUD)}
        className="absolute top-4 right-4 z-50 p-3 bg-slate-950/90 border border-cyan-500/40 rounded-xl text-cyan-400 hover:bg-slate-900 hover:text-white transition duration-200 shadow-lg"
        title={showHUD ? "Hide All UI" : "Show UI"}
      >
        {showHUD ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>

      {/* Dynamic Offline Loading Lock */}
      {!scriptsLoaded && (
        <div className="absolute inset-0 bg-[#020308] flex flex-col justify-center items-center z-50">
          <div className="w-16 h-16 relative mb-6">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-400 animate-spin" />
            <div className="absolute inset-3 rounded-full border-b-2 border-l-2 border-indigo-400 animate-spin" style={{ animationDirection: 'reverse' }} />
          </div>
          <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase animate-pulse">BOOTING CINEMATIC CORE...</p>
        </div>
      )}

      {/* THE 21:9 CINEMATIC LETTERBOX FRAME (MAKES IT LOOK LIKE AN IMAX VIDEO) */}
      <div className="absolute top-0 inset-x-0 cinematic-letterbox-top pointer-events-none z-10 flex items-center px-8 justify-between">
        {showHUD && (
          <div className="pointer-events-auto flex items-center gap-3">
            <span className="text-[10px] bg-cyan-950/70 text-cyan-400 font-mono font-bold tracking-widest px-2.5 py-1 border border-cyan-500/25 rounded">
              IMAX UHD FEED
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>DIRECTOR'S CUT ACTIVE</span>
            </div>
          </div>
        )}

        {showHUD && (
          <div className="pointer-events-auto flex items-center gap-4">
            {/* Soundtrack dynamic audio */}
            <button
              onClick={handleToggleSound}
              className={`flex items-center gap-2 bg-slate-950/80 border px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-widest transition duration-150 ${
                audioActive 
                  ? 'border-emerald-500/40 text-emerald-400' 
                  : 'border-slate-800 text-slate-500'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${audioActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <span>{audioActive ? 'SPACE RESONANCE: STREAMING' : 'AUDIO OFFLINE'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 cinematic-letterbox-bottom pointer-events-none z-10" />

      {/* NARRATION SCREEN (DOCUMENTARY SUBTITLES - HIGHLY LEGIBLE, POETIC & DETAILED) */}
      <div className="absolute bottom-28 inset-x-4 md:inset-x-20 z-20 pointer-events-none flex flex-col items-center">
        {showHUD && getFocusedMetrics() && (
          <div key={focusedBody} className="max-w-3xl text-center flex flex-col items-center gap-2 doc-subtitle-fade">
            <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
              {getFocusedMetrics().subtitle}
            </span>
            <h2 className="text-xl md:text-2xl font-serif tracking-wider font-medium text-slate-50 mb-1">
              {getFocusedMetrics().name}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light max-w-2xl px-4 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {getFocusedMetrics().description}
            </p>
          </div>
        )}
      </div>

      {/* FLOATING HUD INTERACTIVE CONTROLS (STREAMING VIDEO STYLE CONTROLLER) */}
      {showHUD && (
        <div className="absolute bottom-6 inset-x-6 h-16 bg-slate-950/80 border border-slate-800 backdrop-blur-md rounded-xl px-5 flex justify-between items-center z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          
          {/* Seek Chapters / DVD Chapters */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {CINEMATIC_CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`w-2.5 h-2.5 transition duration-150 rounded-none border ${
                    currentChapterIndex === idx 
                      ? 'bg-cyan-400 border-cyan-400 scale-125' 
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                  }`}
                  title={ch.label}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-wider uppercase ml-1.5 hidden md:inline">
              {CINEMATIC_CHAPTERS[currentChapterIndex].label}
            </span>
          </div>

          {/* Master Playback controls */}
          <div className="flex items-center gap-4">
            
            {/* Play / Pause video */}
            <button
              onClick={() => { setIsPlaying(!isPlaying); }}
              className="p-2 text-slate-300 hover:text-white transition duration-150"
              title={isPlaying ? "Pause Scene" : "Play Scene"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Auto Cycle lock */}
            <button
              onClick={() => { setDirectorCut(!directorCut); }}
              className={`px-3.5 py-1.5 rounded border font-mono text-[9px] tracking-widest font-bold transition duration-150 ${
                directorCut 
                  ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              DIRECTOR CUT: {directorCut ? 'ACTIVE' : 'LOCKED'}
            </button>

            {/* Video playback speed */}
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded border border-slate-800">
              <span className="font-mono text-[9px] text-slate-500 font-bold uppercase">VELOCITY</span>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="w-16 accent-cyan-400 cursor-pointer h-1 rounded"
              />
              <span className="font-mono text-[10px] text-slate-300 font-bold min-w-[28px]">
                {playbackSpeed.toFixed(1)}x
              </span>
            </div>

          </div>

          {/* Outer stats/spec sheet box */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
            {getFocusedMetrics() && (
              <div className="hidden lg:flex gap-4">
                <div>
                  <span className="text-slate-600">TEMP:</span> <span className="text-slate-300 font-bold">{getFocusedMetrics().temperature}</span>
                </div>
                <div>
                  <span className="text-slate-600">ORBIT:</span> <span className="text-slate-300 font-bold">{getFocusedMetrics().orbitalPeriod}</span>
                </div>
              </div>
            )}
            
            {/* Screen Saver Toggle */}
            <button
              onClick={() => setShowHUD(false)}
              className="p-2 text-slate-500 hover:text-slate-300 transition duration-150"
              title="Fullscreen Screensaver Mode"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
          </div>

        </div>
      )}

      {/* GHOST SCREEN REVEAL IN BLACKOUT/SCREENSAVER MODE */}
      {!showHUD && (
        <button
          onClick={() => setShowHUD(true)}
          className="absolute inset-x-0 bottom-8 z-30 flex justify-center items-center animate-pulse"
        >
          <span className="font-mono text-[10px] text-cyan-400/80 tracking-widest bg-slate-950/90 border border-cyan-500/30 px-5 py-2.5 rounded-full hover:border-cyan-400 hover:text-white transition duration-200">
            CLICK TO RESTORE HUD INTERACTION
          </span>
        </button>
      )}

      {/* QUICK NARRATION FACT SHEET FLYOUT (LEFT SIDEBAR) */}
      {showHUD && getFocusedMetrics() && (
        <div className="absolute left-6 top-24 bottom-28 w-60 bg-slate-950/70 border border-slate-800/80 backdrop-blur-md rounded-xl p-4 flex flex-col gap-3 z-10 no-scrollbar overflow-y-auto shadow-2xl">
          <div className="border-b border-slate-800 pb-2">
            <span className="font-mono text-[8px] tracking-widest text-slate-500 uppercase font-bold">TELEMETRY DECK</span>
            <h3 className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase">{getFocusedMetrics().name} FOCUS</h3>
          </div>

          <div className="flex flex-col gap-2.5 text-[10px] font-mono">
            <div className="bg-slate-900/40 p-2 border border-slate-800/30 rounded">
              <span className="text-slate-500 block text-[8px]">STELLAR SPECTRUM</span>
              <span className="text-slate-300 font-bold">{getFocusedMetrics().type}</span>
            </div>
            <div className="bg-slate-900/40 p-2 border border-slate-800/30 rounded">
              <span className="text-slate-500 block text-[8px]">CORE DIMENSIONS</span>
              <span className="text-slate-300 font-bold">{PLANETS_DB[focusedBody].size * 1000} S-Units</span>
            </div>
            <div className="bg-slate-900/40 p-2 border border-slate-800/30 rounded">
              <span className="text-slate-500 block text-[8px]">EST. SYSTEM SPACING</span>
              <span className="text-slate-300 font-bold">{PLANETS_DB[focusedBody].distance} AU Equivalent</span>
            </div>
          </div>

          <div className="mt-auto pt-2 border-t border-slate-800/60">
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
              <span>SATELLITE SYNC</span>
              <span className="text-emerald-400 font-bold">100% SECURE</span>
            </div>
          </div>
        </div>
      )}

      {/* DIRECT VIEW SELECTOR FOR MANUAL INTERVENTION */}
      {showHUD && (
        <div className="absolute right-6 top-24 bottom-28 w-16 bg-slate-950/70 border border-slate-800/80 backdrop-blur-md rounded-xl py-4 flex flex-col items-center gap-2.5 z-10 no-scrollbar overflow-y-auto shadow-2xl">
          <p className="text-[8px] font-mono tracking-widest text-slate-500 uppercase rotate-270 mt-4 mb-4 select-none font-bold">SCENE FOCUS</p>
          {Object.keys(PLANETS_DB).map((pKey) => {
            const isActive = focusedBody === pKey;
            return (
              <button
                key={pKey}
                onClick={() => {
                  setFocusedBody(pKey);
                  // Update current index mapping
                  const matchIdx = CINEMATIC_CHAPTERS.findIndex(ch => ch.target === pKey);
                  if (matchIdx !== -1) {
                    setCurrentChapterIndex(matchIdx);
                  }
                  setDirectorCut(true); // resume auto-path on click
                }}
                className={`group relative w-10 h-10 rounded-full flex flex-col justify-center items-center transition duration-200 border ${
                  isActive 
                    ? 'bg-cyan-950/80 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                    : 'bg-slate-900/50 border-slate-800/60 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <span 
                  className="w-3.5 h-3.5 rounded-full transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: PLANETS_DB[pKey].color }}
                />
                <span className="text-[7.5px] font-mono text-slate-400 mt-1 uppercase font-bold">
                  {pKey.substring(0, 3)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}