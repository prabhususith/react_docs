import React from 'react';
import { create } from 'zustand';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

interface Store { theme: 'light'|'dark'|'system'; sidebarOpen: boolean; notifications: string[]; setTheme: (t: Store['theme']) => void; toggleSidebar: () => void; addNotification: (m: string) => void; clearNotifications: () => void; }

const useStore = create<Store>((set) => ({
  theme: 'dark', sidebarOpen: true, notifications: [],
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  addNotification: (m) => set(s => ({ notifications: [...s.notifications.slice(-4), m] })),
  clearNotifications: () => set({ notifications: [] }),
}));

export function ZustandVsBehaviorSubject() {
  const { theme, setTheme } = useStore(s => ({ theme: s.theme, setTheme: s.setTheme }));
  const { sidebarOpen, toggleSidebar } = useStore(s => ({ sidebarOpen: s.sidebarOpen, toggleSidebar: s.toggleSidebar }));
  const { notifications, addNotification, clearNotifications } = useStore(s => ({ notifications: s.notifications, addNotification: s.addNotification, clearNotifications: s.clearNotifications }));
  const state = useStore();

  return (
    <div className="chapter-container">
      <h1 className="section-header">Zustand vs BehaviorSubject Services</h1>
      <p className="section-subheader">Angular uses @Injectable BehaviorSubject services. Zustand provides minimal global store with React hooks — no Providers, no observables.</p>

      <AngularVsReactCard
        concept="BehaviorSubject vs Zustand"
        angularCode={`@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme$ = new BehaviorSubject<'light'|'dark'>('dark');
  theme = this.theme$.asObservable();
  setTheme(t: 'light'|'dark') { this.theme$.next(t); }
}

// Component
constructor(public themeService: ThemeService) {}
// Template: {{ themeService.theme$ | async }}`}
        reactCode={`// Module-level singleton — no Provider needed!
const useThemeStore = create<Store>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
}));

// Any component — subscribes to a slice
function Toolbar() {
  const { theme, setTheme } = useThemeStore(
    s => ({ theme: s.theme, setTheme: s.setTheme })
  ); // Only re-renders when theme changes
}`}
        rationale="Angular services are DI-tree singletons using BehaviorSubject + Observable. Zustand is a module-level singleton accessed via hooks — no providers, no .next() calls. Selector slices use shallow comparison to prevent unnecessary re-renders."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 Live Zustand Store</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div><p className="text-xs text-slate-500 mb-1">Theme</p><div className="flex gap-1">{(['light','dark','system'] as const).map(t => <button key={t} onClick={() => setTheme(t)} className={`px-3 py-1 rounded text-sm capitalize ${theme === t ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}>{t}</button>)}</div></div>
            <div><p className="text-xs text-slate-500 mb-1">Sidebar</p><button onClick={toggleSidebar} className="btn-secondary text-sm">{sidebarOpen ? '◀ Close' : '▶ Open'} Sidebar</button></div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Notifications</p>
              <div className="flex gap-2"><button onClick={() => addNotification(`Event at ${new Date().toLocaleTimeString()}`)} className="btn-primary text-xs">Add</button>{notifications.length > 0 && <button onClick={clearNotifications} className="btn-secondary text-xs">Clear</button>}</div>
              <div className="mt-2 space-y-1">{notifications.map((n, i) => <div key={i} className="text-xs text-slate-300 bg-slate-900 rounded px-2 py-1">{n}</div>)}</div>
            </div>
          </div>
          <div><p className="text-xs text-slate-500 mb-1">Store state</p><pre className="text-xs font-mono text-slate-300 bg-slate-900 rounded-lg p-3">{JSON.stringify({ theme: state.theme, sidebarOpen: state.sidebarOpen, notifications: state.notifications.length }, null, 2)}</pre></div>
        </div>
      </div>
    </div>
  );
}
