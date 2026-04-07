import React from 'react';
import { SUPPLY_DATA } from '../data/supplyData';

export default function InvestorViewTab() {
  const companies = Object.values(SUPPLY_DATA).flatMap(d => 
    d.suppliers.map(s => ({ ...s, moat: d.moat, crit: d.crit, layerLabel: d.label }))
  );

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] p-8 h-full">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#e6edf3]">Strategic Quadrant</h2>
          <p className="text-[#8b949e] text-sm">Criticality vs Entry Barrier (Moat) across the India nuclear supply chain.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ebb54a]" />
            <span className="mono text-[10px] text-[#8b949e] uppercase">Highest Alpha</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative border-l border-b border-[#21262d]">
        {/* Quadrant Labels */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 border-r border-b border-[#21262d] border-dashed flex items-center justify-center pointer-events-none">
          <span className="mono text-[10px] text-[#8b949e] opacity-20 uppercase tracking-widest">Niche / Specialized</span>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 border-b border-[#21262d] border-dashed flex items-center justify-center bg-[#ebb54a05] pointer-events-none">
          <div className="flex flex-col items-center">
            <span className="mono text-[10px] text-[#ebb54a] uppercase tracking-widest font-bold">Highest Alpha</span>
            <span className="mono text-[8px] text-[#ebb54a] opacity-60 uppercase">Strategic Moat</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 border-r border-[#21262d] border-dashed flex items-center justify-center pointer-events-none">
          <span className="mono text-[10px] text-[#8b949e] opacity-20 uppercase tracking-widest">Commoditized</span>
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-center justify-center pointer-events-none">
          <span className="mono text-[10px] text-[#8b949e] opacity-20 uppercase tracking-widest">Systemic Value</span>
        </div>

        {/* Axes Labels */}
        <div className="absolute -left-12 top-1/2 -rotate-90 mono text-[10px] text-[#8b949e] uppercase tracking-widest">Criticality (1-5)</div>
        <div className="absolute -bottom-8 left-1/2 mono text-[10px] text-[#8b949e] uppercase tracking-widest">Moat (0-100)</div>

        {/* Company Dots */}
        <div className="absolute inset-4">
          {companies.map((c, i) => {
            const x = c.moat; // 0-100
            const y = (c.crit / 5) * 100; // 0-100
            const isHighAlpha = c.moat > 70 && c.crit >= 4;

            return (
              <div 
                key={i}
                className="absolute w-3 h-3 rounded-full cursor-pointer hover:scale-150 transition-all group"
                style={{ 
                  left: `${x}%`, 
                  bottom: `${y}%`,
                  backgroundColor: isHighAlpha ? '#ebb54a' : '#58a6ff',
                  boxShadow: isHighAlpha ? '0 0 10px #ebb54a66' : '0 0 10px #58a6ff33'
                }}
              >
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#161b22] border border-[#21262d] p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                  <div className="text-[11px] font-bold text-[#e6edf3]">{c.name}</div>
                  <div className="text-[9px] text-[#8b949e] mono uppercase tracking-tight">{c.layerLabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
