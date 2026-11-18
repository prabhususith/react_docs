import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct, createProduct } from '@/api/mockApiClient';
import { queryKeys } from '@/api/queryKeys';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';
import type { Product } from '@/shared/types/domain';
import { Trash2, Plus } from 'lucide-react';

export function MutationsAndInvalidation() {
  const qc = useQueryClient();
  const [name, setName] = useState('');
  const { data, isLoading } = useQuery({ queryKey: queryKeys.products.lists(), queryFn: () => getProducts({ limit: 6 }) });

  const del = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.products.all }),
  });
  const create = useMutation({
    mutationFn: createProduct,
    onSuccess: () => { setName(''); void qc.invalidateQueries({ queryKey: queryKeys.products.all }); },
  });

  return (
    <div className="chapter-container">
      <h1 className="section-header">Mutations & Cache Invalidation</h1>
      <p className="section-subheader">useMutation + invalidateQueries auto-refreshes all subscribed components after mutations — no manual re-fetch needed.</p>

      <AngularVsReactCard
        concept="HTTP Mutations vs useMutation"
        angularCode={`deleteProduct(id: string) {
  this.isDeleting = true;
  this.productService.delete(id)
    .pipe(finalize(() => this.isDeleting = false))
    .subscribe({
      next: () => this.loadProducts(), // manual refetch
      error: e => this.error = e.message,
    });
}`}
        reactCode={`const deleteMutation = useMutation({
  mutationFn: (id: string) => deleteProduct(id),
  onSuccess: () => {
    // Auto-refetches ALL 'products' subscribers
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
});

<button
  onClick={() => deleteMutation.mutate(product.id)}
  disabled={deleteMutation.isPending}
>
  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
</button>`}
        rationale="Angular requires manually calling a fetch method after mutations. useMutation + invalidateQueries marks all matching cache entries stale and triggers background refetches simultaneously across components. isPending/isError/isSuccess with zero boilerplate."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 Live CRUD Mutations</h2>
        <div className="flex gap-2">
          <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && name.trim() && create.mutate({ name: name.trim(), category: 'Education', price: 99, stock: 99, rating: 4.5, description: 'New', sku: `EDU-${Date.now()}` })} placeholder="New product name..." className="input-field flex-1" />
          <button onClick={() => name.trim() && create.mutate({ name: name.trim(), category: 'Education', price: 99, stock: 99, rating: 4.5, description: 'New', sku: `EDU-${Date.now()}` })} disabled={create.isPending || !name.trim()} className="btn-primary flex items-center gap-1"><Plus size={15} />{create.isPending ? '...' : 'Create'}</button>
        </div>
        {isLoading ? [1,2,3].map(i => <div key={i} className="animate-pulse h-12 bg-slate-700 rounded-lg" />) : (
          <div className="space-y-2">
            {data?.data.map((p: Product) => (
              <div key={p.id} className="flex items-center justify-between bg-slate-900 rounded-lg px-4 py-2.5">
                <div><p className="text-sm text-white">{p.name}</p><p className="text-xs text-slate-400">{p.category} · ${p.price}</p></div>
                <button onClick={() => del.mutate(p.id)} disabled={del.isPending && del.variables === p.id} className="btn-danger p-1.5"><Trash2 size={13} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
