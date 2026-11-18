import React, { Suspense, useState, use } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';
import { getAnalyticsMetrics } from '@/api/mockApiClient';
import type { AnalyticsMetric } from '@/shared/types/domain';

let promise: Promise<AnalyticsMetric[]> | null = null;
function getPromise() { if (!promise) promise = getAnalyticsMetrics(); return promise; }

function MetricsSummary() {
  const metrics = use(getPromise());
  const rev = metrics.reduce((s, m) => s + m.revenue, 0);
  const avg = metrics.reduce((s, m) => s + m.conversionRate, 0) / metrics.length;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[['Revenue', `$${(rev / 1000).toFixed(0)}K`, 'text-emerald-400'], ['Orders', String(metrics.reduce((s, m) => s + m.orders, 0)), 'text-indigo-400'], ['Avg Conv.', `${avg.toFixed(1)}%`, 'text-cyan-400'], ['Peak', metrics[metrics.length - 1]?.month ?? '-', 'text-amber-400']].map(([l, v, c]) => (
        <div key={l} className="bg-slate-900 rounded-lg p-3 text-center"><p className="text-xs text-slate-400">{l}</p><p className={`text-lg font-bold ${c}`}>{v}</p></div>
      ))}
    </div>
  );
}

export function React19UseApiSuspense() {
  const [show, setShow] = useState(false);
  return (
    <div className="chapter-container">
      <h1 className="section-header">React 19: use(promise) + Suspense</h1>
      <p className="section-subheader">React 19's use() hook unwraps promises directly in components. Combined with Suspense, it replaces Angular's async pipe and removes loading boilerplate.</p>

      <AngularVsReactCard
        concept="Angular async pipe vs React 19 use()"
        angularCode={`// Angular: async pipe
@Component({ template: \`
  <ng-container *ngIf="metrics$ | async as metrics">
    Total: {{ metrics.reduce((s, m) => s + m.revenue, 0) }}
  </ng-container>

  <!-- Modern Angular: toSignal() -->
  @if (metricsSignal()) {
    {{ metricsSignal()?.length }} months
  }
\` })
export class DashboardComponent {
  metrics$ = this.analytics.getMetrics();
  metricsSignal = toSignal(this.analytics.getMetrics());
}`}
        reactCode={`// React 19: use() — unwrap any promise!
function MetricsSummary() {
  // Suspends until promise resolves
  // Parent <Suspense> shows fallback
  const metrics = use(getMetricsPromise());

  // Code only runs AFTER data is available
  return <div>Total: {metrics.reduce((s, m) => s + m.revenue, 0)}</div>;
}

function Dashboard() {
  return (
    <Suspense fallback={<Skeleton />}>
      <MetricsSummary />
    </Suspense>
  );
}

// Also works with Context (conditionally!):
// const theme = use(ThemeContext);`}
        rationale="Angular's async pipe subscribes/unsubscribes automatically. toSignal() converts Observables to Signals. React 19's use() is more powerful: unwraps any Promise or Context, works conditionally (unlike other hooks). The component suspends while pending; nearest Suspense boundary shows fallback. Error boundaries catch rejections."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">🎮 use() + Suspense Demo</h2>
          {!show ? <button onClick={() => setShow(true)} className="btn-primary text-sm">Load with use()</button> : <button onClick={() => { promise = null; setShow(false); setTimeout(() => setShow(true), 100); }} className="btn-secondary text-sm">Reset & Reload</button>}
        </div>
        {show ? (
          <Suspense fallback={<div className="flex items-center gap-2 text-slate-400 py-4"><div className="w-5 h-5 border-2 border-slate-600 border-t-indigo-500 rounded-full animate-spin" /><span className="text-sm">Suspense fallback while use() awaits...</span></div>}>
            <MetricsSummary />
            <p className="text-xs text-slate-500">✅ Loaded via React 19 use(promise) — no useState, no useEffect.</p>
          </Suspense>
        ) : <p className="text-center py-6 text-slate-500 text-sm">Click "Load with use()" to trigger Suspense.</p>}
      </div>
    </div>
  );
}
