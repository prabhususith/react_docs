import React, { useState, useCallback } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick: () => void;
  count?: number;
}

function DemoButton({ label, variant = 'primary', disabled = false, onClick, count = 0 }: ButtonProps) {
  const cls = { primary: 'bg-indigo-600 hover:bg-indigo-500 text-white', secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200', danger: 'bg-red-600 hover:bg-red-500 text-white' }[variant];
  return (
    <button onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${cls}`}>
      {label} {count > 0 && <span className="ml-1 bg-white/20 rounded px-1">{count}</span>}
    </button>
  );
}

export function PropsVsInputsOutputs() {
  const [clickCount, setClickCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const addLog = useCallback((msg: string) => {
    setLog((p) => [`${new Date().toLocaleTimeString()}: ${msg}`, ...p.slice(0, 4)]);
  }, []);

  return (
    <div className="chapter-container">
      <h1 className="section-header">Props vs @Input() / @Output()</h1>
      <p className="section-subheader">Angular uses @Input/@Output decorators. React uses plain TypeScript props — callbacks replace EventEmitter.</p>

      <AngularVsReactCard
        concept="Component Inputs and Outputs"
        angularCode={`@Component({ selector: 'app-btn', template: \`
  <button [disabled]="disabled" (click)="onClick.emit()">
    {{ label }}
  </button>
\` })
export class BtnComponent {
  @Input({ required: true }) label!: string;
  @Input() variant: 'primary'|'secondary' = 'primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<void>();
}

// Modern Angular 17+ signals
label = input.required<string>();
onClick = output<void>();`}
        reactCode={`interface BtnProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick: () => void; // callback replaces EventEmitter
}

function Btn({ label, variant = 'primary', disabled = false, onClick }: BtnProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}`}
        rationale="Angular's @Input/@Output are metadata-based contracts. EventEmitter wraps RxJS Subject. React props are just function arguments — callbacks are first-class functions. Unidirectional data flow (props down, events up) is enforced by React's model, not a framework API."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-base font-semibold text-white">🎮 Live Demo</h2>
        <div className="flex flex-wrap gap-2">
          <DemoButton label="Primary" onClick={() => { setClickCount(c => c + 1); addLog('Primary clicked'); }} count={clickCount} />
          <DemoButton label="Secondary" variant="secondary" onClick={() => addLog('Secondary clicked')} />
          <DemoButton label="Danger" variant="danger" onClick={() => addLog('Danger clicked')} />
          <DemoButton label="Disabled" disabled onClick={() => {}} />
        </div>
        {log.length > 0 && (
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs space-y-1">
            {log.map((e, i) => <p key={i} className="text-emerald-400">{e}</p>)}
          </div>
        )}
      </div>
    </div>
  );
}
