import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/mockApiClient';
import { queryKeys } from '@/api/queryKeys';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';
import type { User } from '@/shared/types/domain';

function UserList() {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: getUsers,
    staleTime: 30_000,
  });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{isFetching ? '🔄 Refreshing...' : `${data?.length ?? 0} users`}</p>
        <button onClick={() => void refetch()} className="btn-secondary text-xs">Refetch</button>
      </div>
      {isLoading && [1,2,3].map(i => <div key={i} className="animate-pulse h-12 bg-slate-700 rounded-lg" />)}
      {isError && <p className="text-red-400 text-sm">{String(error)}</p>}
      {data?.map((u: User) => (
        <div key={u.id} className="flex items-center gap-3 bg-slate-900 rounded-lg px-4 py-2.5">
          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full bg-slate-700" />
          <div className="flex-1"><p className="text-sm font-medium text-white">{u.name}</p><p className="text-xs text-slate-400">{u.email} · {u.role}</p></div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600/50 text-slate-400'}`}>{u.status}</span>
        </div>
      ))}
    </div>
  );
}

export function HttpClientVsUseQuery() {
  return (
    <div className="chapter-container">
      <h1 className="section-header">HttpClient vs useQuery</h1>
      <p className="section-subheader">Angular uses HttpClient + RxJS shareReplay(1) for caching. TanStack Query provides automatic caching, staleTime, background refetching, and deduplication.</p>

      <AngularVsReactCard
        concept="HTTP Fetching with Caching"
        angularCode={`@Injectable({ providedIn: 'root' })
export class UserService {
  private cache$: Observable<User[]> | null = null;

  getUsers(): Observable<User[]> {
    if (!this.cache$) {
      this.cache$ = this.http.get<User[]>('/api/users').pipe(
        shareReplay(1),
        catchError(err => { this.cache$ = null; return throwError(() => err); })
      );
    }
    return this.cache$;
  }
}`}
        reactCode={`function UsersComponent() {
  const {
    data,
    isLoading,   // initial fetch
    isFetching,  // background refetch
    isError,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: 30_000,  // fresh for 30s
  });

  // TanStack Query automatically:
  // - Deduplicates concurrent requests
  // - Refetches on window focus
  // - Garbage collects unused entries
}`}
        rationale="Angular requires manually implementing caching with shareReplay(1). TanStack Query's QueryClient is a sophisticated server-state cache: deduplicates concurrent fetches, revalidates stale data on window focus, tracks isLoading vs isFetching separately, and GCs unused entries. staleTime controls freshness; gcTime controls eviction."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
        <h2 className="text-sm font-semibold text-white mb-4">🎮 Live TanStack Query</h2>
        <UserList />
      </div>
    </div>
  );
}
