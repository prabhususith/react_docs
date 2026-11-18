import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getOrders } from '@/api/mockApiClient';
import { queryKeys } from '@/api/queryKeys';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';
import { Table } from '@/shared/components/Table';
import { Badge } from '@/shared/components/Badge';
import type { Order } from '@/shared/types/domain';

const SV: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = { Delivered: 'success', Shipped: 'info', Processing: 'warning', Cancelled: 'danger', Refunded: 'neutral' };

export function PaginationAndInfiniteScroll() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const LIMIT = 5;

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.orders.list({ status, page }),
    queryFn: () => getOrders({ status: status || undefined, page, limit: LIMIT }),
    placeholderData: keepPreviousData,
  });

  const cols = [
    { key: 'orderNumber', header: 'Order', render: (_: unknown, r: Order) => <span className="font-mono text-xs text-indigo-400">{r.orderNumber}</span> },
    { key: 'customerName', header: 'Customer' },
    { key: 'status', header: 'Status', render: (_: unknown, r: Order) => <Badge variant={SV[r.status] ?? 'neutral'}>{r.status}</Badge> },
    { key: 'total', header: 'Total', render: (_: unknown, r: Order) => <span className="font-medium">${r.total.toFixed(2)}</span> },
    { key: 'date', header: 'Date', render: (_: unknown, r: Order) => <span className="text-xs text-slate-400">{new Date(r.date).toLocaleDateString()}</span> },
  ];

  return (
    <div className="chapter-container">
      <h1 className="section-header">Pagination & keepPreviousData</h1>
      <p className="section-subheader">placeholderData: keepPreviousData shows old data while fetching the next page — no layout flash. Angular requires manual state duplication.</p>

      <AngularVsReactCard
        concept="Pagination with keepPreviousData"
        angularCode={`// Angular: manual previousOrders tracking
loadPage(p: number) {
  this.isLoading = true;
  this.previousOrders = this.orders; // manual keepPrevious
  this.orderService.getOrders({ page: p }).subscribe({
    next: res => { this.orders = res.data; this.isLoading = false; },
    error: () => this.isLoading = false,
  });
}`}
        reactCode={`const { data, isFetching } = useQuery({
  queryKey: ['orders', { status, page }],
  queryFn: () => getOrders({ status, page }),
  placeholderData: keepPreviousData, // 🔑 no flicker!
});

// isFetching = background fetch (subtle indicator)
// isLoading = first fetch only
{isFetching && <span>Updating...</span>}`}
        rationale="keepPreviousData shows old page data while fetching new — React keeps previous cache entry visible. isFetching (background) is separate from isLoading (first load) enabling different UI treatments."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-white">🎮 Paginated Orders</h2>
          {isFetching && !isLoading && <span className="text-xs text-amber-400 animate-pulse">🔄 Fetching...</span>}
        </div>
        <div className="flex flex-wrap gap-1">
          {['', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
            <button key={s || 'all'} onClick={() => { setStatus(s); setPage(1); }} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${status === s ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}>{s || 'All'}</button>
          ))}
        </div>
        <Table<Record<string, unknown>>
          data={(data?.data ?? []) as unknown as Record<string, unknown>[]}
          columns={cols as never}
          isLoading={isLoading}
          error={isError ? 'Failed to load' : null}
          page={page} totalPages={data?.totalPages ?? 1} total={data?.total ?? 0} limit={LIMIT}
          onPageChange={setPage} rowKey={r => String(r.id)}
        />
      </div>
    </div>
  );
}
