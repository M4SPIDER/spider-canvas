import React, { useState, useEffect, useRef } from 'react';

import { 

  Home,

  Star,

  Send, 

  Code2, 

  Eye, 

  Maximize2, 

  Minimize2, 

  ChevronRight, 

  Sparkles, 

  FileCode,

  Share2,

  Copy,

  Check,

  PanelRightClose,

  PanelRightOpen,

  Smartphone,

  Tablet,

  Monitor,

  ArrowLeft,

  Menu,

  X,

  Loader2,

  GripVertical,

  Database,

  Trash2,

  Play,

  RotateCcw,

  FastForward,

  Bug,

  Edit3

} from 'lucide-react';



// --- Constants ---

const DB_NAME = 'SpiderCanvasDB';

const DB_VERSION = 1;

const STORE_NAME = 'session';



// --- IndexedDB Helpers ---

const initDB = () => {

  return new Promise((resolve, reject) => {

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    

    request.onupgradeneeded = (event) => {

      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {

        db.createObjectStore(STORE_NAME);

      }

    };



    request.onsuccess = (event) => resolve(event.target.result);

    request.onerror = (event) => reject(event.target.error);

  });

};



const saveToDB = async (key, value) => {

  try {

    const db = await initDB();

    const tx = db.transaction(STORE_NAME, 'readwrite');

    const store = tx.objectStore(STORE_NAME);

    store.put(value, key);

    return tx.complete;

  } catch (error) {

    console.error('Error saving to DB:', error);

  }

};



const loadFromDB = async (key) => {

  try {

    const db = await initDB();

    return new Promise((resolve, reject) => {

      const tx = db.transaction(STORE_NAME, 'readonly');

      const store = tx.objectStore(STORE_NAME);

      const request = store.get(key);

      

      request.onsuccess = () => resolve(request.result);

      request.onerror = () => reject(request.error);

    });

  } catch (error) {

    console.error('Error loading from DB:', error);

    return null;

  }

};



const clearDB = async () => {

  try {

    const db = await initDB();

    const tx = db.transaction(STORE_NAME, 'readwrite');

    const store = tx.objectStore(STORE_NAME);

    store.clear(); 

    return tx.complete;

  } catch (error) {

    console.error('Error clearing DB:', error);

  }

};



// --- Custom Components ---



// THE REAL SPIDER LOGO (Geometric Processor Core)

const SpiderLogo = ({ className }) => (

  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">

    {/* Geometric Body (Faceted Processor Core) */}

    <polygon points="12 4, 15 7, 15 15, 12 18, 9 15, 9 7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />

    <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.1" />

    <path d="M12 4 L 12 18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.7"/>

    

    {/* Legs (Circuit Traces) */}

    {/* Top Left (L1, L2) */}

    <path d="M9 7 L 3 1 L 1 4" />

    <path d="M9 10 L 2 5 L 0 9" />

    {/* Top Right (R1, R2) */}

    <path d="M15 7 L 21 1 L 23 4" />

    <path d="M15 10 L 22 5 L 24 9" />

    

    {/* Bottom Left (L3, L4) */}

    <path d="M9 15 L 3 23 L 1 20" />

    <path d="M9 12 L 2 17 L 0 13" />

    {/* Bottom Right (R3, R4) */}

    <path d="M15 15 L 21 23 L 23 20" />

    <path d="M15 12 L 22 17 L 24 13" />

    

    {/* Connectors / Eyes (Small Dots) */}

    <circle cx="10.5" cy="5.5" r="0.5" fill="currentColor" />

    <circle cx="13.5" cy="5.5" r="0.5" fill="currentColor" />

  </svg>

);



// --- Components ---



/**

 * Responsive Artifact Preview

 * Enhanced for WebGL, Full Screen, and Robust Rendering

 */

