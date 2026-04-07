import React from 'react';

export default function Toolbar({ 
  flowAnimation, setFlowAnimation, 
  activeLayers, toggleLayer
}) {
  const layers = [
    { label: 'Core', id: 'core' },
    { label: 'PHT', id: 'primary' },
    { label: 'SG', id: 'steam' },
    { label: 'Turbine', id: 'turbine' },
    { label: 'I&C', id: 'fuel_ic' },
  ];

  return (
    <div className="h-10 border-t border-[#21262d] bg-[#161b22] px-4 flex items-center justify-between">
      <div className="flex gap-2">
        <button
          onClick={() => setFlowAnimation(!flowAnimation)}
          className={`px-3 py-1 text-[11px] mono border rounded transition-all ${
            flowAnimation
              ? 'bg-[#58a6ff33] border-[#58a6ff] text-[#58a6ff]'
              : 'border-[#21262d] text-[#8b949e] hover:border-[#30363d]'
          }`}
        >
          {flowAnimation ? 'Flow Animation: ON' : 'Flow Animation: OFF'}
        </button>
        <div className="w-[1px] h-4 bg-[#21262d] mx-2" />
        <span className="mono text-[10px] text-[#8b949e] uppercase">System Schematic Mode</span>
      </div>

      <div className="flex gap-2">
        {layers.map(l => (
          <button
            key={l.id}
            onClick={() => toggleLayer(l.id)}
            className={`px-2 py-0.5 text-[10px] mono border rounded-full transition-all ${
              activeLayers.includes(l.id)
                ? 'bg-[#58a6ff22] border-[#58a6ff] text-[#58a6ff]'
                : 'border-[#21262d] text-[#8b949e] opacity-50'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
