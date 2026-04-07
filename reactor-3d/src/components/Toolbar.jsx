import React from 'react';

export default function Toolbar({ 
  view, setView, 
  flowAnimation, setFlowAnimation, 
  explodeView, setExplodeView,
  activeLayers, toggleLayer
}) {
  const buttons = [
    { label: 'Full reactor', id: 'full' },
    { label: 'Cross-section', id: 'cross' },
    { label: 'Flow animation', id: 'flow', toggle: flowAnimation, set: setFlowAnimation },
    { label: 'Explode view', id: 'explode', toggle: explodeView, set: setExplodeView },
  ];

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
        {buttons.map(b => (
          <button
            key={b.id}
            onClick={() => b.set ? b.set(!b.toggle) : setView(b.id)}
            className={`px-3 py-1 text-[11px] mono border rounded transition-all ${
              (b.set ? b.toggle : view === b.id)
                ? 'bg-[#58a6ff33] border-[#58a6ff] text-[#58a6ff]'
                : 'border-[#21262d] text-[#8b949e] hover:border-[#30363d]'
            }`}
          >
            {b.label}
          </button>
        ))}
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
