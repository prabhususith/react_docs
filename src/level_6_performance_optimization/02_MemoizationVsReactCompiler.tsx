import React, { useState, useMemo, useCallback, memo } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

interface Product { id: string; name: string; price: number; category: string; }
const PRODUCTS: Product[] = [
  { id: '1', name: 'React Pro Course', price: 149, category: 'Education' },
  { id: '2', name: 'TypeScript Guide', price: 99, category: 'Education' },
  { id: '3', name: '4K Monitor', price: 599, category: 'Hardware' },
  { id: '4', name: 'Wireless Keyboard', price: 89, category: 'Hardware' },
  { id: '5', name: 'Ergonomic Chair', price: 349, category: 'Furniture' },
];

const ProductCard = memo(function ProductCard({ p, onSelect }: { p: Product; onSelect: (id: string) => void }) {
  return (
    <div className="bg-slate-900 rounded-lg p-3 flex items-center justify-between">
      <div><p className="text-sm text-white">{p.name}</p><p className="text-xs text-slate-400">{p.category} · ${p.price}</p></div>
      <button onClick={() => onSelect(p.id)} className="btn-secondary text-xs">Select</button>
    </div>
  );
});

export function MemoizationVsReactCompiler() {
  const [cat, setCat] = useState('All');
  const [min, setMin] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [n, setN] = useState(0);

  const filtered = useMemo(() => PRODUCTS.filter(p => (cat === 'All' || p.category === cat) && p.price >= min), [cat, min]);
  const handleSelect = useCallback((id: string) => setSelected(id), []);

  return (
    <div className="chapter-container">
      <h1 className="section-header">Memoization vs React Compiler</h1>
      <p className="section-subheader">Angular uses Pure Pipes for memoized transforms. React uses useMemo/useCallback; React 19's compiler automates most memoization.</p>

      <AngularVsReactCard
        concept="Pure Pipes vs useMemo / React Compiler"
        angularCode={`// Angular: Pure Pipe — memoized transform
@Pipe({ name: 'filterProducts', pure: true })
export class FilterProductsPipe implements PipeTransform {
  transform(products: Product[], category: string, minPrice: number): Product[] {
    return products.filter(p =>
      (category === 'All' || p.category === category)
      && p.price >= minPrice
    );
  }
}
// Usage: products | filterProducts:category:minPrice
// Impure pipe (@Pipe({ pure: false })) runs every CD cycle — avoid!`}
        reactCode={`// useMemo: only re-compute when deps change
const filtered = useMemo(() =>
  products.filter(p =>
    (cat === 'All' || p.category === cat) && p.price >= minPrice
  ),
  [cat, minPrice]
);

// useCallback: stable function reference for memo()
const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);

// React 19 Compiler (automatic):
// The compiler inserts useMemo/useCallback automatically.
// Write plain JS; compiler optimizes it for you.`}
        rationale="Angular's pure pipes are memoized by reference equality — same as useMemo dependencies. React 19's compiler statically analyzes component code and inserts memoization automatically — you write plain JS, compiler ensures same perf. Similar in spirit to Angular's AoT compilation."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 useMemo Filter Demo</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-1">{['All','Education','Hardware','Furniture'].map(c => <button key={c} onClick={() => setCat(c)} className={`px-2 py-1 rounded text-xs font-medium ${cat === c ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}>{c}</button>)}</div>
          <div className="flex items-center gap-2"><label className="text-xs text-slate-400">Min ${min}</label><input type="range" min="0" max="500" step="50" value={min} onChange={e => setMin(+e.target.value)} className="accent-indigo-500" /></div>
          <button onClick={() => setN(n + 1)} className="btn-secondary text-xs">Unrelated re-render ({n})</button>
        </div>
        <div className="space-y-2">
          {filtered.map(p => <ProductCard key={p.id} p={p} onSelect={handleSelect} />)}
          {!filtered.length && <p className="text-slate-500 text-sm text-center py-2">No products match.</p>}
        </div>
        {selected && <p className="text-xs text-emerald-400">Selected: {PRODUCTS.find(p => p.id === selected)?.name}</p>}
      </div>
    </div>
  );
}
