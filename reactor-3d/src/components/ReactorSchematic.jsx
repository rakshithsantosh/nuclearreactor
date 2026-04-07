import React, { useMemo } from 'react';
import { SUPPLY_DATA } from '../data/supplyData';

const FLOW_ANIMATION_CSS = `
  @keyframes flowDash {
    to {
      stroke-dashoffset: -20;
    }
  }
  .flow-path {
    stroke-dasharray: 4 6;
    animation: flowDash 1s linear infinite;
  }
  .component-group:hover .component-shape {
    filter: drop-shadow(0 0 8px currentColor);
    stroke-width: 2px;
  }
  .active .component-shape {
    filter: drop-shadow(0 0 12px currentColor);
    stroke-width: 2.5px;
  }
  .tech-grid {
    background-image: radial-gradient(#21262d 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.2;
  }
`;

export default function ReactorSchematic({ selectedId, onSelect, onHover, flowAnimation }) {
  const components = useMemo(() => [
    { id: 'core', label: 'Reactor Core' },
    { id: 'primary', label: 'Primary Loop' },
    { id: 'steam', label: 'Steam Generator' },
    { id: 'turbine', label: 'Turbine & Generator' },
    { id: 'fuel_ic', label: 'Fuel & I&C Systems' },
    { id: 'cooling', label: 'Cooling Tower' }
  ], []);

  const handleInteraction = (id, type) => {
    if (type === 'click') onSelect(id);
    else if (type === 'enter') onHover(id);
    else onHover(null);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0d1117] p-12 pb-32 overflow-hidden select-none relative">
      <div className="absolute inset-0 tech-grid pointer-events-none" />
      <style>{FLOW_ANIMATION_CSS}</style>
      <svg 
        viewBox="0 0 1000 600" 
        className="w-full h-full max-w-[1300px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* --- DEFS --- */}
        <defs>
          <linearGradient id="grad-core" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c0392b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c0392b" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- BACKGROUND STRUCTURE --- */}
        <path d="M50,450 L350,450 L350,100 L50,100 Z" fill="#161b22" stroke="#21262d" strokeWidth="2" /> {/* Containment */}
        <path d="M350,450 L750,450 L750,250 L350,250 Z" fill="#161b22" stroke="#21262d" strokeWidth="2" /> {/* Turbine Hall */}
        
        {/* Primary Loop (Clickable) */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'primary' ? 'active' : ''}`}
          onClick={() => handleInteraction('primary', 'click')}
          onMouseEnter={() => handleInteraction('primary', 'enter')}
          onMouseLeave={() => handleInteraction('primary', 'leave')}
          style={{ color: '#e67e22' }}
        >
          {/* Hit area for the loop */}
          <g stroke="currentColor" strokeWidth="12" fill="none" opacity="0.1" className="component-shape">
             <path d="M250,300 Q300,300 300,350 T380,350" />
             <path d="M380,380 Q300,380 300,420 T200,420 L200,350" />
          </g>
          
          <g stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4">
             <path d="M250,300 Q300,300 300,350 T380,350" />
             <path d="M380,380 Q300,380 300,420 T200,420 L200,350" />
          </g>
          
          {flowAnimation && (
             <g stroke="currentColor" strokeWidth="2" fill="none" className="flow-path">
               <path d="M250,300 Q300,300 300,350 T380,350" />
               <path d="M380,380 Q300,380 300,420 T200,420 L200,350" />
             </g>
          )}
          <text x="320" y="405" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">PRIMARY PHT LOOP</text>
        </g>

        {/* Secondary Loop (Part of Turbine/Island) */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'turbine' ? 'active' : ''}`}
          onClick={() => handleInteraction('turbine', 'click')}
          onMouseEnter={() => handleInteraction('turbine', 'enter')}
          onMouseLeave={() => handleInteraction('turbine', 'leave')}
          style={{ color: '#58a6ff' }}
        >
          <g stroke="currentColor" strokeWidth="12" fill="none" opacity="0.1" className="component-shape">
             <path d="M420,320 Q420,280 500,280 L600,280" />
             <path d="M680,350 L680,400 Q680,420 600,420 L450,420 Q420,420 420,380" />
          </g>
          <g stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4">
             <path d="M420,320 Q420,280 500,280 L600,280" />
             <path d="M680,350 L680,400 Q680,420 600,420 L450,420 Q420,420 420,380" />
          </g>
          {flowAnimation && (
             <g stroke="currentColor" strokeWidth="2" fill="none" className="flow-path">
               <path d="M420,320 Q420,280 500,280 L600,280" />
               <path d="M680,350 L680,400 Q680,420 600,420 L450,420 Q420,420 420,380" />
             </g>
          )}
          <text x="550" y="440" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">SECONDARY STEAM LOOP</text>
        </g>

        {/* --- COMPONENTS --- */}
        
        {/* Reactor Core */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'core' ? 'active' : ''}`}
          onClick={() => handleInteraction('core', 'click')}
          onMouseEnter={() => handleInteraction('core', 'enter')}
          onMouseLeave={() => handleInteraction('core', 'leave')}
          style={{ color: '#c0392b' }}
        >
          <path 
            className="component-shape"
            d="M100,350 A100,100 0 1,1 300,350 L300,400 Q300,430 200,430 T100,400 Z" 
            fill={selectedId === 'core' ? 'url(#grad-core)' : '#0d1117'} 
            stroke="currentColor" 
            strokeWidth="1.5" 
          />
          {/* Pressure Tubes (Technical Detail) */}
          <g stroke="currentColor" strokeWidth="0.5" opacity="0.3">
            {[...Array(8)].map((_, i) => (
              <line key={i} x1={120 + i*22} y1="310" x2={120 + i*22} y2="390" />
            ))}
            {[...Array(6)].map((_, i) => (
              <line key={i} x1="110" y1={320 + i*15} x2="290" y2={320 + i*15} />
            ))}
          </g>
          <text x="200" y="360" textAnchor="middle" fill="currentColor" className="mono text-[10px] font-bold tracking-widest">REACTOR CORE</text>
        </g>

        {/* Steam Generator */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'steam' ? 'active' : ''}`}
          onClick={() => handleInteraction('steam', 'click')}
          onMouseEnter={() => handleInteraction('steam', 'enter')}
          onMouseLeave={() => handleInteraction('steam', 'leave')}
          style={{ color: '#2980b9' }}
        >
          <rect className="component-shape" x="380" y="300" width="80" height="120" rx="10" fill={selectedId === 'steam' ? '#2980b911' : '#0d1117'} stroke="currentColor" strokeWidth="1.5" />
          <text x="420" y="365" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">STEAM GEN</text>
        </g>

        {/* Turbine & Generator */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'turbine' ? 'active' : ''}`}
          onClick={() => handleInteraction('turbine', 'click')}
          onMouseEnter={() => handleInteraction('turbine', 'enter')}
          onMouseLeave={() => handleInteraction('turbine', 'leave')}
          style={{ color: '#27ae60' }}
        >
          <path className="component-shape" d="M520,270 L650,270 L650,350 L520,350 Z" fill={selectedId === 'turbine' ? '#27ae6011' : '#0d1117'} stroke="currentColor" strokeWidth="1.5" />
          <rect className="component-shape" x="660" y="280" width="60" height="60" fill={selectedId === 'turbine' ? '#27ae6011' : '#0d1117'} stroke="currentColor" strokeWidth="1.5" />
          <text x="585" y="315" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">STEAM TURBINE</text>
          <text x="690" y="315" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">GEN</text>
        </g>

        {/* Cooling Tower */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'cooling' ? 'active' : ''}`}
          onClick={() => handleInteraction('cooling', 'click')}
          onMouseEnter={() => handleInteraction('cooling', 'enter')}
          onMouseLeave={() => handleInteraction('cooling', 'leave')}
          style={{ color: '#8b949e' }}
        >
          <path className="component-shape" d="M820,450 L850,250 Q900,240 950,250 L980,450 Z" fill="#161b22" stroke="currentColor" strokeWidth="1.5" />
          <text x="900" y="360" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">COOLING TOWER</text>
        </g>

        {/* Control Rods (Top of core) */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'fuel_ic' ? 'active' : ''}`}
          onClick={() => handleInteraction('fuel_ic', 'click')}
          onMouseEnter={() => handleInteraction('fuel_ic', 'enter')}
          onMouseLeave={() => handleInteraction('fuel_ic', 'leave')}
          style={{ color: '#8e44ad' }}
        >
          <path d="M150,240 L150,300 M200,240 L200,300 M250,240 L250,300" stroke="currentColor" strokeWidth="3" />
          <rect x="140" y="220" width="120" height="20" fill="#161b22" stroke="currentColor" strokeWidth="1.5" />
          <text x="200" y="233" textAnchor="middle" fill="currentColor" className="mono text-[7px] font-bold">CONTROL DRIVES</text>
        </g>

        {/* Labels Overlay */}
        <g className="pointer-events-none">
          <text x="50" y="90" className="mono text-[12px] fill-[#8b949e]">STRUCTURE: CONTAINMENT DOME</text>
          <text x="350" y="240" className="mono text-[12px] fill-[#8b949e]">SECTION: TURBINE HALL</text>
          {/* Technical callouts */}
          <line x1="200" y1="310" x2="250" y2="280" stroke="#8b949e" strokeWidth="0.5" />
          <text x="255" y="280" className="mono text-[8px] fill-[#8b949e]">SDS DRIVES</text>
        </g>
      </svg>
    </div>
  );
}
