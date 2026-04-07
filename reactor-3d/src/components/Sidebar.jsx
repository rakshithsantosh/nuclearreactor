import React from 'react';
import { SUPPLY_DATA } from '../data/supplyData';

export default function Sidebar({ selectedId }) {
  const data = SUPPLY_DATA[selectedId];

  if (!data) {
    return (
      <aside className="w-[300px] bg-[#161b22] border-l border-[#21262d] flex flex-col p-6 overflow-y-auto">
        <h2 className="mono text-sm text-[#58a6ff] mb-2 uppercase tracking-wider">Reactor Specs</h2>
        <p className="text-sm text-[#8b949e] leading-relaxed">
          Select a component in the 3D explorer to view technical specifications and supply chain details.
        </p>
        <div className="mt-8 space-y-4">
          <div className="p-4 bg-[#0d1117] border border-[#21262d] rounded">
            <div className="mono text-[10px] text-[#8b949e] mb-1">DESIGN BASIS</div>
            <div className="text-sm font-semibold">IPHWR-700</div>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#21262d] rounded">
            <div className="mono text-[10px] text-[#8b949e] mb-1">NET OUTPUT</div>
            <div className="text-sm font-semibold">700 MWe</div>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#21262d] rounded">
            <div className="mono text-[10px] text-[#8b949e] mb-1">LOCALIZATION</div>
            <div className="text-sm font-semibold">> 90% (by value)</div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[300px] bg-[#161b22] border-l border-[#21262d] flex flex-col overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <span 
            className="mono text-[10px] px-2 py-0.5 rounded border mb-2 inline-block"
            style={{ color: data.color, borderColor: `${data.color}44`, backgroundColor: `${data.color}11` }}
          >
            {selectedId.replace('_', ' ').toUpperCase()}
          </span>
          <h2 className="text-xl font-bold text-[#e6edf3] leading-tight">{data.label}</h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {data.specs.map(([val, label], i) => (
            <div key={i} className="p-3 bg-[#0d1117] border border-[#21262d] rounded">
              <div className="mono text-xs font-bold text-[#58a6ff]">{val}</div>
              <div className="text-[10px] text-[#8b949e] uppercase">{label}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="mono text-[10px] text-[#8b949e] uppercase">Criticality</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(dot => (
                <div 
                  key={dot} 
                  className={`w-2 h-2 rounded-full ${dot <= data.crit ? '' : 'bg-[#21262d]'}`}
                  style={{ backgroundColor: dot <= data.crit ? data.color : undefined }}
                />
              ))}
            </div>
          </div>
          <p className="text-[11px] text-[#8b949e] italic leading-tight">{data.critText}</p>
        </div>

        <div>
          <div className="mono text-[10px] text-[#8b949e] uppercase mb-1">Entry Barrier (Moat)</div>
          <div className="w-full h-1 bg-[#21262d] rounded-full mb-2">
            <div 
              className="h-full bg-[#ebb54a] rounded-full" 
              style={{ width: `${data.moat}%` }}
            />
          </div>
          <p className="text-[11px] text-[#8b949e] leading-tight">{data.moatText}</p>
        </div>

        <div className="space-y-3">
          <h3 className="mono text-[10px] text-[#8b949e] uppercase">Indian Suppliers</h3>
          {data.suppliers.map((s, i) => (
            <div key={i} className="p-3 bg-[#0d1117] border border-[#21262d] rounded hover:border-[#30363d] transition-colors cursor-pointer group">
              <div className="text-[13px] font-bold group-hover:text-[#58a6ff] transition-colors">{s.name}</div>
              <div className="text-[11px] text-[#8b949e] mb-2 leading-tight">{s.role}</div>
              <span 
                className="text-[9px] px-1.5 py-0.5 rounded mono border"
                style={{ color: s.tagColor, backgroundColor: s.tagBg, borderColor: `${s.tagColor}33` }}
              >
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
