import React, { createContext, useContext, useState, useCallback, use } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';
import type { Role } from '@/shared/types/domain';

interface AuthUser { name: string; email: string; role: Role; }
interface AuthCtx { user: AuthUser | null; login: (u: AuthUser) => void; logout: () => void; }

const AuthContext = createContext<AuthCtx | null>(null);
function useAuth() { const c = use(AuthContext); if (!c) throw new Error('Outside AuthProvider'); return c; }

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const login = useCallback((u: AuthUser) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);
  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}

function LoginPanel() {
  const { user, login, logout } = useAuth();
  const USERS: AuthUser[] = [{ name: 'Alice (Admin)', email: 'alice@co.com', role: 'Admin' }, { name: 'Bob (Manager)', email: 'bob@co.com', role: 'Manager' }, { name: 'Carol (Developer)', email: 'carol@co.com', role: 'Developer' }];
  if (user) return (
    <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-3">
      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">{user.name[0]}</div>
      <div className="flex-1"><p className="text-sm font-medium text-white">{user.name}</p><p className="text-xs text-slate-400">{user.email} · {user.role}</p></div>
      <button onClick={logout} className="btn-secondary text-xs">Logout</button>
    </div>
  );
  return <div className="space-y-2">{USERS.map(u => <button key={u.email} onClick={() => login(u)} className="w-full btn-secondary text-sm text-left justify-start gap-2"><span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">{u.name[0]}</span>{u.name}</button>)}</div>;
}

function RoleGuard({ role, children }: { role: Role; children: React.ReactNode }) {
  const { user } = useAuth();
  const lvl: Record<Role, number> = { Admin: 3, Manager: 2, Developer: 1 };
  if (!user || lvl[user.role] < lvl[role]) return <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2 text-xs text-red-400">🔒 {role}+ required. Current: {user?.role ?? 'none'}</div>;
  return <>{children}</>;
}

export function ContextApiVsDI() {
  return (
    <div className="chapter-container">
      <h1 className="section-header">Context API vs Angular DI</h1>
      <p className="section-subheader">Angular's hierarchical DI provides services at module/component boundaries. React Context provides values to any descendant without prop drilling.</p>

      <AngularVsReactCard
        concept="Angular DI vs React 19 Context"
        angularCode={`@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<User | null>(null);
  isAuthenticated = computed(() => this.user() !== null);
  login(u: User) { this.user.set(u); }
  logout() { this.user.set(null); }
}

// Module-scoped override:
@NgModule({ providers: [{ provide: AuthService, useClass: MockAuth }] })
export class TestModule {}`}
        reactCode={`const AuthContext = createContext<AuthCtx | null>(null);

// useAuth: type-safe consumption with error boundary
function useAuth() {
  const ctx = use(AuthContext); // React 19: use() for context
  if (!ctx) throw new Error('Outside AuthProvider');
  return ctx;
}

// React 19: <Context value={...}> (no .Provider needed!)
function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext value={{ user, login: setUser, logout: () => setUser(null) }}>
      {children}
    </AuthContext>
  );
}`}
        rationale="Angular DI is hierarchical — root singleton, but overridable per module/component. React Context is flat: one Provider, all descendants share the value. React 19 introduces <Context value={...}> shorthand. Key difference: Angular DI supports different implementations per module (testing, lazy loading); React Context needs separate contexts or module augmentation."
        defaultExpanded={true}
      />

      <AuthProvider>
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">🎮 Live AuthContext + RoleGuard</h2>
          <LoginPanel />
          <div className="space-y-2">
            <RoleGuard role="Developer"><div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-2 text-xs text-emerald-400">✅ Developer+ area</div></RoleGuard>
            <RoleGuard role="Manager"><div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-2 text-xs text-emerald-400">✅ Manager+ area</div></RoleGuard>
            <RoleGuard role="Admin"><div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-2 text-xs text-emerald-400">✅ Admin-only area</div></RoleGuard>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}
