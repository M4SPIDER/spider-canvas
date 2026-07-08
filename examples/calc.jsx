import React, { useState, useMemo } from 'react';

// Fundamental SI Engineering Constants
const PHYSICAL_CONSTANTS = [
  { name: 'Speed of Light', symbol: 'c', value: 299792458, unit: 'm/s', desc: 'Electromagnetic propagation speed' },
  { name: 'Standard Gravity', symbol: 'g', value: 9.80665, unit: 'm/s²', desc: 'Acceleration due to Earth gravity' },
  { name: 'Universal Gas Constant', symbol: 'R', value: 8.31446, unit: 'J/(mol·K)', desc: 'Ideal gas thermodynamic constant' },
  { name: 'Planck Constant', symbol: 'h', value: 6.62607e-34, unit: 'J·s', desc: 'Quantum scale electromagnetic action' },
  { name: 'Gravitational Constant', symbol: 'G', value: 6.6743e-11, unit: 'm³/(kg·s²)', desc: 'Newtonian attraction constant' },
  { name: 'Vacuum Permittivity', symbol: 'ε₀', value: 8.85418e-12, unit: 'F/m', desc: 'Electric field transmission capability' },
  { name: 'Stefan-Boltzmann', symbol: 'σ', value: 5.67037e-8, unit: 'W/(m²·K⁴)', desc: 'Blackbody radiative energy constant' },
  { name: 'Boltzmann Constant', symbol: 'k_B', value: 1.380649e-23, unit: 'J/K', desc: 'Particle kinetic energy parameter' }
];

// Conversions mapping dictionary
const UNIT_GROUPS = {
  Length: {
    base: 'm',
    rates: { m: 1, mm: 0.001, cm: 0.01, km: 1000, in: 0.0254, ft: 0.3048, mi: 1609.34 }
  },
  Force: {
    base: 'N',
    rates: { N: 1, kN: 1000, mN: 0.001, lbf: 4.44822, kgf: 9.80665 }
  },
  Pressure: {
    base: 'Pa',
    rates: { Pa: 1, kPa: 1000, MPa: 1e6, bar: 1e5, psi: 6894.76, atm: 101325 }
  },
  Energy: {
    base: 'J',
    rates: { J: 1, kJ: 1000, MJ: 1e6, Wh: 3600, kWh: 3.6e6, BTU: 1055.06, Cal: 4184 }
  }
};

