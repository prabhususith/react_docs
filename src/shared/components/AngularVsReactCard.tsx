import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

interface CodePanelProps {
  title: string;
  badge: string;
  badgeColor: 'angular' | 'react';
  code: string;
  language?: string;
}

function CodePanel({ title, badge, badgeColor, code, language = 'typescript' }: CodePanelProps) {
  const badgeClasses = badgeColor === 'angular'
    ? 'bg-red-600 text-white'
    : 'bg-cyan-500 text-slate-900';

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className={clsx('px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide', badgeClasses)}>
          {badge}
        </span>
        <span className="text-sm font-medium text-slate-300">{title}</span>
      </div>
      <div className="flex-1 bg-slate-950 rounded-lg overflow-auto">
        <pre className="p-4 text-xs font-mono text-slate-200 whitespace-pre leading-relaxed">
          <code className={`language-${language}`}>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}

export interface AngularVsReactCardProps {
  concept: string;
  angularTitle?: string;
  reactTitle?: string;
  angularCode: string;
  reactCode: string;
  rationale: string;
  defaultExpanded?: boolean;
}

export function AngularVsReactCard({
  concept,
  angularTitle = 'Angular 2+ / Modern Angular',
  reactTitle = 'React 19 LTS',
  angularCode,
  reactCode,
  rationale,
  defaultExpanded = false,
}: AngularVsReactCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm overflow-hidden my-6">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-700/40 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-cyan-400" />
          </div>
          <span className="text-sm font-semibold text-white">⚡ Angular vs React: {concept}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          {expanded ? 'Collapse' : 'Expand comparison'}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-700">
          <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700">
            <div className="p-4">
              <CodePanel
                title={angularTitle}
                badge="Angular"
                badgeColor="angular"
                code={angularCode}
              />
            </div>
            <div className="p-4">
              <CodePanel
                title={reactTitle}
                badge="React 19"
                badgeColor="react"
                code={reactCode}
              />
            </div>
          </div>

          <div className="border-t border-slate-700 bg-slate-900/50 px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-1">Architectural Rationale</p>
                <p className="text-sm text-slate-300 leading-relaxed">{rationale}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
