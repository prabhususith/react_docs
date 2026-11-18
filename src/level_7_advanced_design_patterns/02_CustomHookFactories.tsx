import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = useCallback(() => setCount(c => c + step), [step]);
  const decrement = useCallback(() => setCount(c => c - step), [step]);
  const reset = useCallback(() => setCount(initial), [initial]);
  return { count, increment, decrement, reset };
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => { ref.current = value; });
  return ref.current;
}

function useToggle(init = false): [boolean, () => void] {
  const [v, setV] = useState(init);
  const toggle = useCallback(() => setV(x => !x), []);
  return [v, toggle];
}

export function CustomHookFactories() {
  const c1 = useCounter(0, 1);
  const c5 = useCounter(0, 5);
  const prev = usePrevious(c1.count);
  const [dark, toggleDark] = useToggle(true);
  const [exp, toggleExp] = useToggle(false);

  return (
    <div className="chapter-container">
      <h1 className="section-header">Custom Hook Factories</h1>
      <p className="section-subheader">Angular uses Custom Directives for reusable DOM behavior. React uses Custom Hooks — composable functions that encapsulate stateful logic, usable anywhere.</p>

      <AngularVsReactCard
        concept="Custom Directive vs Custom Hook"
        angularCode={`@Directive({ selector: '[appCounter]', standalone: true })
export class CounterDirective {
  @Input() step = 1;
  @Output() countChange = new EventEmitter<number>();
  count = signal(0);
  increment() { this.count.update(c => c + this.step); this.countChange.emit(this.count()); }
}

// For logic without DOM — @Injectable service:
@Injectable({ providedIn: 'root' })
export class CounterService {
  private count = signal(0);
  readonly count$ = this.count.asReadonly();
  increment() { this.count.update(c => c + 1); }
}`}
        reactCode={`// Custom Hook — pure function, composable
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = useCallback(() => setCount(c => c + step), [step]);
  const decrement = useCallback(() => setCount(c => c - step), [step]);
  const reset = useCallback(() => setCount(initial), [initial]);
  return { count, increment, decrement, reset };
}

// Compose hooks — impossible with Angular directives!
function useCounterWithHistory(initial = 0) {
  const counter = useCounter(initial);
  const previous = usePrevious(counter.count); // ← hook composition
  return { ...counter, previous };
}`}
        rationale="Angular directives add behavior to DOM host elements. Custom Hooks are plain JS functions usable anywhere — no DOM needed. Hooks compose naturally (hook calling hook), share logic without inheritance/mixins, and test without DOM setup. Replaces Angular Directives (DOM behavior) + Injectable Services (logic) with one pattern."
        defaultExpanded={true}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-white">useCounter (step: 1)</h3>
          <div className="flex items-center gap-3"><button onClick={c1.decrement} className="btn-secondary w-8 h-8 flex items-center justify-center">−</button><span className="text-2xl font-bold text-white w-10 text-center">{c1.count}</span><button onClick={c1.increment} className="btn-primary w-8 h-8 flex items-center justify-center">+</button></div>
          <p className="text-xs text-slate-500">Previous: {prev ?? '—'}</p>
          <button onClick={c1.reset} className="btn-secondary text-xs w-full">Reset</button>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-white">useCounter (step: 5)</h3>
          <div className="flex items-center gap-3"><button onClick={c5.decrement} className="btn-secondary w-8 h-8 flex items-center justify-center">−</button><span className="text-2xl font-bold text-white w-10 text-center">{c5.count}</span><button onClick={c5.increment} className="btn-primary w-8 h-8 flex items-center justify-center">+</button></div>
          <button onClick={c5.reset} className="btn-secondary text-xs w-full">Reset</button>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-2">
          <h3 className="text-sm font-semibold text-white">useToggle</h3>
          <button onClick={toggleDark} className="btn-secondary text-sm block">{dark ? '🌙 Dark Mode' : '☀️ Light Mode'}</button>
          <button onClick={toggleExp} className="btn-secondary text-sm block">{exp ? '▲ Collapse' : '▼ Expand'}</button>
          {exp && <div className="text-xs text-slate-300 bg-slate-900 rounded p-2">Expanded!</div>}
        </div>
      </div>
    </div>
  );
}
