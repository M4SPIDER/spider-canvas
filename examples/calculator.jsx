import React, { useState } from 'react';
import { Calculator, Delete, RotateCcw, Equal } from 'lucide-react';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumber = (num) => {
    if (resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setResetDisplay(true);
  };

  const handleEquals = () => {
    if (!operation || previousValue === null) return;
    
    const current = parseFloat(display);
    let result;
    
    switch (operation) {
      case '+': result = previousValue + current; break;
      case '-': result = previousValue - current; break;
      case '*': result = previousValue * current; break;
      case '/': result = current !== 0 ? previousValue / current : 'Error'; break;
      default: return;
    }
    
    setDisplay(String(result));
    setOperation(null);
    setPreviousValue(null);
    setResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleDelete = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const buttons = [
    { label: 'C', type: 'function', action: handleClear },
    { label: '%', type: 'function', action: handlePercent },
    { label: '⌫', type: 'function', action: handleDelete },
    { label: '÷', type: 'operator', action: () => handleOperation('/') },
    { label: '7', type: 'number', action: () => handleNumber('7') },
    { label: '8', type: 'number', action: () => handleNumber('8') },
    { label: '9', type: 'number', action: () => handleNumber('9') },
    { label: '×', type: 'operator', action: () => handleOperation('*') },
    { label: '4', type: 'number', action: () => handleNumber('4') },
    { label: '5', type: 'number', action: () => handleNumber('5') },
    { label: '6', type: 'number', action: () => handleNumber('6') },
    { label: '−', type: 'operator', action: () => handleOperation('-') },
    { label: '1', type: 'number', action: () => handleNumber('1') },
    { label: '2', type: 'number', action: () => handleNumber('2') },
    { label: '3', type: 'number', action: () => handleNumber('3') },
    { label: '+', type: 'operator', action: () => handleOperation('+') },
    { label: '0', type: 'number', action: () => handleNumber('0'), wide: true },
    { label: '.', type: 'number', action: handleDecimal },
    { label: '=', type: 'equals', action: handleEquals },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/30">
            <Calculator className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Spider Calculator</h1>
            <p className="text-xs text-purple-300/60">Mobile Optimized</p>
          </div>
        </div>

        {/* Calculator Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl">
          
          {/* Display */}
          <div className="bg-slate-900/50 rounded-2xl p-6 mb-6 border border-slate-700/30">
            <div className="text-right">
              <div className="text-sm text-slate-400 h-6 font-mono">
                {previousValue !== null && `${previousValue} ${operation}`}
              </div>
              <div className="text-4xl font-bold text-white font-mono truncate">
                {display}
              </div>
            </div>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                className={`
                  h-16 rounded-2xl font-semibold text-lg transition-all duration-150
                  active:scale-95 active:shadow-inner
                  ${btn.wide ? 'col-span-2' : ''}
                  ${btn.type === 'number' ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white border border-slate-600/30' : ''}
                  ${btn.type === 'operator' ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30' : ''}
                  ${btn.type === 'equals' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg shadow-purple-500/25' : ''}
                  ${btn.type === 'function' ? 'bg-slate-600/30 hover:bg-slate-500/30 text-slate-300 border border-slate-600/30' : ''}
                `}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-purple-300/40 mt-6">
          Made with 🕷️ Spider Canvas
        </p>
      </div>
    </div>
  );
}
