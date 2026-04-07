import React from 'react';

export default function SpecsTab() {
  const specs_700 = [
    { label: "Design Basis", value: "Indian Pressurized Heavy Water Reactor" },
    { label: "Net Electrical Power Output", value: "700 MWe" },
    { label: "Gross Thermal Power", value: "2166 MWt" },
    { label: "Moderator", value: "Heavy Water (D2O)" },
    { label: "Coolant", value: "Heavy Water (D2O)" },
    { label: "Fuel Channels", value: "392 Horizontal" },
    { label: "Fuel Type", value: "Natural Uranium Oxide (Natural UO2)" },
    { label: "Refuelling", value: "On-power (Remote)" },
    { label: "Secondary Stream Flow", value: "1150 kg/s" },
    { label: "Design Life", value: "60 Years" },
    { label: "Localization Stage", value: "> 90% (Fleet mode)" },
  ];

  const comparison = [
    { param: "Parameter", v220: "220 MWe", v540: "540 MWe", v700: "700 MWe" },
    { param: "Fuel Channels", v220: "306", v540: "392", v700: "392" },
    { param: "Steam Generators", v220: "2 / 4 (varies)", v540: "4", v700: "4" },
    { param: "Coolant Outlet Temp", v220: "293°C", v540: "310°C", v700: "310°C" },
    { param: "Primary Pressure", v220: "87 bar", v540: "100 bar", v700: "100 bar" },
    { param: "Active Length", v220: "5.1 m", v540: "6.0 m", v700: "6.0 m" }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#0d1117] p-10 h-full scrollbar-hidden">
      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#e6edf3]">IPHWR-700 Technical Specs</h2>
            <p className="text-[#8b949e] text-sm mt-1 uppercase tracking-widest mono text-[10px]">NPCIL Standard Design Basis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 border-t border-[#21262d] pt-4">
            {specs_700.map((s, i) => (
              <div key={i} className="flex justify-between items-baseline border-b border-[#21262d] py-3">
                <span className="text-[#8b949e] text-xs mono uppercase tracking-tight">{s.label}</span>
                <span className="text-[#e6edf3] text-sm font-semibold text-right">{s.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#e6edf3]">Comparison: Evolutionary Path</h2>
            <p className="text-[#8b949e] text-sm mt-1 uppercase tracking-widest mono text-[10px]">From CANDU derivatives to Indigenous 700 MWe Standard</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#21262d]">
              <thead>
                <tr className="bg-[#161b22] border-b border-[#21262d]">
                  <th className="p-4 mono text-[10px] text-[#8b949e] uppercase">Parameter</th>
                  <th className="p-4 mono text-[10px] text-[#58a6ff] uppercase">220 MWe Variant</th>
                  <th className="p-4 mono text-[10px] text-[#58a6ff] uppercase">540 MWe Variant</th>
                  <th className="p-4 mono text-[10px] text-[#ebb54a] uppercase underline">700 MWe Variant</th>
                </tr>
              </thead>
              <tbody>
                {comparison.slice(1).map((row, i) => (
                  <tr key={i} className="border-b border-[#21262d] hover:bg-[#161b2222] transition-all">
                    <td className="p-4 text-xs font-semibold text-[#8b949e]">{row.param}</td>
                    <td className="p-4 text-sm text-[#e6edf3]">{row.v220}</td>
                    <td className="p-4 text-sm text-[#e6edf3]">{row.v540}</td>
                    <td className="p-4 text-sm text-white font-bold bg-[#ebb54a05]">{row.v700}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
