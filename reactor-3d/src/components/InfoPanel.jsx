import { componentData } from '../data/reactorData';

export default function InfoPanel({ selectedId, simulationRunning, flowSpeed }) {
  const entry = componentData[selectedId] ?? componentData.core;

  return (
    <aside className="pointer-events-none absolute right-4 top-4 z-20 w-[23rem] max-w-[calc(100%-2rem)] rounded-xl border border-slate-700/80 bg-slate-950/75 p-4 shadow-[0_0_30px_rgba(0,0,0,0.4)] backdrop-blur">
      <p className="brand-font text-[11px] uppercase tracking-[0.2em] text-amber-300/90">System Information</p>
      <h2 className="brand-font mt-1 text-2xl font-semibold text-amber-200">{entry.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">{entry.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 rounded border border-slate-700/60 bg-slate-900/65 p-2 text-xs uppercase tracking-wide text-slate-300">
        <div>
          <span className="text-slate-400">Simulation</span>
          <p className={`mt-1 font-semibold ${simulationRunning ? 'text-emerald-300' : 'text-slate-300'}`}>
            {simulationRunning ? 'Running' : 'Paused'}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Flow Speed</span>
          <p className="mt-1 font-semibold text-sky-300">{flowSpeed.toFixed(1)}x</p>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-700/60 pt-3">
        <p className="brand-font text-xs uppercase tracking-[0.16em] text-slate-300">Supply Chain Companies</p>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-100">
          {entry.companies.map((company) => (
            <li key={company} className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>{company}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        Click plant systems or use the walkthrough buttons to follow energy transfer from core heat to electrical output.
      </p>
    </aside>
  );
}
