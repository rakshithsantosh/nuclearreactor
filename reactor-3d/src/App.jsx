import { useMemo, useState } from 'react';
import ReactorScene from './components/ReactorScene';
import InfoPanel from './components/InfoPanel';
import { cameraPresets, componentData, componentOrder, walkthroughStops } from './data/reactorData';

export default function App() {
  const [selectedId, setSelectedId] = useState('core');
  const [focusId, setFocusId] = useState('overview');
  const [exploded, setExploded] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(true);
  const [flowSpeed, setFlowSpeed] = useState(1);

  const selectedLabel = componentData[selectedId]?.navLabel ?? 'System';

  const walkthroughButtons = useMemo(() => walkthroughStops, []);

  const handleComponentSelect = (id) => {
    setSelectedId(id);
    setFocusId(id in cameraPresets ? id : 'overview');
  };

  const handleWalkthrough = (stop) => {
    setFocusId(stop.id);
    if (stop.target) {
      setSelectedId(stop.target);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--bg-main)] text-slate-100">
      <div className="flex h-full flex-col">
        <header className="z-20 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/70 bg-slate-950/80 px-4 py-3 backdrop-blur">
          <div>
            <p className="brand-font text-xs uppercase tracking-[0.24em] text-amber-400/90">Nuclear Plant Energy Flow Simulator</p>
            <h1 className="brand-font text-xl font-semibold text-slate-100">Interactive 3D Reactor System Diagram</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSimulationRunning((state) => !state)}
              className={`rounded border px-3 py-1.5 text-sm font-semibold transition ${
                simulationRunning
                  ? 'border-emerald-400/80 bg-emerald-500/15 text-emerald-200'
                  : 'border-slate-500 bg-slate-800/70 text-slate-300'
              }`}
            >
              {simulationRunning ? 'Pause Simulation' : 'Resume Simulation'}
            </button>

            <button
              type="button"
              onClick={() => setExploded((state) => !state)}
              className={`rounded border px-3 py-1.5 text-sm font-semibold transition ${
                exploded
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                  : 'border-slate-600 bg-slate-800/70 text-slate-200 hover:border-amber-300/80 hover:text-amber-200'
              }`}
            >
              {exploded ? 'Exploded View: On' : 'Exploded View: Off'}
            </button>
          </div>
        </header>

        <div className="z-20 flex items-center gap-3 border-b border-slate-800/80 bg-slate-950/65 px-4 py-2.5 backdrop-blur">
          <span className="text-xs uppercase tracking-[0.16em] text-slate-300">Flow Speed</span>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={flowSpeed}
            onChange={(event) => setFlowSpeed(Number(event.target.value))}
            className="h-1.5 w-56 cursor-pointer appearance-none rounded-lg bg-slate-700"
          />
          <span className="min-w-12 text-sm font-semibold text-amber-300">{flowSpeed.toFixed(1)}x</span>
          <span className="ml-auto text-xs uppercase tracking-[0.12em] text-slate-400">Selected: {selectedLabel}</span>
        </div>

        <main className="relative min-h-0 flex-1">
          <ReactorScene
            selectedId={selectedId}
            focusId={focusId}
            onSelect={handleComponentSelect}
            exploded={exploded}
            simulationRunning={simulationRunning}
            flowSpeed={flowSpeed}
          />
          <InfoPanel selectedId={selectedId} simulationRunning={simulationRunning} flowSpeed={flowSpeed} />
        </main>

        <footer className="z-20 space-y-2 border-t border-slate-700/70 bg-slate-950/85 px-3 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2">
            {componentOrder.map((id) => {
              const active = selectedId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleComponentSelect(id)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                    active
                      ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.34)]'
                      : 'border-slate-600 bg-slate-800/65 text-slate-300 hover:border-amber-300/70 hover:text-amber-200'
                  }`}
                >
                  {componentData[id].navLabel}
                </button>
              );
            })}
          </div>

          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2">
            {walkthroughButtons.map((stop) => {
              const active = focusId === stop.id;
              return (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => handleWalkthrough(stop)}
                  className={`rounded border px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? 'border-sky-300/80 bg-sky-400/18 text-sky-200'
                      : 'border-slate-600 bg-slate-900/70 text-slate-300 hover:border-sky-300/70 hover:text-sky-200'
                  }`}
                >
                  {stop.label}
                </button>
              );
            })}
          </div>
        </footer>
      </div>
    </div>
  );
}
