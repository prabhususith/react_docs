import React, { useState } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';
import type { Role } from '@/shared/types/domain';

interface MockUser { name: string; role: Role; }
function ProtectedRoute({ user, required, children }: { user: MockUser | null; required?: Role; children: React.ReactNode }) {
  const lvl: Record<Role, number> = { Admin: 3, Manager: 2, Developer: 1 };
  if (!user) return <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-400">🔐 Authentication required</div>;
  if (required && lvl[user.role] < lvl[required]) return <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-xs text-red-400">🚫 {required}+ required. You are: {user.role}</div>;
  return <>{children}</>;
}

const USERS: (MockUser | null)[] = [null, { name: 'Carol (Developer)', role: 'Developer' }, { name: 'Bob (Manager)', role: 'Manager' }, { name: 'Alice (Admin)', role: 'Admin' }];

export function RouteGuardsVsProtectedRoutes() {
  const [idx, setIdx] = useState(0);
  const user = USERS[idx];

  return (
    <div className="chapter-container">
      <h1 className="section-header">Route Guards vs Protected Routes</h1>
      <p className="section-subheader">Angular uses CanActivate guards. React uses wrapper components that conditionally render routes or redirect.</p>

      <AngularVsReactCard
        concept="CanActivate vs ProtectedRoute"
        angularCode={`// Modern functional guard
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  if (auth.isAuthenticated()) return true;
  return inject(Router).parseUrl('/login?returnUrl=' + state.url);
};

export const roleGuard = (role: Role): CanActivateFn => () => {
  const user = inject(AuthService).getUser();
  if (user && hasRole(user, role)) return true;
  return inject(Router).parseUrl('/unauthorized');
};

const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard, roleGuard('Admin')]
}];`}
        reactCode={`function ProtectedRoute({ requiredRole, children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && !hasRole(user, requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children; // ✅ authorized
}

// Route config — guard IS a component
const router = createBrowserRouter([{
  path: '/admin',
  element: (
    <ProtectedRoute requiredRole="Admin">
      <AdminDashboard />
    </ProtectedRoute>
  ),
}]);`}
        rationale="Angular's CanActivate guards are imperative router-pipeline interceptors that run before component render. React has no router-level guard API — ProtectedRoute IS a component that renders children or redirects. More composable: nest guards, combine them, pass different fallback UIs."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 Live ProtectedRoute Demo</h2>
        <div className="flex flex-wrap gap-2">
          {USERS.map((u, i) => <button key={i} onClick={() => setIdx(i)} className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${idx === i ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}>{u ? u.name : 'Not logged in'}</button>)}
        </div>
        <div className="space-y-2">
          <ProtectedRoute user={user} required="Developer"><div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-2 text-xs text-emerald-400">✅ /developer — accessible</div></ProtectedRoute>
          <ProtectedRoute user={user} required="Manager"><div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-2 text-xs text-emerald-400">✅ /manager — accessible</div></ProtectedRoute>
          <ProtectedRoute user={user} required="Admin"><div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-2 text-xs text-emerald-400">✅ /admin — accessible</div></ProtectedRoute>
        </div>
      </div>
    </div>
  );
}
