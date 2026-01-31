import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Star, Send, Code2, Eye, Maximize2, Minimize2, ChevronRight, 
  Sparkles, FileCode, Share2, Copy, Check, PanelRightClose, PanelRightOpen, 
  Smartphone, Tablet, Monitor, ArrowLeft, Menu, X, Loader2, GripVertical, 
  Database, Trash2, Play, RotateCcw, FastForward, Bug, Edit3, StopCircle,
  Cpu, Terminal, Zap, Globe
} from 'lucide-react';

// --- Constants ---
const DB_NAME = 'SpiderCanvasDB';
const DB_VERSION = 1;
const STORE_NAME = 'session';
const API_URL = "https://aistudio.m4spider.com/v1/chat";
const API_KEY = "sk-spider-7309d97dc88de09b765f5c8f809720a49e63dbc65375c0d031313dc01bed63e2";

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
    <path d="M9 7 L 3 1 L 1 4" />
    <path d="M9 10 L 2 5 L 0 9" />
    <path d="M15 7 L 21 1 L 23 4" />
    <path d="M15 10 L 22 5 L 24 9" />
    
    <path d="M9 15 L 3 23 L 1 20" />
    <path d="M9 12 L 2 17 L 0 13" />
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
      const encodedCode = JSON.stringify(rawContent);

      blobContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    <!-- 1. CSS Framework -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- 2. Core Libraries (UMD Builds) -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    
    <!-- 3. Icon Library (Vanilla Lucide UMD) -->
    <script src="https://unpkg.com/lucide@0.292.0/dist/umd/lucide.min.js"></script>
    
    <!-- 4. Compiler -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
      /* FORCE WHITE BACKGROUND FOR REACT APPS */
      html, body { 
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; 
        margin: 0; padding: 0; background-color: #ffffff; height: 100vh; width: 100vw; overflow: auto; 
      }
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      #root { width: 100%; min-height: 100vh; }
      
      /* Error Display */
      #error-box { 
        display: none; position: fixed; top: 0; left: 0; right: 0; 
        background: #fef2f2; color: #b91c1c; border-bottom: 1px solid #fecaca; 
        padding: 1rem; font-family: monospace; font-size: 12px; z-index: 10000;
      }
      
      /* Loading Spinner */
      #loader {
        position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
        background: white; z-index: 9999; transition: opacity 0.5s;
        flex-direction: column; gap: 1rem; color: #64748b; font-family: sans-serif;
      }
      .spinner { width: 24px; height: 24px; border: 3px solid #e2e8f0; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  </head>
  <body>
    <div id="error-box"></div>
    <div id="loader">
      <div class="spinner"></div>
      <div id="loader-text" style="font-size: 12px;">Initializing Environment...</div>
    </div>
    <div id="root"></div>

    <script>
      // 1. Error Handler
      window.onerror = function(msg, url, line, col, error) {
        document.getElementById('loader').style.display = 'none';
        const errDiv = document.getElementById('error-box');
        errDiv.style.display = 'block';
        errDiv.innerHTML = '<strong>Runtime Error:</strong><br/>' + msg + '<br/><small>' + (line ? 'Line: ' + line : '') + '</small>';
        return false;
      };

      // 2. Lucide Icons Setup
      // We process the vanilla icons into a map for fast React lookup
      window.LUCIDE_ICONS = {};
      
      function initIcons() {
        if (window.lucide && window.lucide.icons) {
          const keys = Object.keys(window.lucide.icons);
          keys.forEach(key => {
            // 1. Store exact key
            window.LUCIDE_ICONS[key] = window.lucide.icons[key];
            
            // 2. Store PascalCase version (arrow-right -> ArrowRight)
            const pascalKey = key.split('-')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join('');
            window.LUCIDE_ICONS[pascalKey] = window.lucide.icons[key];
            
            // 3. Store Lowercase for fallback
            window.LUCIDE_ICONS[key.toLowerCase()] = window.lucide.icons[key];
          });
        }
      }

      // 3. Lucide Proxy (The Connector)
      const LucideIconProxy = new Proxy({}, {
        get: (target, prop) => {
          if (prop === '__esModule') return true;
          
          return (props) => {
            const iconName = String(prop);
            
            // Lookup in our prepared map
            let iconDef = window.LUCIDE_ICONS[iconName] || window.LUCIDE_ICONS[iconName.toLowerCase()];
            
            // Brute force fallback if map missed it
            if (!iconDef && window.lucide && window.lucide.icons) {
                const keys = Object.keys(window.lucide.icons);
                const match = keys.find(k => k.toLowerCase() === iconName.toLowerCase() || k.replace(/-/g, '').toLowerCase() === iconName.toLowerCase());
                if(match) iconDef = window.lucide.icons[match];
            }

            // Render Icon
            if (iconDef && Array.isArray(iconDef)) {
                const [tag, attrs, children] = iconDef;
                
                // Helper to recurse children - SAFE VERSION
                const renderChildren = (childList) => {
                    if (!Array.isArray(childList)) return [];

                    return childList.map((child, i) => {
                        if (!Array.isArray(child)) return null;
                        const [cTag, cAttrs, cChildren] = child;
                        return React.createElement(cTag, { ...cAttrs, key: i }, 
                            renderChildren(cChildren)
                        );
                    });
                };

                return React.createElement('svg', {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: props.size || 24,
                    height: props.size || 24,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: props.color || "currentColor",
                    strokeWidth: props.strokeWidth || 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    ...props,
                    className: props.className,
                    style: { ...props.style, color: props.color || 'currentColor' }
                }, renderChildren(children || []));
            }

            // Fallback if not found
            return React.createElement('span', { 
               style: { display: 'inline-block', width: 24, height: 24, border: '1px dashed #ef4444', borderRadius: 4, ...props.style },
               title: 'Icon not found: ' + iconName
            });
          }
        }
      });

      // 4. Module Shim
      window.require = (moduleName) => {
        if (moduleName === 'react') return window.React;
        if (moduleName === 'react-dom') return window.ReactDOM;
        if (moduleName === 'lucide-react') return LucideIconProxy;
        if (moduleName === 'recharts') return window.Recharts || {}; 
        return {}; 
      };
      
      window.process = { env: { NODE_ENV: 'production' } };
      window.exports = {};
      window.module = { exports: window.exports };

      // 5. Execution Logic
      async function run() {
        try {
          // Wait for Lucide (poll for 3s)
          let attempts = 0;
          while ((!window.lucide || !window.lucide.icons) && attempts < 30) {
            await new Promise(r => setTimeout(r, 100));
            attempts++;
          }
          
          if (!window.lucide || !window.lucide.icons) {
             console.warn("Lucide icons failed to load.");
          } else {
             initIcons(); // Build the index
          }

          if (!window.React || !window.ReactDOM) throw new Error("React failed to load");
          
          const userCode = ${encodedCode};
          
          // Append bootstrap code
          const fullCode = userCode + "\\n\\n" + \`
            const rootEl = document.getElementById('root');
            if (rootEl) {
              const root = ReactDOM.createRoot(rootEl);
              const AppComp = window.App || (typeof App !== 'undefined' ? App : null) || (window.module.exports.default);
              if (AppComp) {
                root.render(React.createElement(AppComp));
              } else {
                root.render(React.createElement('div', {style:{padding:20, color:'red'}}, 'No App component found. Export "App" as default.'));
              }
            }
          \`;

          const compiled = Babel.transform(fullCode, { 
            presets: ['react', ['env', { modules: 'commonjs' }]],
            filename: 'app.js'
          }).code;

          new Function('require', 'React', 'ReactDOM', 'module', 'exports', compiled)(
            window.require, window.React, window.ReactDOM, window.module, window.exports
          );

          // Remove loader
          const loader = document.getElementById('loader');
          if (loader) {
             loader.style.opacity = 0;
             setTimeout(() => loader.remove(), 500);
          }

        } catch (e) {
          window.onerror(e.message, '', '', '', e);
        }
      }

      run();
    </script>
  </body>
</html>`;
    } 
    // --- HTML Fallback ---
    else if (type === 'html') {
      const safeHtmlContent = rawContent;
      blobContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>html,body{margin:0;height:100%;background:#000;color:white;}</style>
  </head>
  <body>
    ${safeHtmlContent}
  </body>
</html>`;
    } else {
      const safeFallbackContent = rawContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      blobContent = `<html><body style="margin:0;padding:1rem;background:#fff;"><pre style="font-family:monospace;">` + safeFallbackContent + `</pre></body></html>`;
    }

    const blob = new Blob([blobContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [content, type]);

  const getContainerStyle = () => {
    switch (deviceMode) {
      case 'mobile': return { width: '375px', height: '100%', maxHeight: '667px', borderRadius: '2rem', border: '8px solid #1e293b', backgroundColor: 'white' };
      case 'tablet': return { width: '768px', height: '100%', maxHeight: '1024px', borderRadius: '1.5rem', border: '8px solid #1e293b', backgroundColor: 'white' };
      default: return { width: '100%', height: '100%', borderRadius: '0', border: 'none', backgroundColor: 'white' };
    }
  };

  return (
    <div className={`w-full h-full flex items-center justify-center bg-slate-100 transition-all duration-300 ${deviceMode !== 'desktop' ? 'p-4 md:p-8' : ''}`}>
      <div style={getContainerStyle()} className="relative overflow-hidden transition-all duration-500 ease-in-out origin-center bg-white">
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

export default function App() {
  
  // --- DEFAULT ARTIFACT ---
  const defaultArtifact = {
    title: "Spider Canvas Home",
    language: "react",
    code: `import React from 'react';
import { Sparkles, Terminal, Cpu, Zap, Radio } from 'lucide-react';

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
              Advanced Stream Architecture.<br/>
              <span className="text-cyan-400 font-medium">Real-time.</span> <span className="text-blue-400 font-medium">Full Code.</span> <span className="text-indigo-400 font-medium">KV Memory.</span>
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
              {[
                { icon: Terminal, label: "Complete Code", color: "text-emerald-400" },
                { icon: Zap, label: "Fast Streaming", color: "text-yellow-400" },
                { icon: Radio, label: "Live Preview", color: "text-purple-400" }
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
                v9.9.80 Stable
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
      text: "System Online. 🕷️\n\nI am the Ultimate Game Designer. I now support **Real-Time Streaming** and **Full Code Generation**.\n\nTry:\n- \"Create a YouTube UI clone\"\n- \"Build a 3D space shooter\"\n- \"Make a complex dashboard\"",
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
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
    
  const [sidebarWidth, setSidebarWidth] = useState(400); 
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  
  // NEW: Session ID for KV Memory Management
  const [sessionId, setSessionId] = useState("");
  const abortControllerRef = useRef(null);

  // Ref for Full Screen
  const canvasContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- Effects ---

  // Initialize Session ID
  useEffect(() => {
    const initSession = async () => {
       let sId = await loadFromDB('spider_session_id');
       if (!sId) {
         sId = crypto.randomUUID();
         await saveToDB('spider_session_id', sId);
       }
       setSessionId(sId);
    };
    initSession();
  }, []);

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

  // --- API Handlers (Streaming) ---

  const generateStream = async (prompt, explicitMode = "chat") => {
    abortControllerRef.current = new AbortController();
    
    // Aggressive System Instruction for Full Code
    const SYSTEM_INSTRUCTION = `
      You are "Spider", the Ultimate Game Designer & Full-Stack Architect.
      
      CRITICAL MANDATES:
      1. **NO TRUNCATION**: You must generate every single line of code. Never use placeholders like "// ...rest of code" or "// ...existing logic".
      2. **SINGLE FILE**: Output all code (HTML, CSS, JS) in a single file format.
      3. **VISUAL PERFECTION**: Use modern, polished UI design (Tailwind CSS).
      4. **REACT EXPERT**: Write professional-grade React code (Components, Hooks).
      
      RESPONSE FORMAT:
      Start with a brief conversational response, then provide the code block.
      \`\`\`react
      // Complete code here
      \`\`\`
    `;

    // Context from current artifact
    let context = "";
    if (activeArtifact && activeArtifact.code) {
      context = `\n\n[CURRENT CODE CONTEXT]:\n${activeArtifact.code.substring(0, 10000)}\n\n[INSTRUCTION]: If editing, provide the FULL new code. Do not return diffs.`;
    }

    const finalPrompt = `${SYSTEM_INSTRUCTION}${context}\n\nUser Request: ${prompt}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-API-Key": API_KEY 
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          mode: explicitMode === "delete_all" ? "delete_all" : "stream", // Use 'stream' mode for chat
          stream: true, // Explicitly enable streaming
          session_id: sessionId
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error(`API call failed: ${response.status}`);

      // Handle Non-Streaming Responses (Delete All)
      if (explicitMode === "delete_all") {
        const data = await response.json();
        return { text: data.message, isStream: false };
      }

      // Handle Streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let isCodeBlockOpen = false;
      let currentCode = "";
      let currentLanguage = "";
      
      setIsStreaming(true);
      
      // Auto-open canvas on stream start
      if (window.innerWidth >= 768) setIsCanvasOpen(true);

      // Create a temporary message for streaming
      setMessages(prev => [
        ...prev, 
        { id: 'streaming', role: 'assistant', text: '', artifact: null }
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') break;
            
            try {
              const parsed = JSON.parse(dataStr);
              const textChunk = parsed.text || parsed.response || "";
              
              if (textChunk) {
                fullText += textChunk;
                
                // --- Real-time Code Extraction Logic ---
                // We parse the full text to detect code blocks
                // This is a simplified state machine for streaming
                
                const codeBlockStart = fullText.lastIndexOf('```');
                
                if (codeBlockStart !== -1) {
                  // Check if we have a closing block after the start (rare in partial stream but possible)
                  const codeBlockEnd = fullText.indexOf('```', codeBlockStart + 3);
                  
                  // Extract language
                  const headerEnd = fullText.indexOf('\n', codeBlockStart);
                  if (headerEnd !== -1) {
                      const lang = fullText.substring(codeBlockStart + 3, headerEnd).trim().toLowerCase();
                      if (lang === 'react' || lang === 'jsx' || lang === 'html' || lang === 'javascript') {
                        currentLanguage = lang === 'jsx' ? 'react' : lang;
                        
                        // Extract content
                        let codeContent = "";
                        if (codeBlockEnd !== -1) {
                           codeContent = fullText.substring(headerEnd + 1, codeBlockEnd);
                        } else {
                           codeContent = fullText.substring(headerEnd + 1);
                        }

                        // Update Artifact in Real-Time
                        if (codeContent.trim().length > 10) {
                           const liveArtifact = {
                             title: "Generating...",
                             language: currentLanguage,
                             code: codeContent
                           };
                           setActiveArtifact(liveArtifact);
                           setIsCanvasOpen(true);
                           
                           // Update message with artifact
                           setMessages(prev => prev.map(msg => 
                             msg.id === 'streaming' ? { ...msg, artifact: liveArtifact } : msg
                           ));
                        }
                      }
                  }
                }

                // Update text in chat
                setMessages(prev => prev.map(msg => 
                  msg.id === 'streaming' 
                    ? { ...msg, text: fullText } 
                    : msg
                ));
              }
            } catch (e) {
               // Ignore partial JSON parse errors
            }
          }
        }
      }

      return { text: fullText, isStream: true };

    } catch (error) {
      if (error.name === 'AbortError') {
        return { text: "Generation stopped by user.", isStream: true };
      }
      throw error;
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const extractArtifact = (text) => {
    // Regex to find code blocks: ```language ... ```
    const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/;
    const match = text.match(codeBlockRegex);
    
    if (match) {
      const language = match[1].toLowerCase();
      let code = match[2];
      
      // Basic cleanup
      if (language === 'react' || language === 'jsx' || language === 'javascript') {
        return {
          title: "Generated App",
          language: "react",
          code: code
        };
      } else if (language === 'html') {
        return {
          title: "Generated Page",
          language: "html",
          code: code
        };
      }
    }
    return null;
  };

  // --- CHANGED: Helper to filter code blocks from chat text ---
  const getDisplayText = (text, role) => {
    if (role !== 'assistant') return text;
    // 1. Remove complete code blocks
    let clean = text.replace(/```[\w]*\n[\s\S]*?```/g, '');
    // 2. Remove incomplete streaming code blocks
    clean = clean.replace(/```[\w]*\n?[\s\S]*$/, '');
    return clean.trim();
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping || isStreaming) return;
    
    const userText = input;
    const cleanPrompt = userText.trim().toLowerCase();
    
    // --- SPECIAL COMMAND: DELETE ALL ---
    if (cleanPrompt === "delete all") {
      setInput("");
      setIsTyping(true);
      
      try {
        // 1. Send Command to Backend FIRST to clear KV
        await generateStream("delete all", "delete_all");

        // 2. Only if successful, Clear Local State
        setMessages([{ 
          id: Date.now(), 
          role: 'assistant', 
          text: "Memory wiped successfully 🧠💨", 
          artifact: null 
        }]);
        setActiveArtifact(null);
        await clearDB();
        
        // 3. Generate NEW Session ID
        const newSid = crypto.randomUUID();
        setSessionId(newSid);
        await saveToDB('spider_session_id', newSid);
        
        console.log("KV and Local Memory cleared.");
      } catch (e) { 
        console.error("Sync error:", e); 
        setMessages(prev => [...prev, {
            id: Date.now(),
            role: 'assistant',
            text: "Error clearing backend memory. Please try again.",
            artifact: null
        }]);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    // --- STANDARD CHAT FLOW ---
    const newUserMsg = { id: Date.now(), role: 'user', text: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await generateStream(userText);
      
      // Finalize the streaming message
      const finalArtifact = extractArtifact(result.text);
      
      setMessages(prev => prev.map(msg => 
        msg.id === 'streaming' 
          ? { ...msg, id: Date.now() + 1, artifact: finalArtifact } 
          : msg
      ));

      if (finalArtifact) {
        setActiveArtifact(finalArtifact);
        if (window.innerWidth < 768) setIsCanvasOpen(true);
      }
      
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.filter(msg => msg.id !== 'streaming')); // Remove failed stream
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: "Sorry, I encountered an error. Please try again.",
        artifact: null
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      setIsTyping(false);
    }
  };

  const handleAutoFix = async () => {
    if (isTyping || isStreaming) return;
    setInput("Fix bugs and regenerate 100% complete code.");
    setTimeout(handleSend, 0);
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
        <header className="h-14 min-h-[3.5rem] border-b border-slate-100 flex items-center justify-between px-4 bg-white/90 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* REAL SPIDER LOGO */}
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg shadow-slate-400/50">
               <SpiderLogo className="w-5 h-5 text-cyan-400" />
            </div>
            {/* BRAND NAME */}
            <div>
              <span className="block font-bold text-slate-900 tracking-tight leading-none">Spider</span>
              <span className="block text-[10px] text-indigo-500 font-medium tracking-widest leading-none">CANVAS</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isDataLoaded && (
              <span className="hidden sm:flex text-[10px] text-slate-400 items-center gap-1 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
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
              <span className="text-sm">Initializing memory...</span>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                <div className={`max-w-[90%] md:max-w-[85%] rounded-2xl p-4 shadow-sm text-[15px] leading-relaxed relative ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                  {/* CHANGED: Use getDisplayText to hide code blocks */}
                  <p className="whitespace-pre-wrap">{getDisplayText(msg.text, msg.role)}</p>
                  
                  {/* Streaming Cursor (only show if valid text is streaming) */}
                  {msg.id === 'streaming' && isStreaming && !msg.artifact && (
                    <span className="inline-block w-2 h-4 bg-indigo-500 ml-1 animate-pulse align-middle"></span>
                  )}

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
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-slate-100">
          <div className="relative flex items-end gap-2 bg-slate-100 rounded-3xl p-2 border border-transparent focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 transition duration-300 shadow-inner">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              placeholder="Ask Spider to build something..."
              rows={1}
              disabled={isStreaming}
              className="w-full pl-4 py-3 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 resize-none max-h-32 disabled:opacity-50"
              style={{ minHeight: '44px' }} 
            />
            
            {isStreaming ? (
              <button 
                onClick={handleStop}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md flex-shrink-0 mb-[1px]"
                title="Stop Generation"
              >
                <StopCircle className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-slate-900 text-white rounded-full hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md flex-shrink-0 mb-[1px] group"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />}
              </button>
            )}
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
              <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-indigo-500 animate-ping' : 'bg-green-500'} `}></span>
              {activeArtifact?.title || "New Session"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Auto-Fix / Debug Button */}
            <button 
              onClick={handleAutoFix}
              disabled={isTyping || isStreaming}
              title="Fix Bugs / Regenerate Code"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition mr-1"
            >
              <Bug className="w-3.5 h-3.5" />
              Fix
            </button>

            {/* Device Toggles (Desktop Only) */}
            <div className="hidden md:flex bg-slate-100 p-1 rounded-lg border border-slate-200 mr-2">
              {['mobile', 'tablet', 'desktop'].map((mode) => (
                <button 
                  key={mode}
                  onClick={() => setDeviceMode(mode)}
                  title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} View`}
                  className={`p-1.5 rounded-md transition ${deviceMode === mode ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {mode === 'mobile' ? <Smartphone className="w-4 h-4" /> : 
                   mode === 'tablet' ? <Tablet className="w-4 h-4" /> : 
                   <Monitor className="w-4 h-4" />}
                </button>
              ))}
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

            {/* Actions (Copy) */}
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
