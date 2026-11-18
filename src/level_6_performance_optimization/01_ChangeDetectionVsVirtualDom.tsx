import React, { useState, useCallback, memo } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

let renderCount = 0;
const Child = memo(function Child({ value, onIncrement }: { value: number; onIncrement: () => void }) {
  renderCount++;
  return (
    <div className="bg-slate-900 rounded-lg p-3 flex items-center justify-between">
      <div><p className="text-sm text-white">Memoized Child</p><p className="text-xs text-slate-400">Value: {value} · Renders: {renderCount}</p></div>
      <button onClick={onIncrement} className="btn-secondary text-xs">Increment</button>
    </div>
  );
});

export function ChangeDetectionVsVirtualDom() {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState(0);
  const handleIncrement = useCallback(() => setCount(c => c + 1), []);

  return (
    <div className="chapter-container">
      <h1 className="section-header">Change Detection vs Virtual DOM Reconciliation</h1>
      <p className="section-subheader">Angular uses Zone.js to intercept async ops and trigger change detection. React uses Virtual DOM diff with Fiber reconciliation — updates are batched and prioritized.</p>

      <AngularVsReactCard
        concept="Zone.js & OnPush vs React Fiber"
        angularCode={`// Default CD: EVERY async event re-checks ALL components
@Component({ template: '<p>{{ value }}</p>' })
export class DefaultComponent { value = 0; }

// OnPush: only re-check when @Input refs change
@Component({
  template: '<p>{{ value }}</p>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  @Input() value!: number;

  // Manual trigger for internal changes
  constructor(private cdr: ChangeDetectorRef) {}
  updateValue() { this.value++; this.cdr.markForCheck(); }
}

// Angular 17+: Signals — fine-grained reactivity
count = signal(0);`}
        reactCode={`// React: Virtual DOM + Fiber Reconciliation
// Re-renders are component-local by default

// memo() = OnPush equivalent for function components
const ExpensiveChild = memo(({ value, onIncrement }) => {
  // Only re-renders if value or onIncrement change
  return <button onClick={onIncrement}>{value}</button>;
});

// useCallback() — stable function reference
// Without it, memo() breaks (new ref each parent render)
const handleIncrement = useCallback(
  () => setCount(c => c + 1),
  []  // stable forever
);

// React 19 compiler: auto-memoizes everything
// No memo/useCallback needed with compiler enabled`}
        rationale="Angular's CD is tree-wide by default (Zone.js fires → walk component tree). OnPush + markForCheck() opts into pull-based detection. Angular 17 Signals offer fine-grained reactivity without Zone.js. React's Fiber reconciler always compares Virtual DOM trees — only changed subtrees patched. React.memo + useCallback replicates OnPush. React 19 compiler eliminates most manual memoization."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 Memoization Demo</h2>
        <p className="text-xs text-slate-400">Unrelated state updates don't re-render the memoized child.</p>
        <button onClick={() => setUnrelated(u => u + 1)} className="btn-secondary text-sm">Update Unrelated State ({unrelated})</button>
        <Child value={count} onIncrement={handleIncrement} />
        <p className="text-xs text-slate-500">Render count only increments when child's own value changes (not on unrelated state).</p>
      </div>
    </div>
  );
}
