import React from 'react';
import { SUPPLY_DATA } from '../data/supplyData';

export default function InvestorViewTab() {
  // Deduplicate companies and aggregate their presence
  const companyMap = new Map();
  Object.values(SUPPLY_DATA).forEach(layer => {
    layer.suppliers.forEach(s => {
      if (!companyMap.has(s.name)) {
        companyMap.set(s.name, { 
          ...s, 
          moat: layer.moat, 
          crit: layer.crit, 
          layers: [layer.label] 
        });
      } else {
        const existing = companyMap.get(s.name);
        // Keep the highest criticality and moat
        if (layer.crit > existing.crit) existing.crit = layer.crit;
        if (layer.moat > existing.moat) existing.moat = layer.moat;
        if (!existing.layers.includes(layer.label)) existing.layers.push(layer.label);
      }
    });
  });

  const companies = Array.from(companyMap.values());

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] p-8 h-full overflow-hidden">
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
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#58a6ff]" />
            <span className="mono text-[10px] text-[#8b949e] uppercase">Core Supply</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative border-l border-b border-[#21262d] mb-8 mr-8">
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
        <div className="absolute -left-12 top-1/2 -rotate-90 mono text-[10px] text-[#8b949e] uppercase tracking-widest">Criticality (Low → High)</div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 mono text-[10px] text-[#8b949e] uppercase tracking-widest">Strategic Moat (0 → 100)</div>

        {/* Company Dots */}
        <div className="absolute inset-8">
          {companies.map((c, i) => {
            // Jitter logic: use index to create a slight offset if multiple companies are at same point
            const jitterX = (i % 3 - 1) * 2; // -2, 0, 2
            const jitterY = (Math.floor(i / 3) % 3 - 1) * 2; // -2, 0, 2
            
            const x = c.moat + jitterX; 
            const y = (c.crit / 5) * 100 + jitterY; 
            
            const isHighAlpha = c.moat > 70 && c.crit >= 4;

            return (
              <div 
                key={c.name}
                className="absolute w-3 h-3 rounded-full cursor-pointer hover:scale-150 transition-all group z-10"
                style={{ 
                  left: `${x}%`, 
                  bottom: `${y}%`,
                  backgroundColor: isHighAlpha ? '#ebb54a' : '#58a6ff',
                  boxShadow: isHighAlpha ? '0 0 10px #ebb54a66' : '0 0 10px #58a6ff33'
                }}
              >
                {/* Visual Label */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 mono text-[7px] text-[#8b949e] group-hover:text-[#e6edf3] whitespace-nowrap hidden md:block">
                  {c.name}
                </span>

                {/* Tooltip */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#161b22] border border-[#21262d] p-3 rounded shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  <div className="text-[12px] font-bold text-[#e6edf3] mb-1">{c.name}</div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {c.layers.map(l => (
                      <span key={l} className="text-[8px] bg-[#21262d] text-[#8b949e] px-1 rounded mono uppercase">{l}</span>
                    ))}
                  </div>
                  <div className="text-[10px] text-[#8b949e] max-w-[200px] whitespace-normal leading-tight italic">"{c.role}"</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