const ArtifactPreview = ({ content, type, deviceMode }) => {

  const iframeRef = useRef(null);



  useEffect(() => {

    if (!iframeRef.current) return;



    let blobContent = '';

    const rawContent = content || '';



    // --- Template for React Components ---

    if (type === 'react') {

      // Fix: Only escape the script tag closing sequence. 

      // Do NOT escape backslashes or backticks; React/JS interpolation handles them safely.

      const safeReactContent = rawContent.replace(/<\/script>/g, '<\\/script>');



      // FIX: Use string concatenation instead of template literal for the content injection

      // to ensure the variable is always inserted as value, preventing syntax errors in the blob.

      blobContent = `

<!DOCTYPE html>

<html>

  <head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <script src="https://cdn.tailwindcss.com"></script>

    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>

    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

    <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>

    <style>

      /* FORCE WHITE BACKGROUND FOR REACT APPS */

      html, body { 

        font-family: sans-serif; 

        margin: 0; 

        padding: 0; 

        background-color: #ffffff !important; 

        height: 100vh; 

        width: 100vw;

        overflow: auto; 

      }

      ::-webkit-scrollbar { width: 6px; height: 6px; }

      ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

      #error-display { 

        display: none; 

        padding: 1.5rem; 

        background: #fef2f2; 

        color: #b91c1c; 

        border-bottom: 1px solid #fecaca; 

        font-family: monospace; 

        font-size: 13px; 

        white-space: pre-wrap;

        position: absolute;

        top: 0; left: 0; right: 0;

        z-index: 9999;

      }

      #root { width: 100%; min-height: 100vh; background-color: #ffffff; }

    </style>

  </head>

  <body>

    <div id="error-display"></div>

    <div id="root"></div>



    <!-- Hidden Container for User Code -->

    <script type="text/plain" id="user-code">` + safeReactContent + `</script>



    <script>

      // 1. Error Handling

      window.onerror = function(msg, url, line, col, error) {

        const errDiv = document.getElementById('error-display');

        errDiv.style.display = 'block';

        const cleanMsg = msg.replace('Uncaught Error: ', '');

        errDiv.innerHTML = '<strong>⚠️ Runtime Error:</strong><br/>' + cleanMsg + '<br/><small>' + (url || '') + ':' + line + '</small>';

        return false; 

      };



      // 2. Mocks

      window.process = { env: { NODE_ENV: 'production' } };

      window.exports = {};

      window.module = { exports: window.exports };

      

      const LucideProxy = new Proxy({}, {

        get: (target, prop) => {

          if (prop === '__esModule') return true;

          if (prop === '$$typeof') return undefined;

          return (props) => {

            const { size = 24, className = '', ...rest } = props || {};

            return window.React.createElement('svg', {

              width: size, height: size, viewBox: "0 0 24 24", 

              fill: "none", stroke: "currentColor", strokeWidth: 2,

              strokeLinecap: "round", strokeLinejoin: "round",

              className: className, style: { color: 'currentColor' }, ...rest

            }, window.React.createElement('rect', { x:2, y:2, width:20, height:20, rx:5, strokeDasharray: "4" })); 

          };

        }

      });



      // ROBUST REQUIRE MOCK: Handles missing imports without crashing

      window.require = function(moduleName) {

        if (moduleName === 'react') return window.React;

        if (moduleName === 'react-dom') return window.ReactDOM;

        if (moduleName === 'lucide-react') return LucideProxy;

        if (moduleName === 'recharts') return window.Recharts || {}; // If recharts needed later

        

        console.warn('Mocking missing module:', moduleName);

        

        // Return a Proxy that returns a placeholder component for ANY property access

        return new Proxy({}, {

          get: (target, prop) => {

            if (prop === '__esModule') return true;

            // Return a Mock Component

            return ({ children, ...props }) => {

              return window.React.createElement('div', {

                style: { 

                  border: '1px dashed #f87171', 

                  backgroundColor: '#fef2f2',

                  padding: '8px', 

                  borderRadius: '4px',

                  color: '#dc2626', 

                  fontFamily: 'monospace', 

                  fontSize: '12px',

                  margin: '4px'

                }

              }, [

                window.React.createElement('strong', { key: 'label' }, 'Missing: ' + moduleName + '.' + String(prop)),

                children

              ]);

            };

          }

        });

      };



      // 3. Manual Compilation & Execution

      try {

        const userCode = document.getElementById('user-code').textContent;

        if (!userCode.trim()) throw new Error("No code to render");



        // Prepare code: Append App check safely.

        // We use String.fromCharCode(10) to generate a newline without relying on escape sequences

        // that might be mangled by template literals or Babel parsing.

        const newline = String.fromCharCode(10);

        const codeSuffix = newline + newline + 'if(typeof App !== "undefined") { window.App = App; }';

        const finalCode = userCode + codeSuffix;



        // Compile with Babel

        const compiled = Babel.transform(finalCode, { 

          presets: [['env', { modules: 'commonjs' }], 'react'],

          filename: 'user-code.js'

        }).code;



        // Execute using new Function

        new Function('require', 'module', 'exports', 'React', 'ReactDOM', compiled)(window.require, window.module, window.exports, window.React, window.ReactDOM);

        

        // Find Component

        let ComponentToRender = window.module.exports.default || window.exports.default || window.App;

        

        // Support named exports if default missing

        if (!ComponentToRender && window.exports.App) ComponentToRender = window.exports.App;



        if (ComponentToRender) {

          const root = ReactDOM.createRoot(document.getElementById('root'));

          root.render(React.createElement(ComponentToRender));

        } else {

          // If no App, try to find ANY React component export

          const entries = Object.entries(window.exports);

          const firstComponent = entries.find(([key, val]) => typeof val === 'function');

          if (firstComponent) {

             console.log("Rendering found component:", firstComponent[0]);

             const root = ReactDOM.createRoot(document.getElementById('root'));

             root.render(React.createElement(firstComponent[1]));

          } else {

             throw new Error("Could not find a default export or 'App' component to render.");

          }

        }



      } catch (err) {

        const errDiv = document.getElementById('error-display');

        errDiv.style.display = 'block';

        errDiv.innerHTML = '<strong>🚫 Compilation/Render Error:</strong><br/>' + err.message;

        console.error(err);

      }

    </script>

  </body>

</html>`;

    } 

    // --- Template for HTML/JS (Games, Static Sites, WebGL) ---

    else if (type === 'html') {

      const safeHtmlContent = rawContent;



      blobContent = `

<!DOCTYPE html>

<html>

  <head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <script src="https://cdn.tailwindcss.com"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script> 

    <style>

      html, body { 

        margin: 0; 

        padding: 0; 

        width: 100%; 

        height: 100%; 

        background: #000000; /* Games usually need black background */

        overflow: hidden;

        color: white;

      }

      canvas { display: block; width: 100%; height: 100%; touch-action: none; }

      #error-container { 

        position: absolute; top: 0; left: 0; right: 0; 

        background: rgba(220, 38, 38, 0.9); color: white; 

        padding: 10px; font-family: monospace; font-size: 12px; 

        z-index: 9999; display: none; pointer-events: auto;

      }

    </style>

  </head>

  <body>

    <div id="error-container"></div>

    <canvas id="gameCanvas"></canvas>

    

    <script>

      window.onerror = function(msg, url, line, col, error) {

        const div = document.getElementById('error-container');

        div.style.display = 'block';

        div.innerHTML = 'RUNTIME ERROR: ' + msg + ' (Line: ' + line + ')';

        return false;

      };



      // IIFE to prevent variable collision with user code

      (function() {

        const _systemCanvas = document.getElementById('gameCanvas');

        const _resize = () => {

          if(_systemCanvas) {

              _systemCanvas.width = window.innerWidth;

              _systemCanvas.height = window.innerHeight;

          }

        };

        window.addEventListener('resize', _resize);

        _resize();

      })();

    </script>



    <!-- User Code -->

    <div id="root" style="position: absolute; inset: 0; pointer-events: none;">

      <div style="pointer-events: auto; width: 100%; height: 100%;">

        ` + safeHtmlContent + `

      </div>

    </div>

  </body>

</html>`;

    } 

    // --- Fallback ---

    else {

      const safeFallbackContent = rawContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      blobContent = `

<!DOCTYPE html>

<html>

  <body style="margin:0;padding:1rem;background:#ffffff;color:#333;">

    <pre style="white-space: pre-wrap; font-family: monospace; font-size: 14px;">` + safeFallbackContent + `</pre>

  </body>

</html>`;

    }



    const blob = new Blob([blobContent], { type: 'text/html' });

    const url = URL.createObjectURL(blob);

    iframeRef.current.src = url;



    return () => URL.revokeObjectURL(url);

  }, [content, type]);



  const getContainerStyle = () => {

    switch (deviceMode) {

      case 'mobile': return { 

        width: '375px', 

        height: '100%', 

        maxHeight: '667px', 

        borderRadius: '2rem', 

        border: '8px solid #1e293b', 

        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',

        backgroundColor: 'white'

      };

      case 'tablet': return { 

        width: '768px', 

        height: '100%', 

        maxHeight: '1024px', 

        borderRadius: '1.5rem', 

        border: '8px solid #1e293b', 

        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',

        backgroundColor: 'white'

      };

      default: return { 

        width: '100%', 

        height: '100%', 

        borderRadius: '0', 

        border: 'none',

        backgroundColor: 'white' 

      };

    }

  };



  return (

    <div className={`w-full h-full flex items-center justify-center bg-slate-100 transition-all duration-300 ${deviceMode !== 'desktop' ? 'p-4 md:p-8' : ''}`}>

      <div 

        style={getContainerStyle()} 

        className="relative overflow-hidden transition-all duration-500 ease-in-out origin-center bg-white"

      >

        <iframe 

          ref={iframeRef} 

          title="Artifact Preview"

          className="w-full h-full border-none bg-white block"

          sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin allow-pointer-lock allow-presentation"

          allow="accelerometer; autoplay; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share; picture-in-picture; fullscreen"

        />

      </div>

    </div>

  );

};



