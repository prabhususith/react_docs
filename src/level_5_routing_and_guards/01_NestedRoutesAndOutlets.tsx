import React, { useState } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

type Section = 'overview' | 'users' | 'products' | 'settings';
const SECTIONS: Record<Section, { label: string; content: React.ReactNode }> = {
  overview: { label: 'Overview', content: <div className="grid grid-cols-3 gap-2">{[['Users','10','indigo'],['Products','15','emerald'],['Orders','12','amber']].map(([l,v,c]) => <div key={l} className={`bg-slate-900 rounded-lg p-3 text-center`}><p className={`text-xl font-bold text-${c}-400`}>{v}</p><p className="text-xs text-slate-400">{l}</p></div>)}</div> },
  users: { label: 'Users', content: <div className="space-y-1">{['Alice (Admin)','Bob (Manager)','Carol (Dev)'].map(u => <div key={u} className="bg-slate-900 rounded px-3 py-2 text-sm text-slate-300">{u}</div>)}</div> },
  products: { label: 'Products', content: <div className="space-y-1">{['React Pro Course ($149)','TypeScript ($99)','4K Monitor ($599)'].map(p => <div key={p} className="bg-slate-900 rounded px-3 py-2 text-sm text-slate-300">{p}</div>)}</div> },
  settings: { label: 'Settings', content: <div className="bg-slate-900 rounded p-3 text-sm space-y-2">{[['Theme','Dark'],['Language','English'],['2FA','Enabled']].map(([k,v]) => <div key={k} className="flex justify-between"><span className="text-slate-400">{k}</span><span className="text-slate-200">{v}</span></div>)}</div> },
};

export function NestedRoutesAndOutlets() {
  const [section, setSection] = useState<Section>('overview');
  return (
    <div className="chapter-container">
      <h1 className="section-header">Nested Routes & Outlets</h1>
      <p className="section-subheader">Angular uses &lt;router-outlet&gt; as a slot for child routes. React Router uses &lt;Outlet /&gt; — renders matched child route components in the parent layout.</p>

      <AngularVsReactCard
        concept="router-outlet vs React Router Outlet"
        angularCode={`const routes: Routes = [{
  path: 'admin',
  component: AdminLayout,
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'users', component: UsersComponent },
  ]
}];

// AdminLayout template
<nav>
  <a routerLink="overview" routerLinkActive="active">Overview</a>
</nav>
<main>
  <router-outlet></router-outlet>
</main>`}
        reactCode={`const router = createBrowserRouter([{
  path: '/admin',
  element: <AdminLayout />,
  children: [
    { index: true, element: <Navigate to="overview" /> },
    { path: 'overview', element: <AdminOverview /> },
    { path: 'users', element: <AdminUsers /> },
  ],
}]);

// AdminLayout.tsx
function AdminLayout() {
  return (
    <div>
      <NavLink to="overview">Overview</NavLink>
      <main><Outlet /></main>  {/* ← child renders here */}
    </div>
  );
}`}
        rationale="Both use layout + slot pattern. Angular router-outlet is a directive; React Outlet is a component. Angular uses RouterModule.forChild() for lazy loading; React Router v6 uses file-system-inspired route objects with loadComponent()."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-700"><p className="text-xs text-slate-500 font-mono">/admin/{section}</p></div>
        <div className="flex">
          <nav className="w-36 border-r border-slate-700 p-2 space-y-1 shrink-0">
            {(Object.keys(SECTIONS) as Section[]).map(k => <button key={k} onClick={() => setSection(k)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${section === k ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>{SECTIONS[k].label}</button>)}
          </nav>
          <main className="flex-1 p-4"><div className="text-sm font-semibold text-white mb-2">{SECTIONS[section].label}</div>{SECTIONS[section].content}</main>
        </div>
      </div>
    </div>
  );
}
