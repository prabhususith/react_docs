import React, { useState, useEffect } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

function TimerDemo() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  return (
    <div className="bg-slate-900 rounded-lg p-4 space-y-3">
      <p className="text-xs text-slate-400 font-mono">useEffect cleanup → clearInterval</p>
      <div className="text-3xl font-mono text-indigo-400 font-bold">{String(seconds).padStart(3, '0')}s</div>
      <div className="flex gap-2">
        <button onClick={() => setRunning(v => !v)} className="btn-primary text-sm">{running ? '⏸ Pause' : '▶ Start'}</button>
        <button onClick={() => { setRunning(false); setSeconds(0); }} className="btn-secondary text-sm">⏹ Reset</button>
      </div>
    </div>
  );
}

function WindowSizeDemo() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const h = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return (
    <div className="bg-slate-900 rounded-lg p-4">
      <p className="text-xs text-slate-400 font-mono mb-2">Resize listener (cleanup removes it)</p>
      <p className="text-sm text-slate-200">Window: <span className="text-cyan-400 font-mono">{size.w} × {size.h}</span></p>
    </div>
  );
}

function FetchOnMountDemo() {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => { if (!cancelled) setData('Data loaded — ngOnInit equivalent'); }, 800);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);
  return (
    <div className="bg-slate-900 rounded-lg p-4">
      <p className="text-xs text-slate-400 font-mono mb-2">useEffect(fn, []) → ngOnInit</p>
      {data ? <p className="text-emerald-400 text-sm">✅ {data}</p> : <p className="text-slate-500 text-sm animate-pulse">⏳ Fetching...</p>}
    </div>
  );
}

export function LifecycleVsUseEffect() {
  return (
    <div className="chapter-container">
      <h1 className="section-header">Lifecycle vs useEffect</h1>
      <p className="section-subheader">Angular has explicit lifecycle hooks (ngOnInit, ngOnChanges, ngOnDestroy). React replaces all of these with a single useEffect hook.</p>

      <AngularVsReactCard
        concept="ngOnInit / ngOnDestroy vs useEffect"
        angularCode={`@Component({ template: '...' })
export class TimerComponent implements OnInit, OnDestroy {
  seconds = 0;
  private id!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.id = setInterval(() => this.seconds++, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.id); // cleanup
  }

  // ngOnChanges: runs when @Input() changes
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) this.loadUser(changes['userId'].currentValue);
  }
}`}
        reactCode={`function TimerComponent() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // ngOnDestroy
  }, []); // [] = run once on mount (ngOnInit)

  // Dependency array controls behavior:
  // []       → ngOnInit + ngOnDestroy
  // [userId] → ngOnChanges for userId
  // omitted  → every render
  useEffect(() => {
    loadUser(userId);
  }, [userId]);
}`}
        rationale="Angular's lifecycle hooks are explicit interface methods. React collapses all into useEffect: empty [] = ngOnInit+ngOnDestroy, [dep] = ngOnChanges, no array = every render. The cleanup function IS ngOnDestroy."
        defaultExpanded={true}
      />

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <h3 className="text-sm font-semibold text-white mb-3">On Mount ([])</h3>
          <FetchOnMountDemo />
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Cleanup (clearInterval)</h3>
          <TimerDemo />
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Event Listener Cleanup</h3>
          <WindowSizeDemo />
        </div>
      </div>
    </div>
  );
}
