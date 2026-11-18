import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { clsx } from 'clsx';

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  error?: string | null;
  page?: number;
  totalPages?: number;
  total?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string) => void;
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading = false,
  error = null,
  page = 1,
  totalPages = 1,
  total = 0,
  limit = 10,
  onPageChange,
  emptyMessage = 'No records found.',
  rowKey,
  onRowClick,
  sortKey,
  sortDir,
  onSort,
}: TableProps<T>) {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={clsx(
                    'text-left px-4 py-3 font-semibold text-slate-300 whitespace-nowrap',
                    col.headerClassName,
                    col.sortable && onSort && 'cursor-pointer select-none hover:text-white'
                  )}
                  onClick={() => col.sortable && onSort && onSort(String(col.key))}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortKey === String(col.key) && (
                      <span className="text-indigo-400">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-800 animate-pulse">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      <div className="h-4 bg-slate-700 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-red-400">
                  {error}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={rowKey(row)}
                  className={clsx(
                    'border-b border-slate-800 transition-colors hover:bg-slate-800/50',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => {
                    const rawValue = getNestedValue(row, String(col.key));
                    return (
                      <td
                        key={String(col.key)}
                        className={clsx('px-4 py-3 text-slate-200', col.className)}
                      >
                        {col.render ? col.render(rawValue, row) : String(rawValue ?? '')}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages > 1 && (
        <div className="flex items-center justify-between px-1 pt-1">
          <p className="text-xs text-slate-500">
            {total > 0 ? `Showing ${startItem}–${endItem} of ${total}` : 'No results'}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(1)}
              disabled={page === 1}
              className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400"
              aria-label="First page"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-1 text-xs text-slate-300">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
              className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400"
              aria-label="Last page"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
