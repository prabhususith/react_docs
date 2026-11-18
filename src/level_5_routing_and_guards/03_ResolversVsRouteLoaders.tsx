import React, { useState } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';
import { getUsers } from '@/api/mockApiClient';
import type { User } from '@/shared/types/domain';

export function ResolversVsRouteLoaders() {
  const [state, setState] = useState<'idle'|'loading'|'done'>('idle');
  const [users, setUsers] = useState<User[]>([]);

  const simulate = async () => {
    setState('loading');
    const data = await getUsers();
    setUsers(data);
    setState('done');
  };

  return (
    <div className="chapter-container">
      <h1 className="section-header">Resolvers vs Route Loaders</h1>
      <p className="section-subheader">Angular resolvers pre-fetch data before navigation. React Router v6.4+ loaders run parallel fetches before the component renders.</p>

      <AngularVsReactCard
        concept="ResolveFn vs Route Loader"
        angularCode={`// ResolveFn — runs before navigation completes
export const usersResolver: ResolveFn<User[]> = () => {
  return inject(UserService).getUsers().pipe(catchError(() => of([])));
};

const routes: Routes = [{
  path: 'users',
  component: UsersComponent,
  resolve: { users: usersResolver }
}];

// Component — data already available
export class UsersComponent implements OnInit {
  users: User[] = [];
  ngOnInit() { this.users = this.route.snapshot.data['users']; }
}`}
        reactCode={`// Route loader — async function, no DI needed
export async function usersLoader(): Promise<User[]> {
  return await getUsers();
  // throw redirect('/login') to guard the route
}

const router = createBrowserRouter([{
  path: '/users',
  element: <UsersPage />,
  loader: usersLoader,
  errorElement: <ErrorPage />,
}]);

// Component — data guaranteed available
function UsersPage() {
  const users = useLoaderData() as User[];
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`}
        rationale="Angular resolvers use Observable/Promise return to delay navigation. React Router loaders run before navigation commits. Loaders are plain async functions (no DI) co-located with route config. useLoaderData() retrieves the result. Both support parallel loading."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 Simulated Route Loader</h2>
        {state === 'idle' && <button onClick={simulate} className="btn-primary text-sm">Simulate Navigation (trigger loader)</button>}
        {state === 'loading' && <div className="flex items-center gap-2 text-slate-400"><div className="w-4 h-4 border-2 border-slate-600 border-t-indigo-500 rounded-full animate-spin" /><span className="text-sm">Loader running before render...</span></div>}
        {state === 'done' && (
          <div className="space-y-2">
            <p className="text-xs text-emerald-400">✅ Loader resolved — component rendered with pre-fetched data</p>
            {users.slice(0, 4).map(u => <div key={u.id} className="bg-slate-900 rounded-lg px-3 py-2 text-sm flex justify-between"><span className="text-slate-200">{u.name}</span><span className="text-slate-500">{u.role}</span></div>)}
            <button onClick={() => { setState('idle'); setUsers([]); }} className="btn-secondary text-xs">Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}
