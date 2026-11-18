import React, { useState, useRef } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

export function ControlledVsUncontrolled() {
  const [controlled, setControlled] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="chapter-container">
      <h1 className="section-header">Controlled vs Uncontrolled Inputs</h1>
      <p className="section-subheader">Angular's template-driven forms use [(ngModel)] two-way binding. React offers controlled (value+onChange) and uncontrolled (ref) inputs.</p>

      <AngularVsReactCard
        concept="Two-way Binding vs Controlled Input"
        angularCode={`@Component({ template: \`
  <input [(ngModel)]="username" placeholder="Enter name" />
  <p>Hello, {{ username }}!</p>
\` })
export class LoginComponent {
  username = ''; // two-way bound
}`}
        reactCode={`// Controlled — React owns the value
function Form() {
  const [username, setUsername] = useState('');
  return (
    <>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <p>Hello, {username}!</p>
    </>
  );
}

// Uncontrolled — DOM owns, read via ref on submit
function UncontrolledForm() {
  const ref = useRef<HTMLInputElement>(null);
  const submit = () => console.log(ref.current?.value);
  return <input ref={ref} defaultValue="" />;
}`}
        rationale="[(ngModel)] is syntactic sugar for [ngModel]+(ngModelChange). Controlled inputs make React state the single source of truth. Uncontrolled let the DOM manage state — React Hook Form uses this for performance."
        defaultExpanded={true}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-white">Controlled Input</h2>
          <input value={controlled} onChange={e => setControlled(e.target.value)} placeholder="Type anything..." className="input-field" />
          <div className="bg-slate-900 rounded p-2 font-mono text-xs">
            <span className="text-slate-500">state: </span><span className="text-cyan-400">"{controlled}"</span>
          </div>
          <p className="text-xs text-slate-500">Length: {controlled.length}</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-white">Uncontrolled Input</h2>
          <form onSubmit={e => { e.preventDefault(); setSubmitted(inputRef.current?.value ?? ''); }} className="space-y-2">
            <input ref={inputRef} defaultValue="" placeholder="Type then submit..." className="input-field" />
            <button type="submit" className="btn-primary text-sm w-full">Read via Ref</button>
          </form>
          {submitted !== null && (
            <div className="bg-slate-900 rounded p-2 font-mono text-xs">
              <span className="text-slate-500">ref on submit: </span><span className="text-emerald-400">"{submitted}"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