/**

 * Main Application

 */

export default function App() {

  

  // --- DEFAULT ARTIFACT: 3D WELCOME SCREEN (REACT VERSION) ---

  const defaultArtifact = {

    title: "Spider Canvas Home",

    language: "react",

    code: `import React from 'react';

import { Sparkles, Terminal, Cpu, Zap } from 'lucide-react';



export default function App() {

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden font-sans selection:bg-cyan-500/30">

      

      {/* Ambient Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>

      <div className="absolute inset-0 opacity-20" style={{ 

        backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)', 

        backgroundSize: '40px 40px' 

      }}></div>



      {/* Main Container */}

      <div className="relative z-10 max-w-3xl w-full mx-4">

        

        {/* Card */}

        <div className="relative group">

          {/* Glow Effect */}

          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

          

          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-2xl shadow-2xl flex flex-col items-center text-center">

            

            {/* Animated Icon */}

            <div className="w-20 h-20 mb-8 relative">

              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>

              <div className="relative bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-lg transform transition group-hover:scale-110 duration-500">

                 <Cpu className="w-full h-full text-cyan-400" />

              </div>

            </div>



            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 tracking-tight">

              Spider Canvas

            </h1>

            

            <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">

              Next-gen AI Game Architect.<br/>

              <span className="text-cyan-400 font-medium">React Native.</span> <span className="text-blue-400 font-medium">WebGL.</span> <span className="text-indigo-400 font-medium">Full Stack.</span>

            </p>



            {/* Feature Grid */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">

              {[

                { icon: Terminal, label: "Clean Code", color: "text-emerald-400" },

                { icon: Zap, label: "Instant Preview", color: "text-yellow-400" },

                { icon: Sparkles, label: "Auto-Fix", color: "text-purple-400" }

              ].map((item, i) => (

                <div key={i} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition">

                  <item.icon className={\`w-4 h-4 \${item.color}\`} />

                  <span className="text-sm font-medium text-slate-300">{item.label}</span>

                </div>

              ))}

            </div>



            {/* Status Bar */}

            <div className="flex gap-3">

              <div className="px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-2">

                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

                System Online

              </div>

              <div className="px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-500">

                v2.1.0-React

              </div>

            </div>



          </div>

        </div>

        

        <div className="text-center mt-8 text-slate-600 text-xs font-mono tracking-widest opacity-50">

          PROCESSED BY SPIDER CORE

        </div>



      </div>

    </div>

  );

}`

  };



  const [messages, setMessages] = useState([

    { 

      id: 1, 

      role: 'assistant', 

      text: "System initialized. 🕷️\n\nI am the Ultimate Game Designer. I can build 3D WebGL games, physics simulations, and React apps.\n\nTry:\n- \"Create a Snow Brothers style platformer\"\n- \"Build a 3D space shooter with three.js\"\n- \"Make a physics based puzzle game\"",

      artifact: defaultArtifact

    }

  ]);



  const [input, setInput] = useState("");

  const [activeArtifact, setActiveArtifact] = useState(defaultArtifact);

  const [viewMode, setViewMode] = useState('preview'); 

  const [deviceMode, setDeviceMode] = useState('desktop'); 

  const [isCanvasOpen, setIsCanvasOpen] = useState(false); 

  const [isCopied, setIsCopied] = useState(false);

  const [isTyping, setIsTyping] = useState(false); 

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

   

  const [sidebarWidth, setSidebarWidth] = useState(400); 

  const [isDragging, setIsDragging] = useState(false);

  const [isDesktop, setIsDesktop] = useState(true);



  // Ref for Full Screen

  const canvasContainerRef = useRef(null);



  // --- Effects ---



  useEffect(() => {

    const loadSession = async () => {

      const savedMessages = await loadFromDB('messages');

      const savedArtifact = await loadFromDB('activeArtifact');

      

      if (savedMessages && Array.isArray(savedMessages) && savedMessages.length > 0) {

        setMessages(savedMessages);

      }

      

      if (savedArtifact) {

        setActiveArtifact(savedArtifact);

      }

      setIsDataLoaded(true);

    };

    loadSession();

  }, []);



  useEffect(() => {

    if (isDataLoaded && messages.length > 0) { 

      saveToDB('messages', messages);

    }

  }, [messages, isDataLoaded]);



  useEffect(() => {

    if (isDataLoaded && activeArtifact) {

      saveToDB('activeArtifact', activeArtifact);

    }

  }, [activeArtifact, isDataLoaded]);



  useEffect(() => {

    const handleResize = () => {

      const desktop = window.innerWidth >= 768;

      setIsDesktop(desktop);

      if (desktop) {

        setIsCanvasOpen(true); 

      } else {

        setIsCanvasOpen(false); 

      }

    };

    

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, []);



  useEffect(() => {

    const handleMouseMove = (e) => {

      if (!isDragging) return;

      

      const newWidth = e.clientX;

      const minWidth = 250; 

      const maxAllowedWidth = window.innerWidth - 50; 



      if (newWidth >= minWidth && newWidth <= maxAllowedWidth) {

        setSidebarWidth(newWidth);

      }

    };



    const handleMouseUp = () => {

      setIsDragging(false);

      document.body.style.cursor = 'default';

      document.body.style.userSelect = 'auto';

    };



    if (isDragging) {

      window.addEventListener('mousemove', handleMouseMove);

      window.addEventListener('mouseup', handleMouseUp);

      document.body.style.cursor = 'col-resize';

      document.body.style.userSelect = 'none';

    }



    return () => {

      window.removeEventListener('mousemove', handleMouseMove);

      window.removeEventListener('mouseup', handleMouseUp);

      document.body.style.cursor = 'default';

      document.body.style.userSelect = 'auto';

    };

  }, [isDragging]);



  // --- Full Screen Logic ---

  useEffect(() => {

    const handleKeyDown = (e) => {

      if (e.key === 'F12' || e.key === 'Escape') {

        if (document.fullscreenElement) {

          e.preventDefault();

          document.exitFullscreen().catch(err => console.log(err));

          setIsFullscreen(false);

        }

      }

    };



    const handleFullscreenChange = () => {

      setIsFullscreen(!!document.fullscreenElement);

    };



    document.addEventListener('keydown', handleKeyDown);

    document.addEventListener('fullscreenchange', handleFullscreenChange);



    return () => {

      document.removeEventListener('keydown', handleKeyDown);

      document.removeEventListener('fullscreenchange', handleFullscreenChange);

    };

  }, []);



  const toggleFullScreen = async () => {

    if (!canvasContainerRef.current) return;



    if (!document.fullscreenElement) {

      try {

        await canvasContainerRef.current.requestFullscreen();

        setIsFullscreen(true);

      } catch (err) {

        console.error("Error attempting to enable full-screen mode:", err);

      }

    } else {

      document.exitFullscreen();

      setIsFullscreen(false);

    }

  };



  // --- API Handlers ---



  const callGeminiAPI = async (prompt, currentArtifact) => {

    const API_KEY = "sk-spider-7309d97dc88de09b765f5c8f809720a49e63dbc65375c0d031313dc01bed63e2";

    

    const systemInstruction = `

      You are "Spider", the Ultimate Game Designer & Full-Stack Architect.

      

      YOUR MISSION:

      Create "Ultimate" games and web apps. Your code must be 100% complete, self-contained, and bug-free.

      

      CRITICAL MANDATES:

      1. **NO TRUNCATION**: You must generate every single line of code. Never use placeholders like "// ...rest of code" or "// ...existing logic". DO NOT truncate long files. Output the complete functional code.

      2. **PRODUCTION READY**: Code must run immediately in the browser iframe.

      3. **VISUAL PERFECTION**: Use modern, polished UI design (Tailwind CSS).

      4. **GAME LOGIC**: Ensure games have robust loops (requestAnimationFrame), score tracking, and restart mechanics.

      5. **RENDERING FIX**: For HTML games, ALWAYS use the provided <canvas id="gameCanvas"> or create a canvas that fills the screen (width=window.innerWidth, height=window.innerHeight).

      

      RESPONSE FORMAT:

      {

        "text": "Brief, professional response confirming the build.",

        "artifact": {

          "title": "Title of the App/Game",

          "language": "html" or "react", 

          "code": "FULL CODE STRING" 

        }

      }



      TECHNICAL RULES:

      - Use Tailwind CSS.

      - For HTML Games: Use <canvas>, visible backgrounds, and proper z-index for overlays.

      - For React: Use functional components + hooks.

    `;



    let context = "";

    if (currentArtifact && currentArtifact.code) {

      context = `

      Here is the CURRENT CODE you should modify or explain:

      ${currentArtifact.code}



      Instructions:

      1. If the user asks to modify the code, return the FULL updated code.

      2. If the user asks to explain, provide a text explanation.

      `;

    }



    const finalPrompt = `${systemInstruction}\n\n${context}\n\nUser Request: ${prompt}`;



    try {

      console.log("🚀 Sending Request to AI Studio...");

      

      const response = await fetch("https://aistudio.m4spider.com/v1/chat", {

        method: "POST",

        headers: { 

          "Content-Type": "application/json",

          "X-API-Key": API_KEY

        },

        body: JSON.stringify({

          prompt: finalPrompt,

          mode: "chat"

        })

      });



      console.log(`📡 Status Code: ${response.status}`);



      if (!response.ok) throw new Error(`API call failed: ${response.status}`);

      

      const data = await response.json();

      const content = data.response;



      if (!content) throw new Error('No content received from API');

      

      console.log("%c✅ SUCCESS! System is online.", "color: green; font-size: 14px; font-weight: bold;");

      

      const jsonStr = content.replace(/```json\n?|\n?```/g, '');

      return JSON.parse(jsonStr);

      

    } catch (error) {

      console.error("💥 Network/Parsing Error:", error);

      return {

        text: "I'm sorry, I encountered an error while processing your request. Please try again.",

        artifact: null

      };

    }

  };



  const handleSend = async () => {

    if (!input.trim() || isTyping) return;

    

    const userText = input;

    const cleanPrompt = userText.trim().toLowerCase();



    // --- SPECIAL COMMAND: DELETE ALL ---

    if (cleanPrompt === "delete all") {

      setInput("");

      setMessages([{ 

        id: Date.now(), 

        role: 'assistant', 

        text: "Memory wiped successfully 🧠💨", 

        artifact: null 

      }]);

      setActiveArtifact(null);

      await clearDB();

      

      try {

        await fetch("https://aistudio.m4spider.com/v1/chat", {

          method: "delete all", 

          headers: { 

            "X-API-Key": "sk-spider-7309d97dc88de09b765f5c8f809720a49e63dbc65375c0d031313dc01bed63e2" 

          }

        });

        console.log("Backend memory cleared");

      } catch (e) { 

        console.error("Sync error:", e); 

      }

      return;

    }



    // --- STANDARD CHAT FLOW ---

    const newUserMsg = { id: Date.now(), role: 'user', text: userText };

    setMessages(prev => [...prev, newUserMsg]);

    setInput("");

    setIsTyping(true);



    try {

      const result = await callGeminiAPI(userText, activeArtifact);

      const aiMsg = {

        id: Date.now() + 1,

        role: 'assistant',

        text: result.text,

        artifact: result.artifact

      };



      setMessages(prev => [...prev, aiMsg]);

      

      if (result.artifact) {

        setActiveArtifact(result.artifact);

        if (window.innerWidth < 768) setIsCanvasOpen(true);

      }

    } catch (error) {

      setMessages(prev => [...prev, {

        id: Date.now() + 1,

        role: 'assistant',

        text: "Sorry, something went wrong. Please check your connection and try again.",

        artifact: null

      }]);

    } finally {

      setIsTyping(false);

    }

  };



  const handleContinue = async () => {

    if (isTyping) return;

    const userText = "continue";

    

    const newUserMsg = { id: Date.now(), role: 'user', text: "⏩ Auto-Continue" };

    setMessages(prev => [...prev, newUserMsg]);

    setIsTyping(true);



    try {

      const result = await callGeminiAPI(userText, activeArtifact);

      const aiMsg = {

        id: Date.now() + 1,

        role: 'assistant',

        text: result.text,

        artifact: result.artifact

      };



      setMessages(prev => [...prev, aiMsg]);

      

      if (result.artifact) {

        setActiveArtifact(result.artifact);

        if (window.innerWidth < 768) setIsCanvasOpen(true);

      }

    } catch (error) {

      setMessages(prev => [...prev, {

        id: Date.now() + 1,

        role: 'assistant',

        text: "Could not auto-continue. Please try again.",

        artifact: null

      }]);

    } finally {

      setIsTyping(false);

    }

  };



  const handleAutoFix = async () => {

    if (isTyping) return;

    const userText = "Fix bugs and regenerate 100% complete code. Ensure the canvas renders correctly and is visible. If this is a React app, ensure the App component is exported correctly."; 

    

    const newUserMsg = { id: Date.now(), role: 'user', text: "🐞 Auto-Debug / Fix" };

    setMessages(prev => [...prev, newUserMsg]);

    setIsTyping(true);



    try {

      const result = await callGeminiAPI(userText, activeArtifact);

      const aiMsg = {

        id: Date.now() + 1,

        role: 'assistant',

        text: result.text,

        artifact: result.artifact

      };



      setMessages(prev => [...prev, aiMsg]);

      

      if (result.artifact) {

        setActiveArtifact(result.artifact);

        if (window.innerWidth < 768) setIsCanvasOpen(true);

      }

    } catch (error) {

       console.error(error);

       setMessages(prev => [...prev, {

         id: Date.now() + 1,

         role: 'assistant',

         text: "Auto-fix failed. Please try again.",

         artifact: null

       }]);

    } finally {

      setIsTyping(false);

    }

  };



  // --- Message Listener for Auto-Fix ---

  useEffect(() => {

    const handleMessage = (event) => {

      if (event.data && event.data.type === 'AUTO_FIX_REQUEST') {

        if (!isTyping) {

          handleAutoFix();

        }

      }

    };



    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);

  }, [isTyping, handleAutoFix]);



  const handleExplainCode = async () => {

    if (!activeArtifact || isTyping) return;

    const prompt = "Please explain the current code displayed in the canvas. Highlight the key design choices and structure.";

    const userMsg = { id: Date.now(), role: 'user', text: "✨ Explain this code" };

    setMessages(prev => [...prev, userMsg]);

    setIsTyping(true);

    try {

      const result = await callGeminiAPI(prompt, activeArtifact);

      const aiMsg = { id: Date.now() + 1, role: 'assistant', text: result.text, artifact: null };

      setMessages(prev => [...prev, aiMsg]);

      if (window.innerWidth < 768) setIsCanvasOpen(false);

    } catch (error) {

       console.error(error);

       setIsTyping(false);

    } finally {

      setIsTyping(false);

    }

  };



  const copyCode = () => {

    navigator.clipboard.writeText(activeArtifact.code);

    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);

  };



  return (

    <div className="flex h-[100dvh] w-full bg-[#f8fafc] text-slate-900 font-sans overflow-hidden relative selection:bg-blue-100">

      

      {/* Overlay to trap mouse events during resizing */}

      {isDragging && (

        <div className="fixed inset-0 z-50 cursor-col-resize bg-transparent" />

      )}



      {/* --- Sidebar / Chat Panel --- */}

      <div 

        style={{ width: isDesktop && isCanvasOpen ? `${sidebarWidth}px` : undefined }}

        className={`

          flex flex-col h-full bg-white border-r border-slate-200 absolute md:relative z-10

          ${isDragging ? 'transition-none' : 'transition-all duration-300 ease-in-out'}

          ${isCanvasOpen 

            ? 'w-full -translate-x-full md:translate-x-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' 

            : 'w-full translate-x-0 opacity-100 pointer-events-auto'}

        `}

      >

        

        {/* Resize Handle (Desktop Only) */}

        {isDesktop && isCanvasOpen && (

          <div 

            className="absolute -right-1.5 top-0 bottom-0 w-4 cursor-col-resize z-50 flex items-center justify-center group hover:scale-105"

            onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}

            title="Drag to resize"

          >

            <div className={`

              w-1 h-8 rounded-full transition-all duration-200

              ${isDragging ? 'bg-indigo-500 h-full w-[2px]' : 'bg-slate-300 group-hover:bg-indigo-400 group-hover:h-12'}

            `} />

          </div>

        )}

        

        {/* Header */}

        <header className="h-14 min-h-[3.5rem] border-b border-slate-100 flex items-center justify-between px-4 bg-white sticky top-0 z-20">

          <div className="flex items-center gap-3">

            {/* REAL SPIDER LOGO */}

            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg shadow-slate-400/50">

               <SpiderLogo className="w-6 h-6 text-cyan-400" />

            </div>

            {/* BRAND NAME */}

            <span className="font-bold text-slate-900 tracking-tight">Spider Canvas 🕷️</span>

          </div>

          

          <div className="flex items-center gap-2">

            {isDataLoaded && (

              <span className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">

                <Database className="w-3 h-3" />

                Saved

              </span>

            )}

            {!isCanvasOpen && (

              <button 

                onClick={() => setIsCanvasOpen(true)}

                className="md:hidden p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"

              >

                <PanelRightOpen className="w-5 h-5" />

              </button>

            )}

          </div>

        </header>



        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 pb-20">

          {!isDataLoaded ? (

            <div className="flex h-full items-center justify-center text-slate-400 gap-2">

              <Loader2 className="w-5 h-5 animate-spin" />

              <span className="text-sm">Restoring session...</span>

            </div>

          ) : (

            messages.map((msg) => (

              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-[15px] leading-relaxed ${

                  msg.role === 'user' 

                  ? 'bg-slate-900 text-white rounded-tr-none' 

                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'

                }`}>

                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  

                  {msg.artifact && (

                    <button 

                      onClick={() => {

                        setActiveArtifact(msg.artifact);

                        setIsCanvasOpen(true);

                      }}

                      className="mt-3 w-full flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 active:scale-95 transition group text-left"

                    >

                      <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover:border-indigo-300 shadow-sm transition">

                        <FileCode className="w-5 h-5 text-indigo-600" />

                      </div>

                      <div className="flex-1 overflow-hidden">

                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Artifact</p>

                        <p className="text-sm font-semibold text-slate-700 truncate">{msg.artifact.title}</p>

                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />

                    </button>

                  )}

                </div>

              </div>

            ))

          )}

          

          {isTyping && (

             <div className="flex justify-start">

               <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">

                 <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />

                 <span className="text-sm text-slate-500">Thinking...</span>

               </div>

             </div>

          )}

          <div className="h-4" /> 

        </div>



        {/* Input Area */}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-slate-100">

          <div className="relative flex items-end gap-2 bg-slate-100 rounded-3xl p-2 border border-transparent focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 transition duration-300">

            <textarea

              value={input}

              onChange={(e) => setInput(e.target.value)}

              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}

              placeholder="Type your request here..."

              rows={1}

              className="w-full pl-4 py-3 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 resize-none max-h-32"

              style={{ minHeight: '44px' }} 

            />

            

            {/* Auto Continue Button */}

            <button 

              onClick={handleContinue}

              disabled={isTyping}

              className="p-3 bg-slate-200 text-slate-600 hover:bg-slate-300 rounded-full transition shadow-sm flex-shrink-0 mb-[1px]"

              title="Auto Continue (Finish stream)"

            >

              <FastForward className="w-4 h-4" />

            </button>



            <button 

              onClick={handleSend}

              disabled={!input.trim() || isTyping}

              className="p-3 bg-slate-900 text-white rounded-full hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md flex-shrink-0 mb-[1px]"

            >

              <Send className="w-4 h-4" />

            </button>

          </div>

        </div>

      </div>



      {/* --- Canvas / Preview Panel --- */}

      <main className={`

        flex-col bg-slate-50/50 absolute inset-0 md:relative z-30 md:z-0 md:flex h-full

        ${isCanvasOpen ? 'flex animate-in slide-in-from-right-4 duration-300' : 'hidden'}

      `}>

        

        {/* Canvas Toolbar / Header */}

        <header className="h-14 min-h-[3.5rem] border-b border-slate-200 flex items-center justify-between px-4 bg-white/80 backdrop-blur sticky top-0 z-40">

          

          <div className="flex items-center gap-3 overflow-hidden">

            {/* Mobile Back Button */}

            <button 

              onClick={() => setIsCanvasOpen(false)}

              className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition"

            >

              <ArrowLeft className="w-5 h-5" />

            </button>



            <h2 className="font-semibold text-slate-800 truncate flex items-center gap-2 text-sm md:text-base">

              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

              {activeArtifact?.title || "New Session"}

            </h2>

          </div>



          <div className="flex items-center gap-2">

            

            {/* Auto-Fix / Debug Button */}

            <button 

              onClick={handleAutoFix}

              disabled={isTyping}

              title="Fix Bugs / Regenerate Code"

              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition mr-1"

            >

              <Bug className="w-3.5 h-3.5" />

              Fix

            </button>



            {/* Explain Button */}

            <button 

              onClick={handleExplainCode}

              disabled={isTyping}

              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 rounded-lg text-xs font-semibold hover:from-amber-100 hover:to-orange-100 transition mr-2"

            >

              <Sparkles className="w-3.5 h-3.5" />

              Explain

            </button>



            {/* Device Toggles (Desktop Only) */}

            <div className="hidden md:flex bg-slate-100 p-1 rounded-lg border border-slate-200 mr-2">

              <button 

                onClick={() => setDeviceMode('mobile')}

                title="Mobile View"

                className={`p-1.5 rounded-md transition ${deviceMode === 'mobile' ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}

              >

                <Smartphone className="w-4 h-4" />

              </button>

              <button 

                onClick={() => setDeviceMode('tablet')}

                title="Tablet View"

                className={`p-1.5 rounded-md transition ${deviceMode === 'tablet' ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}

              >

                <Tablet className="w-4 h-4" />

              </button>

              <button 

                onClick={() => setDeviceMode('desktop')}

                title="Desktop View"

                className={`p-1.5 rounded-md transition ${deviceMode === 'desktop' ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}

              >

                <Monitor className="w-4 h-4" />

              </button>

            </div>



            {/* View Mode Toggle */}

            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">

              <button 

                onClick={() => setViewMode('preview')}

                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${

                  viewMode === 'preview' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'

                }`}

              >

                <Eye className="w-3.5 h-3.5" />

                <span className="hidden sm:inline">Preview</span>

              </button>

              <button 

                onClick={() => setViewMode('code')}

                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${

                  viewMode === 'code' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'

                }`}

              >

                <Code2 className="w-3.5 h-3.5" />

                <span className="hidden sm:inline">Code</span>

              </button>

            </div>



            {/* Full Screen Toggle */}

            <button 

              onClick={toggleFullScreen}

              className="p-2 ml-1 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 rounded-lg transition"

              title={isFullscreen ? "Exit Full Screen (F12)" : "Full Screen"}

            >

              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}

            </button>



            {/* Actions (Copy/Share) */}

            <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 pl-2 ml-1">

              <button 

                onClick={copyCode}

                className="p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 rounded-lg transition"

                title="Copy Code"

              >

                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}

              </button>

            </div>



          </div>

        </header>



        {/* Content Area */}

        <div 

          ref={canvasContainerRef}

          className={`flex-1 overflow-hidden relative bg-slate-100 ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}

        >

          {viewMode === 'preview' ? (

            activeArtifact ? (

              <ArtifactPreview 

                content={activeArtifact.code} 

                type={activeArtifact.language} 

                deviceMode={isFullscreen ? 'desktop' : deviceMode}

              />

            ) : (

              <div className="flex items-center justify-center h-full text-slate-400">

                <p>No artifact selected</p>

              </div>

            )

          ) : (

            <div className="w-full h-full bg-[#1e293b] flex flex-col font-mono text-sm overflow-hidden">

              <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-slate-700 text-slate-400">

                <span className="text-xs font-medium uppercase tracking-wider flex items-center gap-2">

                  <Edit3 className="w-3 h-3 text-indigo-400" />

                  Editable

                </span>

                <span className="text-xs opacity-50">{activeArtifact?.language}</span>

              </div>

              <textarea 

                value={activeArtifact?.code || ""}

                onChange={(e) => setActiveArtifact({ ...activeArtifact, code: e.target.value })}

                className="flex-1 w-full bg-transparent text-blue-100 p-4 sm:p-6 focus:outline-none resize-none overflow-auto scrollbar-thin scrollbar-thumb-slate-600"

                spellCheck={false}

              />

            </div>

          )}

          

          {/* Full Screen Exit Hint */}

          {isFullscreen && (

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-xs border border-white/20 pointer-events-none opacity-50 hover:opacity-100 transition">

              Press F12 or Esc to exit full screen

            </div>

          )}

        </div>

      </main>



    </div>

  );

}
