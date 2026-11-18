import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, updateProduct } from '@/api/mockApiClient';
import { queryKeys } from '@/api/queryKeys';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';
import type { Product } from '@/shared/types/domain';

export function OptimisticUpdates() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: queryKeys.products.lists(), queryFn: () => getProducts({ limit: 6 }) });

  const toggle = useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) => updateProduct(id, { stock }),
    onMutate: async ({ id, stock }) => {
      await qc.cancelQueries({ queryKey: queryKeys.products.all });
      const previous = qc.getQueryData(queryKeys.products.lists());
      qc.setQueryData(queryKeys.products.lists(), (old: typeof data) => {
        if (!old) return old;
        return { ...old, data: old.data.map((p: Product) => p.id === id ? { ...p, stock } : p) };
      });
      return { previous };
    },
    onError: (_e, _v, ctx) => { if (ctx?.previous) qc.setQueryData(queryKeys.products.lists(), ctx.previous); },
    onSettled: () => void qc.invalidateQueries({ queryKey: queryKeys.products.all }),
  });

  return (
    <div className="chapter-container">
      <h1 className="section-header">Optimistic Updates</h1>
      <p className="section-subheader">Update the UI immediately before server response. Automatically roll back on error. Angular needs manual snapshot/restore; TanStack Query provides this natively.</p>

      <AngularVsReactCard
        concept="Optimistic UI Updates"
        angularCode={`toggleStock(product: Product) {
  const original = product.stock;
  product.stock = product.stock > 0 ? 0 : 50; // optimistic
  this.service.update(product.id, { stock: product.stock })
    .subscribe({ error: () => product.stock = original }); // rollback
}`}
        reactCode={`const mutation = useMutation({
  mutationFn: updateProduct,
  onMutate: async (newData) => {
    await queryClient.cancelQueries({ queryKey: ['products'] });
    const previous = queryClient.getQueryData(['products']);
    queryClient.setQueryData(['products'], old => ({
      ...old,
      data: old.data.map(p => p.id === newData.id ? { ...p, ...newData } : p)
    }));
    return { previous }; // snapshot for rollback
  },
  onError: (err, vars, context) => {
    queryClient.setQueryData(['products'], context.previous);
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
});`}
        rationale="3-step flow: (1) Cancel in-flight queries to prevent races, (2) Snapshot cache for rollback context, (3) Apply optimistic update. onError receives context for rollback. onSettled always refetches for server sync."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 Toggle Stock (Optimistic)</h2>
        <p className="text-xs text-slate-400">Click a product — UI updates instantly, then syncs with server.</p>
        {isLoading ? <div className="grid grid-cols-2 gap-2">{[1,2,3,4].map(i => <div key={i} className="animate-pulse h-14 bg-slate-700 rounded-lg" />)}</div> : (
          <div className="grid md:grid-cols-2 gap-2">
            {data?.data.map((p: Product) => (
              <button key={p.id} onClick={() => toggle.mutate({ id: p.id, stock: p.stock > 0 ? 0 : 50 })} disabled={toggle.isPending && toggle.variables?.id === p.id} className="text-left bg-slate-900 hover:bg-slate-700 rounded-lg p-3 transition-colors disabled:opacity-60 border border-transparent hover:border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white truncate">{p.name}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.stock > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Click to toggle</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
