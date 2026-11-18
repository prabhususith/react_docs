import React, { useState, useRef, useMemo } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

const ITEM_H = 48;
const VISIBLE = 12;
const OVERSCAN = 3;
const DATA = Array.from({ length: 2500 }, (_, i) => ({
  id: `hd-${i+1}`, name: `Record ${i+1}`, value: (i * 137) % 1000,
  category: ['Alpha','Beta','Gamma','Delta'][i % 4],
  status: i % 3 === 0 ? 'Inactive' : 'Active',
  score: Math.round(((i * 17) % 100)) / 10,
}));

function VirtualList({ items }: { items: typeof DATA }) {
  const [scrollTop, setScrollTop] = useState(0);
  const total = items.length * ITEM_H;
  const start = Math.max(0, Math.floor(scrollTop / ITEM_H) - OVERSCAN);
  const end = Math.min(items.length - 1, start + VISIBLE + OVERSCAN * 2);
  const visible = items.slice(start, end + 1);
  return (
    <div onScroll={e => setScrollTop((e.target as HTMLDivElement).scrollTop)} style={{ height: VISIBLE * ITEM_H }} className="overflow-auto rounded-lg border border-slate-700 relative">
      <div style={{ height: total, position: 'relative' }}>
        {visible.map((item, i) => (
          <div key={item.id} style={{ position: 'absolute', top: (start + i) * ITEM_H, width: '100%', height: ITEM_H }} className="flex items-center justify-between px-4 border-b border-slate-800 bg-slate-900">
            <span className="text-xs font-mono text-slate-400 w-16">{item.id}</span>
            <span className="text-sm text-slate-200 flex-1">{item.name}</span>
            <span className="text-xs text-slate-500 w-16">{item.category}</span>
            <span className={`text-xs w-14 text-right ${item.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>{item.status}</span>
            <span className="text-xs font-mono text-indigo-400 w-10 text-right">{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVirtualization() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => search ? DATA.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase())) : DATA, [search]);

  return (
    <div className="chapter-container">
      <h1 className="section-header">List Virtualization</h1>
      <p className="section-subheader">Angular CDK provides CdkVirtualScrollViewport. React uses windowing libraries or a custom scroll-position approach — only ~18 DOM nodes for 2,500 records.</p>

      <AngularVsReactCard
        concept="CdkVirtualScrollViewport vs Custom Windowing"
        angularCode={`<!-- Angular CDK: ScrollingModule -->
<cdk-virtual-scroll-viewport itemSize="48" style="height: 576px;">
  <div *cdkVirtualFor="let item of dataset; trackBy: trackById"
       class="row" style="height: 48px;">
    {{ item.name }} — {{ item.status }}
  </div>
</cdk-virtual-scroll-viewport>`}
        reactCode={`// React: windowed rendering
// Production: @tanstack/react-virtual or react-window

function VirtualList({ items }) {
  const [scrollTop, setScrollTop] = useState(0);
  const ITEM_H = 48; const VISIBLE = 12;
  const start = Math.floor(scrollTop / ITEM_H);
  const visible = items.slice(start, start + VISIBLE + 3);

  return (
    <div onScroll={e => setScrollTop(e.target.scrollTop)}
         style={{ height: VISIBLE * ITEM_H, overflow: 'auto' }}>
      <div style={{ height: items.length * ITEM_H, position: 'relative' }}>
        {visible.map((item, i) => (
          <div key={item.id}
               style={{ position: 'absolute', top: (start + i) * ITEM_H }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}`}
        rationale="Angular CDK's CdkVirtualScrollViewport is mature and handles edge cases, RTL, programmatic scrolling. React ecosystem offers @tanstack/react-virtual (headless) and react-window (lightweight). The algorithm is identical: only render viewport rows + overscan buffer. Reduces 2,500 DOM nodes to ~18 regardless of dataset size."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">🎮 Virtualizing 2,500 Records</h2>
          <span className="text-xs text-slate-400">{filtered.length.toLocaleString()} rows · ~{Math.min(VISIBLE + OVERSCAN * 2, filtered.length)} DOM nodes</span>
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter records..." className="input-field max-w-xs" />
        <VirtualList items={filtered} />
        <p className="text-xs text-slate-500">Scroll through {DATA.length.toLocaleString()} records — only {VISIBLE + OVERSCAN * 2} are in the DOM at any time.</p>
      </div>
    </div>
  );
}
