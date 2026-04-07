import React from 'react';

export default function TopNav({ activeTab, setActiveTab }) {
  const tabs = [
    { label: "3D Explorer", id: "explorer" },
    { label: "Value Chain", id: "value_chain" },
    { label: "Investor View", id: "investor_view" },
    { label: "Specs", id: "specs" },
  ];

  return (
    <header className="h-11 border-b border-[#21262d] bg-[#161b22] px-6 flex items-center justify-between z-50">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-[#58a6ff] rounded-sm flex items-center justify-center">
          <span className="text-[10px] text-white mono font-bold">R</span>
        </div>
        <h1 className="text-sm font-bold text-[#e6edf3] tracking-tight">
          IPHWR-700 <span className="text-[#8b949e] font-normal mx-1">·</span> <span className="text-[#58a6ff]">India Nuclear Supply Chain</span>
        </h1>
      </div>

      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`h-11 flex items-center relative transition-colors ${
              activeTab === tab.id ? 'text-[#e6edf3]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <span className="mono text-xs uppercase tracking-widest">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#58a6ff]" />
            )}
          </button>
        ))}
      </nav>
      
      <div className="flex gap-3">
        {/* Placeholder for any right-side nav info */}
      </div>
    </header>
  );
}
