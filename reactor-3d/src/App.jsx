import React, { useState, useMemo, useEffect } from 'react';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import ReactorScene from './components/ReactorScene';
import ValueChainTab from './components/ValueChainTab';
import InvestorViewTab from './components/InvestorViewTab';
import SpecsTab from './components/SpecsTab';
import { SUPPLY_DATA } from './data/supplyData';

export default function App() {
  const [activeTab, setActiveTab] = useState('explorer');
  const [selectedId, setSelectedId] = useState('core');
  const [hoveredId, setHoveredId] = useState(null);
  const [view, setView] = useState('full');
  const [flowAnimation, setFlowAnimation] = useState(false);
  const [explodeView, setExplodeView] = useState(false);
  const [activeLayers, setActiveLayers] = useState(['core', 'primary', 'steam', 'turbine', 'fuel_ic']);

  const toggleLayer = (id) => {
    setActiveLayers(layers => 
      layers.includes(id) ? layers.filter(l => l !== id) : [...layers, id]
    );
  };

  const handleComponentSelect = (id) => {
    setSelectedId(id);
    if (activeTab !== 'explorer') setActiveTab('explorer');
  };

  // Keyboard shortcuts (1-5)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keys = ['1', '2', '3', '4', '5'];
      const ids = ['core', 'primary', 'steam', 'turbine', 'fuel_ic'];
      if (keys.includes(e.key)) {
        const id = ids[keys.indexOf(e.key)];
        if (id) handleComponentSelect(id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayId = hoveredId || selectedId;
  const displayData = SUPPLY_DATA[displayId];

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0d1117] text-[#e2e8f0] font-sans">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative min-w-0 bg-[#0d1117]">
          {activeTab === 'explorer' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 relative">
                <ReactorScene 
                  selectedId={selectedId} 
                  onSelect={handleComponentSelect}
                  onHover={setHoveredId}
                  view={view}
                  flowAnimation={flowAnimation}
                  explodeView={explodeView}
                  activeLayers={activeLayers}
                />
                
                {/* HUD Overlay (Bottom-left) */}
                <div className="absolute bottom-4 left-4 p-4 pointer-events-none z-10 glass-panel rounded-lg border-[#21262d]">
                  <div className="mono text-[10px] text-[#58a6ff] uppercase mb-1 font-bold">Engineering Readout</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between w-48 border-b border-[#21262d] py-1">
                      <span className="mono text-[10px] text-[#8b949e]">COMPONENT</span>
                      <span className="mono text-[10px] text-[#e6edf3] font-bold">{(displayData?.label || "").toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between w-48 border-b border-[#21262d] py-1">
                      <span className="mono text-[10px] text-[#8b949e]">TEMPERATURE</span>
                      <span className="mono text-[10px] text-[#ebb54a]">310°C / NOMINAL</span>
                    </div>
                    <div className="flex justify-between w-48 border-b border-[#21262d] py-1">
                      <span className="mono text-[10px] text-[#8b949e]">PRIMARY FLOW</span>
                      <span className="mono text-[10px] text-[#58a6ff]">102.4 bar</span>
                    </div>
                    <div className="flex justify-between w-48 py-1">
                      <span className="mono text-[10px] text-[#8b949e]">SYSTEM STATUS</span>
                      <span className="mono text-[10px] text-[#2ea043] uppercase">Operational</span>
                    </div>
                  </div>
                </div>
              </div>
              <Toolbar 
                view={view} setView={setView}
                flowAnimation={flowAnimation} setFlowAnimation={setFlowAnimation}
                explodeView={explodeView} setExplodeView={setExplodeView}
                activeLayers={activeLayers}
                toggleLayer={toggleLayer}
              />
            </div>
          )}

          {activeTab === 'value_chain' && <ValueChainTab />}
          {activeTab === 'investor_view' && <InvestorViewTab />}
          {activeTab === 'specs' && <SpecsTab />}
        </div>

        {/* Right Sidebar (only for Explorer) */}
        {activeTab === 'explorer' && (
          <Sidebar selectedId={selectedId} />
        )}
      </main>
    </div>
  );
}
