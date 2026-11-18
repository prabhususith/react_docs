import React, { useState } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
const STATUSES = ['Active', 'Inactive', 'Pending'] as const;
type Status = (typeof STATUSES)[number];
const statusColor: Record<Status, string> = {
  Active: 'text-emerald-400',
  Inactive: 'text-red-400',
  Pending: 'text-amber-400',
};

export function JsxVsTemplates() {
  const [showList, setShowList] = useState(true);
  const [status, setStatus] = useState<Status>('Active');
  const [count, setCount] = useState(0);

  return (
    <div className="chapter-container">
      <h1 className="section-header">JSX vs Angular Templates</h1>
      <p className="section-subheader">
        Angular uses HTML templates with structural directives (*ngIf, *ngFor) or the modern @if/@for
        syntax. React uses JSX — JavaScript expressions embedded directly in markup.
      </p>

      <AngularVsReactCard
        concept="Conditional Rendering (*ngIf vs Ternary)"
        angularCode={`<!-- Angular 2+ -->
<div *ngIf="isLoggedIn; else guestBlock">
  <p>Welcome back, {{ user.name }}!</p>
</div>
<ng-template #guestBlock>
  <p>Please log in.</p>
</ng-template>

<!-- Modern Angular 17+ -->
@if (isLoggedIn) {
  <p>Welcome back, {{ user.name }}!</p>
} @else {
  <p>Please log in.</p>
}`}
        reactCode={`// React 19 — JSX ternary
function Greeting({ isLoggedIn, user }: Props) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back, {user.name}!</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}

// Or early return
function Greeting({ isLoggedIn, user }: Props) {
  if (!isLoggedIn) return <p>Please log in.</p>;
  return <p>Welcome back, {user.name}!</p>;
}`}
        rationale="React's JSX is syntactic sugar over React.createElement(). Because JSX lives inside JavaScript, you use standard JS expressions for conditionals. Angular separates template logic from JavaScript, requiring special directives or @if/@for blocks (Angular 17+). React's approach reduces API surface — you only need JavaScript."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-base font-semibold text-white">🎮 Live: Conditional Rendering</h2>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${status === s ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="bg-slate-900 rounded-lg p-4">
          {status === 'Active' && <p className="text-emerald-400 font-medium">✅ System is Active.</p>}
          {status === 'Inactive' && <p className="text-red-400 font-medium">🔴 System is Inactive.</p>}
          {status === 'Pending' && <p className="text-amber-400 font-medium">⏳ System is Pending.</p>}
          <p className="text-xs text-slate-500 mt-2">Status: <span className={statusColor[status]}>{status}</span></p>
        </div>
      </div>

      <AngularVsReactCard
        concept="List Rendering (*ngFor vs .map())"
        angularCode={`<!-- Angular 2+: *ngFor -->
<ul>
  <li *ngFor="let fruit of fruits; trackBy: trackByFn">
    {{ fruit }}
  </li>
</ul>

<!-- Angular 17+: @for -->
@for (fruit of fruits; track fruit) {
  <li>{{ fruit }}</li>
} @empty {
  <li>No fruits available</li>
}`}
        reactCode={`// React — Array.map() in JSX
function FruitList({ fruits }: { fruits: string[] }) {
  return (
    <ul>
      {fruits.length > 0
        ? fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))
        : <li>No fruits available</li>
      }
    </ul>
  );
}`}
        rationale="Angular's *ngFor is a structural directive; @for requires a 'track' expression for identity-based reconciliation. React uses plain .map() — the 'key' prop serves the same optimization purpose as trackBy, helping React's Fiber reconciler identify which items changed."
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-base font-semibold text-white">🎮 Live: List Rendering</h2>
        <div className="flex gap-2">
          <button onClick={() => setShowList((v) => !v)} className="btn-secondary text-sm">
            {showList ? 'Hide' : 'Show'} List
          </button>
          <button onClick={() => setCount((c) => c + 1)} className="btn-primary text-sm">
            Force Re-render ({count})
          </button>
        </div>
        {showList ? (
          <ul className="space-y-1">
            {FRUITS.map((fruit, i) => (
              <li key={fruit} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">{i + 1}</span>
                {fruit}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-sm italic">List hidden.</p>
        )}
      </div>
    </div>
  );
}
