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
    <div className="w-full h-full flex items-center justify-center bg-[#0d1117] p-8 pb-32 overflow-hidden select-none">
      <style>{FLOW_ANIMATION_CSS}</style>
      <svg 
        viewBox="0 0 1000 650" 
        className="w-full h-full max-w-[1200px]"
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
        <path d="M50,550 L350,550 L350,200 L50,200 Z" fill="#161b22" stroke="#21262d" strokeWidth="2" /> {/* Containment */}
        <path d="M350,550 L750,550 L750,350 L350,350 Z" fill="#161b22" stroke="#21262d" strokeWidth="2" /> {/* Turbine Hall */}
        
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
             <path d="M250,400 Q300,400 300,450 T380,450" />
             <path d="M380,480 Q300,480 300,520 T200,520 L200,450" />
          </g>
          
          <g stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4">
             <path d="M250,400 Q300,400 300,450 T380,450" />
             <path d="M380,480 Q300,480 300,520 T200,520 L200,450" />
          </g>
          
          {flowAnimation && (
             <g stroke="currentColor" strokeWidth="2" fill="none" className="flow-path">
               <path d="M250,400 Q300,400 300,450 T380,450" />
               <path d="M380,480 Q300,480 300,520 T200,520 L200,450" />
             </g>
          )}
          <text x="320" y="505" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">PRIMARY PHT LOOP</text>
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
             <path d="M420,420 Q420,380 500,380 L600,380" />
             <path d="M680,450 L680,500 Q680,520 600,520 L450,520 Q420,520 420,480" />
          </g>
          <g stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4">
             <path d="M420,420 Q420,380 500,380 L600,380" />
             <path d="M680,450 L680,500 Q680,520 600,520 L450,520 Q420,520 420,480" />
          </g>
          {flowAnimation && (
             <g stroke="currentColor" strokeWidth="2" fill="none" className="flow-path">
               <path d="M420,420 Q420,380 500,380 L600,380" />
               <path d="M680,450 L680,500 Q680,520 600,520 L450,520 Q420,520 420,480" />
             </g>
          )}
          <text x="550" y="540" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">SECONDARY STEAM LOOP</text>
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
            d="M100,450 A100,100 0 1,1 300,450 L300,500 Q300,530 200,530 T100,500 Z" 
            fill={selectedId === 'core' ? 'url(#grad-core)' : '#0d1117'} 
            stroke="currentColor" 
            strokeWidth="1.5" 
          />
          <text x="200" y="460" textAnchor="middle" fill="currentColor" className="mono text-[10px] font-bold tracking-widest">REACTOR CORE</text>
        </g>

        {/* Steam Generator */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'steam' ? 'active' : ''}`}
          onClick={() => handleInteraction('steam', 'click')}
          onMouseEnter={() => handleInteraction('steam', 'enter')}
          onMouseLeave={() => handleInteraction('steam', 'leave')}
          style={{ color: '#2980b9' }}
        >
          <rect className="component-shape" x="380" y="400" width="80" height="120" rx="10" fill={selectedId === 'steam' ? '#2980b911' : '#0d1117'} stroke="currentColor" strokeWidth="1.5" />
          <text x="420" y="465" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">STEAM GEN</text>
        </g>

        {/* Turbine & Generator */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'turbine' ? 'active' : ''}`}
          onClick={() => handleInteraction('turbine', 'click')}
          onMouseEnter={() => handleInteraction('turbine', 'enter')}
          onMouseLeave={() => handleInteraction('turbine', 'leave')}
          style={{ color: '#27ae60' }}
        >
          <path className="component-shape" d="M520,370 L650,370 L650,450 L520,450 Z" fill={selectedId === 'turbine' ? '#27ae6011' : '#0d1117'} stroke="currentColor" strokeWidth="1.5" />
          <rect className="component-shape" x="660" y="380" width="60" height="60" fill={selectedId === 'turbine' ? '#27ae6011' : '#0d1117'} stroke="currentColor" strokeWidth="1.5" />
          <text x="585" y="415" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">STEAM TURBINE</text>
          <text x="690" y="415" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">GEN</text>
        </g>

        {/* Cooling Tower */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'cooling' ? 'active' : ''}`}
          onClick={() => handleInteraction('cooling', 'click')}
          style={{ color: '#8b949e' }}
        >
          <path className="component-shape" d="M820,550 L850,350 Q900,340 950,350 L980,550 Z" fill="#161b22" stroke="currentColor" strokeWidth="1.5" />
          <text x="900" y="460" textAnchor="middle" fill="currentColor" className="mono text-[8px] font-bold">COOLING TOWER</text>
        </g>

        {/* Control Rods (Top of core) */}
        <g 
          className={`component-group cursor-pointer transition-all ${selectedId === 'fuel_ic' ? 'active' : ''}`}
          onClick={() => handleInteraction('fuel_ic', 'click')}
          onMouseEnter={() => handleInteraction('fuel_ic', 'enter')}
          onMouseLeave={() => handleInteraction('fuel_ic', 'leave')}
          style={{ color: '#8e44ad' }}
        >
          <path d="M150,340 L150,400 M200,340 L200,400 M250,340 L250,400" stroke="currentColor" strokeWidth="3" />
          <rect x="140" y="320" width="120" height="20" fill="#161b22" stroke="currentColor" strokeWidth="1.5" />
          <text x="200" y="333" textAnchor="middle" fill="currentColor" className="mono text-[7px] font-bold">CONTROL DRIVES</text>
        </g>

        {/* Labels Overlay */}
        <g className="pointer-events-none">
          <text x="50" y="190" className="mono text-[12px] fill-[#8b949e]">STRUCTURE: CONTAINMENT DOME</text>
          <text x="350" y="340" className="mono text-[12px] fill-[#8b949e]">SECTION: TURBINE HALL</text>
        </g>
      </svg>
    </div>
  );
}
