import React from 'react';
import { SUPPLY_DATA } from '../data/supplyData';

export default function ValueChainTab() {
  const layers = ['core', 'primary', 'steam', 'turbine', 'fuel_ic'];

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-[#0d1117] p-8">
      <div className="flex gap-6 h-full min-w-max">
        {layers.map((layerId) => {
          const data = SUPPLY_DATA[layerId];
          return (
            <div key={layerId} className="w-[280px] flex flex-col gap-4">
              <div className="p-4 rounded-lg border border-[#21262d] bg-[#161b22] relative overflow-hidden group hover:border-[#30363d] transition-all">
                <div 
                  className="absolute top-0 left-0 w-full h-1" 
                  style={{ backgroundColor: data.color }}
                />
                <h3 className="mono text-xs uppercase text-[#8b949e] mb-2">{data.label}</h3>
                <div className="text-xl font-bold mb-4">{data.moat}% MOAT</div>
                
                <div className="space-y-3">
                  {data.suppliers.map((s, i) => (
                    <div key={i} className="p-3 bg-[#0d1117] border border-[#21262d] rounded group-hover:border-[#30363d] transition-all">
                      <div className="text-sm font-bold truncate mb-1">{s.name}</div>
                      <div className="text-[10px] text-[#8b949e] mb-2 leading-snug line-clamp-2">{s.role}</div>
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
              
              <div className="flex-1 border-r border-[#21262d] border-dashed relative">
                {/* Visual connectors could go here */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