// Engineering notation engineering SI suffix formatter
function toEngineering(num) {
  if (isNaN(num) || !isFinite(num) || num === 0) return '0';
  const val = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  const exponents = [
    { exp: 12, suffix: ' T' },
    { exp: 9, suffix: ' G' },
    { exp: 6, suffix: ' M' },
    { exp: 3, suffix: ' k' },
    { exp: 0, suffix: '' },
    { exp: -3, suffix: ' m' },
    { exp: -6, suffix: ' μ' },
    { exp: -9, suffix: ' n' },
    { exp: -12, suffix: ' p' },
    { exp: -15, suffix: ' f' }
  ];

  const log10 = Math.log10(val);
  const rawExp = Math.floor(log10 / 3) * 3;
  
  // Find matching engineering range
  const matched = exponents.find(item => item.exp <= rawExp) || exponents[exponents.length - 1];
  const mantissa = val / Math.pow(10, matched.exp);
  
  return `${sign}${mantissa.toFixed(4)}${matched.suffix}`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('scientific'); // scientific | solvers | converter
  
  // --- SCIENTIFIC CALCULATOR STATE ---
  const [expression, setExpression] = useState('');
  const [calcResult, setCalcResult] = useState('');
  const [isRadian, setIsRadian] = useState(true);
  const [notationMode, setNotationMode] = useState('eng'); // norm | sci | eng
  const [calcError, setCalcError] = useState(false);

  // --- FORMULA SOLVER STATE ---
  const [solverType, setSolverType] = useState('ohm'); // ohm | reynolds | idealgas
  
  // Solver Ohm: V = I * R, P = V * I
  const [ohmInput, setOhmInput] = useState({ V: '', I: '', R: '', P: '' });
  const [ohmOutput, setOhmOutput] = useState(null);

  // Solver Reynolds: Re = (ρ * v * D) / μ
  const [reInput, setReInput] = useState({ density: '1000', velocity: '1.5', diameter: '0.05', viscosity: '0.001002' });
  const [reOutput, setReOutput] = useState(null);

  // Solver Ideal Gas: P * V = n * R * T
  const [gasInput, setGasInput] = useState({ pressure: '', volume: '', moles: '1.0', temp: '298.15' });
  const [gasOutput, setGasOutput] = useState(null);

  // --- UNIT CONVERTER STATE ---
  const [convCategory, setConvCategory] = useState('Pressure');
  const [convFrom, setConvFrom] = useState('psi');
  const [convTo, setConvTo] = useState('bar');
  const [convVal, setConvVal] = useState('14.7');
  const [convResult, setConvResult] = useState('');

  // --- SCIENTIFIC ENGINE LOGIC ---
  const handleKey = (val) => {
    setCalcError(false);
    if (val === 'C') {
      setExpression('');
      setCalcResult('');
    } else if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
    } else if (val === '=') {
      calculateResult(expression);
    } else {
      setExpression(prev => prev + val);
    }
  };

  const calculateResult = (exprStr) => {
    try {
      let parsed = exprStr
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/ln/g, 'Math.log')
        .replace(/log/g, 'Math.log10')
        .replace(/√/g, 'Math.sqrt')
        .replace(/\^/g, '**');

      // Setup Trigonometry (Degrees vs Radians)
      const trigFunctions = ['sin', 'cos', 'tan'];
      trigFunctions.forEach(f => {
        const regex = new RegExp(`${f}\\(`, 'g');
        if (!isRadian) {
          parsed = parsed.replace(regex, `Math.${f}((Math.PI/180)*`);
        } else {
          parsed = parsed.replace(regex, `Math.${f}(`);
        }
      });

      // Secure local evaluator scope mapping
      const resultVal = new Function(`return ${parsed}`)();
      
      if (typeof resultVal === 'number' && !isNaN(resultVal)) {
        setCalcResult(resultVal);
      } else {
        setCalcError(true);
      }
    } catch (err) {
      setCalcError(true);
    }
  };

  const injectConstant = (val) => {
    setExpression(prev => prev + val.toExponential(4));
  };

  const displayedResult = useMemo(() => {
    if (calcError) return 'Error';
    if (calcResult === '') return '0.00';
    
    const numVal = Number(calcResult);
    if (notationMode === 'sci') {
      return numVal.toExponential(6);
    } else if (notationMode === 'eng') {
      return toEngineering(numVal);
    }
    return numVal.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [calcResult, calcError, notationMode]);

  // --- SOLVER SOLVING ENGINE ---
  const runOhmSolver = () => {
    const { V, I, R, P } = ohmInput;
    const vVal = parseFloat(V);
    const iVal = parseFloat(I);
    const rVal = parseFloat(R);
    const pVal = parseFloat(P);

    let resolved = { V: vVal, I: iVal, R: rVal, P: pVal };
    let inputsCount = [vVal, iVal, rVal, pVal].filter(v => !isNaN(v)).length;

    if (inputsCount < 2) {
      setOhmOutput({ error: "Provide at least 2 variables to calculate the remaining metrics." });
      return;
    }

    // Solve combinations
    if (!isNaN(vVal) && !isNaN(iVal)) {
      resolved.R = vVal / iVal;
      resolved.P = vVal * iVal;
    } else if (!isNaN(vVal) && !isNaN(rVal)) {
      resolved.I = vVal / rVal;
      resolved.P = (vVal * vVal) / rVal;
    } else if (!isNaN(vVal) && !isNaN(pVal)) {
      resolved.I = pVal / vVal;
      resolved.R = (vVal * vVal) / pVal;
    } else if (!isNaN(iVal) && !isNaN(rVal)) {
      resolved.V = iVal * rVal;
      resolved.P = iVal * iVal * rVal;
    } else if (!isNaN(iVal) && !isNaN(pVal)) {
      resolved.V = pVal / iVal;
      resolved.R = pVal / (iVal * iVal);
    } else if (!isNaN(rVal) && !isNaN(pVal)) {
      resolved.V = Math.sqrt(pVal * rVal);
      resolved.I = Math.sqrt(pVal / rVal);
    }

    setOhmOutput(resolved);
  };

  const runReynoldsSolver = () => {
    const rho = parseFloat(reInput.density);
    const v = parseFloat(reInput.velocity);
    const d = parseFloat(reInput.diameter);
    const mu = parseFloat(reInput.viscosity);

    if ([rho, v, d, mu].some(val => isNaN(val) || val <= 0)) {
      setReOutput({ error: 'All inputs must be absolute positive variables.' });
      return;
    }

    const Re = (rho * v * d) / mu;
    let regime = 'Laminar (Re < 2300)';
    let regimeColor = 'text-emerald-400';
    if (Re >= 4000) {
      regime = 'Turbulent (Re > 4000)';
      regimeColor = 'text-rose-400';
    } else if (Re >= 2300) {
      regime = 'Transitional (2300 - 4000)';
      regimeColor = 'text-amber-400';
    }

    setReOutput({ Re, regime, regimeColor });
  };

  const runGasSolver = () => {
    const p = parseFloat(gasInput.pressure);
    const v = parseFloat(gasInput.volume);
    const n = parseFloat(gasInput.moles);
    const t = parseFloat(gasInput.temp);
    const R = 8.31446; // J/(mol·K)

    const inputs = { p, v, n, t };
    const missingKeys = Object.keys(inputs).filter(k => isNaN(inputs[k]));

    if (missingKeys.length !== 1) {
      setGasOutput({ error: 'Leave exactly one parameter empty to solve for it.' });
      return;
    }

    let calculated = { ...inputs };
    const missing = missingKeys[0];

    if (missing === 'p') calculated.p = (n * R * t) / v;
    else if (missing === 'v') calculated.v = (n * R * t) / p;
    else if (missing === 'n') calculated.n = (p * v) / (R * t);
    else if (missing === 't') calculated.t = (p * v) / (n * R);

    setGasOutput({ calculated, solvedKey: missing });
  };

  // --- UNIT CONVERSION LOGIC ---
  const handleUnitConversion = (value, fromUnit, toUnit, cat) => {
    const valFloat = parseFloat(value);
    if (isNaN(valFloat)) {
      setConvResult('0.00');
      return;
    }
    const rates = UNIT_GROUPS[cat].rates;
    // convert fromUnit -> SI -> toUnit
    const inBase = valFloat * rates[fromUnit];
    const targetVal = inBase / rates[toUnit];
    setConvResult(targetVal.toExponential(5).replace(/e\+?/, ' × 10^'));
  };

  // Run on live input changes
  const updateFromUnitValue = (val) => {
    setConvVal(val);
    handleUnitConversion(val, convFrom, convTo, convCategory);
  };

  const updateCategory = (cat) => {
    setConvCategory(cat);
    const units = Object.keys(UNIT_GROUPS[cat].rates);
    setConvFrom(units[0]);
    setConvTo(units[1] || units[0]);
    handleUnitConversion(convVal, units[0], units[1] || units[0], cat);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Premium Header Banner */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">SI-Quantum Engineering Calculator</h1>
            <p className="text-[11px] text-slate-400">Scientific Arithmetic, Real-time Physical Constants & Engineering Equation Solvers</p>
          </div>
        </div>

        {/* Dynamic Navigation Toggles */}
        <div className="flex bg-slate-950/80 p-1 border border-slate-800 rounded-lg text-xs gap-1">
          <button 
            onClick={() => setActiveTab('scientific')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${activeTab === 'scientific' ? 'bg-slate-800 text-emerald-400 border border-slate-700/50' : 'text-slate-400 hover:text-white'}`}
          >
            📊 Scientific
          </button>
          <button 
            onClick={() => setActiveTab('solvers')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${activeTab === 'solvers' ? 'bg-slate-800 text-emerald-400 border border-slate-700/50' : 'text-slate-400 hover:text-white'}`}
          >
            ⚙️ Solvers
          </button>
          <button 
            onClick={() => setActiveTab('converter')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${activeTab === 'converter' ? 'bg-slate-800 text-emerald-400 border border-slate-700/50' : 'text-slate-400 hover:text-white'}`}
          >
            ⚖️ Converter
          </button>
        </div>
      </header>

      {/* Main Responsive Grid Arena */}
      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-7xl mx-auto w-full overflow-y-auto">
        
        {/* LEFT COMPARTMENT: Key Solver Workspaces */}
        <section className="xl:col-span-8 flex flex-col gap-6">
          
          {/* TAB 1: SCIENTIFIC WORKSPACE */}
          {activeTab === 'scientific' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
              {/* Output Display Terminal */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between items-end gap-2 h-28 relative overflow-hidden font-mono">
                <div className="absolute top-2 left-3 flex gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  <span className={isRadian ? 'text-emerald-400' : ''}>RAD</span>
                  <span className="text-slate-700">|</span>
                  <span className={!isRadian ? 'text-emerald-400' : ''}>DEG</span>
                </div>
                <div className="text-slate-400 text-sm overflow-x-auto w-full text-right mt-4 whitespace-nowrap scrollbar-none">
                  {expression || 'Ready'}
                </div>
                <div className="text-2xl font-bold text-white tracking-wide overflow-x-auto w-full text-right">
                  {displayedResult}
                </div>
              </div>

              {/* Advanced Math Mode Formatting Options */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsRadian(!isRadian)}
                    className="px-2.5 py-1 text-[11px] bg-slate-800 border border-slate-700/50 text-slate-300 rounded font-semibold hover:border-slate-600 transition"
                  >
                    Set {isRadian ? 'DEG' : 'RAD'}
                  </button>
                  <button 
                    onClick={() => handleKey('C')}
                    className="px-2.5 py-1 text-[11px] bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded font-bold hover:bg-rose-500/20 transition"
                  >
                    Clear C
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 mr-1.5">Notation:</span>
                  {['norm', 'sci', 'eng'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setNotationMode(mode)}
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase border transition-all ${
                        notationMode === mode
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-950/50 text-slate-500 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scientific Calculator Tactile Keypad */}
              <div className="grid grid-cols-5 gap-2.5">
                {[
                  'sin(', 'cos(', 'tan(', '(', ')',
                  'ln(', 'log(', '√(', '^', 'DEL',
                  '7', '8', '9', '/', 'e',
                  '4', '5', '6', '*', 'π',
                  '1', '2', '3', '-', '+',
                  '0', '.', '=', 'C'
                ].map((key) => {
                  const isOp = ['/', '*', '-', '+', '^', '='].includes(key);
                  const isCtrl = ['DEL', 'C'].includes(key);
                  const isSpecial = ['sin(', 'cos(', 'tan(', 'ln(', 'log(', '√(', '(', ')', 'π', 'e'].includes(key);
                  
                  let keyClass = "h-11 rounded-lg text-xs font-bold font-mono transition-all border flex items-center justify-center ";
                  if (key === '=') {
                    keyClass += "bg-emerald-500 text-slate-950 border-emerald-400 hover:bg-emerald-400 shadow-lg shadow-emerald-500/10 col-span-2";
                  } else if (isOp) {
                    keyClass += "bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700 hover:border-slate-600";
                  } else if (isCtrl) {
                    keyClass += "bg-rose-950/40 text-rose-400 border-rose-900/60 hover:bg-rose-950/80";
                  } else if (isSpecial) {
                    keyClass += "bg-slate-950/60 text-sky-400 border-slate-800/80 hover:bg-slate-900";
                  } else {
                    keyClass += "bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800 hover:border-slate-700";
                  }

                  return (
                    <button key={key} onClick={() => handleKey(key)} className={keyClass}>
                      {key.replace('(', '')}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FORMULA SOLVERS WORKSPACE */}
          {activeTab === 'solvers' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-5">
              <div className="flex border-b border-slate-800 pb-2 gap-4 text-xs font-semibold">
                <button 
                  onClick={() => setSolverType('ohm')}
                  className={`pb-2 px-1 transition-all border-b-2 ${solverType === 'ohm' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                >
                  ⚡ Ohm's Power Law
                </button>
                <button 
                  onClick={() => setSolverType('reynolds')}
                  className={`pb-2 px-1 transition-all border-b-2 ${solverType === 'reynolds' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                >
                  🌊 Fluid Reynolds Number
                </button>
                <button 
                  onClick={() => setSolverType('idealgas')}
                  className={`pb-2 px-1 transition-all border-b-2 ${solverType === 'idealgas' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                >
                  🎈 Ideal Gas Law
                </button>
              </div>

              {/* Sub-Solver 1: Ohm's Law */}
              {solverType === 'ohm' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Ohm's Dynamic Multi-Variable Solver</h3>
                    <p className="text-xs text-slate-400">Enter exactly 2 values and trigger calculate to solve for the missing engineering variables.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'V', label: 'Voltage (V)', unit: 'Volts' },
                      { key: 'I', label: 'Current (I)', unit: 'Amps' },
                      { key: 'R', label: 'Resistance (R)', unit: 'Ohms' },
                      { key: 'P', label: 'Power (P)', unit: 'Watts' }
                    ].map(field => (
                      <div key={field.key} className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">{field.label}</label>
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="Solve"
                            value={ohmInput[field.key]}
                            onChange={(e) => setOhmInput({ ...ohmInput, [field.key]: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={runOhmSolver}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs"
                    >
                      Calculate Values
                    </button>
                    <button 
                      onClick={() => { setOhmInput({ V: '', I: '', R: '', P: '' }); setOhmOutput(null); }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs border border-slate-700"
                    >
                      Reset Inputs
                    </button>
                  </div>

                  {ohmOutput && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      {ohmOutput.error ? (
                        <p className="text-rose-400 font-semibold">{ohmOutput.error}</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <span className="text-slate-500">Solved Voltage:</span>
                            <p className="text-sm font-bold text-white mt-0.5">{ohmOutput.V?.toFixed(4)} V</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Solved Current:</span>
                            <p className="text-sm font-bold text-sky-400 mt-0.5">{ohmOutput.I?.toFixed(4)} A</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Solved Resistance:</span>
                            <p className="text-sm font-bold text-amber-400 mt-0.5">{ohmOutput.R?.toFixed(4)} Ω</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Solved Power:</span>
                            <p className="text-sm font-bold text-emerald-400 mt-0.5">{ohmOutput.P?.toFixed(4)} W</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-Solver 2: Reynolds Fluid Number */}
              {solverType === 'reynolds' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Reynolds Fluid Motion Classifier</h3>
                    <p className="text-xs text-slate-400">Calculate dimensionless Reynolds number representing the active liquid flow regime.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'density', label: 'Density (ρ)', unit: 'kg/m³' },
                      { key: 'velocity', label: 'Velocity (v)', unit: 'm/s' },
                      { key: 'diameter', label: 'Hydraulic Dia. (D)', unit: 'meters' },
                      { key: 'viscosity', label: 'Dyn. Viscosity (μ)', unit: 'Pa·s' }
                    ].map(field => (
                      <div key={field.key} className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">{field.label}</label>
                        <input
                          type="number"
                          value={reInput[field.key]}
                          onChange={(e) => setReInput({ ...reInput, [field.key]: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={runReynoldsSolver}
                    className="w-fit px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs"
                  >
                    Resolve Fluid Regime
                  </button>

                  {reOutput && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      {reOutput.error ? (
                        <p className="text-rose-400 font-semibold">{reOutput.error}</p>
                      ) : (
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div>
                            <span className="text-slate-500">Calculated Reynolds Number (Re):</span>
                            <p className="text-lg font-bold text-white mt-1">{reOutput.Re.toLocaleString(undefined, { maximumFractionDigits: 1 })}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Active Flow Regime:</span>
                            <p className={`text-base font-bold mt-1 ${reOutput.regimeColor}`}>{reOutput.regime}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-Solver 3: Ideal Gas Thermodynamics */}
              {solverType === 'idealgas' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Thermodynamic Ideal Gas Law</h3>
                    <p className="text-xs text-slate-400">Leave exactly one box blank to solve for that property ($P \cdot V = n \cdot R \cdot T$).</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'pressure', label: 'Pressure (P)', unit: 'Pascals (Pa)' },
                      { key: 'volume', label: 'Volume (V)', unit: 'm³' },
                      { key: 'moles', label: 'Substance Amount (n)', unit: 'Moles' },
                      { key: 'temp', label: 'Temperature (T)', unit: 'Kelvin (K)' }
                    ].map(field => (
                      <div key={field.key} className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">{field.label}</label>
                        <input
                          type="number"
                          placeholder="Solve"
                          value={gasInput[field.key]}
                          onChange={(e) => setGasInput({ ...gasInput, [field.key]: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={runGasSolver}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs"
                    >
                      Solve Gas Equation
                    </button>
                    <button 
                      onClick={() => { setGasInput({ pressure: '', volume: '', moles: '1.0', temp: '298.15' }); setGasOutput(null); }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs border border-slate-700"
                    >
                      Reset Inputs
                    </button>
                  </div>

                  {gasOutput && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      {gasOutput.error ? (
                        <p className="text-rose-400 font-semibold">{gasOutput.error}</p>
                      ) : (
                        <div>
                          <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold text-emerald-400">Solved Value Detected</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                            <div>
                              <span className="text-slate-500">Pressure (P):</span>
                              <p className={`text-sm font-bold mt-0.5 ${gasOutput.solvedKey === 'pressure' ? 'text-emerald-400 underline font-mono' : 'text-slate-200'}`}>
                                {gasOutput.calculated.p.toExponential(4)} Pa
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-500">Volume (V):</span>
                              <p className={`text-sm font-bold mt-0.5 ${gasOutput.solvedKey === 'volume' ? 'text-emerald-400 underline font-mono' : 'text-slate-200'}`}>
                                {gasOutput.calculated.v.toFixed(4)} m³
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-500">Moles (n):</span>
                              <p className={`text-sm font-bold mt-0.5 ${gasOutput.solvedKey === 'moles' ? 'text-emerald-400 underline font-mono' : 'text-slate-200'}`}>
                                {gasOutput.calculated.n.toFixed(4)} mol
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-500">Temperature (T):</span>
                              <p className={`text-sm font-bold mt-0.5 ${gasOutput.solvedKey === 'temp' ? 'text-emerald-400 underline font-mono' : 'text-slate-200'}`}>
                                {gasOutput.calculated.t.toFixed(2)} K
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UNIT CONVERTER WORKSPACE */}
          {activeTab === 'converter' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-5">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">SI / Empirical Dimensional Unit Converter</h3>
                <p className="text-xs text-slate-400">Quick scaling translations of engineering parameters to baseline SI metric weights.</p>
              </div>

              {/* Metric Groups Toggles */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(UNIT_GROUPS).map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      convCategory === cat
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Inputs converter setup */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-850">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Input Value</label>
                  <input
                    type="number"
                    value={convVal}
                    onChange={(e) => updateFromUnitValue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Convert From</label>
                  <select
                    value={convFrom}
                    onChange={(e) => { setConvFrom(e.target.value); handleUnitConversion(convVal, e.target.value, convTo, convCategory); }}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {Object.keys(UNIT_GROUPS[convCategory].rates).map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Convert To</label>
                  <select
                    value={convTo}
                    onChange={(e) => { setConvTo(e.target.value); handleUnitConversion(convVal, convFrom, e.target.value, convCategory); }}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {Object.keys(UNIT_GROUPS[convCategory].rates).map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conversion Result Output Display */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Equivalent Engineering Value</span>
                  <p className="text-xl font-bold text-white mt-1 font-mono">
                    {convResult || '0.00'} <span className="text-emerald-400">{convTo}</span>
                  </p>
                </div>
                <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded px-3 py-1 font-mono">
                  {convVal} {convFrom}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* RIGHT COMPARTMENT: CONSTANTS PANEL & METADATA */}
        <section className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Physical Constants Reference Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex justify-between items-center">
                <span>Quantum & SI Constants</span>
                <span className="text-[10px] font-normal text-emerald-400">Click to inject</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-1">Tap any baseline physical constant to paste its raw scientific float value directly into the calculator input stream.</p>
            </div>

            <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 pr-1">
              {PHYSICAL_CONSTANTS.map((constObj) => (
                <button
                  key={constObj.symbol}
                  onClick={() => injectConstant(constObj.value)}
                  className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-850 hover:bg-slate-900 hover:border-slate-800 text-left transition-all flex flex-col gap-1 group relative overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      {constObj.name} ({constObj.symbol})
                    </span>
                    <span className="text-[11px] font-bold font-mono text-sky-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {constObj.value.toExponential(4)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span className="truncate max-w-[180px]">{constObj.desc}</span>
                    <span className="font-semibold text-slate-400 font-mono">{constObj.unit}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Informational Engineering Metadata Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">SI Prefixes Reference</h3>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-slate-400">
              <div className="bg-slate-950/40 p-1.5 rounded border border-slate-850 flex justify-between">
                <span>Tera (T)</span>
                <span className="text-emerald-400 font-bold">10¹²</span>
              </div>
              <div className="bg-slate-950/40 p-1.5 rounded border border-slate-850 flex justify-between">
                <span>milli (m)</span>
                <span className="text-emerald-400 font-bold">10⁻³</span>
              </div>
              <div className="bg-slate-950/40 p-1.5 rounded border border-slate-850 flex justify-between">
                <span>Giga (G)</span>
                <span className="text-emerald-400 font-bold">10⁹</span>
              </div>
              <div className="bg-slate-950/40 p-1.5 rounded border border-slate-850 flex justify-between">
                <span>micro (μ)</span>
                <span className="text-emerald-400 font-bold">10⁻⁶</span>
              </div>
              <div className="bg-slate-950/40 p-1.5 rounded border border-slate-850 flex justify-between">
                <span>Mega (M)</span>
                <span className="text-emerald-400 font-bold">10⁶</span>
              </div>
              <div className="bg-slate-950/40 p-1.5 rounded border border-slate-850 flex justify-between">
                <span>nano (n)</span>
                <span className="text-emerald-400 font-bold">10⁻⁹</span>
              </div>
              <div className="bg-slate-950/40 p-1.5 rounded border border-slate-850 flex justify-between">
                <span>kilo (k)</span>
                <span className="text-emerald-400 font-bold">10³</span>
              </div>
              <div className="bg-slate-950/40 p-1.5 rounded border border-slate-850 flex justify-between">
                <span>pico (p)</span>
                <span className="text-emerald-400 font-bold">10⁻¹²</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer copyright stamp */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-3 text-center text-[10px] text-slate-500 shrink-0 font-mono">
        SI Unit Metrics & Dimensionless Solvers Built using React Client Component Architecture • Under 450 Lines
      </footer>
    </div>
  );
}